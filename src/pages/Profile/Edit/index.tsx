import { profileAction, editProfileAction } from '@/store/actions/profile'
import { logoutAction } from '@/store/actions/login'
import { RootState } from '@/types/store'
import { Button, List, DatePicker, NavBar, Toast, Dialog } from 'antd-mobile'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputPop, { InputPopProp } from './InputPop'
import { useHistory } from 'react-router-dom'
import AvatarSexPopup, { AvatarSexPopupType } from './AvatarSexPopup'
import dayjs from 'dayjs'

import styles from './index.module.scss'

const Item = List.Item

const ProfileEdit = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const profile = useSelector((state: RootState) => {
    return state.profile.profile
  })
  const [showPopUp, setshowPopUp] = useState<boolean>(false)
  const [showAvatarPopup, setshowAvatarPopup] = useState<boolean>(false)
  const [inputPopType, setInputPopType] = useState<InputPopProp['type']>('name')
  const [avatarPopType, setavatarPopType] =
    useState<AvatarSexPopupType['type']>('avatar')
  const [dateShow, setDateShow] = useState(false)

  const inputPopShow = (type: InputPopProp['type']): void => {
    setshowPopUp(true)
    setInputPopType(type)
  }

  const avatarPopShow = (type: AvatarSexPopupType['type']): void => {
    setshowAvatarPopup(true)
    setavatarPopType(type)
  }

  const submitDate = async (date: Date) => {
    const birthday = dayjs(date).format('YYYY-MM-DD')
    console.log(birthday)
    await dispatch(editProfileAction('birthday', birthday))
    Toast.show({
      icon: 'success',
      content: '修改生日成功',
    })
    setDateShow(false)
  }

  // 退出登录
  const logout = () => {
    Dialog.show({
      content: '是否退出?',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
            style: { color: 'gray' },
            onClick() {
              console.log('取消')
            },
          },
          {
            key: 'delete',
            text: '确认',
            danger: true,
            onClick() {
              dispatch(logoutAction())
              // replace没有历史记录无法回退
              history.replace('/login')
            },
          },
        ],
      ],
    })
  }
  useEffect(() => {
    dispatch(profileAction())
  }, [dispatch])

  return (
    <div className={styles.root}>
      {/* 弹窗部分start */}
      <InputPop
        visible={showPopUp}
        close={() => setshowPopUp(false)}
        type={inputPopType}
      ></InputPop>
      <AvatarSexPopup
        visible={showAvatarPopup}
        close={() => {
          setshowAvatarPopup(false)
        }}
        type={avatarPopType}
      ></AvatarSexPopup>
      {/* 弹窗部分end */}
      <div className='content'>
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0',
          }}
          onBack={() => {
            history.push('/home/profile')
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
              onClick={() => {
                avatarPopShow('avatar')
              }}
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
                  {profile.intro || '未填写'}
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
            <Item
              arrow
              extra={profile.gender === 1 ? '男' : '女'}
              onClick={() => avatarPopShow('gender')}
            >
              性别
            </Item>
            <Item
              arrow
              extra={profile.birthday}
              onClick={() => {
                setDateShow(true)
              }}
            >
              生日
            </Item>
          </List>

          <DatePicker
            visible={dateShow}
            value={new Date()}
            title='选择年月日'
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            onCancel={() => {
              setDateShow(false)
            }}
            onConfirm={submitDate}
          />
        </div>

        <div className='logout'>
          <Button className='btn' onClick={logout}>
            退出登录
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
