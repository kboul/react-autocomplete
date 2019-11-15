import React from 'react';
import { shallow } from 'enzyme';
import Alert from '../Alert';
import { findByTestAttr } from '../../tests/testUtils';

let setup;
beforeEach(() => {
    setup = () => {
        return shallow(<Alert hasError />);
    };
});

describe('hasError is true', () => {
    test('renders Alert without error', () => {
        const wrapper = setup();
        const componentAlert = findByTestAttr(wrapper, 'component-alert');
        expect(componentAlert).toHaveLength(1);
    });
});

describe('hasError is false', () => {
    test('renders Alert without error', () => {
        const wrapper = setup();
        const componentAlert = findByTestAttr(wrapper, 'component-alert');
        expect(componentAlert).toHaveLength(1);
    });
});
