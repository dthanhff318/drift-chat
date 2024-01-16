import React from 'react';
import s from './style.module.scss';
import { Form, Input, notification } from 'antd';
import Button from 'app/components/Button/Button';
import authStore from 'app/storeZustand/authStore';
import userApi from 'app/axios/api/user';
import { TUser } from 'types/common';

type Props = {
  callbackWhenUpdate: () => void;
};

const UserInfoDetail = ({ callbackWhenUpdate }: Props) => {
  const { currenTUser, saveCurrenTUser } = authStore();
  const handleUpdateUser = async (data: TUser) => {
    try {
      const res = await userApi.updateUser(data);
      if (res.data) {
        saveCurrenTUser(res.data as TUser);
        callbackWhenUpdate();
      }
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  };
  return (
    <div className={s.wrapper}>
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={currenTUser}
        onFinish={handleUpdateUser}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="displayName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Introduction"
          name="introduction"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <div className={s.btnGroup}>
          <Button loading={false} text="OK" type="submit" />
        </div>
      </Form>
    </div>
  );
};

export default UserInfoDetail;
