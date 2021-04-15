import React from 'react'
import classnames from 'classnames'

import styles from './button.module.css'

/* По-хорошему хорошо бы объединить эту кнопку с кнопкой в карточке */
export const Button = ({ type, onClick, className, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(styles.button, className)}
    >
      {children}
    </button>
  )
}
