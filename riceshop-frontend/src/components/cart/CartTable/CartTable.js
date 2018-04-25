import React from 'react';
import styles from './CartTable.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CartTable = ({ver, cartList, totalPrice, onRemoveById}) => {
  const carts = cartList.map(
    (cart, i) => {
      return (
        <div className={cx('row')} key={i}>
            <div className={cx('content')}>
            <Link to={`/post/${cart.id}`}>
              <img
                className={cx('image')}
                src={`/api/uploads/${cart.thumbnailImage}`}/>
            </Link>
            </div>
            <div className={cx('content')}>
            <Link to={`/post/${cart.id}`}>
              {cart.title}
              </Link>
            </div>
            <div className={cx('content')}>
              {cart.amount}
            </div>
            <div className={cx('content')}>
              {cart.totalPrice}
            </div>
            {
              !ver && <div className={cx('content')}>
                        <Button removeid={cart.id} onClick={onRemoveById} theme="remove">삭제</Button>
                      </div>
            }
          </div>
      )
    }
  );

  const cartMobile = cartList.map(
    (cart, i) => {
      return (
        <div className={cx('line')} key={i}>
          <div className={cx('left-line')}>
            <div className={cx('thumbnail')}>
            <Link to={`/post/${cart.id}`}>
            <img
                className={cx('image')}
                src={`/api/uploads/${cart.thumbnailImage}`}/>
                </Link>
            </div>
            
          </div>
          <div className={cx('right-line')}>
            <div className={cx('title')}>
            <Link to={`/post/${cart.id}`}>
                {cart.title}
                </Link>
            </div>
            <div className={cx('number')}>
              수량: {cart.amount}
            </div>
            <div className={cx('price')}>
              가격: {cart.totalPrice}
            </div>
          </div>
          {
            !ver && <div className={cx('remove-line')}>
                      <div className={cx('remove-mark')} removeid={cart.id} onClick={onRemoveById}>
                        X
                      </div>
                    </div>
          }
        </div>
      )
    }
  )
  if(cartList.length === 0) {
    return (
      <div className={cx('no-cart')}>
        현재 장바구니에 담긴 상품이 없습니다.
      </div>
    )
  }
  return (
    <div className={cx('cart-table')}>
      <div className={cx('cart-content')}>
        <div className={cx('header')}>
          <div className={cx('heading')}>
            사진
          </div>
          <div className={cx('heading')}>
            상품명
          </div>
          <div className={cx('heading')}>
            수량
          </div>
          <div className={cx('heading')}>
            가격
          </div>
          {
            !ver && <div className={cx('heading')}>
                      삭제
                    </div>
          }
        </div>
        <div className={cx('body')}>
          {
            carts
          }
        </div>
        <div className={cx('total-price')}>
          총 가격: {parseInt(totalPrice, 10) + 3000} (배송비포함)
        </div>
      </div>
      <div className={cx('cart-content-mobile')}>
          {
            cartMobile
          }
      </div>
      {
        !ver && <div className={cx('order-button')}>
          <Button to="/payment" theme="order-mobile">주문하기</Button>
        </div>
      }
      
    </div>
  );
}

export default CartTable;