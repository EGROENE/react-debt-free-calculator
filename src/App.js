import React from "react";
import "./App.css";
import PaymentHistory from "./PaymentHistory";

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
    };
  }

  // Method to scroll to top of page:
  // Done when a part of PaymentHistory component is clicked:
  scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  // Since document DOM is not used in React, this is how to get the value of an input (whichever input handleChange() is applied to)
  // 'name' corresponds to the name of the input field in question. 'value' is set to whatever in input. Both are destructured immediately from 'target'. States of principal, interestRate (this method is called only on the initial payment, when the previous two fields are changed, as they are disabled after first payment is submitted), and payment are set, as this method is called when these fields change.
  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [`${name}`]: value,
      },
      () => {
        // The below code executes with setState above:
        console.log(this.state.principal);

        // Calculate minimum payment on principal:
        let minPrincipalPayment = Number(this.state.principal) * 0.01;

        // Calculate interest payment:
        let intPmt;
        /* let intPmt =
          this.state.principal * ((this.state.interestRate * 0.01) / 12); */
        /* let intPmt =
          Number(originalPrincipal) * ((this.state.interestRate * 0.01) / 12); */
        /* let intPmt =
          Number(Number(this.state.principal) * Number(this.state.interestRate) / 100 / (12 - pmtCounter)); */

        let totalBalance = Number(
          (
            Number(this.state.principal) + Number(this.state.interestOwed)
          ).toFixed(2)
        );

        intPmt = Number(
          Number(this.state.principal) *
            ((Number(this.state.interestRate) * 0.01) / 12)
        );
        console.log(intPmt);

        // Initialize interestOwed. This will be passed to state value of the same name below.
        let interestOwed = intPmt;
        console.log(interestOwed);

        // Calculate total minimum payment:
        let totalMinimumPayment = minPrincipalPayment + intPmt;
        console.log(totalMinimumPayment);

        this.setState(
          {
            minPrincipalPayment: minPrincipalPayment,
            intPmt: intPmt,
            totalMinimumPayment: totalMinimumPayment,
            totalBalance: totalBalance,
            interestOwed: interestOwed,
          },
          () => {
            // Set value of placeholder of payment field to either the total remaining balance if under 100 or a min-max range if over 100.
            let pmtPlaceholderValue;
            if (this.state.totalBalance <= 100) {
              pmtPlaceholderValue = Number(
                this.state.totalBalance
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              // Set value of min accepted value in payment field when total balance is less than or equal to 100:
              document.getElementById("payment").min = Number(
                Number(this.state.principal) + Number(this.state.interestOwed)
              ).toFixed(2);
              // Set value of max accepted value in payment field when total balance is less than or equal to 100:
              document.getElementById("payment").max = Number(
                Number(this.state.principal) + Number(this.state.interestOwed)
              ).toFixed(2);
              // Set value of payment field to remaining balance (user cannot change it):
              /* document.getElementById("payment").value = (
                Number(this.state.principal) + Number(this.state.interestOwed)
              ).toFixed(2); */
            } else {
              console.log(this.state.intPmt);
              pmtPlaceholderValue =
                "$" +
                (
                  Number(this.state.intPmt) +
                  Number(this.state.principal) * 0.01
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) +
                " - " +
                "$" +
                (
                  Number(Number(this.state.intPmt).toFixed(2)) +
                  Number(Number(this.state.principal).toFixed(2))
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
              // Set value of min accepted value in payment field when total balance is over 100:
              document.getElementById("payment").min = Number(
                Number(this.state.intPmt) + Number(this.state.principal) * 0.01
              ).toFixed(2);
              document.getElementById("payment").max = Number(
                Number(Number(this.state.intPmt).toFixed(2)) +
                  Number(Number(this.state.principal).toFixed(2))
              ).toFixed(2);
            }
            // Apply whichever placeholder value applies to the situation, to the placeholder of the payment field:
            console.log(Number(this.state.intPmt));
            console.log(this.state.principal);
            document.getElementById("payment").placeholder =
              pmtPlaceholderValue;
            console.log(Number(this.state.principal).toFixed(2));
          }
        );
      }
    );
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
    // Disable the principal & interest rate input fields upon payment:
    document.getElementById("debtPrincipal").setAttribute("disabled", "true");
    document.getElementById("interestRate").setAttribute("disabled", "true");
    // Scroll to bottom of page (to most-recent payment history item):
    function scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    }
    setTimeout(scrollToBottom, 750);
  };

  updatePaymentInfo = () => {
    // Interest payment is set to current state value of intPmt. This variable will be passed as value of same state below, when the payment is made, as this method is called upon submission.
    //let minIntPmt = Number(this.state.intPmt);

    //let minPrincipalPayment = Number(this.state.principal) * 0.01;

    // Current total balance (a.k.a. the total balance before current payment is made) will be passed to value of state prevBalance below.
    let prevBalance = Number(this.state.totalBalance);

    //let intPmt = Number(Number(this.state.intPmt).toFixed(2));
    let intPmt = Number(Number(this.state.interestOwed).toFixed(2));
    console.log(intPmt);

    let currentPayment = Number(Number(this.state.payment).toFixed(2));
    console.log(currentPayment);

    let prevPrincipal = Number(Number(this.state.principal).toFixed(2));

    let principalPmt = currentPayment - intPmt;
    console.log(principalPmt);

    let newPrincipal = prevPrincipal - principalPmt;
    console.log(newPrincipal);

    let prevInterestOwed = Number(Number(this.state.interestOwed).toFixed(2));
    console.log(prevInterestOwed);

    // Get new interest balance. (after current payment is made):
    console.log(this.state.interestRate / 100);
    let newInterestOwed = Number(
      (newPrincipal * Number(this.state.interestRate)) / 100 / 12
    );
    console.log(newInterestOwed);

    // Get new total balance (after current payment is made):
    let newBalance = Number(newPrincipal + newInterestOwed);
    console.log(newBalance);

    // If principal payment is equal to the principal balance...
    // aka if user pays off entire principal:
    if (principalPmt === prevPrincipal) {
      newPrincipal = 0;
    }

    // Set new intPmt:
    let newIntPmt = Number(
      (newPrincipal * (Number(this.state.interestRate) / 100)) / 12
    );
    console.log(newIntPmt);

    // Set new minimum payment:
    let minPrincipalPayment = newPrincipal * 0.01;
    console.log(minPrincipalPayment);
    /* let totalMinimumPayment = Number(
      (
        newPrincipal * 0.01 +
        (newPrincipal * (Number(this.state.interestRate) / 100)) / 12
      ).toFixed(2)
    ); */
    let totalMinimumPayment = minPrincipalPayment + newIntPmt;
    console.log(totalMinimumPayment);

    console.log(intPmt);
    console.log(principalPmt);
    console.log(prevPrincipal);
    console.log(newPrincipal);

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
      //totalBalance: totalBalance,
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
      //totalBalance: totalBalance,
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

    // Set state of new current principal balance, total balance, previous interest owed, and previous principal to be displayed in the history items pertaining to any future payments:
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
        console.log(this.state.totalBalance);
        // Set value of placeholder of payment field to either the total remaining balance if under 100 or a min-max range if over 100.
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
          console.log(this.state.intPmt);
          console.log(this.state.principal);
          // Set placeholder value when balance is over 100:
          pmtPlaceholderValue =
            "$" +
            /* (
              Number(this.state.intPmt) +
              Number(this.state.principal) * 0.01
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + */
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
          /* document.getElementById("payment").min = (
            Number(this.state.intPmt) +
            Number(this.state.principal) * 0.01
          ).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }); */
          document.getElementById("payment").min = Number(
            this.state.totalMinimumPayment
          ).toFixed(2);
          document.getElementById("payment").max = Number(
            this.state.totalBalance
          ).toFixed(2);
        }
        // Apply whichever placeholder value applies to the situation, to the placeholder of the payment field:
        console.log(Number(this.state.intPmt));
        console.log(this.state.principal);
        document.getElementById("payment").placeholder = pmtPlaceholderValue;
        console.log(Number(this.state.totalBalance));
        // Disable payment field after final payment is made:
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
                title="Interest is recalculated after each payment, based on the new Principal. &#10;The minimum amount you are required to pay in a given payment is calculated as follows: ((Principal * Interest Rate) / 12) + Principal * 1%. &#10;The maximum amount you can pay in a given payment is calculated as follows: ((Principal * Interest Rate) / 12) + Principal. If you pay this amount, the debt will be paid off in full."
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
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) +
                      " - " +
                      "$" +
                      (
                        this.state.principal *
                        (this.state.interestRate / 100 + 1)
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                }
                required
              />
            </div>
            <div id="buttons-container">
              <button type="reset" id="resetBtn" onClick={this.resetForm}>
                Reset All Fields
              </button>
              <button type="submit" id="submitBtn">
                Submit Payment
              </button>
            </div>
          </form>
          <PaymentHistory {...this.state} scrollToTop={this.scrollToTop} />
        </header>
      </div>
    );
  }
}

export default App;
