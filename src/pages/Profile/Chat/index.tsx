import styles from './index.module.scss'
import { NavBar, Input } from 'antd-mobile'
import Icon from '@/components/Icon'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import React, { useState, useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'
import { getToken } from '@/utils/storage'

type messageListType = {
  type: 'robot' | 'user'
  text: string
}[]

let client: Socket

export default function Chat() {
  const history = useHistory()
  const profile = useSelector((state: RootState) => state.profile.profile)
  const [messageList, setMessageList] = useState<messageListType>([
    {
      type: 'robot',
      text: '亲爱的用户您好，小智同学为您服务。',
    },
    {
      type: 'user',
      text: '你好',
    },
  ])
  const [input, setInput] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    client = io('http://toutiao.itheima.net', {
      query: {
        token: getToken().token,
      },
      transports: ['websocket'],
    })
    // 监听连接成功的事件
    client.on('connect', () => {
      setMessageList((m) => {
        return [
          ...m,
          {
            type: 'robot',
            text: '有什么可以帮助你的吗?',
          },
        ]
      })
    })

    client.on('message', (data) => {
      setMessageList((s) => {
        return [
          ...s,
          {
            type: 'robot',
            text: data.msg,
          },
        ]
      })
      console.log(data)
    })

    client.on('disconnent', () => {
      console.log('服务器断开')
    })
    return () => {
      client.close()
    }
  }, [])

  useEffect(() => {
    containerRef.current!.scrollTop = containerRef.current!.scrollHeight
  }, [messageList])

  const emitMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim() !== '') {
        client.emit('message', {
          timestamp: Date.now(),
          message: input,
        })
        setInput('')
        setMessageList((s) => {
          return [
            ...s,
            {
              type: 'user',
              text: input,
            },
          ]
        })
      }
    }
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className='fixed-header'
        onBack={() => {
          history.go(-1)
        }}
      >
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className='chat-list' ref={containerRef}>
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div className='chat-item' key={index}>
                {/* 机器人 */}
                <Icon icon='iconbtn_xiaozhitongxue' />
                <div className='message'>{item.text}</div>
              </div>
            )
          } else {
            return (
              <div className='chat-item user' key={index}>
                {/* 用户的消息 */}
                <img src={profile.photo} alt='' />
                <div className='message'>{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className='input-footer'>
        <Input
          value={input}
          onChange={(value) => setInput(value)}
          onKeyUp={(e) => {
            emitMessage(e)
          }}
          className='no-border input'
          placeholder='请描述您的问题'
        />
        <Icon icon='iconbianji' />
      </div>
    </div>
  )
}
