import React from 'react';
import styles from './Sidebar.scss';
import classNames from 'classnames/bind';
import SideBarWrapper from 'components/common/SideBarWrapper';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const MenuItem = ({to, children, onClick}) => {
  return (<Link onClick={onClick} className={cx('menu-item')} to={to}>{children}</Link>)
}

const ClickableMenuItem = ({children ,onClick}) => {
  return (<div onClick={onClick} className={cx('menu-item')}>{children}</div>)
}

const Sidebar = ({visible, onClose, adminLogged, adminLogout, memberLogged, memberLogout, goToCartPage}) => (
  <SideBarWrapper visible={visible}>
    <div className={cx('menu')}>
    {
      memberLogged ? <ClickableMenuItem onClick={memberLogout} key="adminLogout">로그아웃</ClickableMenuItem> : [<MenuItem to="/login" onClick={onClose} key="login">로그인</MenuItem>,
      <MenuItem to="/register" onClick={onClose} key="register">회원가입</MenuItem>]
    }
    {
      adminLogged && [
        <MenuItem to="/editor" onClick={onClose} key="editor">상품 작성하기</MenuItem>,
        <MenuItem to="/admin/list" onClick={onClose} key="list">주문 리스트 확인</MenuItem>,
        <ClickableMenuItem onClick={adminLogout} key="adminLogout">관리자 로그아웃</ClickableMenuItem>
      ]
    }
    <MenuItem to="/cart" onClick={onClose} key="cart">장바구니</MenuItem>
    <MenuItem to="/item" onClick={onClose} key="item">상품 리스트</MenuItem>
    </div>
  </SideBarWrapper>
);

export default Sidebar;