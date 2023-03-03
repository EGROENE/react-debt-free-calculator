import React from 'react';

class PaymentHistory extends React.Component {
    render() {
        // 'Import' paymentsArray from App.js, which is passed on thru props, and deconstruct immediately:
        const { paymentsArray } = this.props;
        return (
            <div id='paymentHistory'>
                <header id='pmtHistorySectionHeader' className='invisible'>Payment History</header>
                {paymentsArray.map((pmt) => (
                    <div key={pmt.transactionNumber} className="paymentHistoryItem">
                        <div id='historyItemHeader'>
                            <div key={pmt.transactionNumber + 'transactionNumber'}><p>Transaction Number:</p> { pmt.transactionNumber }</div>
                            <div key={pmt.transactionNumber + 'paymentDate'}><p>Date of Payment:</p> { pmt.paymentDate.toLocaleString() }</div>
                        </div>
                        <div className='componentContainer'>
                            <div className='historyItemComponent'>
                                <p key={pmt.transactionNumber + 'prevPrincipal'}><span>Previous Principal:</span> ${ pmt.prevPrincipal.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}) }</p>
                                <p key={pmt.transactionNumber + 'principalPayment'}><span>Principal Paid:</span> ${ pmt.principalPmt.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})  }</p>
                                <p key={pmt.transactionNumber + 'principal'}><span>Current Principal:</span> ${pmt.principal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                            </div>
                            <div className='historyItemComponent'>
                                <p key={pmt.transactionNumber + 'prevInterestOwed'}><span>Interest Due This Payment:</span> ${ pmt.prevInterestOwed.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}) }</p>
                                <p key={pmt.transactionNumber + 'interestPayment'}><span>Interest Paid:</span> ${ pmt.intPmt.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})  }</p>
                                <p key={pmt.transactionNumber + 'interestOwed'}><span>Interest Owed on Next Payment:</span> ${pmt.interestOwed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                            </div>
                            <div className='historyItemComponent'>
                                <p key={pmt.transactionNumber + 'prevBalance'}><span>Previous Balance:</span> ${ pmt.prevBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}) }</p>
                                <p key={pmt.transactionNumber + 'currentPayment'}><span>Total Current Payment:</span> ${ pmt.payment.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})  }</p>
                                <p key={pmt.transactionNumber + 'newBalance'}><span>Current Balance:</span> ${ pmt.newBalance.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})  }</p>
                            </div>
                        </div>
                        {pmt.newBalance === 0 && <p key={pmt.transactionNumber + 'isDebtFree'}>You're debt-free!</p>
                        }
                    </div>
                ))} 
            </div>
        )
    }
}
export default PaymentHistory;