import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

export default function Button({
  primary,
  linkTo,
  secondary,
  success,
  danger,
  warning,
  info,
  light,
  dark,
  link,
  disabled,
  filter,
  orange,
  text = 'click me 2',
  type = 'button',
  onClickButton,
}) {
  const classes = clsx(styles.btn, {
    [styles.btn_primary]: primary,
    [styles.btn_secondary]: secondary,
    [styles.btn_success]: success,
    [styles.btn_danger]: danger,
    [styles.btn_warning]: warning,
    [styles.btn_info]: info,
    [styles.btn_light]: light,
    [styles.btn_dark]: dark,
    [styles.btn_link]: link,
    [styles.btn_disabled]: disabled,
    [styles.btn_filter]: filter,
    [styles.btn_orange]: orange,
  });
  return (
    <>
      {linkTo ? (
        <Link
          style={{
            margin: 0,
            padding: 0,
          }}
          to={linkTo}
        >
          <button type={type} className={classes}>
            {text}
          </button>
        </Link>
      ) : (
        <button type={type} className={classes} onClick={onClickButton}>
          {text}
        </button>
      )}
    </>
  );
}
