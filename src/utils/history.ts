import { createBrowserHistory } from 'history'

// useHistory这个hook在非组件中无法使用,自己自定义一个history对象,然后通过react-router-dom的Router组件传递history对象
const history = createBrowserHistory()

export { history }
