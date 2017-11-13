import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import classnames from '../helpers/classnames';
import { validateInput } from '../helpers/validation';

import PureComponent from './PureComponent';
import ClickableDiv from './utils/ClickableDiv';
import ClickableLi from './utils/ClickableLi';

class Input extends PureComponent {

    state = {
        value: '',
        isValid: true,
        optionsOpen: false,
        options: ['Hello', 'Another option', 'Another option', 'Another option', 'Another option', 'This one is a little bit longer', 'Im hoping i can type enough in this line to get a littlke cheeky overflow going on, if you know what im sayingasdasdasdasd you little man Apparently that wasnt long enough, but this definitely will be'], // eslint-disable-line max-len
    }

    componentWillMount() {
        if (this.props.required) {
            this.validateValue(this.getValue());
        }
    }

    setContent = (e) => {
        const { id } = e.target;

        this.setState({ value: id }, this.validateValue(id));
    }

    getErrorMessage = () => {
        return this.props.showError && !this.state.isValid && this.props.hasSumbit ? this.props.errorMessage : '';
    }

    getValue = () => {
        return this.isControlled() ? this.props.value : this.state.value;
    }

    canBlur = true;

    lockBlur = () => {
        this.canBlur = false;
    }

    unlockBlur = () => {
        this.canBlur = true;
    }

    isControlled = () => {
        return this.props.value !== null;
    }

    validateValue = (value) => {
        let validationType = this.props.validationType;

        if (!validationType && this.props.required) {
            validationType = 'required';
        }

        const isValid = validateInput(validationType, value);

        this.setState({ isValid }, this.props.onChange(this.props.id, value, isValid));
    }

    toggleOptions = (e) => {
        if (this.canBlur) {
            this.setState({ optionsOpen: !this.state.optionsOpen });

            if (this.state.optionsOpen) {
                e.target.blur();
            }
        }
    }

    focusAndShowOptions = (e) => {
        e.target.focus();
        this.toggleOptions(e);
    }

    selectOption = (e) => {
        this.setContent(e);
        this.canBlur = true;
        this.toggleOptions(e);
    }

    renderOption(value, key, disabled = false) {
        return (
            <ClickableLi
                onBlur={this.toggleOptions}
                tabIndex="0"
                onClick={this.selectOption}
                id={value}
                key={key}
                disabled={disabled}
                className="list-option">
                { _.upperFirst(value.replace('-', ' ')) }
            </ClickableLi>
        );
    }

    renderOptions() {
        if (this.state.options.length) {
            return this.state.options.map((option, index) => {
                return this.renderOption(option, `${option}-${index}`);
            });
        }

        return this.renderOption('no-options', 'no-option', true);
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
                <ClickableDiv onBlur={this.toggleOptions} onClick={this.focusAndShowOptions} value={this.getValue()}>
                    { this.getValue() }
                </ClickableDiv>
                <label htmlFor="form-input">{this.props.label}</label>
                <span className="btn-spinner-container">
                    <button onBlur={this.toggleOptions} onClick={this.toggleOptions} className="btn btn-spinner">
                        <i className={`fa fa-chevron-${this.state.optionsOpen ? 'up' : 'down'}`} />
                    </button>
                </span>
                { this.state.optionsOpen &&
                <ul id="options-list" onMouseOver={this.lockBlur} onMouseOut={this.unlockBlur} className="options-list">
                    { this.renderOptions() }
                </ul> }
            </div>
        );
    }
}

Input.propTypes = {
    errorMessage: PropTypes.string,
    hasSumbit: PropTypes.bool,
    required: PropTypes.bool,
    showError: PropTypes.bool,
    showSuccess: PropTypes.bool,
    validationType: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
    errorMessage: 'Please select a value',
    hasSumbit: false,
    required: false,
    validationType: null,
    showError: true,
    showSuccess: false,
    value: null,
};

export default Input;
