import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import s from './style.module.scss';

type Props = {};

const FindFriend = (props: Props) => {
  return (
    <div className={s.findFrWrap}>
      <div className={s.searchWrap}>
        <input type="text" className={s.searchInput} />
        <SearchOutlined />
      </div>
      <div className={s.listSuggest}>hi</div>
    </div>
  );
};

export default FindFriend;
