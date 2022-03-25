import React from 'react'

type props = {
  icon: string
  onClick?: (e: React.MouseEvent) => void
}

function Icon({ icon, onClick }: props) {
  return (
    <svg className='icon' aria-hidden='true' onClick={onClick}>
      {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  )
}

export default Icon
