import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const defaultProps = {
    curlyCorners: false
};

const setup = () => {
    return shallow(<Input {...defaultProps} />);
};

describe('Input', () => {
    let wrapper;
    let componentInput;
    beforeEach(() => {
        wrapper = setup();
        componentInput = findByTestAttr(wrapper, 'component-input');
    });

    test('renders without error', () => {
        expect(componentInput).toHaveLength(1);
    });
});

test('does not throw warning with expected props', () => {
    checkProps(Input, defaultProps);
});
