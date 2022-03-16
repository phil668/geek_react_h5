import { NavBar, Popup, Input, TextArea } from 'antd-mobile'
import style from './index.module.scss'

export type InputPopProp = {
  visible: boolean
  close: () => void
  type: 'name' | 'intro'
}

function InputPop({ visible, close, type }: InputPopProp) {
  return (
    <Popup position='right' bodyStyle={{ width: '100vw' }} visible={visible}>
      <NavBar
        onBack={close}
        style={{
          '--border-bottom': '1px #eee solid',
        }}
        right={<span className={style.submit}>提交</span>}
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>
      {/* 输入框 */}
      {type === 'name' && (
        <div className={style.nameWrapper}>
          <Input placeholder='请输入内容' />
        </div>
      )}

      {/* 文本域 */}
      {type === 'intro' && (
        <div className={style.infoWrapper}>
          <TextArea defaultValue={'北极星垂地，\n东山月满川。'} showCount />
        </div>
      )}
    </Popup>
  )
}

export default InputPop
