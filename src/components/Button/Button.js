import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.scss';

export default function Button({
  primary,
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
    <button type={type} className={classes}>
      {text}
    </button>
  );
}

// Gọi button
{
  /* <Button primary text='Primary'/>
<Button secondary text='Secondary'/>
<Button success text='Success'/>
<Button danger text='Danger'/>
<Button warning text='Warning'/>
<Button info text='Info'/>
<Button light text='Light'/>
<Button dark text='Dark'/>
<Button link text='Link'/>
<Button disabled text='Disabled'/> */
}
