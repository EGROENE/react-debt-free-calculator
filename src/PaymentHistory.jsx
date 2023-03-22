import React from 'react';

class PaymentHistory extends React.Component {
    render() {
        // 'Import' paymentsArray from App.js, which is passed on thru props, and deconstruct immediately:
        const { historyHeaderDisplay, paymentsArray, scrollToTop } = this.props;
        // Create array of objects containing PH item component info:
        // Then, this array of objects will be mapped thru inside of componentContainer
        const paymentHistoryItemComponentsInfo = [
            { compContainerKey: 'principalInfoContainer', infoName1: 'prevPrincipal', varName1: 'prevPrincipal', label1: 'Previous Principal: ', icon1: '', infoName2: 'principalPayment', varName2: 'principalPmt', label2: 'Principal Paid: ', icon2: '', infoName3: 'principal', varName3: 'principal', label3: 'Current Principal: ', icon3: '' },
            { compContainerKey: 'interestInfoContainer', infoName1: 'prevInterestOwed', varName1: 'intPmt', label1: 'Interest Due This Payment: ', icon1: '', infoName2: 'interestPayment', varName2: 'intPmt', label2: 'Interest Paid: ', icon2: '', infoName3: 'interestOwed', varName3: 'interestOwed', label3: 'Interest Owed On Next Payment: ', icon3: <i className="fas fa-info-circle"title= "Current Principal * Interest Rate / 12"></i> },
            { compContainerKey: 'balanceInfoContainer', infoName1: 'prevBalance', varName1: 'prevBalance', label1: 'Previous Balance: ', icon1: '', infoName2: 'currentPayment', varName2: 'payment', label2: 'Total Current Payment: ', icon2: '',infoName3: 'newBalance', varName3: 'newBalance', label3: 'Current Balance: ', icon3: <i className="fas fa-info-circle" title= "Current Principal + Interest Owed on Next Payment"></i> },
        ]
        return (
            <div id='paymentHistory'>
                <header id='pmtHistorySectionHeader' style={{display: historyHeaderDisplay}}>Payment History</header>
                {paymentsArray.map((pmt) => (
                    <div key={pmt.transactionNumber} className="paymentHistoryItem">
                        <div id='historyItemHeader'>
                            <div key={pmt.transactionNumber + 'transactionNumber'}><p>Transaction Number: </p> {pmt.transactionNumber }</div>
                            <div key={pmt.transactionNumber + 'paymentDate'}><p>Date of Payment: </p> {pmt.paymentDate.toLocaleString() }</div>
                        </div>
                        <div className='componentContainer'>
                            {paymentHistoryItemComponentsInfo.map((comp) => (
                                <div className='historyItemComponent' key={pmt.transactionNumber + comp.compContainerKey}>
                                    <p key={pmt.transactionNumber + comp.infoName1}><span>{comp.label1}</span>${pmt[comp.varName1].toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})} {comp.icon1}</p>
                                    <p key={pmt.transactionNumber + comp.infoName2}><span>{comp.label2}</span>${ pmt[comp.varName2].toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})} {comp.icon2}</p>
                                    <p key={pmt.transactionNumber + comp.infoName3}><span>{comp.label3}</span>${pmt[comp.varName3].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {comp.icon3}</p>
                                </div>
                            ))}
                        </div>
                        {Number((pmt.newBalance).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})) === 0 
                                ? <p key={pmt.transactionNumber + 'isDebtFree'}>You're debt-free!</p> 
                                : <button id='makeAnotherPayment' onClick={scrollToTop}>Make another payment</button>
                        }
                    </div>
                ))} 
            </div>
        )
    }
}
export default PaymentHistory;