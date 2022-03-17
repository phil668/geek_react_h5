import { NavBar, Popup, Input, TextArea, Toast } from 'antd-mobile'
import style from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/types/store'
import { useState } from 'react'
import { editProfileAction } from '@/store/actions/profile'

export type InputPopProp = {
  visible: boolean
  close: () => void
  type: 'name' | 'intro'
}

function InputPop({ visible, close, type }: InputPopProp) {
  const dispatch = useDispatch()
  const userProfile = useSelector((state: RootState) => state.profile.profile)
  const [input, setInput] = useState<string>('')

  const submit = async () => {
    await dispatch(editProfileAction(type, input))
    Toast.show({
      icon: 'success',
      content: '数据修改完毕!',
    })
    close()
    setInput('')
  }

  return (
    <Popup position='right' bodyStyle={{ width: '100vw' }} visible={visible}>
      <NavBar
        onBack={close}
        style={{
          '--border-bottom': '1px #eee solid',
        }}
        right={
          <span className={style.submit} onClick={submit}>
            提交
          </span>
        }
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>
      {/* 输入框 */}
      {type === 'name' && (
        <div className={style.nameWrapper}>
          <Input
            value={input}
            placeholder={userProfile.name}
            onChange={(value) => {
              setInput(value)
            }}
          />
        </div>
      )}

      {/* 文本域 */}
      {type === 'intro' && (
        <div className={style.infoWrapper}>
          <TextArea
            value={input}
            defaultValue={userProfile.intro ? userProfile.intro : ''}
            showCount
            onChange={(value) => setInput(value)}
          />
        </div>
      )}
    </Popup>
  )
}

export default InputPop
