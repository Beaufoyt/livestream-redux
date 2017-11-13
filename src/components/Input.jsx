import React from 'react';
import PropTypes from 'prop-types';

import classnames from '../helpers/classnames';
import { validateInput } from '../helpers/validation';

import PureComponent from './PureComponent';

class Input extends PureComponent {

    state = {
        value: '',
        isValid: true,
    }

    componentWillMount() {
        if (this.props.required) {
            this.validateValue(this.getValue());
        }

        if (this.isNumberField() && !this.getValue()) {
            this.setNewNumberValue(0);
        }
    }

    getErrorMessage = () => {
        return this.props.showError && !this.state.isValid && this.props.hasSumbit ? this.props.errorMessage : '';
    }

    setNewNumberValue = (amount) => {
        const currentValue = parseInt(this.getValue(), 10);
        const newValue = !currentValue ? 0 + amount : currentValue + amount;

        this.setState({ value: newValue }, this.validateValue(newValue));
    }

    getValue = () => {
        return this.isControlled() ? this.props.value : this.state.value;
    }

    stepInterval = null;

    handleChange = (e) => {
        const { value } = e.target;

        this.setState({ value }, this.validateValue(value));
    }

    isControlled = () => {
        return this.props.value !== null;
    }

    isNumberField = () => {
        return this.props.type === 'number';
    }

    validateValue = (value) => {
        let validationType = this.props.validationType;

        if (!validationType && this.props.required) {
            validationType = 'required';
        }

        const isValid = validateInput(validationType, value);

        this.setState({ isValid }, this.props.onChange(this.props.id, value, isValid));
    }

    stepValue = (e) => {
        const targetValue = parseInt(e.target.name, 10);

        this.stepInterval = setInterval(() => {
            this.setNewNumberValue(targetValue);
        }, 100);
    }

    unstepValue = () => {
        clearInterval(this.stepInterval);
    }

    render() {
        return (
            <div
                data-error={this.getErrorMessage()}
                className={classnames('form-input', {
                    required: this.props.required,
                    error: !!this.getErrorMessage(),
                    valid: this.props.showSuccess && this.state.isValid && this.props.hasSumbit,
                })}>
                { this.props.icon &&
                    <i className={`fa fa-${this.props.icon} form-icon`} /> }
                <input
                    className={classnames({ 'has-icon': !!this.props.icon })}
                    placeholder={this.props.placeholder}
                    value={this.getValue()}
                    id="form-input"
                    onChange={this.handleChange}
                    type={this.props.type} />
                <label htmlFor="form-input">{this.props.label}</label>
                { this.isNumberField() &&
                    <span className="btn-spinner-container">
                        <button
                            name={-1}
                            onMouseDown={this.stepValue}
                            onMouseUp={this.unstepValue}
                            className="btn btn-spinner">
                            <i className="fa fa-chevron-down" />
                        </button>
                        <button
                            name={1}
                            onMouseDown={this.stepValue}
                            onMouseUp={this.unstepValue}
                            className="btn btn-spinner">
                            <i className="fa fa-chevron-up" />
                        </button>
                    </span>
                }
            </div>
        );
    }
}

Input.propTypes = {
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    icon: PropTypes.string,
    hasSumbit: PropTypes.bool,
    required: PropTypes.bool,
    showError: PropTypes.bool,
    showSuccess: PropTypes.bool,
    validationType: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
    placeholder: null,
    errorMessage: 'Please input a value',
    hasSumbit: false,
    required: false,
    validationType: null,
    showError: true,
    showSuccess: false,
    type: 'text',
    value: null,
    icon: null,
};

export default Input;
