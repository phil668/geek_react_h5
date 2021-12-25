import './App.scss'
// 路由
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from './pages/Layout/index'
import Login from './pages/Login/index'

function App() {
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return <Redirect to='/home' />
            }}
          ></Route>
          <Route path='/home' component={Layout}></Route>
          <Route path='/login' component={Login}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
