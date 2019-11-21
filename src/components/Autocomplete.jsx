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
        cursor: -1,
        noSuggestions: false,
        showSuggestions: false,
        error: false
    };

    inputRef = React.createRef();

    searchSuggestions = debounce(async () => {
        this.setState({ error: false });
        const { value } = this.state;
        if (value.length > 1) {
            try {
                const { data } = await getCharactersService(value);
                const suggestions = [...data.data.results];
                this.setState({
                    suggestions,
                    noSuggestions: suggestions.length === 0 ? true : false,
                    cursor: -1
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
        this.setState({ value, showSuggestions: false, cursor: -1 });
    };

    handleFocus = () => {
        this.setState({ showSuggestions: true });
    };

    handleKeyDown = e => {
        const { suggestions, showSuggestions, cursor } = this.state;
        if (e.keyCode === 27) {
            if (showSuggestions) {
                this.setState({ showSuggestions: false });
                this.inputRef.current.blur();
            }
        } else if (e.keyCode === 38 && cursor > 0) {
            this.setState(prevState => ({
                cursor: prevState.cursor - 1
            }));
        } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
            this.setState(prevState => ({
                cursor: prevState.cursor + 1
            }));
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (suggestions[cursor]) {
                this.selectSuggestion(suggestions[cursor].name);
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
            noSuggestions,
            cursor
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
                        cursor={cursor}
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
