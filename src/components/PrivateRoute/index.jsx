import { getToken } from '@/utils/storage'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ children, ...reset }) {
  console.log(getToken())
  return (
    <Route
      {...reset}
      render={({ location }) => {
        console.log(location)
        if (JSON.stringify(getToken()) !== '{}') {
          return children
        } else {
          console.log('lose')
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: location.pathname,
                },
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
