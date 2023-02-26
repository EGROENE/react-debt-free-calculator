import React from "react";
import "./App.css";
import PaymentHistory from "./PaymentHistory";

class App extends React.Component {
  //paymentInfo;

  constructor(props) {
    super(props);
    // Find a way to give both components access to this state
    // Declare state in main comp, if child updates these state values
    // Method updatePmt() - pass as prop into child. Call onchange of fields in PaymentForm

    // Each state var should correspond with an input field of the same name:
    this.state = {
      prevPrincipal: "",
      principal: "",
      interestRate: "",
      intPmt: "",
      minPrincipalPayment: "",
      totalMinimumPayment: "",
      totalBalance: "",
      principalPmt: "", // = payment - intPmt
      payment: "",
      transactionNumber: "",
      prevBalance: "",
      newBalance: "",
      paymentsArray: [],
      paymentDate: "",
      remainingPayments: "",
    };
  }

  // Since document DOM is not used in React, this is how to get the value of an input (whichever input handleChange() is applied to)
  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [`${name}`]: value,
      },
      () => {
        let minPrincipalPayment = Number(this.state.principal) * 0.01;
        console.log(minPrincipalPayment);

        let intPmt =
          this.state.principal * ((this.state.interestRate * 0.01) / 12);

        let totalMinimumPayment = minPrincipalPayment + intPmt;

        let totalBalance =
          this.state.principal * (this.state.interestRate / 100 + 1);

        this.setState(
          {
            minPrincipalPayment: minPrincipalPayment,
            intPmt: intPmt,
            totalMinimumPayment: totalMinimumPayment,
            totalBalance: totalBalance,
          },
          () => {
            console.log(this.state.principal);
            console.log(this.state.intPmt);
            console.log(this.state.minPrincipalPayment);
            console.log(this.state.totalMinimumPayment);
            console.log(this.state.totalBalance);
            // If total balance is less than or equal to 100.00, automatically populate payment field with total remaining balance (incl. interest) & disable it.
            if (this.state.totalBalance > 100) {
              document.getElementById("payment").textContent = Number(
                this.state.principalPmt + this.state.intPmt
              ).toFixed(2);
              //document.getElementById("payment").removeAttribute("disabled");
            } else if (
              this.state.totalBalance > 0 &&
              this.state.totalBalance <= 100
            ) {
              this.setState({ payment: this.state.totalBalance }, () => {
                console.log(this.state.payment);
                /* document.getElementById("payment").textContent = Number(
                  this.state.payment
                ).toFixed(2); */
              });
            }
          }
        );
      }
    );
  };

  handleSubmission = (event) => {
    event.preventDefault();
    this.updatePaymentInfo();
    console.log(this.state.totalBalance);
    document.getElementById("paymentForm").reset();
    /*     let pmtPlaceholder = document.getElementById("payment").placeholder;
    if (this.state.totalBalance > 100) {
      pmtPlaceholder =
        this.state.principal * (this.state.interestRate / 100 + 1).toFixed(2);
    } else {
      pmtPlaceholder =
        "$" +
        (
          Number(this.state.principal) * 0.01 +
          Number(this.state.principal) *
            ((Number(this.state.interestRate) * 0.01) / 12)
        ).toFixed(2) +
        " - " +
        "$" +
        (this.state.principal * (this.state.interestRate / 100 + 1)).toFixed(2);
    } */
    document.getElementById("debtPrincipal").setAttribute("disabled", "true");
    document.getElementById("interestRate").setAttribute("disabled", "true");
  };

  updatePaymentInfo = () => {
    let interestRate = this.state.interestRate;

    let prevBalance =
      this.state.principal * (this.state.interestRate / 100 + 1);

    let totalBalance = this.state.totalBalance;

    let currentPayment = Number(this.state.payment);
    console.log(this.state.payment);

    console.log(this.state.intPmt);
    let principalPmt = currentPayment - this.state.intPmt;
    console.log(principalPmt.toFixed(2));

    let intPmt = Number(this.state.intPmt);

    //let newBalance = prevBalance - this.state.payment;
    /* let newBalance = (
      this.state.principal *
      (this.state.interestRate / 100 + 1)
    ).toFixed(2); */
    //let newBalance = totalBalance - currentPayment;

    let prevPrincipal = Number(this.state.principal);

    //let newPrincipal = this.state.principal - principalPmt;
    let newPrincipal = prevPrincipal - principalPmt;
    console.log(this.state.intPmt);
    console.log(newPrincipal);

    let newBalance = newPrincipal * (this.state.interestRate / 100 + 1);

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
      principalPmt: principalPmt,
      intPmt: intPmt,
      currentPayment: currentPayment,
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
      principalPmt: principalPmt,
      intPmt: intPmt,
      payment: currentPayment,
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
        interestRate: interestRate,
        intPmt: intPmt,
      },
      () => {
        console.log(this.state.principal);
        console.log(this.state.intPmt);
        let pmtPlaceholderValue;
        if (this.state.totalBalance <= 100) {
          /* pmtPlaceholderValue =
            this.state.principal *
            (this.state.interestRate / 100 + 1).toFixed(2); */
          pmtPlaceholderValue =
            Number(this.state.principal) + Number(this.state.intPmt);
        } else {
          pmtPlaceholderValue =
            "$" +
            (
              Number(this.state.principal) * 0.01 +
              Number(this.state.principal) *
                ((Number(this.state.interestRate) * 0.01) / 12)
            ).toFixed(2) +
            " - " +
            /* "$" +
            (
              this.state.principal *
              (this.state.interestRate / 100 + 1)
            ).toFixed(2); */
            "$" +
            /* (
              Number(this.state.principal) +
              Number(this.state.principal) *
                ((Number(this.state.interestRate) * 0.01) / 12)
            ).toFixed(2); */
            (
              Number(this.state.intPmt.toFixed(2)) +
              Number(this.state.principal.toFixed(2))
            ).toFixed(2);
        }
        console.log(Number(this.state.intPmt) + Number(this.state.principal));
        console.log(pmtPlaceholderValue);
        document.getElementById("payment").placeholder = pmtPlaceholderValue;
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
            {/* <br /> */}
            {/* <p>
              {"Total Balance: $ " +
                this.state.totalBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) +
                " "}
              <span>
                {" $" +
                  Number(this.state.principal).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) +
                  " Principal, "}
                {"$" +
                  (
                    Number(this.state.principal) *
                    Number(this.state.interestRate / 100)
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) +
                  " "}
                Interest
              </span>
            </p> */}
            <br />
            <label htmlFor="payment">
              How much would you like to pay? (min 1% of principal + monthly
              interest, already included)
            </label>
            <input
              name="payment"
              id="payment"
              type="number"
              step="0.01"
              /* min={(
                Number(this.state.interestRate / 12) +
                Number(this.state.principal * 0.01)
              ).toFixed(2)} */
              /* min={(
                Number(this.state.intPmt) + Number(this.state.principalPmt)
              ).toFixed(2)} */
              // IF TOTALBALANCE IS LESS THAN OVER 100, ETC. - SEE CONDITIONAL RENDER IN PAYMENTHISTORY
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
              /* placeholder={
                "min: " +
                (
                  Number(this.state.interestRate / 12) +
                  Number(this.state.principal * 0.01)
                ).toFixed(2)
              } */
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
