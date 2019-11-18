import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const mockOnClick = jest.fn();

const defaultProps = {
    onClick: mockOnClick
};

const setup = () => {
    return shallow(<Button {...defaultProps} />);
};

describe('Button', () => {
    let wrapper;
    let componentButton;
    beforeEach(() => {
        wrapper = setup();
        componentButton = findByTestAttr(wrapper, 'component-button');
    });

    test('renders without error', () => {
        expect(componentButton).toHaveLength(1);
    });

    test('onClick is called on onClick event', () => {
        componentButton.simulate('click');
        expect(mockOnClick).toHaveBeenCalled();
    });
});

test('does not throw warning with expected props', () => {
    checkProps(Button, defaultProps);
});
