import React from "react";
import "./Preview.css";

class Preview extends React.Component {
    render() {
        return (
            <div className='preview-section'>
                <div className="preview-title">Loan and Payment Preview</div>
                <div className="preview-detail">
                    <div className="balance-interest">
                        <div className="balance">Balance: ${this.props.balance}</div>
                        <div className="interest">Interest: {this.props.interestDisplay}%</div>
                    </div>                 
                    <div className="interest-payment">Interest Payment: ${this.props.interestPayment}</div>
                    <div className="min-req-principal">Minimum Required Principal: ${this.props.requiredPrincipal}</div>
                    <div className="min-req-payment">Minimum Required Payment: ${this.props.minRequiredPayment}</div>
                    <div>Based on the loan amount, interest rate, and the minimum required payment, it'll take you about {this.props.paymentsRemaining} payment(s) to be debt-free.</div>
                </div>
            </div>
        )
    }
}

export default Preview;