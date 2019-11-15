import React from 'react';
import PropTypes from 'prop-types';
import styles from '../sass/Input.module.sass';

const Input = ({ value, changeInputValue }) => {
    return (
        <input
            type='text'
            placeholder='Search terms'
            className={styles.input}
            value={value}
            onChange={changeInputValue}
        />
    );
};

Input.propTypes = {
    value: PropTypes.string.isRequired,
    changeInputValue: PropTypes.func.isRequired
};

export default Input;
