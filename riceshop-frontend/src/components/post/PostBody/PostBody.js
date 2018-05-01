import React from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';
import MarkdownRender from 'components/common/MarkdownRender';

const cx = classNames.bind(styles);

const PostBody = ({markdown}) => (
  <div className={cx('post-body')}>
    <div className={cx('descriptions')}>
      <MarkdownRender markdown={markdown}/>
    </div>
  </div>
);

export default PostBody;