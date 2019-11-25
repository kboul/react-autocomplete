import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.sass';

const Input = ({ curlyCorners, inputRef, loading, ...props }) => {
    const cornersStyle = !curlyCorners
        ? styles.curlyCorners
        : styles.noCurlyCorners;
    return (
        <form>
            <label htmlFor="search">
                <span className={styles.label}>Search</span>
                <input
                    {...props}
                    ref={inputRef}
                    type="text"
                    data-test="component-input"
                    className={`${cornersStyle} ${styles.input} ${
                        loading ? styles.loading : null
                    }`}
                />
            </label>
        </form>
    );
};

Input.propTypes = {
    curlyCorners: PropTypes.bool.isRequired,
    inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        .isRequired,
    loading: PropTypes.bool.isRequired
};

export default Input;
