import React from 'react';
import styles from './AuthContent.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const AuthContent = ({title, children, onButtonClick, buttonText}) => {
  return (
    <div>
      <div className={cx('title')}>
        {title}
      </div>
      {children}
      <div className={cx('buttons')}>
      <Button onClick={onButtonClick} theme="login">{buttonText}</Button>
      </div>
    </div>
  );
}

export default AuthContent;