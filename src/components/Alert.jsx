import React from 'react';
import PropTypes from 'prop-types';
import styles from '../sass/Alert.module.sass';

const ErrorMessage = ({ hasError }) => {
    return (
        hasError && (
            <div className={styles.error}>
                There was a problem while fetching the characters.
            </div>
        )
    );
};

ErrorMessage.propTypes = {
    hasError: PropTypes.bool.isRequired
};

export default ErrorMessage;
