import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { Popup } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import _ from 'lodash'
import { activeIdAction } from '@/store/actions/home'

type ChannelsPopType = {
  visible: boolean
  close: () => void
}

const Channels = ({ visible, close }: ChannelsPopType) => {
  const channel = useSelector((state: RootState) => state.home)
  const recommendChannel = useSelector((state: RootState) => {
    return _.differenceBy(state.home.userChannels, state.home.allChannels)
  })
  const dispatch = useDispatch()

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
              <span className='channel-item-edit'>编辑</span>
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
                    <Icon icon='iconbtn_tag_close' />
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
                  <span key={item.id} className='channel-list-item'>
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
