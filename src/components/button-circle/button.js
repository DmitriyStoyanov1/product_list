import React from 'react'
import classnames from 'classnames'

import styles from './button.module.css'

export const CircleButton = ({ onClick, className, icon }) => {
  return (
    <button
      onClick={onClick}
      className={classnames(styles.button, className)}
    >
      {icon}
    </button>
  )
}
