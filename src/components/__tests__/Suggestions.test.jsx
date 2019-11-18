import React from 'react';
import { shallow } from 'enzyme';
import Suggestions from '../Suggestions';
import { findByTestAttr, checkProps } from '../../tests/testUtils';
import { suggestions } from '../../tests/suggestions';

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
    let wrapper;
    let componentSuggestions;
    beforeEach(() => {
        wrapper = setup();
        componentSuggestions = findByTestAttr(wrapper, 'component-suggestions');
    });

    test('renders without error', () => {
        expect(componentSuggestions).toHaveLength(1);
    });

    test('does not render suggestion markup', () => {
        expect(componentSuggestions.text()).toHaveLength(0);
    });
});

describe('if there are suggestions', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({ suggestions });
    });

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

    test('selectSuggestion is called when clicking on a suggestion', () => {
        const suggestionList = findByTestAttr(wrapper, 'suggestion-list');
        suggestionList.at(0).simulate('click');
        expect(mockSelectSuggestion).toHaveBeenCalled();
    });
});

test('does not throw warning with expected props', () => {
    checkProps(Suggestions, defaultProps);
});
