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
      interestRate: 0,
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
    };
  }

  // Method to round numbers to nearest cent:
  cleanValue = (val) => parseFloat(val.toFixed(2));

  // Method to scroll to top of page:
  scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  // Method to reset payment field, Principal, Interest Payment, Interest Rate state values:
  // Should reset principal, intPmt, interestRate, min/max pmts, placeholder only if no payments have been made. Otherwise, it should reset the value of the pmt field alone to blank.
  resetPaymentField = () => {
    this.setState({
      principal: 0,
      intPmt: 0,
      interestRate: 0,
      totalMinimumPayment: 0,
      totalMaximumPayment: 0,
      pmtPlaceholder: "",
    });
  };

  /* handleChange = ({ target: { name, value } }) => {
    this.setState({
      [`${name}`]: value,
    });
  }; */

  handleChange = (e) => {
    // Destructure the name of the input field, as well as its value:
    const { name, value } = e.target;
    // Auto set principal, interest rate state values. Is it OK to have two setStates in one method? Could both here be done in one setState? BTW, I will die defending the auto setting of payment field's placeholder, min, max upon change, as it's much more user-friendly.
    this.setState({
      [`${name}`]: value,
    });
    // What is dataToUpdate? What's it for & what is happening here? Why +value?
    const dataToUpdate = {
      [`${name}`]: +value,
    };
    console.log(dataToUpdate);
    if (
      name === "payment" &&
      +value >= this.state.totalMinimumPayment &&
      +value <= this.state.totalMaximumPayment
    ) {
      dataToUpdate.isAbleToPay = true;
    } else {
      dataToUpdate.isAbleToPay = false;
    }
    this.setState((prev) => ({
      ...prev,
      ...dataToUpdate,
    }));
  };

  handleSubmission = (event) => {
    // Prevent default handling of form submission, including reload of page:
    event.preventDefault();
    // Update values upon payment:
    this.updatePaymentInfo();
    // Make 'Payment History' header visible:
    document
      .getElementById("pmtHistorySectionHeader")
      .classList.remove("invisible");
    // Reset the form:
    document.getElementById("paymentForm").reset();
    // Disable the principal & interest rate input fields upon first payment:
    document.getElementById("debtPrincipal").setAttribute("disabled", "true");
    document.getElementById("interestRate").setAttribute("disabled", "true");
    // Scroll to bottom of page (to most-recent payment history item):
    function scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    }
    setTimeout(scrollToBottom, 750);
  };

  updatePaymentInfo = () => {
    // Current total balance (a.k.a. the total balance before current payment is made) will be passed to value of state prevBalance below.
    let prevBalance = Number(this.state.totalBalance);

    // Current interest payment (a.k.a. the interest payment before current payment is made):
    let intPmt = Number(Number(this.state.interestOwed).toFixed(2));

    // Current total payment:
    let currentPayment = Number(Number(this.state.payment).toFixed(2));

    // Principal before current payment is made:
    let prevPrincipal = Number(Number(this.state.principal).toFixed(2));

    // Amount of current payment that is paid against the Principal:
    let principalPmt = currentPayment - intPmt;

    // Calculate Principal after current payment is made:
    let newPrincipal = prevPrincipal - principalPmt;

    // Calculate interest owed before current payment is made:
    let prevInterestOwed = Number(Number(this.state.interestOwed).toFixed(2));

    // Get new interest balance. (after current payment is made):
    let newInterestOwed = Number(
      (newPrincipal * Number(this.state.interestRate)) / 100 / 12
    );

    // Get new total balance (after current payment is made):
    let newBalance = Number(newPrincipal + newInterestOwed);

    // If principal payment is equal to the principal balance...
    // aka if user pays off entire principal:
    if (principalPmt === prevPrincipal) {
      newPrincipal = 0;
    }

    // Set new intPmt:
    // intPmt state value will be set to this
    let newIntPmt = Number(
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
      prevInterestOwed: prevInterestOwed,
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
      prevInterestOwed: prevInterestOwed,
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
    this.setState(
      {
        principal: newPrincipal,
        totalBalance: newBalance,
        prevInterestOwed: prevInterestOwed,
        prevPrincipal: prevPrincipal,
        interestOwed: newInterestOwed,
        totalMinimumPayment: totalMinimumPayment,
      },
      () => {
        // Set value of placeholder of payment field to either the total remaining balance if less than or equal to 100 or a min-max range if over 100.
        let pmtPlaceholderValue;
        if (this.state.totalBalance <= 100) {
          pmtPlaceholderValue = Number(this.state.totalBalance).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          );
          // Set value of min accepted value in payment field when total balance is less than or equal to 100:
          document.getElementById("payment").min = Number(
            this.state.totalBalance
          ).toFixed(2);
          // Set value of max accepted value in payment field when total balance is less than or equal to 100:
          document.getElementById("payment").max = Number(
            this.state.totalBalance
          ).toFixed(2);
        } else {
          // Set placeholder value when balance is over 100:
          pmtPlaceholderValue =
            "$" +
            this.state.totalMinimumPayment.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) +
            " - " +
            "$" +
            this.state.totalBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          // Set value of min accepted value in payment field when total balance is over 100:
          document.getElementById("payment").min = Number(
            this.state.totalMinimumPayment
          ).toFixed(2);
          document.getElementById("payment").max = Number(
            this.state.totalBalance
          ).toFixed(2);
        }
        // Apply whichever placeholder value applies to the situation, to the placeholder of the payment field:
        document.getElementById("payment").placeholder = pmtPlaceholderValue;
        // Disable payment field, reset button, & submit button after final payment is made:
        if (Number(Number(this.state.totalBalance).toFixed(2)) === 0) {
          document.getElementById("payment").setAttribute("disabled", "true");
          document.getElementById("resetBtn").setAttribute("disabled", "true");
          document.getElementById("submitBtn").setAttribute("disabled", "true");
        }
      }
    );
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
                  required
                />
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="payment">
                How much would you like to pay? <br />{" "}
                <span className="sublabel">
                  {this.state.interestRate &&
                    "Interest Rate: " + this.state.interestRate + "%"}
                </span>
              </label>
              <input
                name="payment"
                id="payment"
                type="number"
                step="0.01"
                min={(
                  this.state.principal / 100 +
                  (this.state.principal * this.state.interestRate) / 100 / 12
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                max={(
                  this.state.principal +
                  (this.state.principal * this.state.interestRate) / 100 / 12
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                onChange={this.handleChange}
                placeholder={
                  "$" +
                  (
                    this.state.principal / 100 +
                    (this.state.principal * this.state.interestRate) / 100 / 12
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) +
                  " - " +
                  "$" +
                  (
                    this.state.principal +
                    (this.state.principal * this.state.interestRate) / 100 / 12
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }
                required
              />
            </div>
            <div id="buttons-container">
              <button
                type="reset"
                id="resetBtn"
                onClick={this.resetPaymentField}
              >
                Reset All Fields
              </button>
              <button type="submit" id="submitBtn">
                Submit Payment
              </button>
            </div>
          </form>
          <PaymentHistory
            paymentsArray={this.state.paymentsArray}
            scrollToTop={this.scrollToTop}
          />
        </header>
      </div>
    );
  }
}

export default App;
