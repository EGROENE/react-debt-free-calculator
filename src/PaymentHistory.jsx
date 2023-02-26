import React from 'react';

// Loop thru paymentDetails and display item containing necessary infos from each object in this array

// Find way to access paymentDetails
class PaymentHistory extends React.Component {
    render() {
        const { paymentsArray } = this.props;
        console.log(paymentsArray)
        return (
            <div id='paymentHistory'>
                {paymentsArray.map((pmt) => (
                    <div key={pmt.transactionNumber} className="paymentHistoryItem">
                        <p key={pmt.transactionNumber + 'transactionNumber'}>Transaction Number: { pmt.transactionNumber }</p>
                        <p key={pmt.transactionNumber + 'paymentDate'}>Date of Payment: { pmt.paymentDate.toLocaleString() }</p>
                        <p key={pmt.transactionNumber + 'prevPrincipal'}>Previous Principal: ${ pmt.prevPrincipal.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2}) }</p>
                        <p key={pmt.transactionNumber + 'prevBalance'}>Previous Balance: ${ pmt.prevBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2}) }</p>
                        <p key={pmt.transactionNumber + 'principalPayment'}>Principal Payment: ${ pmt.principalPmt.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        <p key={pmt.transactionNumber + 'interestPayment'}>Interest Payment: ${ pmt.intPmt.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        <p key={pmt.transactionNumber + 'currentPayment'}>Total Current Payment: ${ pmt.currentPayment.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        <p key={pmt.transactionNumber + 'principal'}>New Principal: ${pmt.principal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        <p key={pmt.transactionNumber + 'totalInterestOwed'}>Total Interest Owed: ${pmt.totalInterestOwed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        <p key={pmt.transactionNumber + 'newBalance'}>New Balance: ${ pmt.newBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        {pmt.remainingPayments > 0
                            ? <p key={pmt.transactionNumber + 'remainingPayments'}>Approximate payments remaining, based on current payment: {pmt.remainingPayments} (final payment may be less).</p>
                            : <p key={pmt.transactionNumber + 'remainingPayments'}>You're debt-free!</p>
                        }
                    </div>
                ))} 
            </div>
        )
    }
}
export default PaymentHistory;