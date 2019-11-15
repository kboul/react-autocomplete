import React from 'react';
import { shallow } from 'enzyme';
import Suggestions from '../Suggestions';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const mockSelectSuggestion = jest.fn();

const defaultProps = {
    suggestions: [],
    selectSuggestion: mockSelectSuggestion
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Suggestions {...setupProps} />);
};

describe('if there are no suggestions', () => {
    const wrapper = setup();

    test('renders without error', () => {
        const componentSuggestions = findByTestAttr(
            wrapper,
            'component-suggestions'
        );
        expect(componentSuggestions).toHaveLength(1);
    });

    test('does not render suggestion markup', () => {
        const componentSuggestions = findByTestAttr(
            wrapper,
            'component-suggestions'
        );
        expect(componentSuggestions.text()).toHaveLength(0);
    });
});

describe('if there are suggestions', () => {
    const suggestions = [
        { id: 1009275, name: 'Doc Samson' },
        { id: 1009281, name: 'Doctor Doom' },
        { id: 1011103, name: 'Doctor Doom (Ultimate)' }
    ];
    const wrapper = setup({ suggestions });

    test('renders without error', () => {
        const componentSuggestions = findByTestAttr(
            wrapper,
            'component-suggestions'
        );
        expect(componentSuggestions).toHaveLength(1);
    });

    test('renders suggestion markup', () => {
        const componentSuggestions = findByTestAttr(
            wrapper,
            'component-suggestions'
        );
        expect(componentSuggestions.text()).not.toHaveLength(0);
    });

    test('renders the correct number of list items', () => {
        const suggestionList = findByTestAttr(wrapper, 'suggestion-list');
        expect(suggestionList).toHaveLength(suggestions.length);
    });

    test('renders the correct number of list items', () => {
        const suggestionList = findByTestAttr(wrapper, 'suggestion-list');
        suggestionList.at(0).simulate('click');
        expect(mockSelectSuggestion).toHaveBeenCalled();
    });
});

test('does not throw warning with expected props', () => {
    checkProps(Suggestions, defaultProps);
});
