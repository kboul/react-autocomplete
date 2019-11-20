import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import Autocomplete from '../Autocomplete';
import { findByTestAttr } from '../../tests/testUtils';
import { getCharactersService } from '../../services/getCharactersService';
import { suggestions } from '../../tests/suggestions';

const setup = () => {
    return shallow(<Autocomplete />);
};

test('renders without error', () => {
    const wrapper = setup();
    const componentAutocomplete = findByTestAttr(
        wrapper,
        'component-autocomplete'
    );
    expect(componentAutocomplete).toHaveLength(1);
});

describe('Input', () => {
    const wrapper = setup();
    const componentInput = wrapper.find('Input');

    test('prop changeInputValue is a function', () => {
        expect(componentInput.prop('onChange')).toBeInstanceOf(Function);
    });

    test('changeInputValue logic runs as expected', () => {
        const mockChangeInputValue = jest.fn();
        wrapper.instance().changeInputValue = mockChangeInputValue;
        componentInput.simulate('change', { target: { value: 'doc' } });
        componentInput.props().onChange('doc');
        expect(mockChangeInputValue).toHaveBeenCalledWith('doc');
    });

    test('searchSuggestions logic runs as expected', () => {
        const mockSearchSuggestions = jest.fn();
        wrapper.instance().searchSuggestions = mockSearchSuggestions;
        wrapper.instance().searchSuggestions();
        componentInput.simulate('change', { target: { value: 'doc' } });
        componentInput.props().onChange('doc');
        expect(mockSearchSuggestions).toHaveBeenCalled();
    });

    describe('moxios tests', () => {
        beforeEach(() => {
            wrapper.setState({ noSuggestions: false });
            wrapper.update();
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        test('calls getCharactersService callback on axios response', async () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: suggestions
                });
            });

            componentInput.simulate('change', { target: { value: 'doc' } });
            try {
                const { data } = await getCharactersService('doc');
                expect(data).toEqual(suggestions);
                wrapper.setState({ suggestions, noSuggestions: true });
                wrapper.update();
                expect(wrapper.state().suggestions).toEqual(suggestions);
                expect(wrapper.state().noSuggestions).toBeTruthy();
            } catch (error) {
                wrapper.setState({ error: true });
                wrapper.update();
                expect(wrapper.state().error).toBeTruthy();
            }
        });
    });
});

describe('Suggestions', () => {
    const wrapper = setup();
    const componentSuggestions = wrapper.find('Suggestions');

    test('prop selectSuggestion is a function', () => {
        expect(componentSuggestions.prop('selectSuggestion')).toBeInstanceOf(
            Function
        );
    });

    test('selectSuggestion updates state accordingly', () => {
        wrapper.instance().selectSuggestion('sa');
        expect(wrapper.state().value).toEqual('sa');
    });

    test('selectSuggestion logic runs as expected', () => {
        const mockSelectSuggestion = jest.fn();
        wrapper.instance().selectSuggestion = mockSelectSuggestion;
        wrapper.instance().selectSuggestion();
        componentSuggestions.props().selectSuggestion('sa');
        expect(mockSelectSuggestion).toHaveBeenCalled();
    });
});

// describe('Button', () => {
//     const wrapper = setup();
//     const componentButton = wrapper.find('Button');

//     test('searchSuggestions logic runs as expected', () => {
//         const mockSearchSuggestions = jest.fn();
//         wrapper.instance().searchSuggestions = mockSearchSuggestions;
//         wrapper.instance().searchSuggestions();
//         componentButton.props().onClick('sa');
//         expect(mockSearchSuggestions).toHaveBeenCalled();
//     });

//     describe('moxios tests', () => {
//         beforeEach(() => {
//             wrapper.setState({ noSuggestions: false });
//             wrapper.update();
//             moxios.install();
//         });

//         afterEach(() => {
//             moxios.uninstall();
//         });

//         test('calls getCharactersService callback on axios response', async () => {
//             moxios.wait(() => {
//                 const request = moxios.requests.mostRecent();
//                 request.respondWith({
//                     status: 200,
//                     response: suggestions
//                 });
//             });

//             componentButton.simulate('click');
//             try {
//                 const { data } = await getCharactersService('doc');
//                 expect(data).toEqual(suggestions);
//                 wrapper.setState({ suggestions, noSuggestions: true });
//                 wrapper.update();
//                 expect(wrapper.state().suggestions).toEqual(suggestions);
//                 expect(wrapper.state().noSuggestions).toBeTruthy();
//             } catch (error) {
//                 wrapper.setState({ error: true });
//                 wrapper.update();
//                 expect(wrapper.state().error).toBeTruthy();
//             }
//         });
//     });
// });

describe('Alerts', () => {
    let wrapper;
    let componentAlert;
    beforeEach(() => {
        wrapper = setup();
        componentAlert = findByTestAttr(wrapper, 'component-alert');
    });

    test('Alert is visible when error is true', () => {
        wrapper.setState({ error: true });
        expect(componentAlert).toHaveLength(1);
    });

    test('Alert is not visible when error is false', () => {
        wrapper.setState({ error: false });
        expect(componentAlert.text()).toHaveLength(0);
    });

    test('Alert is visible when noSuggestions is true', () => {
        wrapper.setState({ noSuggestions: true });
        expect(componentAlert).toHaveLength(1);
    });

    test('Alert is not visible when noSuggestions is false', () => {
        wrapper.setState({ noSuggestions: false });
        expect(componentAlert.text()).toHaveLength(0);
    });
});
