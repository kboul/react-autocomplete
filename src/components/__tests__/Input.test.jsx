import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const mockChangeInputValue = jest.fn();

const defaultProps = {
    value: '',
    changeInputValue: mockChangeInputValue
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Input {...setupProps} />);
};

test('renders without error', () => {
    const wrapper = setup();
    const componentInput = findByTestAttr(wrapper, 'component-input');
    expect(componentInput).toHaveLength(1);
});

test('does not throw warning with expected props', () => {
    checkProps(Input, defaultProps);
});
