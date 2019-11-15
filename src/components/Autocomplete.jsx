import React, { Component } from 'react';
import Button from './Button';
import Alert from './Alert';
import Input from './Input';
import Suggestions from './Suggestions';
import { getCharactersService } from '../services/getCharactersService';
import styles from '../sass/Autocomplete.module.sass';

class Autocomplete extends Component {
    state = {
        items: [],
        suggestions: [],
        value: '',
        error: false,
        noSuggestions: false
    };

    changeInputValue = e => {
        const {
            target: { value }
        } = e;
        // empty the suggestions array while typing
        this.setState({ suggestions: [], value });
    };

    selectSuggestion = suggestion => {
        this.setState({ value: suggestion });
    };

    searchSuggestions = async () => {
        // hide error message
        this.setState({ error: false });
        const { value } = this.state;
        let suggestions = [];

        if (value.length > 1) {
            try {
                const { data } = await getCharactersService(value);
                const items = [...data.data.results];
                console.log(data);
                this.setState({
                    items,
                    noSuggestions: items.length === 0 ? true : false
                });
                let regex;
                try {
                    regex = new RegExp(`^${value}`, 'i');
                } catch (error) {
                    console.log('there is an error with the expression');
                    if (error) return;
                }
                suggestions = items.filter(item => regex.test(item.name));
            } catch (error) {
                console.log(error);
                if (error.status !== 200) {
                    this.setState({ error: true });
                }
            }
        }
        this.setState({ suggestions });
    };

    render() {
        const { suggestions, value, error, noSuggestions } = this.state;
        return (
            <div data-test='component-autocomplete'>
                <label className={styles.label}>Search</label>
                <div className={styles.autocomleteContainer}>
                    <Input
                        value={value}
                        changeInputValue={this.changeInputValue}
                    />
                    <Suggestions
                        suggestions={suggestions}
                        selectSuggestion={this.selectSuggestion}
                    />
                </div>
                <div className={styles.button}>
                    <Button onClick={this.searchSuggestions} />
                </div>
                {error && <Alert />}
                {noSuggestions && <Alert type='noSuggestions' />}
            </div>
        );
    }
}

export default Autocomplete;
