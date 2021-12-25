import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button } from 'antd-mobile'
import { useHistory } from 'react-router'

import http from '@/utils/http'

// 定义类型
type FormData = {
  mobile: string
  code: string
}

export default function Login() {
  const history = useHistory()

  // 校验通过
  const onFinish = (value: FormData) => {
    console.log(value.code)
    console.log(value.mobile)
    http({
      url: '/authorizations',
      method: 'post',
    }).then((res) => {
      console.log('res:', res)
    })
  }
  // 校验失败
  const onFinishFailed = () => {
    console.log('onFinishFailed')
  }

  return (
    <div className={styles.root}>
      {/* 导航 */}
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className='login-form'>
        <h2 className='title'>账号登录</h2>
        <Form initialValues={{ mobile: '13911111111', code: '246810' }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name='mobile'
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机号格式有误' },
            ]}
            className='login-item'
          >
            <Input placeholder='请输入手机号'></Input>
          </Form.Item>
          <List.Item className='login-code-extra' extra={<span className='code-extra'>发送验证码</span>}>
            <Form.Item
              name='code'
              rules={[
                { required: true, message: '请输入验证码' },
                { pattern: /^\d{6}$/, message: '验证码6个数字' },
              ]}
              className='login-item'
            >
              <Input placeholder='请输入验证码'></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            <Button type='submit' color='primary' block className='login-submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
