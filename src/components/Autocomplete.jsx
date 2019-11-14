import React, { Component } from 'react';
import styles from '../sass/Autocomplete.module.sass';

class Autocomplete extends Component {
    state = {
        items: ['John', 'Jordy', 'Sara', 'Kostas'],
        suggestions: [],
        value: ''
    };

    handleChange = e => {
        const {
            target: { value }
        } = e;
        const { items } = this.state;

        let suggestions = [];
        if (value.length > 1) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(item => regex.test(item));
        }
        this.setState({ suggestions, value });
    };

    handleClick = suggestion => {
        this.setState({ value: suggestion });
    };

    render() {
        const { suggestions, value } = this.state;
        return (
            <div className={styles.container}>
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
                            suggestions.map(suggestion => (
                                <li
                                    key={suggestion}
                                    onClick={() =>
                                        this.handleClick(suggestion)
                                    }>
                                    {suggestion}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Autocomplete;
