import './App.scss'
// 路由
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './pages/Layout/index'
import Login from './pages/Login/index'

function App() {
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/home' component={Layout}></Route>
          <Route path='/login' component={Login}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
