import { Button, Tag } from 'antd-mobile'
function Login() {
  return (
    <div>
      <Tag color='default'>Default</Tag>
      <Tag color='primary'>测试</Tag>
      <Tag color='success'>Success</Tag>
      <Tag color='warning'>Warning</Tag>
      <Tag color='danger'>Danger</Tag>
      <Button
        onClick={() => {
          console.log('么么哒!')
        }}
        color='primary'
      >
        Primary
      </Button>
    </div>
  )
}

export default Login
