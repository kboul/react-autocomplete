import React from 'react';
import { shallow } from 'enzyme';
import Alert from './index';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const defaultProps = {
    type: ''
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Alert {...setupProps} />);
};

describe('alert type prop is empty', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test('renders without error', () => {
        const componentAlert = findByTestAttr(wrapper, 'component-alert');
        expect(componentAlert).toHaveLength(1);
    });

    test('renders correct alert className', () => {
        const componentAlert = findByTestAttr(wrapper, 'component-alert');
        expect(componentAlert.prop('className')).toBe('danger');
    });

    test('renders correct alert message', () => {
        const alertMessage = findByTestAttr(wrapper, 'alert-message');
        expect(alertMessage.text()).toContain(
            'There was a problem while fetching the characters.'
        );
    });
});

describe('alert type prop is equal to noSuggestions', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({ type: 'noSuggestions' });
    });

    test('renders without error', () => {
        const componentAlert = findByTestAttr(wrapper, 'component-alert');
        expect(componentAlert).toHaveLength(1);
    });

    test('renders correct alert className', () => {
        const componentAlert = findByTestAttr(wrapper, 'component-alert');
        expect(componentAlert.prop('className')).toBe('warning');
    });

    test('renders correct alert message', () => {
        const alertMessage = findByTestAttr(wrapper, 'alert-message');
        expect(alertMessage.text()).toContain('No suggestions were found');
    });
});

test('does not throw warning with expected props', () => {
    const expectedProps = defaultProps;
    const propError = checkProps(Alert, expectedProps);
    expect(propError).toBeUndefined();
});
