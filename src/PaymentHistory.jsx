import React from 'react';

// Loop thru paymentDetails and display item containing necessary infos from each object in this array

// Find way to access paymentDetails
class PaymentHistory extends React.Component {
    render() {
        const { paymentsArray } = this.props;
        return (
            <div id='paymentHistory'>
                {paymentsArray.map((pmt) => (
                    <div key={pmt.transactionNumber} className="paymentHistoryItem">
                        <p key={pmt.transactionNumber + 'transactionNumber'}>Transaction Number: { pmt.transactionNumber }</p>
                        <p key={pmt.transactionNumber + 'paymentDate'}>Date of Payment: { pmt.paymentDate.toLocaleString() }</p>
                        <p key={pmt.transactionNumber + 'prevBalance'}>Previous Balance: { pmt.prevBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2}) }</p>
                        <p key={pmt.transactionNumber + 'currentPayment'}>Current Payment: { pmt.currentPayment.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        <p key={pmt.transactionNumber + 'newBalance'}>New Balance: { pmt.newBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                    </div>
                ))} 
            </div>
        )
    }
}
export default PaymentHistory;