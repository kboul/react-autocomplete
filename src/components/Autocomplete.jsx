import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import Alert from './Alert';
import Input from './Input';
import Suggestions from './Suggestions';
import { getCharactersService } from '../services/getCharactersService';

class Autocomplete extends Component {
    state = {
        suggestions: [],
        value: '',
        error: false,
        noSuggestions: false
    };

    searchSuggestions = debounce(async () => {
        // hide error message
        this.setState({ error: false });

        const { value } = this.state;
        if (value.length > 1) {
            try {
                const { data } = await getCharactersService(value);
                const suggestions = [...data.data.results];
                this.setState({
                    suggestions,
                    noSuggestions: suggestions.length === 0 ? true : false
                });
            } catch (error) {
                if (error.status !== 200) {
                    this.setState({ error: true });
                }
            }
        }
    }, 1000);

    changeInputValue = ({ target: { value } }) => {
        // empty the suggestions array while typing
        this.setState({ suggestions: [], value });
    };

    selectSuggestion = value => {
        this.setState({ value });
    };

    render() {
        const { suggestions, value, error, noSuggestions } = this.state;
        return (
            <div data-test="component-autocomplete">
                <Input
                    value={value}
                    placeholder="Search terms"
                    curlyCorners={value.length > 2 && suggestions.length > 0}
                    onChange={e => {
                        this.changeInputValue(e);
                        this.searchSuggestions();
                    }}
                />
                <Suggestions
                    suggestions={suggestions}
                    selectSuggestion={this.selectSuggestion}
                />
                <div data-test="component-alert">
                    {error && <Alert type="" />}
                    {noSuggestions && <Alert type="noSuggestions" />}
                </div>
            </div>
        );
    }
}

export default Autocomplete;
