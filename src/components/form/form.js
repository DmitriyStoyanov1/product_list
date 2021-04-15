import React from 'react'
import { Button } from '../button'
import { useInput } from './hooks'
import classnames from 'classnames';

import { ReactComponent as CloseIcon} from '../../assets/close.svg';

import styles from './form.module.css'

/* По-хорошему хорошо бы объединить эту кнопку с кнопкой в карточке */
export const Form = ({ onSubmit }) => {
  const name = useInput('', { isEmpty: true, onlyLetters: true })
  const productCount = useInput('', { isEmpty: true, maxLength: 12, onlyNumbers: true })

  const isNameInputHasError = [
    name.isDirty && name.isEmpty,
    name.isDirty && name.onlyLetters
  ].some(Boolean)

  const isProductInputHasError = [
    productCount.isDirty && productCount.isEmpty,
    productCount.isDirty && productCount.maxLengthError,
    productCount.isDirty && productCount.onlyNumbers
  ].some(Boolean)

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if(isNameInputHasError || isProductInputHasError) {
      // alert не очень хорошая практика, но не хочется тратить время на какой-то попап
      alert('Пожалуйста, исправьте ошибки в форме')

      return;
    }

    // пишем данные из формы в консоль
    console.log({
      name: name.value,
      productCount: +productCount.value
    })

    // закрываем форму
    onSubmit()
  }
  
  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.field}>
        <div className={classnames(styles.input, { [styles.inputError]: isNameInputHasError })}>
          <input
            id="name"
            type="text"
            value={name.value}
            onChange={name.onChange}
            onBlur={name.onBlur}
            className={styles.input}
          />

          {isNameInputHasError && (
            <span onClick={name.resetInput} className={styles.clear}>
              <CloseIcon />
            </span>
          )}
        </div>

        {(name.isDirty && name.isEmpty) && (
          <div className={styles.error}>This field in required</div>
        )}

        {name.isDirty && name.onlyLetters && (
          <div className={styles.error}>Only letters allowed</div>
        )}
      </div>

      <div className={styles.field}>
        <div className={classnames(styles.input, { [styles.inputError]: isProductInputHasError })}>
          <input
            id="number"
            onChange={productCount.onChange}
            onBlur={productCount.onBlur}
            value={productCount.value}
          />

          {isProductInputHasError && (
            <span onClick={productCount.resetInput} className={styles.clear}>
              <CloseIcon />
            </span>
          )}
        </div>

        {(productCount.isDirty && productCount.isEmpty) && (
          <div className={styles.error}>This field is required</div>
        )}

        {(productCount.isDirty && productCount.maxLengthError) && (
          <div className={styles.error}>Should contain 12 characters</div>
        )}

        {(productCount.isDirty && productCount.onlyNumbers) && (
          <div className={styles.error}>Only numbers allowed</div>
        )}
      </div>

      <Button
        type="submit"
        className={styles.formButton}
      >
        ORDER
      </Button>
    </form>
  )
}
