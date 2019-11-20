import React from 'react';
import PropTypes from 'prop-types';
import styles from '../sass/Input.module.sass';

const Input = ({ value, onChange }) => {
    return (
        <input
            type="text"
            data-test="component-input"
            placeholder="Search terms"
            className={styles.input}
            value={value}
            onChange={onChange}
        />
    );
};

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Input;
