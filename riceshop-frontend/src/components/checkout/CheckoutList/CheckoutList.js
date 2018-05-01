import React from 'react';
import styles from './CheckoutList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CheckoutList = ({checkoutList}) => {
  const checkout = checkoutList.map((list, i) => {
    return (
      <Link to={`/admin/list/${list.get('id')}`} key={i}>
      <div className={cx('line')}>
      
        <div className={cx('number')}>
          {list.get('id')}
        </div>
        <div className={cx('title')}>
          {list.get('ordered_list')}
        </div>
        <div className={cx('amount')}>
          {list.get('paid_amount')}
        </div>
        <div className={cx('username')}>
          최동호
        </div>
        
      </div>
      </Link>
    )
  })
  return (
    <div className={cx('checkout-list')}>
      <div className={cx('checkout-form')}>
        {checkout}
      </div>
    </div>
  );
}

export default CheckoutList;