import React from 'react';
import PropTypes from 'prop-types';
import styles from '../sass/Input.module.sass';

const Input = ({ curlyCorners, inputRef, ...props }) => {
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
                    className={`${cornersStyle} ${styles.input}`}
                />
            </label>
        </form>
    );
};

Input.propTypes = {
    curlyCorners: PropTypes.bool.isRequired,
    inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        .isRequired
};

export default Input;
