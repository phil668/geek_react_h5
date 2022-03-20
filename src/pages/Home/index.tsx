import { Tabs } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  activeIdAction,
  allChannelAction,
  userChannelAction,
} from '@/store/actions/home'
import { RootState } from '@/types/store'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
import Channels from './Channels'

export default function Home() {
  const dispatch = useDispatch()
  const channels = useSelector((state: RootState) => state.home.userChannels)
  const [showCh, setShowCh] = useState<boolean>(false)
  const activeId = useSelector((state: RootState) => {
    return state.home.activeId
  })

  useEffect(() => {
    async function fetch() {
      await dispatch(userChannelAction())
      await dispatch(allChannelAction())
    }
    fetch()
  }, [dispatch])

  const closeShowCh = () => {
    setShowCh(false)
  }

  const changeActive = (key: string) => {
    dispatch(activeIdAction(Number(key)))
  }

  return (
    <div className={styles.root}>
      <Tabs
        activeLineMode='fixed'
        className='tabs'
        activeKey={activeId + ''}
        onChange={changeActive}
      >
        {channels.map((c) => {
          return (
            <Tabs.Tab title={c.name} key={c.id}>
              {c.name}
            </Tabs.Tab>
          )
        })}
      </Tabs>
      <div className='tabs-opration'>
        <Icon icon='iconbtn_search' />
        <Icon onClick={() => setShowCh(true)} icon='iconbtn_channel' />
      </div>
      {/* 频道弹框 */}
      <Channels close={closeShowCh} visible={showCh} />
    </div>
  )
}
