import React from 'react';
import styles from './AuthContent.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AuthContent = ({title, children}) => (
  <div>
    <div className={cx('title')}>
      {title}
    </div>
    {children}
  </div>
);

export default AuthContent;