import React, { Component } from 'react';
import Button from './Button';
import Alert from './Alert';
import Input from './Input';
import Suggestions from './Suggestions';
import { getCharactersService } from '../services/getCharactersService';
import styles from '../sass/Autocomplete.module.sass';

class Autocomplete extends Component {
    state = {
        suggestions: [],
        value: '',
        error: false,
        noSuggestions: false
    };

    changeInputValue = ({ target: { value } }) => {
        // empty the suggestions array while typing
        this.setState({ suggestions: [], value });
    };

    selectSuggestion = value => {
        this.setState({ value });
    };

    searchSuggestions = async () => {
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
    };

    render() {
        const { suggestions, value, error, noSuggestions } = this.state;
        return (
            <div data-test='component-autocomplete'>
                <label className={styles.label}>Search</label>
                <div className={styles.autocomleteContainer}>
                    <Input
                        value={value}
                        changeInputValue={e => this.changeInputValue(e)}
                    />
                    <Suggestions
                        suggestions={suggestions}
                        selectSuggestion={this.selectSuggestion}
                    />
                </div>
                <div className={styles.button}>
                    <Button onClick={this.searchSuggestions} />
                </div>
                <div data-test='component-alert'>
                    {error && <Alert type='' />}
                    {noSuggestions && <Alert type='noSuggestions' />}
                </div>
            </div>
        );
    }
}

export default Autocomplete;
