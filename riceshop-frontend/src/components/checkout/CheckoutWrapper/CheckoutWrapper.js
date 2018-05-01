import React from 'react';
import styles from './CheckoutWrapper.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
const cx = classNames.bind(styles);

const CheckoutWrapper = ({children, onSelect, onSearchSelect, onChangeInput, onSearch}) => {
  const handleSelect = (e) => {
    
    const { value } = e.target;
    onSelect({value});
  }

  const handleSearchSelect = (e) => {
    const { value } = e.target;
    onSearchSelect({value});
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
    // console.log(name, value);
  }
  return (
    <div className={cx('checkout-wrapper')}>
      <div className={cx('option-selector')}>
        <select className={cx('options')} onChange={handleSelect}>
          
          <option value="all">모두 보기</option>
          <option value="checked">배송된 상품만 보기</option>
          <option value="unchecked">배송안된 상품만 보기</option>
        </select>
      </div>
      <main>
        {children}
      </main>
      <div className={cx('search-bar')}>
        {/* <div className={cx('label')}>
          검색
        </div> */}
        <div className={cx('search-selector')}>
          <select className={cx('search-select')} onChange={handleSearchSelect}>
            <option value="username">주문자 명으로 검색</option>
            <option value="address">주소로 검색</option>
            <option value="userphone">휴대폰번호로 검색</option>
            <option value="email">이메일로 검색</option>
          </select>
        </div>
        <input type="text" name="search" className={cx('search')} onChange={handleChange}/>
        <div className={cx('search-button')}>
        <Button theme="default" onClick={onSearch}>검색하기</Button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutWrapper;