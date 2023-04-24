import styles from '../Post.module.scss';
import React from 'react';

function AddIcon({ style }) {
  return (
    <span className={styles.iconAdd} style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 21">
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill="#FF8800" transform="translate(-161 -428)">
            <g transform="translate(132 398)">
              <g transform="translate(16.648 17.048)">
                <g transform="rotate(-180 16.142 16.838)">
                  <rect width="2.643" height="19.82" x="8.588" y="0" rx="1.321"></rect>
                  <path
                    d="M9.91 0c.73 0 1.321.592 1.321 1.321v17.177a1.321 1.321 0 01-2.643 0V1.321C8.588.591 9.18 0 9.91 0z"
                    transform="rotate(90 9.91 9.91)"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}

export default AddIcon;
