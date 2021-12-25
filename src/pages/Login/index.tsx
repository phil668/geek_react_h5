import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button, Toast } from 'antd-mobile'
import { useHistory } from 'react-router'
import { LoginForm } from '@/types/data'
import { useDispatch } from 'react-redux'
import { loginAction } from '@/store/actions/login'

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()

  // 校验通过
  const onFinish = async (value: LoginForm) => {
    await dispatch(loginAction(value))
    // 能走到这里 说明是ok
    Toast.show({
      icon: 'success',
      content: '登录成功',
      duration: 300,
      afterClose() {
        // 跳转页面
        history.push('/')
      },
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
