import React, { Component } from 'react';
import Button from './Button';
import { getCharactersService } from '../services/getCharactersService';
import styles from '../sass/Autocomplete.module.sass';

class Autocomplete extends Component {
    state = {
        items: [],
        suggestions: [],
        value: ''
    };

    handleChange = e => {
        const {
            target: { value }
        } = e;
        // empty the array while typing
        this.setState({ suggestions: [], value });
    };

    selectSuggestion = suggestion => {
        this.setState({ value: suggestion });
    };

    searchSuggestions = async () => {
        const { value } = this.state;
        let suggestions = [];

        if (value.length > 1) {
            const { data } = await getCharactersService(value);
            const items = [...data.data.results];
            console.log(data);
            this.setState({ items });

            let regex;
            try {
                regex = new RegExp(`^${value}`, 'i');
            } catch (error) {
                console.log('there is an error with the expression');
                if (error) return;
            }

            suggestions = items.filter(item => regex.test(item.name));
        }
        this.setState({ suggestions });
    };

    render() {
        const { suggestions, value } = this.state;
        return (
            <>
                <label className={styles.label}>Search</label>
                <div className={styles.autocomleteContainer}>
                    <input
                        type='text'
                        placeholder='Search terms'
                        className={styles.input}
                        value={value}
                        onChange={this.handleChange}
                    />
                    <ul>
                        {suggestions.length > 0 &&
                            suggestions.map(({ name, id }) => (
                                <li
                                    key={id}
                                    onClick={() => this.selectSuggestion(name)}>
                                    {name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className={styles.button}>
                    <Button onClick={this.searchSuggestions} />
                </div>
            </>
        );
    }
}

export default Autocomplete;
