import React from 'react';
import PropTypes from 'prop-types';
import styles from '../sass/Button.module.sass';

const Button = ({ onClick }) => {
    return (
        <input
            type='button'
            data-test='component-button'
            className={styles.button}
            value='SEARCH'
            onClick={onClick}
        />
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Button;
