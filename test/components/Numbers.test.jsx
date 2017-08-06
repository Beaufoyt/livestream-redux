/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import { addToCount } from '../../src/actions/numbers';

import { Numbers } from '../../src/components/Numbers';

const dispatch = jest.fn();
const defaultFact = 'This fact is ridiculously interesting.';
const defaultError = false;
const defaultIsRequesting = false;
const defaultCount = 69;

const render = (error = defaultError, isRequesting = defaultIsRequesting) => {
    return shallow(
        <Numbers
            count={defaultCount}
            dispatch={dispatch}
            factIsRequesting={isRequesting}
            fact={defaultFact}
            factError={error} />,
  );
};

let numbers;
describe('Given a Numbers Component', () => {
    beforeEach(() => {
        numbers = render();
    });

    it('should dipatch a number fact fetch on mount', () => {
        expect(dispatch.mock.calls.length).toEqual(1);
    });

    it('should render the fact prop within the first code block', () => {
        const numberFactBlock = numbers.find('CodeBlock').first();

        expect(numberFactBlock.props().content).toEqual(defaultFact);
    });

    it('should render the stringified count prop within the second code block', () => {
        const numberFactBlock = numbers.find('CodeBlock').get(1);

        expect(numberFactBlock.props.content).toEqual(defaultCount.toString());
    });

    it('should only render an Error component when there is a fetch error', () => {
        expect(numbers.find('Error').length).toEqual(0);

        numbers = render(true);

        expect(numbers.find('Error').length).toEqual(1);
    });

    it('should render a refresh icon within the refresh button', () => {
        expect(numbers.find('i').props().className).toContain('refresh');
    });

    describe('when the user is requesting a new fact', () => {
        beforeEach(() => {
            numbers = render(false, true);
        });

        it('should render a spinner icon within the refresh button and disable it', () => {
            expect(numbers.find('i').props().className).toContain('spinner');
            expect(numbers.find('.btn-refresh').props().disabled).toEqual(true);
        });
    });

    describe('when the decrement button is clicked', () => {
        let decrementButtonValue;

        beforeEach(() => {
            dispatch.mockReset();
            const decrementButton = numbers.find('CounterButton').first();
            decrementButtonValue = parseInt(decrementButton.props().value, 10);

            decrementButton.simulate('click', { target: { value: decrementButtonValue } });
        });

        it('should call dispatch with the correct action and the value of the button', () => {
            expect(dispatch.mock.calls.length).toEqual(1);
            expect(dispatch.mock.calls[0][0]).toEqual(addToCount(decrementButtonValue));
        });
    });

    describe('when the increment button is clicked', () => {
        let incrementButtonValue;

        beforeEach(() => {
            dispatch.mockReset();
            const incrementButton = numbers.find('CounterButton').get(1);
            incrementButtonValue = parseInt(incrementButton.props.value, 10);

            incrementButton.props.onClick({ target: { value: incrementButtonValue } });
        });

        it('should call dispatch with the correct action and the value of the button', () => {
            expect(dispatch.mock.calls.length).toEqual(1);
            expect(dispatch.mock.calls[0][0]).toEqual(addToCount(incrementButtonValue));
        });
    });

    describe('when the fact refresh button is clicked', () => {
        beforeEach(() => {
            dispatch.mockReset();
            const refreshButton = numbers.find('.btn-refresh');
            refreshButton.simulate('click');
        });

        it('should fetch a new fact', () => {
            expect(dispatch.mock.calls.length).toEqual(1);
        });
    });
});
