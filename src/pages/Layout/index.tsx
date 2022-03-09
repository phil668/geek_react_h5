import { TabBar } from 'antd-mobile'
import styles from './index.module.scss'
import { useLocation, useHistory, Switch, Route } from 'react-router-dom'

import Icon from '@/components/Icon'
import Home from '@/pages/Home'
import Question from '@/pages/Question'
import Video from '@/pages/Video'
import Profile from '@/pages/Profile'

const tabs = [
  { path: '/home', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
]

const Layout = () => {
  const location = useLocation()
  const history = useHistory()

  const changePath = (path: string) => {
    history.push(path)
  }

  return (
    <div className={styles.root}>
      <Switch>
        <Route exact path='/home' component={Home}></Route>
        <Route path='/home/question' component={Question}></Route>
        <Route path='/home/video' component={Video}></Route>
        <Route path='/home/profile' component={Profile}></Route>
      </Switch>
      <TabBar
        className='tab-bar'
        activeKey={location.pathname}
        onChange={changePath}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active: boolean) => {
              return (
                <Icon
                  icon={active ? `${item.icon}_sel` : `${item.icon}`}
                ></Icon>
              )
            }}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
