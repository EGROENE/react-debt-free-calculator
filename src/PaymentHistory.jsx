import React from 'react';

// Loop thru paymentDetails and display item containing necessary infos from each object in this array

// Find way to access paymentDetails
class PaymentHistory extends React.Component {
    render() {
        const { paymentsArray } = this.props;
        console.log(paymentsArray);
    
        /* const sessionStorage = window.sessionStorage
        console.log(sessionStorage); */
        // For every pmt in paymentsArray, push to new array defined in this component. This array will populate stuff below.
        /* const allPayments = [...[paymentsArray]];
        console.log(allPayments) */
        //allPayments.push(paymentsArray)
        return (
            <div id='paymentHistory'>
                {paymentsArray.map((pmt) => (
                    <div className="payment">
                        <p>Previous Balance: { pmt.prevBalance }</p>
                        <p>Current Payment: { pmt.currentPayment }</p>
                        <p>New Balance: { pmt.newBalance }</p>
                    </div>
                ))} 
            </div>
        )
    }
}
export default PaymentHistory;