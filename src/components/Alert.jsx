import React from 'react';
import PropTypes from 'prop-types';
import styles from '../sass/Alert.module.sass';

const Alert = ({ hasError }) => {
    return hasError ? (
        <div data-test='component-alert' className={styles.error}>
            <span data-test='alert-message'>
                There was a problem while fetching the characters.
            </span>
        </div>
    ) : (
        <div data-test='component-alert' />
    );
};

Alert.propTypes = {
    hasError: PropTypes.bool.isRequired
};

export default Alert;
