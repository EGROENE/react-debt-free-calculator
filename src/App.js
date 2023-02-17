import React from "react";
import "./App.css";
//import PaymentForm from "./PaymentForm";
import PaymentHistory from "./PaymentHistory";

class App extends React.Component {
  constructor(props) {
    super(props);
    // Find a way to give both components access to this state
    // Declare state in main comp, if child updates these state values
    // Method updatePmt() - pass as prop into child. Call onchange of fields in PaymentForm

    // Each state var should correspond with an input field of the same name:
    this.state = {
      loan: "",
      interestRate: "",
      payment: "",
    };
  }

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

  // Methods to get min payment:
  // Call inside min in 'payment' input
  /*  getMinPmt = () => {
  }; */

  // Reset form:
  resetForm = () => {
    this.setState({ loan: "", interestRate: "", payment: "" });
  };

  // Handle submission:
  // Make sure to add pmt infos to an object. These are for PaymentHistory

  render() {
    return (
      <div id="hero" className="App">
        <header className="App-header">
          <form id="paymentForm" onSubmit={this.handleSubmission}>
            <label htmlFor="debtPrincipal">
              How much is your debt principal?
            </label>
            <input
              id="debtPrincipal"
              onChange={this.handleChange}
              name="loan"
              type="number"
              min="1"
              step="0.01"
              placeholder="Debt principal"
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
                Number(this.state.loan * 0.01)
              ).toFixed(2)}
              max={(
                this.state.loan *
                (this.state.interestRate / 100 + 1)
              ).toFixed(2)}
              onChange={this.handleChange}
              placeholder="What you'd like to pay"
              required
            />
            <br />
            <button type="reset" onClick={this.resetForm}>
              Reset All Fields
            </button>
            <button type="submit">Submit Payment</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
