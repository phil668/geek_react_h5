import { profileAction } from '@/store/actions/profile'
import { RootState } from '@/types/store'
import { Button, List, DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputPop, { InputPopProp } from './InputPop'

import styles from './index.module.scss'

const Item = List.Item

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state: RootState) => {
    return state.profile.profile
  })
  const [showPopUp, setshowPopUp] = useState(false)
  const [inputPopType, setInputPopType] = useState<InputPopProp['type']>('name')

  const inputPopShow = (type: InputPopProp['type']): void => {
    setshowPopUp(true)
    setInputPopType(type)
  }

  useEffect(() => {
    dispatch(profileAction())
  }, [dispatch])

  return (
    <div className={styles.root}>
      <InputPop
        visible={showPopUp}
        close={() => setshowPopUp(false)}
        type={inputPopType}
      ></InputPop>
      <div className='content'>
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0',
          }}
        >
          个人信息
        </NavBar>

        <div className='wrapper'>
          {/* 列表 */}
          <List className='profile-list'>
            {/* 列表项 */}
            <Item
              extra={
                <span className='avatar-wrapper'>
                  <img width={24} height={24} src={profile.photo} alt='' />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item
              arrow
              extra={profile.name}
              onClick={() => inputPopShow('name')}
            >
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {'未填写'}
                </span>
              }
              onClick={() => {
                inputPopShow('intro')
              }}
            >
              简介
            </Item>
          </List>

          <List className='profile-list'>
            <Item arrow extra={profile.gender === 1 ? '男' : '女'}>
              性别
            </Item>
            <Item arrow extra={profile.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title='选择年月日'
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className='logout'>
          <Button className='btn'>退出登录</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
