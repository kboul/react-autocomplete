import React from 'react';
import { shallow } from 'enzyme';
import Input from './index';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const defaultProps = {
    curlyCorners: false,
    inputRef: React.createRef()
};

const setup = ({ ...props }) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Input {...setupProps} />);
};

describe('curlyCorners is false', () => {
    let wrapper;
    let componentInput;
    beforeEach(() => {
        wrapper = setup();
        componentInput = findByTestAttr(wrapper, 'component-input');
    });

    test('renders without error', () => {
        expect(componentInput).toHaveLength(1);
    });

    test('renders correct className when curlyCorners is falsy', () => {
        expect(componentInput.prop('className')).toBe('curlyCorners input');
    });
});

describe('curlyCorners is true', () => {
    let wrapper;
    let componentInput;
    beforeEach(() => {
        wrapper = setup({ curlyCorners: true });
        componentInput = findByTestAttr(wrapper, 'component-input');
    });

    test('renders without error', () => {
        expect(componentInput).toHaveLength(1);
    });

    test('renders correct className when curlyCorners is truthy', () => {
        expect(componentInput.prop('className')).toBe('noCurlyCorners input');
    });
});

test('does not throw warning with expected props', () => {
    checkProps(Input, defaultProps);
});
