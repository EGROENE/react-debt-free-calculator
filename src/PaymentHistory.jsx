import React from 'react';

class PaymentHistory extends React.Component {
    render() {
        const { paymentsArray } = this.props;
        return (
            <div id='paymentHistory'>
                {paymentsArray.map((pmt) => (
                    <div key={pmt.transactionNumber} className="paymentHistoryItem">
                        <p key={pmt.transactionNumber + 'transactionNumber'}>Transaction Number: { pmt.transactionNumber }</p>
                        <p key={pmt.transactionNumber + 'paymentDate'}>Date of Payment: { pmt.paymentDate.toLocaleString() }</p>
                        <p key={pmt.transactionNumber + 'prevPrincipal'}>Previous Principal: ${ pmt.prevPrincipal.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2}) }</p>
                        <p key={pmt.transactionNumber + 'prevInterestOwed'}>Previous Interest: ${ pmt.prevInterestOwed.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2}) }</p>
                        <p key={pmt.transactionNumber + 'prevBalance'}>Previous Balance: ${ pmt.prevBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2}) }</p>
                        <p key={pmt.transactionNumber + 'principalPayment'}>Principal Payment: ${ pmt.principalPmt.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        <p key={pmt.transactionNumber + 'interestPayment'}>Interest Payment: ${ pmt.intPmt.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        <p key={pmt.transactionNumber + 'currentPayment'}>Total Current Payment: ${ pmt.payment.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        <p key={pmt.transactionNumber + 'principal'}>Current Principal: ${pmt.principal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        <p key={pmt.transactionNumber + 'interestOwed'}>Current Interest Owed: ${pmt.interestOwed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        <p key={pmt.transactionNumber + 'newBalance'}>Current Balance: ${ pmt.newBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        {pmt.remainingPayments === 0 && <p key={pmt.transactionNumber + 'remainingPayments'}>You're debt-free!</p>
                        }
                    </div>
                ))} 
            </div>
        )
    }
}
export default PaymentHistory;