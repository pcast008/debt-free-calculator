const valueRegex = /^\d{1,}\.?\d*$/g;

function loanAmountValidation(value) {
    
    if (value === "") {
        return { errorText: "Loan amount is required", valid: false };

    } else if (Number(value) === 0) {
        return { errorText: "Loan amount cannot be 0", valid: false };
        
    } else if (!value.match(valueRegex)) {
        return { errorText: "Invalid loan amount", valid: false };

    } else {
        return { errorText: "", valid: true };

    }
}

function interestValidation(value) {
    if (value === "") {
        return { errorText: "Interest is required", valid: false };

    } else if (Number(value) === 0) {
        return { errorText: "Interest cannot be 0", valid: false };

    } else if (!value.match(valueRegex)) {
        return { errorText: "Invalid interest", valid: false };

    } else {
        return { errorText: "", valid: true };

    }
}

function paymentValidation(value, balance, minRequiredPayment) {
    if (value === "") {
        return { errorText: "Payment is required", valid: false };

    } else if (!value.match(valueRegex)) {
        return { errorText: "Invalid payment", valid: false };

    } else if (Number(balance) > 100) {
        if (Number(value) > Number(balance)) {
            return { errorText: `Payment cannot be greater than ${balance}`, valid: false };
            
        } else if (Number(value) < Number(minRequiredPayment)) {
            return { errorText: `Payment must be greater than or equal to ${minRequiredPayment}`, valid: false };
            
        } else {
            return { errorText: "", valid: true };

        }

    } else if (Number(balance) <= 100) {
        if (Number(value) !== Number(minRequiredPayment)) {
            return { errorText: `Payment must be equal to ${minRequiredPayment}`, valid: false };
            
        } else {
            return { errorText: "", valid: true };

        }
    } else {
        return { errorText: "", valid: true };

    }
}

export { interestValidation, paymentValidation, loanAmountValidation };