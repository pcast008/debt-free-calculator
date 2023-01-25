import React from "react";
import "./Input.css"

class Input extends React.Component {
    renderCheckMark = (valid) => {
        return valid ? <i className="fa-solid fa-check"></i> : <i></i>
    }

    render() {
        return (
            <div>
                <label htmlFor={this.props.data.data.id}>{this.props.data.labelName}<span>*</span></label>
                <div className="input-container">
                    <input {...this.props.data.data} type="text" autoComplete="off" />
                    {this.renderCheckMark(this.props.data.validInput)}
                </div>
                
                <div id="error">{this.props.data.error}</div>
            </div>
        )
    }
}

export default Input