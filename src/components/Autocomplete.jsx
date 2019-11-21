import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import Alert from './Alert';
import Input from './Input';
import Suggestions from './Suggestions';
import { getCharactersService } from '../services/getCharactersService';

class Autocomplete extends Component {
    // eslint-disable-next-line react/sort-comp
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            value: '',
            error: false,
            noSuggestions: false,
            showSuggestions: false
        };
        this.inputRef = React.createRef();
    }

    searchSuggestions = debounce(async () => {
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
        if (value.length === 0) {
            this.setState({ noSuggestions: false });
        }
    };

    selectSuggestion = value => {
        this.setState({ value, showSuggestions: false });
    };

    handleFocus = () => {
        this.setState({ showSuggestions: true });
    };

    handleKeyDown = e => {
        if (e.keyCode === 27) {
            const { showSuggestions } = this.state;
            if (showSuggestions) {
                this.setState({ showSuggestions: false });
                this.inputRef.current.blur();
            }
        }
    };

    render() {
        const {
            showSuggestions,
            suggestions,
            value,
            error,
            noSuggestions
        } = this.state;
        return (
            <div data-test="component-autocomplete">
                <Input
                    inputRef={this.inputRef}
                    value={value}
                    placeholder="Search terms"
                    curlyCorners={
                        value.length > 1 &&
                        suggestions.length > 0 &&
                        showSuggestions
                    }
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={e => {
                        this.changeInputValue(e);
                        this.searchSuggestions();
                    }}
                    onKeyDown={this.handleKeyDown}
                />
                {showSuggestions && (
                    <Suggestions
                        suggestions={suggestions}
                        selectSuggestion={this.selectSuggestion}
                    />
                )}
                <div data-test="component-alert">
                    {error && <Alert type="" />}
                    {noSuggestions && <Alert type="noSuggestions" />}
                </div>
            </div>
        );
    }
}

export default Autocomplete;
