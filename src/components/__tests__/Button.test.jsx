import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const mockOnClick = jest.fn();

const defaultProps = {
    onClick: mockOnClick
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Button {...setupProps} />);
};

test('renders without error', () => {
    const wrapper = setup();
    const componentButton = findByTestAttr(wrapper, 'component-button');
    expect(componentButton).toHaveLength(1);
});

test('onClick is called on onClick event', () => {
    const wrapper = setup();
    const suggestionList = findByTestAttr(wrapper, 'component-button');
    suggestionList.simulate('click');
    expect(mockOnClick).toHaveBeenCalled();
});

test('does not throw warning with expected props', () => {
    checkProps(Button, defaultProps);
});
