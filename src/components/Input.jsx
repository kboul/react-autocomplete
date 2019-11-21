import React from 'react';
import PropTypes from 'prop-types';
import styles from '../sass/Input.module.sass';

const Input = ({ curlyCorners, ...props }) => {
    const corners = !curlyCorners ? styles.curlyCorners : styles.noCurlyCorners;
    return (
        <form>
            <label htmlFor="search">
                <span className={styles.label}>Search</span>
                <input
                    {...props}
                    type="text"
                    data-test="component-input"
                    className={`${corners} ${styles.input}`}
                />
            </label>
        </form>
    );
};

Input.propTypes = {
    curlyCorners: PropTypes.bool.isRequired
};

export default Input;
