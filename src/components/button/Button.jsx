import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

function Button(props) {
  const containerClasses = `${styles.container} ${props.className} ${props.type === 'primary' ? styles.primaryBtn : styles.secondaryBtn}`;
  return (
    <div className={containerClasses} onClick={props.onClick}>
      <h3 className={styles.text}>{props.children}</h3>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'primary',
  className: '',
};

export default Button;
