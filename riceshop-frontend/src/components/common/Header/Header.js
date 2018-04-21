import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import SidebarContainer from 'containers/Sidebar/SidebarContainer';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const Header = ({adminLogged, memberLogged}) => (
  <div className={cx('header')}>
    <div className={cx('header-content')}>
      <Link to="/" className={cx('header-logo')}>
        Logo
      </Link>
      <div className={cx('right')}>
        {/* {
          logged ? <UserThumbnail/> : <Button>Menu</Button>
        } */}
        <SidebarContainer adminLogged={adminLogged} memberLogged={memberLogged}/>
      </div>
    </div>
  </div>
);

export default Header;