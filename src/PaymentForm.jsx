/* import React from 'react';
import App from './App';
import PaymentHistory from './PaymentHistory';

class PaymentForm extends React.Component { 
  
  
  updatePrincipalAndInterestRateFields = () => {
    // PRINCIPAL FIELD:
    // Update principal:
    const inputPrincipal = document.getElementById("debtPrincipal").value;
    let principalPaymentAmountField = document.getElementById(
      "principalPaymentAmount"
    );
    const onePercentOfPrincipal = (inputPrincipal * 0.01).toFixed(2);
    const oneHundredPercentOfPrincipal = (inputPrincipal * 1).toFixed(2);
    if (inputPrincipal > 0) {
      this.setState(
        {
          principal: inputPrincipal,
          minPrincipalPayment: onePercentOfPrincipal,
          maxPrincipalPayment: oneHundredPercentOfPrincipal,
          principalPmt: principalPaymentAmountField.value,
        },
        () => {
          //principalPaymentAmountField.value = this.state.minPrincipalPayment;
        }
      );
    } else {
      this.setState(
        {
          minPrincipalPayment: onePercentOfPrincipal,
          maxPrincipalPayment: oneHundredPercentOfPrincipal,
        },
        () => {
          principalPaymentAmountField.value = this.state.minPrincipalPayment;
        }
      );
    }

    // INTEREST FIELD:
    let inputInterestRate = document.getElementById("interestRate").value;
    inputInterestRate /= 100;
    this.setState(
      {
        interestRate: inputInterestRate,
      },
      () => {
        const { principal, interestRate, principalPmt, interestPmt } =
          this.state;

        let interestOwed = (interestRate * principal).toFixed(2);
        let interestOwedField = document.getElementById(
          "interestPaymentAmount"
        );
        interestOwedField.textContent =
          "The total interest you owe is: $" + interestOwed;

        let totalDebt = (Number(interestOwed) + Number(principal)).toFixed(2);
        const totalDebtField = document.getElementById("totalDebt");
        totalDebtField.textContent = "Your total debt is: $" + totalDebt;

        let totalCurrentPayment;
        let totalCurrentPaymentField =
          document.getElementById("totalPaymentAmount");

        // NEXT: THESE INPUT FIELDS SHOULD BE DISABLED BEFORE THEY ARE CHANGED
        if (totalDebt <= 100) {
          principalPaymentAmountField.setAttribute("disabled", "true");
          interestOwedField.setAttribute("disabled", "true"); // NOT DISABLING
          totalCurrentPayment = totalDebt;
          totalCurrentPaymentField.textContent =
            "Total payment today: $" +
            totalCurrentPayment +
            " (remaining balance)";
        } else {
          principalPaymentAmountField.removeAttribute("disabled");
          interestOwedField.removeAttribute("disabled");
          principalPaymentAmountField.value = this.state.minPrincipalPayment;
          totalCurrentPayment = (
            Number(principalPmt) + Number(interestPmt)
          ).toFixed(2);
          totalCurrentPaymentField.textContent = "";
        }
      }
    );
  };

  // CALC TOTAL CURRENT PAYMENT:
  calcTotalCurrentPayment = () => {
    const inputPrincipalPayment = document.getElementById(
      "principalPaymentAmount"
    ).value;
    const inputInterestPayment = document.getElementById(
      "interestPaymentAmount"
    ).value;

    this.setState(
      {
        principalPmt: inputPrincipalPayment,
        interestPmt: inputInterestPayment,
      },
      () => {
        const { interestRate, principal, principalPmt, interestPmt } =
          this.state;
        let interestOwed = (interestRate * principal).toFixed(2);
        let totalDebt = (Number(interestOwed) + Number(principal)).toFixed(2);
        let totalCurrentPayment = (
          Number(principalPmt) + Number(interestPmt)
        ).toFixed(2);
        let totalCurrentPaymentField =
          document.getElementById("totalPaymentAmount");
        const remPmtsField = document.getElementById("remainingPayments");

        totalCurrentPaymentField.textContent =
          "Total payment today: " + totalCurrentPayment;
        // FIND WAY TO 'STOP' DIVISION ONCE QUOTIENT IS 100 OR BELOW
        remPmtsField.textContent =
          "Payments required of $" +
          totalCurrentPayment +
          " to pay off debt : " +
          Math.ceil(Number(totalDebt) / Number(totalCurrentPayment)) +
          ", including this payment. If, at anytime, total debt is $100.00 or less, the balance must be paid off in a single payment. Final payment may be in an amount less than $" +
          Number(totalCurrentPayment).toFixed(2) +
          ".";
      }
    );
  };

  // RESET ALL FIELDS, INCLUDING AUTOMATICALLY FILLED-OUT FIELDS:
  resetForm = () => {
    this.setState(
      {
        principal: 0,
        interestRate: 0,
        totalDebt: 0,
        minPrincipalPayment: 0,
        maxPrincipalPayment: 0,
        principalPmt: 0,
        interestPmt: 0,
      },
      () => {
        const interestOwedField =
          document.getElementById("interestOwed");
        interestOwedField.textContent = "";

        const totalDebtField = document.getElementById("totalDebt");
        totalDebtField.textContent = "";

        let totalCurrentPaymentField =
          document.getElementById("totalPaymentAmount");
        totalCurrentPaymentField.textContent = "";

        let totalCurrentPayment =
          Number(this.state.principalPmt) + Number(this.state.interestPmt);
        totalCurrentPayment = 0;

        const remPmtsField = document.getElementById("remainingPayments");
        remPmtsField.textContent = "";
      }
    );
  };

  handleSubmission = (event) => {
    event.preventDefault();

    // Ask how to make the state of this component accessible in PaymentHistory & how to not reset paymentDetails array upon each submission, or how to store data from each submission. Keep values in fields when entered; now, they are erased when user views PaymentHistory before submitting payment
    // Upon submission, try putting values inside an object, inside an array, to be used to display info in payment history
    // var names below correspond to how they should be labeled on PaymentHistory
    let formerPrincipalOwed = Number(this.state.principal);

    let formerInterestOwed =
      Number(this.state.interestOwed) + Number(this.state.interestPmt);

    let totalDebtOwed = formerPrincipalOwed + formerInterestOwed;

    let currentPaymentNumber;
    currentPaymentNumber++;

    this.setState(
      {
        paymentNumber: currentPaymentNumber,
        oldPrincipalOwed: formerPrincipalOwed,
        oldInterestOwed: formerInterestOwed,
      },
      () => {
        this.state.paymentDetails.push({
          paymentNumber: this.state.paymentNumber,
          oldPrincipalOwed: this.state.oldPrincipalOwed,
          currentPrincipalPayment: Number(this.state.principalPmt),
          oldInterestOwed: this.state.oldInterestOwed,
          currentInterestPayment: Number(this.state.interestPmt),
          totalDebtOwed: totalDebtOwed,
        });
        console.log(this.state.paymentDetails);
      }
    );

    this.setState({
      paymentSubmitted: true,
      showPaymentHistory: true,
    });
  };

  
}
export default PaymentForm; */