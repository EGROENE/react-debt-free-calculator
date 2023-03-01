import React from "react";
import "./App.css";
import PaymentHistory from "./PaymentHistory";

let pmtCounter = 0;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prevPrincipal: "",
      principal: "",
      minPrincipalPayment: "",
      principalPmt: "",
      interestRate: "",
      prevInterestOwed: "",
      interestOwed: "",
      prevIntPmt: "",
      intPmt: "",
      totalMinimumPayment: "",
      payment: "",
      prevBalance: "",
      totalBalance: "",
      newBalance: "",
      transactionNumber: "",
      paymentsArray: [],
      paymentDate: "",
      remainingPayments: "",
    };
  }

  // Since document DOM is not used in React, this is how to get the value of an input (whichever input handleChange() is applied to)
  // 'name' corresponds to the name of the input field in question. 'value' is set to whatever in input. Both are destructured immediately from 'target'. States of principal, interestRate (this method is called only on the initial payment, when the previous two fields are changed, as they are disabled after first payment is submitted), and payment are set, as this method is called when these fields change.
  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [`${name}`]: value,
      },
      () => {
        // The below code executes with setState above:

        // Calculate minimum payment on principal:
        let minPrincipalPayment = Number(this.state.principal) * 0.01;

        // Calculate interest payment:
        let intPmt =
          this.state.principal * ((this.state.interestRate * 0.01) / 12);

        // Calculate total minimum payment:
        let totalMinimumPayment = minPrincipalPayment + intPmt;

        // If at least one payment has been made, the total balance is equal to the current principal (which is set anew with each payment) plus the current interest owed, which also is set anew with each payment. This takes into account payments that have been made. If total balance is calculated based on the current principal, (which could be 0, in case the user pays off the entire principal in one payment), it could be inaccurate. The variable newInterestOwed is passed to state value interestOwed inside the updatePaymentInfo below, so see the declaration of newInterestOwed for more information.
        let totalBalance;
        if (pmtCounter > 0) {
          totalBalance =
            Number(this.state.principal) + Number(this.state.interestOwed);
        } else {
          totalBalance =
            this.state.principal * (this.state.interestRate / 100 + 1);
        }

        // Initialize interestOwed. This will be passed to state value of the same name below.
        // This does account for changes to the total balance & to the principal after payments are made.
        let interestOwed = totalBalance - this.state.principal;

        this.setState(
          {
            minPrincipalPayment: minPrincipalPayment,
            intPmt: intPmt,
            totalMinimumPayment: totalMinimumPayment,
            totalBalance: totalBalance,
            interestOwed: interestOwed,
          },
          () => {
            // If total balance is more than 100.00, then the
            /* if (this.state.totalBalance > 100) {
              document.getElementById("payment").textContent = Number(
                this.state.principalPmt + this.state.intPmt
              ).toFixed(2);
            } else if (
              this.state.totalBalance > 0 &&
              this.state.totalBalance <= 100
            ) {
              this.setState({ payment: this.state.totalBalance });
            } */
            /* if (
              this.state.totalBalance > 0 &&
              this.state.totalBalance <= 100.0
            ) {
              document.getElementById("payment").textContent = Number(
                this.state.principalPmt + this.state.intPmt
              ).toFixed(2);
              this.setState({ payment: this.state.totalBalance });
            } */
          }
        );
      }
    );
  };

  handleSubmission = (event) => {
    // Prevent default handling of form submission, including reload of page:
    event.preventDefault();
    // Increase pmtCounter by 1 with each payment:
    pmtCounter++;
    // Update values upon payment:
    this.updatePaymentInfo();
    // Reset the form:
    document.getElementById("paymentForm").reset();
    // Disable the principal & interest rate input fields upon payment:
    document.getElementById("debtPrincipal").setAttribute("disabled", "true");
    document.getElementById("interestRate").setAttribute("disabled", "true");
  };

  updatePaymentInfo = () => {
    let interestRate = this.state.interestRate;
    let intPmt = Number(this.state.intPmt);

    let prevBalance = this.state.totalBalance;

    let totalBalance = this.state.totalBalance;

    let currentPayment = Number(this.state.payment);

    console.log(this.state.payment);
    let payment = Number(this.state.payment);

    let principalPmt = currentPayment - this.state.intPmt;

    let prevPrincipal = Number(this.state.principal);

    let newPrincipal = prevPrincipal - principalPmt;
    if (newPrincipal < 1) {
      newPrincipal -= 0 + newPrincipal;
    }

    let prevInterestOwed = Number(this.state.interestOwed);
    let newInterestOwed = prevInterestOwed - intPmt;

    let newBalance = newPrincipal + newInterestOwed;

    if (currentPayment === Number(prevBalance.toFixed(2))) {
      principalPmt = prevPrincipal;
      intPmt = currentPayment - principalPmt;
      newPrincipal = 0;
      newInterestOwed = 0;
      newBalance = 0;
    }

    let paymentDate = new Date();

    // Create random 13-digit transaction number:
    let digits = "0123456789";
    let transactionNumber = "";
    for (let i = 0; i < 13; i++) {
      transactionNumber += digits[Math.floor(Math.random() * 9)];
    }

    let remainingPayments = Math.ceil((newBalance / currentPayment).toFixed(5));

    const newArray = [...this.state.paymentsArray];
    newArray.push({
      transactionNumber: transactionNumber,
      paymentDate: paymentDate,
      prevBalance: prevBalance,
      totalBalance: totalBalance,
      prevInterestOwed: prevInterestOwed,
      interestOwed: newInterestOwed,
      principalPmt: principalPmt,
      intPmt: intPmt,
      payment: payment,
      newBalance: newBalance,
      prevPrincipal: prevPrincipal,
      principal: newPrincipal,
      remainingPayments: remainingPayments,
    });

    this.setState((prev) => ({
      transactionNumber: transactionNumber,
      paymentDate: paymentDate,
      prevBalance: prevBalance,
      totalBalance: totalBalance,
      prevInterestOwed: prevInterestOwed,
      interestOwed: newInterestOwed,
      principalPmt: principalPmt,
      intPmt: intPmt,
      //payment: currentPayment,
      newBalance: newBalance,
      prevPrincipal: prevPrincipal,
      principal: newPrincipal,
      remainingPayments: remainingPayments,
      ...prev,
      paymentsArray: newArray,
    }));

    this.setState(
      {
        principal: newPrincipal,
        totalBalance: newBalance,
        prevInterestOwed: prevInterestOwed,
        interestOwed: newInterestOwed,
        interestRate: interestRate,
        intPmt: intPmt,
      },
      () => {
        console.log(this.state.interestOwed);
        console.log(this.state.principal);
        console.log(this.state.intPmt);
        let pmtPlaceholderValue;
        if (this.state.totalBalance <= 100) {
          pmtPlaceholderValue = (
            Number(this.state.principal) +
            (Number(this.state.principal) * Number(this.state.interestRate)) /
              12
          ).toFixed(2);
        } else {
          pmtPlaceholderValue =
            "$" +
            (
              Number(this.state.principal) * 0.01 +
              Number(this.state.principal) *
                ((Number(this.state.interestRate) * 0.01) / 12)
            ).toFixed(2) +
            " - " +
            "$" +
            (
              Number(this.state.principal) + Number(this.state.interestOwed)
            ).toFixed(2);
        }
        console.log(Number(this.state.intPmt) + Number(this.state.principal));
        console.log(pmtPlaceholderValue);
        document.getElementById("payment").placeholder = pmtPlaceholderValue;
        document.getElementById("payment").min = (
          Number(this.state.principal) * 0.01 +
          Number(this.state.principal) *
            ((Number(this.state.interestRate) * 0.01) / 12)
        ).toFixed(2);
        document.getElementById("payment").max = (
          Number(this.state.principal) + Number(this.state.interestOwed)
        ).toFixed(2);
      }
    );
  };

  render() {
    return (
      <div id="hero" className="App">
        <header className="App-header">
          <form id="paymentForm" onSubmit={this.handleSubmission}>
            <label htmlFor="principal">How much is your debt principal?</label>
            <input
              id="debtPrincipal"
              onChange={this.handleChange}
              name="principal"
              type="number"
              min="1"
              step="0.01"
              placeholder="Loan amount"
              required
            />
            <br />
            <label htmlFor="interestRate">How much is the interest rate?</label>
            <input
              onChange={this.handleChange}
              id="interestRate"
              name="interestRate"
              type="number"
              step="0.01"
              placeholder="Interest rate"
              required
            />
            <br />
            <label htmlFor="payment">
              How much would you like to pay? (min: 1% * principal + monthly
              interest; max: remaining principal + monthly interest)
            </label>
            <input
              name="payment"
              id="payment"
              type="number"
              step="0.01"
              min={
                this.state.totalBalance > 100
                  ? Number(this.state.totalMinimumPayment).toFixed(2)
                  : Number(this.state.totalBalance).toFixed(2)
              }
              max={
                this.state.totalBalance > 100
                  ? "$" +
                    (
                      this.state.principal *
                      (this.state.interestRate / 100 + 1)
                    ).toFixed(2)
                  : Number(this.state.totalBalance).toFixed(2)
              }
              onChange={this.handleChange}
              placeholder={
                this.state.totalBalance <= 100 && this.state.totalBalance > 0
                  ? (
                      Number(this.state.principal) *
                      (Number(this.state.interestRate) / 100 + 1)
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "$" +
                    (
                      Number(this.state.principal) * 0.01 +
                      Number(this.state.principal) *
                        ((Number(this.state.interestRate) * 0.01) / 12)
                    ).toFixed(2) +
                    " - " +
                    "$" +
                    (
                      this.state.principal *
                      (this.state.interestRate / 100 + 1)
                    ).toFixed(2)
              }
              required
            />
            <br />
            <button type="reset" onClick={this.resetForm}>
              Reset All Fields
            </button>
            <button type="submit">Submit Payment</button>
          </form>
          <PaymentHistory {...this.state} />
        </header>
      </div>
    );
  }
}

export default App;
