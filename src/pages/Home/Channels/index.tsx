import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { Popup, Toast } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import _ from 'lodash'
import {
  activeIdAction,
  delChannelAction,
  addChannelAction,
} from '@/store/actions/home'
import React, { EventHandler, ReactEventHandler, useState } from 'react'

type ChannelsPopType = {
  visible: boolean
  close: () => void
}

const Channels = ({ visible, close }: ChannelsPopType) => {
  const [showClose, setShowClose] = useState<boolean>(false)
  const channel = useSelector((state: RootState) => state.home)
  const recommendChannel = useSelector((state: RootState) => {
    return _.differenceBy(state.home.allChannels, state.home.userChannels, 'id')
  })
  console.log(recommendChannel)

  const dispatch = useDispatch()

  const editUserChannel = async (id: number) => {
    // channel.userChannels.
    await dispatch(delChannelAction(id))
    Toast.show({
      icon: 'success',
      content: '删除成功',
    })
  }

  // 添加频道
  const addChannel = async (item: { id: number; name: string }) => {
    await dispatch(addChannelAction(item))
    Toast.show({
      icon: 'success',
      content: '添加成功',
    })
  }

  return (
    <Popup
      position='left'
      style={{
        width: '100vw',
      }}
      visible={visible}
    >
      <div className={styles.root}>
        <div className='channel-header'>
          <Icon onClick={close} icon='iconbtn_channel_close' />
        </div>
        <div className='channel-content'>
          {/* 编辑时，添加类名 edit */}
          <div className={classnames('channel-item')}>
            <div className='channel-item-header'>
              <span className='channel-item-title'>我的频道</span>
              <span className='channel-item-title-extra'>点击进入频道</span>
              <span
                className='channel-item-edit'
                onClick={() => {
                  setShowClose((c) => {
                    return !c
                  })
                }}
              >
                编辑
              </span>
            </div>
            <div className='channel-list'>
              {channel.userChannels.map((item, index) => {
                return (
                  <span
                    className={classnames('channel-list-item', {
                      selected: index === channel.activeId,
                    })}
                    key={item.id}
                    onClick={() => {
                      dispatch(activeIdAction(index))
                      close()
                    }}
                  >
                    {item.name}
                    {showClose && (
                      <Icon
                        icon='iconbtn_tag_close'
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation()
                          editUserChannel(item.id)
                        }}
                      />
                    )}
                  </span>
                )
              })}
              {/* 选中时，添加类名 selected */}
            </div>
          </div>

          <div className='channel-item'>
            <div className='channel-item-header'>
              <span className='channel-item-title'>频道推荐</span>
              <span className='channel-item-title-extra'>点击添加频道</span>
            </div>
            <div className='channel-list'>
              {recommendChannel.map((item) => {
                return (
                  <span
                    key={item.id}
                    className='channel-list-item'
                    onClick={() => {
                      addChannel(item)
                    }}
                  >
                    + {item.name}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default Channels
