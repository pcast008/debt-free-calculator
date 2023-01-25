import React from "react";
import Input from "../Input/Input";
import "./Form.css"

class Form extends React.Component {
    renderInputs = (inputs) => {
        return inputs.map((input, index) => <Input key={index} data={input} />)
    }

    render() {
        return (
            <form noValidate className="form-container" onSubmit={this.props.onSubmit}>
                <div className="form-title">
                    {this.props.title}
                </div>
                <div className="form-detail">
                    {this.renderInputs(this.props.inputData)}
                    <button disabled={this.props.disabled}>{this.props.buttonText}</button>
                </div>
            </form>
        )
    }
}

export default Form