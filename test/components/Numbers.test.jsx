/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import { fetchFact } from '../../src/actions/numbers';

import { Numbers } from '../../src/components/Numbers';

const dispatch = jest.fn();
const defaultFact = 'This fact is ridiculously interesting.';

let numbers;
describe('Given a Numbers Component', () => {
    beforeEach(() => {
        numbers = shallow(
            <Numbers
                count={0}
                dispatch={dispatch}
                factIsRequesting={false}
                fact={defaultFact}
                factError={false} />,
      );
    });

    it('should dipatch a number fact fetch on mount', () => {
        expect(dispatch.mock.calls.length).toEqual(1);
    });

    it('should render the fact prop within the first code block', () => {
        const numberFactBlock = numbers.find('.number-fact-code');
        expect(numberFactBlock.text()).toEqual(defaultFact);
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
