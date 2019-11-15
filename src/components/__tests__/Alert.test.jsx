import React from 'react';
import { shallow } from 'enzyme';
import Alert from '../Alert';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const defaultProps = {
    hasError: false
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Alert {...setupProps} />);
};

describe('hasError prop is true', () => {
    test('renders without error', () => {
        const wrapper = setup({ hasError: true });
        const componentAlert = findByTestAttr(wrapper, 'component-alert');
        expect(componentAlert).toHaveLength(1);
    });

    test('renders non-empty alert message when hasError prop is true', () => {
        const wrapper = setup({ hasError: true });
        const alertMessage = findByTestAttr(wrapper, 'alert-message');
        expect(alertMessage.text().length).not.toBe(0);
    });
});

describe('hasError prop is false', () => {
    test('renders without error', () => {
        const wrapper = setup({ hasError: false });
        const componentAlert = findByTestAttr(wrapper, 'component-alert');
        expect(componentAlert).toHaveLength(1);
    });

    test('renders no text when hasErrpr prop is false', () => {
        const wrapper = setup();
        const componentAlert = findByTestAttr(wrapper, 'component-alert');
        expect(componentAlert.text()).toBe('');
    });
});

test('does not throw warning with expected props', () => {
    const expectedProps = { hasError: false };
    const propError = checkProps(Alert, expectedProps);
    expect(propError).toBeUndefined();
});
