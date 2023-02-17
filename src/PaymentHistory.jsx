import React from 'react';

// FIND OUT HOW TO SHARE STATE B/T COMPS, MAYBE USING PROPS TO PASS TO PaymentHistory in App.jsx
// Maybe put what's in app.jsx until render() for the form in PaymentForm.jsx once props are figured out
// https://www.youtube.com/watch?v=0ULcw62Ycow&ab_channel=CodeStepByStep
// https://www.geeksforgeeks.org/how-to-send-state-props-to-another-component-in-react-with-onclick/

// Loop thru paymentDetails and display item containing necessary infos from each object in this array

// Find way to access paymentDetails
class PaymentHistory extends React.Component {
    render() {
        return (
            <div id='paymentHistory'>
                <header>Payment History</header>
                <p>hi</p>
            </div>
        )
    }
}
export default PaymentHistory;