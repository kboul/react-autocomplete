import React from 'react';
import { shallow } from 'enzyme';
import Suggestions from './index';
import { findByTestAttr, checkProps } from '../../tests/testUtils';
import { suggestions } from '../../tests/suggestions';

const mockSelectSuggestion = jest.fn();

const defaultProps = {
    suggestions: [],
    selectSuggestion: mockSelectSuggestion,
    cursor: -1
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Suggestions {...setupProps} />);
};

describe('if suggestions array is empty', () => {
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

describe('if suggestions array is not empty', () => {
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
        const suggestionList = findByTestAttr(wrapper, 'suggestion-list').find(
            'span'
        );
        suggestionList.at(0).simulate('click');
        expect(mockSelectSuggestion).toHaveBeenCalled();
    });
});

describe('cursor is equal to -1', () => {
    let wrapper;
    let suggestionList;
    beforeEach(() => {
        wrapper = setup({ cursor: -1, suggestions });
        suggestionList = findByTestAttr(wrapper, 'suggestion-list');
    });

    test('has the correct style when cursor is not -1', () => {
        [0, 1, 2].forEach(item => {
            expect(suggestionList.at(item).prop('className')).toBe(null);
        });
    });
});

describe('cursor is > -1', () => {
    let wrapper;
    let suggestionList;
    beforeEach(() => {
        wrapper = setup({ cursor: 1, suggestions });
        suggestionList = findByTestAttr(wrapper, 'suggestion-list');
    });

    test('has the correct style when cursor is not -1', () => {
        expect(suggestionList.at(0).prop('className')).toBe(null);
        expect(suggestionList.at(1).prop('className')).toBe('selectedItem');
        expect(suggestionList.at(2).prop('className')).toBe(null);
    });
});

test('does not throw warning with expected props', () => {
    checkProps(Suggestions, defaultProps);
});
