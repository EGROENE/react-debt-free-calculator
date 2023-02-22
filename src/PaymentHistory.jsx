import React from 'react';

// Loop thru paymentDetails and display item containing necessary infos from each object in this array

// Find way to access paymentDetails
class PaymentHistory extends React.Component {
    render() {
        const { paymentsArray } = this.props;
        return (
            <div id='paymentHistory'>
                {paymentsArray.map((pmt) => (
                    <div key={pmt.paymentDate} className="paymentHistoryItem">
                        <p key={pmt.paymentDate + 'transactionNumber'}>Transaction Number: { pmt.transactionNumber }</p>
                        <p key={pmt.paymentDate + 'paymentDate'}>Date of Payment: { pmt.paymentDate.toLocaleString() }</p>
                        <p key={pmt.paymentDate + 'prevBalance'}>Previous Balance: { pmt.prevBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2}) }</p>
                        <p key={pmt.paymentDate + 'currentPayment'}>Current Payment: { pmt.currentPayment.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                        <p key={pmt.paymentDate + 'newBalance'}>New Balance: { pmt.newBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})  }</p>
                    </div>
                ))} 
            </div>
        )
    }
}
export default PaymentHistory;