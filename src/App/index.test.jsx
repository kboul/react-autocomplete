import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import { findByTestAttr } from '../tests/testUtils';

const setup = () => {
    return shallow(<App />);
};

test('renders without error', () => {
    const wrapper = setup();
    const componentApp = findByTestAttr(wrapper, 'component-app');
    expect(componentApp).toHaveLength(1);
});
