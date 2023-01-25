import React from 'react';
import './App.css';
import Form from './Components/Form/Form';
import Preview from './Components/Preview/Preview';
import PaymentHistory from './Components/PaymentHistory/PaymentHistory';
import { interestValidation, paymentValidation, loanAmountValidation } from './validations';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loanAmount: "",
            validLoanAmount: false,
            interest: "",
            validInterest: false,
            payment: "",
            validPayment: false,
            balance: 0,
            interestDisplay: 0,       
            interestPayment: 0,
            principalPayment: 0,
            requiredPrincipal: 0,
            minRequiredPayment: 0,
            payments: [],
            errors: {
                loanError: "",
                paymentError: "",
                interestError: ""
            },
            loanInputDisabled: false,
            loanButtonDisabled: true,
            paymentInputDisabled: true,
            paymentButtonDisabled: true,
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.handleValidations(e.target.name, e.target.value);
    }

    onLoanSubmit = (e) => {
        e.preventDefault();

        this.setState(state => {
            return {
                balance: Number(state.loanAmount).toFixed(2),
                interestDisplay: state.interest,
                interestPayment: Number(state.interest / 100 / 12 * state.loanAmount).toFixed(2),
                requiredPrincipal: Number(state.loanAmount * .01).toFixed(2),
                minRequiredPayment: Number((state.interest / 100 / 12 * state.loanAmount) + (state.loanAmount * .01)).toFixed(2),
                loanInputDisabled: true,
                loanButtonDisabled: true,
                paymentInputDisabled: false,
            }
        })

        e.target["loanAmount"].parentElement.classList.add("disabled");
        e.target["interest"].parentElement.classList.add("disabled");
    }

    onPaymentSubmit = (e) => {
        e.preventDefault();

        this.setState(state => {
            return {
                principalPayment: Number(state.payment - state.interestPayment).toFixed(2),
                balance: Number(state.balance - Number(state.payment - state.interestPayment).toFixed(2)).toFixed(2),
                payments: [ ...state.payments, { id: state.payments.length + 1, balance: Number(state.balance - Number(state.payment - state.interestPayment).toFixed(2)).toFixed(2), payment: Number(state.payment).toFixed(2), interest: state.interestPayment, principal: Number(state.payment - state.interestPayment).toFixed(2) } ]
            }
        })

        this.setState(state => {
            return {
                interestPayment: Number(state.interestDisplay / 100 / 12 * state.balance).toFixed(2),
                requiredPrincipal: Number(state.balance * .01).toFixed(2),
                minRequiredPayment: state.balance <= 100 ? Number(state.balance + (state.balance * .01)).toFixed(2) : Number((state.interestDisplay / 100 / 12 * state.balance) + (state.balance * .01)).toFixed(2)
            }
        }) 

        this.setState({
            payment: ""
        })

        e.target["payment"].nextSibling.classList.remove("fa-solid", "fa-check");
    }  

    handleValidations = (name, value) => {
        let error;

        switch (name) {
            case "loanAmount":
                error = { ...loanAmountValidation(value) };

                this.setState(state => {
                    return {
                        errors: { ...state.errors, loanError: error.errorText },
                        validLoanAmount: error.valid,
                        loanButtonDisabled: !(error.valid && state.validInterest)
                    }
                })           

                break

            case "interest":
                error = { ...interestValidation(value) };

                this.setState(state => {
                    return {
                        errors: { ...state.errors, interestError: error.errorText },
                        validInterest: error.valid,
                        loanButtonDisabled: !(error.valid && state.validLoanAmount)
                    }
                }) 

                break

            case "payment":
                error = { ...paymentValidation(value, this.state.balance, this.state.minRequiredPayment) };

                this.setState(state => {
                    return {
                        errors: { ...state.errors, paymentError: error.errorText },
                        validPayment: error.valid,
                        paymentButtonDisabled: !error.valid
                    }
                })

                break

            default:
                break
        }    
    }

    render() {
        const formData = [
            [
                {
                    labelName: "Loan Amount",
                    data: { id: "loanAmount", name: "loanAmount", value: this.state.loanAmount, onChange: this.handleChange, onBlur: this.handleBlur, disabled: this.state.loanInputDisabled },
                    error: this.state.errors.loanError,
                    validInput: this.state.validLoanAmount
                },
                {
                    labelName: "Interest",
                    data: { id: "interest", name: "interest", value: this.state.interest, onChange: this.handleChange, onBlur: this.handleBlur, disabled: this.state.loanInputDisabled },
                    error: this.state.errors.interestError,
                    validInput: this.state.validInterest
                }
            ],
            [
                {
                    labelName: "Payment",
                    data: { id: "payment", name: "payment", value: this.state.payment, onChange: this.handleChange, onBlur: this.handleBlur, disabled: this.state.paymentInputDisabled },
                    error: this.state.errors.paymentError,
                    validInput: this.state.validPayment
                }
            ]
        ]

        return (
            <div className="app-header">
                <h1 className='app-title'>Debt-free Calculator</h1>
                <div className='form-preview'>
                    <div className="form-section">
                        <Form 
                            title="Enter your loan details below" 
                            onSubmit={this.onLoanSubmit} 
                            inputData={formData[0]} 
                            disabled={this.state.loanButtonDisabled} 
                            buttonText="Submit"
                        />
                        <Form 
                            title="Enter your payment below and click submit" 
                            onSubmit={this.onPaymentSubmit} 
                            inputData={formData[1]} 
                            disabled={this.state.paymentButtonDisabled}
                            buttonText="Submit Payment" 
                        />
                    </div>
                    <div className="divider"></div>
                    <Preview { ...this.state } /> 
                </div>
                <PaymentHistory
                    title="Payment History"
                    payments={this.state.payments}
                />
            </div>
        );
    }
}

export default App;
