import React from 'react';
import styles from './ListWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ListWrapper = ({children}) => (
  <div className={cx('list-wrapper')}>
    <div className={cx('title')}>
      현재 판매중인 상품 리스트
    </div>
    {children}
  </div>
);

export default ListWrapper;