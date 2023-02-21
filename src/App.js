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
      prevBalance: "",
      newBalance: "",
      paymentsArray: [],
      paymentDate: "",
    };
  }

  /* updatePaymentHistory = (newPmt) => {
    const updatedPmtsArray = [...this.state.paymentsArray];
    console.log(updatedPmtsArray);
    console.log(newPmt);
    updatedPmtsArray.push(newPmt);
    this.setState((prev) => ({
      ...prev,
      paymentsArray: updatedPmtsArray,
    }));
  }; */

  /* updatePayment = (event) => {
    const {
      target: { value },
    } = event;
    this.setState((prev) => ({
      ...prev,
      payment: value,
    }));
  }; */

  // Since document DOM is not used in React, this is how to get the value of an input (whichever input handleChange() is applied to)
  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [`${name}`]: value,
      },
      () => {
        console.log(value);
      }
    );
  };

  // Reset form:
  resetForm = () => {
    this.setState({
      loanAmount: "",
      interestRate: "",
      payment: "",
      prevBalance: "",
      newBalance: "",
      paymentDate: "",
    });
  };

  handleSubmission = (event) => {
    event.preventDefault();
    this.setState({
      loanAmount: "",
      interestRate: "",
      paymentDate: "",
      payment: "",
      prevBalance: "",
      newBalance: "",
    });
  };

  // Handle submission:
  // Make sure to add pmt infos to an object. These are for PaymentHistory
  updatePaymentInfo = () => {
    //event.preventDefault();
    // Get date here (define state, then set to date when user submits payment)
    let prevBalance =
      this.state.loanAmount * (this.state.interestRate / 100 + 1);
    let currentPayment = Number(this.state.payment);
    let newBalance = prevBalance - this.state.payment;
    let paymentDate = new Date();

    const newArray = [...this.state.paymentsArray];
    newArray.push({
      paymentDate: paymentDate,
      prevBalance: prevBalance,
      currentPayment: currentPayment,
      newBalance: newBalance,
    });
    this.setState((prev) => ({
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
              min={(
                Number(this.state.interestRate / 12) +
                Number(this.state.loanAmount * 0.01)
              ).toFixed(2)}
              max={(
                this.state.loanAmount *
                (this.state.interestRate / 100 + 1)
              ).toFixed(2)}
              onChange={this.handleChange}
              placeholder={
                "min: " +
                (
                  Number(this.state.interestRate / 12) +
                  Number(this.state.loanAmount * 0.01)
                ).toFixed(2)
              }
              required
            />
            <br />
            <button type="reset" onClick={this.resetForm}>
              Reset All Fields
            </button>
            <button
              /* onClick={() => {
                this.updatePayment();
                this.updatePaymentHistory();
              }} */
              onClick={this.updatePaymentInfo}
              type="submit"
            >
              Submit Payment
            </button>
          </form>
          <PaymentHistory {...this.state} />
        </header>
      </div>
    );
  }
}

export default App;
