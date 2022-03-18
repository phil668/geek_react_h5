import './App.scss'
// 路由
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from '@/pages/Layout/index'
import Login from './pages/Login/index'
import ProfileEdit from '@/pages/Profile/Edit'
import PrivateRoute from './components/PrivateRoute'
import { history } from './utils/history'
import Chat from './pages/Profile/Chat'

function App() {
  return (
    <Router history={history}>
      <div className='app'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return <Redirect to='/home' />
            }}
          ></Route>
          <PrivateRoute path='/home'>
            <Layout></Layout>
          </PrivateRoute>
          <PrivateRoute path='/chat'>
            <Chat></Chat>
          </PrivateRoute>
          <Route path='/login' component={Login}></Route>
          <Route path='/profile/edit' component={ProfileEdit}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
