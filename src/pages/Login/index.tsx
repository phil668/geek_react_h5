import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button } from 'antd-mobile'
import { useHistory } from 'react-router'
export default function Login() {
  const history = useHistory()
  return (
    <div className={styles.root}>
      {/* 导航 */}
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className='login-form'>
        <h2 className='title'>账号登录</h2>
        <Form>
          <Form.Item className='login-item'>
            <Input placeholder='请输入用户名'></Input>
          </Form.Item>
          <List.Item className='login-code-extra' extra={<span className='code-extra'>发送验证码</span>}>
            <Form.Item className='login-item'>
              <Input placeholder='请输入验证码'></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            <Button color='primary' block className='login-submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
