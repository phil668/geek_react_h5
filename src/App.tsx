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
import PrivateRoute from './components/PrivateRoute'

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
          <PrivateRoute path='/home'>
            <Layout></Layout>
          </PrivateRoute>
          <Route path='/login' component={Login}></Route>
          <Route path='/profile/edit' component={ProfileEdit}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
