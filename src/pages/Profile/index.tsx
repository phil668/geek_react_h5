import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { RootState } from '@/types/store'
import { useEffect } from 'react'
import { profileAction, UserInfoAction } from '@/store/actions/profile'

const Profile = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.profile.userInfo)

  useEffect(() => {
    dispatch(profileAction())
    dispatch(UserInfoAction())
  }, [dispatch])

  return (
    <div className={styles.root}>
      <div className='profile'>
        {/* 个人信息 */}
        <div className='user-info'>
          <div className='avatar'>
            <img
              src={'http://toutiao.itheima.net/images/user_head.jpg'}
              alt=''
            />
          </div>
          <div className='user-name'>{userInfo.name}</div>
          <Link to='/profile/edit'>
            个人信息 <Icon icon='iconbtn_right' />
          </Link>
        </div>

        {/* 今日阅读 */}
        <div className='read-info'>
          <Icon icon='iconbtn_readingtime' />
          今日阅读
          <span>10</span>
          分钟
        </div>

        {/* 动态 - 对应的这一行 */}
        <div className='count-list'>
          <div className='count-item'>
            <p>{userInfo.art_count}</p>
            <p>动态</p>
          </div>
          <div className='count-item'>
            <p>{userInfo.follow_count}</p>
            <p>关注</p>
          </div>
          <div className='count-item'>
            <p>{userInfo.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className='count-item'>
            <p>{userInfo.like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 消息通知 - 对应的这一行 */}
        <div className='user-links'>
          <div className='link-item'>
            <Icon icon='iconbtn_mymessages' />
            <div>消息通知</div>
          </div>
          <div className='link-item'>
            <Icon icon='iconbtn_mycollect' />
            <div>收藏</div>
          </div>
          <div className='link-item'>
            <Icon icon='iconbtn_history1' />
            <div>浏览历史</div>
          </div>
          <div className='link-item'>
            <Icon icon='iconbtn_myworks' />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务 */}
      <div className='more-service'>
        <h3>更多服务</h3>
        <div className='service-list'>
          <div className='service-item'>
            <Icon icon='iconbtn_feedback' />
            <div>用户反馈</div>
          </div>
          <div className='service-item' onClick={() => history.push('/chat')}>
            <Icon icon='iconbtn_xiaozhitongxue' />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
