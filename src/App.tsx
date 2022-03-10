import './App.scss'
// 路由
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Layout from '@/pages/Layout/index'
import Login from './pages/Login/index'
import { useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import ProfileEdit from '@/pages/Profile/Edit'

function App() {
  const token = useSelector((state: RootState) => {
    return state.login
  })

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
          <Route
            path='/home'
            render={() => {
              if (JSON.stringify(token) !== '{}') {
                return <Layout />
              } else {
                return <Login />
              }
            }}
          ></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/profile/edit' component={ProfileEdit}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
