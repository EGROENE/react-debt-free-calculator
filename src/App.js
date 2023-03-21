import React from "react";
import "./App.css";
import "./index.css";
import "./responsive.css";
import PaymentHistory from "./PaymentHistory";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prevPrincipal: 0,
      principal: 0,
      minPrincipalPayment: 0,
      principalPmt: 0,
      interestRate: "",
      prevInterestOwed: 0,
      interestOwed: 0,
      prevIntPmt: 0,
      intPmt: 0,
      totalMinimumPayment: 0,
      totalMaximumPayment: 0,
      pmtPlaceholder: "",
      payment: 0,
      prevBalance: 0,
      totalBalance: 0,
      newBalance: 0,
      transactionNumber: "",
      paymentsArray: [],
      paymentDate: "",
      isAbleToPay: false,
      atLeastOnePmtMade: false,
      historyHeaderDisplay: "none",
      isDebtFree: false,
    };
  }

  // Method to round numbers to nearest cent:
  cleanValue = (val) => {
    const newVal = val.toFixed(3);
    if (newVal.charAt(newVal.length - 1) === "5") {
      return Number(Number(newVal + "1").toFixed(2));
    } else {
      return Number(Number(newVal).toFixed(2));
    }
  };

  // Method to scroll to top of page (will be called upon 'Make Another Payment' button in PH items, which will only exist if the user is debt-free):
  scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  // Method that returns appropriate min value for payment field:
  // Should be called in handleChange & in updatePaymentInfo
  getMinPmt = () => {
    let minPmt =
      this.state.principal / 100 +
      (this.state.principal * Number(this.state.interestRate)) / 100 / 12;
    let totalBalance =
      this.state.principal +
      (this.state.principal * Number(this.state.interestRate)) / 100 / 12;
    if (totalBalance <= 100 && totalBalance > 0) {
      minPmt = totalBalance;
    }
    return this.cleanValue(minPmt);
  };

  // Method to set placeholder for payment field:
  // Should be called in handleChange, updatePaymentInfo
  setPaymentFieldPlaceholder = () => {
    let totalBalance =
      this.state.principal +
      (this.state.principal * Number(this.state.interestRate)) / 100 / 12;
    let placeholder;
    if (totalBalance > 0 && totalBalance <= 100) {
      placeholder =
        "$" +
        totalBalance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    } else {
      placeholder =
        "$" +
        this.getMinPmt().toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
        " - $" +
        totalBalance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    }
    return placeholder;
  };

  // Method to reset payment field, Principal, Interest Payment, Interest Rate state values:
  // Should reset principal, intPmt, interestRate, min/max pmts, placeholder only if no payments have been made. Otherwise, it should reset the value of the pmt field alone to blank.
  resetPaymentField = () => {
    if (!this.state.atLeastOnePmtMade) {
      this.setState({
        principal: 0,
        intPmt: 0,
        interestRate: "",
        totalMinimumPayment: 0,
        totalMaximumPayment: 0,
        pmtPlaceholder: "",
      });
    } else {
      // AGAIN, I SEE NO OTHER WAY OF DOING THIS THAN TO MANIPULATE THE DOM DIRECTLY, AND THIS PROVIDES A MUCH BETTER UX
      document.getElementById("paymentForm").reset();
    }
  };

  // Instead of Andrey's method of disabling pmt button until value of payment field meets requirements, I want to automatically update the min, max, & placeholder of payment field as user enters info. The user being able to see the min/max in placeholder is much more user-friendly. I see no other way to do it than with a callback in setState.
  handleChange = (e) => {
    // Destructure the name of the input field, as well as its value:
    const { name, value } = e.target;
    // Auto set principal, interest rate state values. Is it OK to have two setStates in one method? Could both here be done in one setState? BTW, I will die defending the auto setting of payment field's placeholder, min, max upon change, as it's much more user-friendly.
    this.setState(
      {
        [`${name}`]: value,
      },
      () => {
        // For my UX, this is necessary to set here. I don't think calling one method in a setState callback is callback hell...
        this.getMinPmt();
        this.setPaymentFieldPlaceholder();
      }
    );
    // What is dataToUpdate? What's it for & what is happening here? Why +value? Maybe to convert to a number...
    const dataToUpdate = {
      [`${name}`]: +value,
    };
    // Below is Andrey's method of enabling user to make a payment. If the value entered into payment field is greater than or equal to the min payment & less than or equal to the max payment, payment submission is allowed. I prefer using my method of setting the min/max of payment field when user enters principal, interest rate, and makes a payment, even though I need to call a couple methods in a setState callback. It allows for a much better UX, and I would like to display this as a portfolio project, so anyone who investigates this project should be clear as to how it works.
    /* if (
      name === "payment" &&
      +value >= this.state.totalMinimumPayment &&
      +value <= this.state.totalMaximumPayment
    ) {
      dataToUpdate.isAbleToPay = true;
    } else {
      dataToUpdate.isAbleToPay = false;
    } */
    this.setState((prev) => ({
      ...prev,
      ...dataToUpdate,
    }));
  };

  updatePaymentInfo = () => {
    this.getMinPmt();
    this.setPaymentFieldPlaceholder();
    let prevBalance =
      this.state.principal +
      (this.state.principal * Number(this.state.interestRate)) / 100 / 12;
    prevBalance = this.cleanValue(prevBalance);

    // Current interest payment (a.k.a. the interest payment before current payment is made):
    let intPmt = this.cleanValue(
      (this.state.principal * Number(this.state.interestRate)) / 100 / 12
    );
    // Current total payment:
    let currentPayment = this.state.payment;

    // Principal before current payment is made:
    // Round to 2 decimals, just to be safe
    let prevPrincipal = this.cleanValue(this.state.principal);

    // Amount of current payment that is paid against the Principal:
    let principalPmt = this.cleanValue(currentPayment - intPmt);

    // Calculate Principal after current payment is made:
    let newPrincipal = prevPrincipal - principalPmt;

    // Calculate interest owed before current payment is made:
    let prevInterestOwed = this.cleanValue(this.state.interestOwed);

    // Get new interest balance. (after current payment is made):
    let newInterestOwed = this.cleanValue(
      (newPrincipal * Number(this.state.interestRate)) / 100 / 12
    );

    // Get new total balance (after current payment is made):
    let newBalance = this.cleanValue(newPrincipal + newInterestOwed);

    // If new balance (balance after payment) is 0, then set isDebtFree to true, which will be used to disable reset & submit button, as well as the payment field.
    if (newBalance === 0) {
      this.setState({
        isDebtFree: true,
      });
    }

    // If principal payment is equal to the principal balance...
    // aka if user pays off entire principal:
    if (principalPmt === prevPrincipal) {
      newPrincipal = 0;
    }

    // Set new intPmt:
    // intPmt state value for future payments will be set to this
    let newIntPmt = this.cleanValue(
      (newPrincipal * (Number(this.state.interestRate) / 100)) / 12
    );

    // Calculate new minimum payment:
    let minPrincipalPayment = newPrincipal * 0.01;
    let totalMinimumPayment = minPrincipalPayment + newIntPmt;

    // Get the date and time of when user submits payment:
    let paymentDate = new Date();

    // Create random 13-digit transaction number:
    let digits = "0123456789";
    let transactionNumber = "";
    for (let i = 0; i < 13; i++) {
      transactionNumber += digits[Math.floor(Math.random() * 9)];
    }

    // Initialize array containing any and all values of the array corresponding to any infos from previous payments. Values from current payment will be pushed here, and its state will be set so that values from current payment will also be included in this array in any future payments. This array will be looped through to create items in payment history.
    const newArray = [...this.state.paymentsArray];
    // Push infos from current payment to new array:
    newArray.push({
      transactionNumber: transactionNumber,
      paymentDate: paymentDate,
      prevBalance: prevBalance,
      interestOwed: newInterestOwed,
      principalPmt: principalPmt,
      intPmt: intPmt,
      payment: currentPayment,
      newBalance: newBalance,
      prevPrincipal: prevPrincipal,
      principal: newPrincipal,
    });

    // Set state with values from current payment. The 'prev' parameter and corresponding rest operator is used in order to access previous state value of payments array & to set the state of that array to the new array, which is defined above.
    this.setState((prev) => ({
      transactionNumber: transactionNumber,
      paymentDate: paymentDate,
      prevBalance: prevBalance,
      interestOwed: newInterestOwed,
      principalPmt: principalPmt,
      intPmt: intPmt,
      newBalance: newBalance,
      prevPrincipal: prevPrincipal,
      principal: newPrincipal,
      ...prev,
      paymentsArray: newArray,
    }));

    // Set state of new current principal balance, total balance, previous interest owed, previous principal, interestOwed, & totalMinimumPayment to be displayed in the history items pertaining to any future payments. These will also be used when calculating min amount of future payments:
    this.setState({
      principal: newPrincipal,
      totalBalance: newBalance,
      prevInterestOwed: prevInterestOwed,
      prevPrincipal: prevPrincipal,
      interestOwed: newInterestOwed,
      totalMinimumPayment: totalMinimumPayment,
    });
  };

  handleSubmission = (event) => {
    // Prevent default handling of form submission, including reload of page:
    event.preventDefault();
    // Update values upon payment:
    this.updatePaymentInfo();
    // Make atLeastOnePmtMade true
    // Make 'Payment History' header visible:
    // Use state value for this, not DOM manipulation inside of a method:
    // Change the 'display' attribute of PH header, based on a state value
    this.setState({
      atLeastOnePmtMade: true,
      historyHeaderDisplay: "block",
    });

    // Reset the form:
    // Is this possible without DOM manipulation here? I don't think so...
    document.getElementById("paymentForm").reset();
    // Scroll to bottom of page (to most-recent payment history item):
    // Is this considered DOM manipulation?
    function scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    }
    setTimeout(scrollToBottom, 750);
  };

  render() {
    return (
      <div id="hero" className="App">
        <header className="App-header">
          <div id="page-header">
            <img
              src="./logo192.png"
              alt="react-logo-header"
              className="App-logo"
            ></img>
            <h1>
              React Debt-Free Calculator
              <i
                className="fas fa-info-circle"
                title="Interest is recalculated after each payment, based on the new Principal. &#10;The minimum amount you are required to pay in a given payment is calculated as follows: ((Principal * Interest Rate) / 12) + Principal * 1%. &#10;The maximum amount you can pay in a given payment is calculated as follows: ((Principal * Interest Rate) / 12) + Principal. If you pay this amount, the debt will be paid off in full. If total balance is less than or equal to $100.00, it must be paid off in a single payment."
              ></i>
            </h1>
          </div>
          <form id="paymentForm" onSubmit={this.handleSubmission}>
            <div className="form-row">
              <div className="form-item">
                <label htmlFor="principal">
                  How much is your debt principal?
                </label>
                <input
                  id="debtPrincipal"
                  onChange={this.handleChange}
                  name="principal"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Debt Principal"
                  disabled={this.state.atLeastOnePmtMade}
                  required
                />
              </div>
              <div className="form-item">
                <label htmlFor="interestRate">
                  How much is the interest rate?
                </label>
                <input
                  onChange={this.handleChange}
                  id="interestRate"
                  min="0"
                  name="interestRate"
                  type="number"
                  step="0.001"
                  placeholder="Interest Rate"
                  disabled={this.state.atLeastOnePmtMade}
                  required
                />
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="payment">
                How much would you like to pay? <br />{" "}
                <span className="sublabel">
                  {!(this.state.interestRate === "") &&
                    "Interest Rate: " + this.state.interestRate + "%"}
                </span>
              </label>
              <input
                name="payment"
                id="payment"
                type="number"
                step="0.01"
                disabled={this.state.isDebtFree}
                min={this.getMinPmt()}
                max={this.cleanValue(
                  this.state.principal +
                    (this.state.principal * this.state.interestRate) / 100 / 12
                )}
                onChange={this.handleChange}
                placeholder={this.setPaymentFieldPlaceholder()}
                required
              />
            </div>
            <div id="buttons-container">
              <button
                type="reset"
                id="resetBtn"
                disabled={this.state.isDebtFree}
                onClick={this.resetPaymentField}
              >
                Reset All Fields
              </button>
              <button
                type="submit"
                id="submitBtn"
                disabled={this.state.isDebtFree}
              >
                Submit Payment
              </button>
            </div>
          </form>
          <PaymentHistory
            historyHeaderDisplay={this.state.historyHeaderDisplay}
            paymentsArray={this.state.paymentsArray}
            scrollToTop={this.scrollToTop}
          />
        </header>
      </div>
    );
  }
}

export default App;
