import { Popup, Toast } from 'antd-mobile'
import styles from './AvatarSexPopup.module.scss'
import { useDispatch } from 'react-redux'
import { editProfileAction } from '@/store/actions/profile'
import React, { useRef } from 'react'
import { editPhotoAction } from '@/store/actions/profile'

export type AvatarSexPopupType = {
  visible: boolean
  close: () => void
  type: 'avatar' | 'gender'
}

const ListPop = ({ visible, close, type }: AvatarSexPopupType) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const genderMap = [
    {
      text: '男',
      value: '1',
    },
    {
      text: '女',
      value: '0',
    },
  ]

  // 编辑性别
  const editGender = async (value: string) => {
    await dispatch(editProfileAction('gender', value))
    Toast.show({
      icon: 'success',
      content: '数据修改完毕',
    })
    close()
  }

  // 展示上传图片的input
  const showUpload = () => {
    console.log(inputRef.current)
    inputRef.current?.click()
  }

  // 上传图片或者拍照
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    const form = new FormData()
    form.append('photo', e.target!.files![0])
    await dispatch(editPhotoAction(form))
    Toast.show({
      icon: 'success',
      content: '头像修改成功',
    })
    close()
  }

  const showTakePhoto = () => {
    cameraInputRef.current?.click()
  }

  return (
    <Popup position='bottom' visible={visible} mask onMaskClick={close}>
      <div className={styles.root}>
        {type === 'avatar' && (
          <>
            <div className='list-item' onClick={showTakePhoto}>
              拍照
            </div>
            <input
              hidden
              type='file'
              accept='image/*'
              capture='user'
              multiple
              ref={cameraInputRef}
              onChange={(e) => {
                uploadPhoto(e)
              }}
            />
            <div className='list-item' onClick={showUpload}>
              本地选择
            </div>
            <input
              type='file'
              ref={inputRef}
              className='file-input'
              onChange={(e) => {
                uploadPhoto(e)
              }}
            />
          </>
        )}
        {type === 'gender' &&
          genderMap.map((item, index) => {
            return (
              <div
                className='list-item'
                key={index}
                onClick={() => {
                  editGender(item.value)
                }}
              >
                {item.text}
              </div>
            )
          })}
        <div className='list-item' onClick={close}>
          取消
        </div>
      </div>
    </Popup>
  )
}

export default ListPop
