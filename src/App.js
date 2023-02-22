import React from "react";
import "./App.css";
import PaymentHistory from "./PaymentHistory";

class App extends React.Component {
  paymentInfo;

  constructor(props) {
    super(props);
    // Find a way to give both components access to this state
    // Declare state in main comp, if child updates these state values
    // Method updatePmt() - pass as prop into child. Call onchange of fields in PaymentForm

    // Each state var should correspond with an input field of the same name:
    this.state = {
      loanAmount: "",
      interestRate: "",
      payment: "",
      intPmt: "",
      minPrincipalPmt: "",
      prevBalance: "",
      newBalance: "",
      paymentsArray: [],
      paymentDate: "",
      transactionNumber: "",
    };
  }

  // Since document DOM is not used in React, this is how to get the value of an input (whichever input handleChange() is applied to)
  handleChange = ({ target: { name, value } }) => {
    /* let minPrincipalPmt = this.state.loanAmount * 0.01;
    let intPmt =
      this.state.loanAmount * ((this.state.interestRate * 0.01) / 12); */
    this.setState(
      {
        [`${name}`]: value,
      },
      () => {
        /* console.log(this.state.minPrincipalPmt);
        console.log(this.state.intPmt); */
        let minPrincipalPmt = this.state.loanAmount * 0.01;
        let intPmt =
          this.state.loanAmount * ((this.state.interestRate * 0.01) / 12);
        this.setState(
          {
            minPrincipalPmt: minPrincipalPmt,
            intPmt: intPmt,
          },
          () => {
            console.log(this.state.minPrincipalPmt);
            console.log(this.state.intPmt);
          }
        );
      }
    );
  };

  // Reset form:
  resetForm = () => {
    this.setState({
      loanAmount: "",
      interestRate: "",
      payment: "",
      intPmt: "",
      minPrincipalPmt: "",
      prevBalance: "",
      newBalance: "",
      paymentDate: "",
    });
  };

  handleSubmission = (event) => {
    event.preventDefault();
    document.getElementById("paymentForm").reset();
    this.updatePaymentInfo();
    this.resetForm();
  };

  updatePaymentInfo = () => {
    let prevBalance =
      this.state.loanAmount * (this.state.interestRate / 100 + 1);
    let currentPayment = Number(this.state.payment);
    let newBalance = prevBalance - this.state.payment;
    let paymentDate = new Date();
    // Create random 13-digit transaction number:
    let digits = "0123456789";
    let transactionNumber = "";
    for (let i = 0; i < 13; i++) {
      transactionNumber += digits[Math.floor(Math.random() * 9)];
    }

    const newArray = [...this.state.paymentsArray];
    newArray.push({
      transactionNumber: transactionNumber,
      paymentDate: paymentDate,
      prevBalance: prevBalance,
      currentPayment: currentPayment,
      newBalance: newBalance,
    });
    this.setState((prev) => ({
      transactionNumber: transactionNumber,
      paymentDate: paymentDate,
      prevBalance: prevBalance,
      payment: currentPayment,
      newBalance: newBalance,
      ...prev,
      paymentsArray: newArray,
    }));
  };

  render() {
    return (
      <div id="hero" className="App">
        <header className="App-header">
          <form id="paymentForm" onSubmit={this.handleSubmission}>
            <label htmlFor="loanAmount">How much is your debt principal?</label>
            <input
              id="debtPrincipal"
              onChange={this.handleChange}
              name="loanAmount"
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
              name="interestRate"
              type="number"
              step="0.01"
              placeholder="Interest rate"
              required
            />
            <br />
            <label htmlFor="payment">
              How much would you like to pay? (min 1% of principal + monthly
              interest)
            </label>
            <input
              name="payment"
              type="number"
              step="0.01"
              /* min={(
                Number(this.state.interestRate / 12) +
                Number(this.state.loanAmount * 0.01)
              ).toFixed(2)} */
              min={(
                Number(this.state.intPmt) + Number(this.state.minPrincipalPmt)
              ).toFixed(2)}
              max={(
                this.state.loanAmount *
                (this.state.interestRate / 100 + 1)
              ).toFixed(2)}
              /* max={t} */
              onChange={this.handleChange}
              /* placeholder={
                "min: " +
                (
                  Number(this.state.interestRate / 12) +
                  Number(this.state.loanAmount * 0.01)
                ).toFixed(2)
              } */
              placeholder={
                "min: " +
                (
                  Number(this.state.intPmt) + Number(this.state.minPrincipalPmt)
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
