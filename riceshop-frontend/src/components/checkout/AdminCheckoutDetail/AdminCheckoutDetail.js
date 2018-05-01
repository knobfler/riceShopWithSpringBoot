import React from 'react';
import styles from './AdminCheckoutDetail.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AdminCheckoutDetail = ({checkout}) => (
  <div className={cx('detail')}>
    <div className={cx('form')}>
      <div className={cx('id')}>
      주문번호: {checkout.id}
      </div>
      <div className={cx('checked')}>
      배송여부: {checkout.checked ? "배송처리 완료" : "배송하지 않음"}
      </div>
      <div className={cx('paid_amount')}>
      지불가격: {checkout.paid_amount}
      </div>
      <div className={cx('buyer_tel')}>
      주문자 전화번호: { checkout.buyer_tel }
      </div>
      <div className={cx('ordered_list')}>
      주문한 리스트: {checkout.ordered_list}
      </div>
      <div className={cx('ordered_number')}>
      주문한 수량: {checkout.ordered_number}
      </div>
      <div className={cx('buyer_email')}>
      주문자 이메일: {checkout.buyer_email}
      </div>
      <div className={cx('buyer_name')}>
      주문자 이름: {checkout.buyer_name}
      </div>
      <div className={cx('buyer_postcode')}>
      주문자 우편번호: {checkout.buyer_postcode}
      </div>
      <div className={cx('created_at')}>
      주문 일시: {checkout.createdAt}
      </div>
      <div className={cx('buyer_addr')}>
      주문자 주소: {checkout.buyer_addr}
      </div>
    </div>
  </div>
);

export default AdminCheckoutDetail;