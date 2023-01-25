import React from "react";
import "./PaymentHistory.css";

class PaymentHistory extends React.Component {
    paymentDetailRender(detail) {
        if (detail.length === 0) {
            return <div className="payment-item">No Payment History</div>;
        } else {
            return detail.map(item => {
                    return <div className="payment-item" key={item.id}>
                        <div className="payment-sub-item">{item.id}.</div>
                        <div className="payment-sub-item">Payment: ${item.payment}</div>
                        <div className="payment-sub-item">Balance: ${item.balance}</div>
                        <div className="payment-sub-item">Interest: ${item.interest}</div>
                        <div className="payment-sub-item">Principal: ${item.principal}</div>                   
                    </div>
                })
        }
    }

    onClick = (e) => {
        e.target.parentElement.parentElement.querySelector(".payment-history-detail").classList.toggle("hide");

        if (e.target.classList.contains("fa-chevron-down")) {
            e.target.classList.remove("fa-chevron-down");
            e.target.classList.add("fa-chevron-up");
        } else {
            e.target.classList.add("fa-chevron-down");
            e.target.classList.remove("fa-chevron-up");
        }
    }

    render() {
        return (
            <div className="payment-history">
                <div className="payment-history-title-section">
                    <div>{this.props.title}</div>
                    <div className="payment-history-button fa-solid fa-chevron-down" onClick={this.onClick}></div>
                </div>
                <div className="payment-history-detail hide">
                    {this.paymentDetailRender(this.props.payments)}      
                </div>
            </div>
        )
    }
}

export default PaymentHistory;