import { useState, useEffect } from 'react';

const useValidation = (value, validations) => {
  // Новые правила для валидации можно оставлять здесь
  const [isEmpty, setEmpty] = useState(true);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [onlyLetters, setOnlyLetters] = useState(false);
  const [onlyNumbers, setOnlyNumbers] = useState(false);

  useEffect(() => {
    // Здесь происходит проверка каждого валидационного правила
    for(const validation in validations) {
      switch (validation) {
        case 'maxLength':
          value.length !== validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'onlyLetters':
          if(value) {
            /^[A-Za-zА-Яа-я]+$/.test(value) ? setOnlyLetters(false) : setOnlyLetters(true);
          } else {
            setOnlyLetters(false)
          }
          break;
        case 'onlyNumbers':
          if(value) {
            /^[0-9]+$/.test(value) ? setOnlyNumbers(false) : setOnlyNumbers(true);
          } else {
            setOnlyNumbers(false)
          }
          break;
        default:
          return
      }
    }
  }, [value]);

  // Возвращаем состояние ошибок для инпута
  return {
    isEmpty,
    maxLengthError,
    onlyLetters,
    onlyNumbers
  }
}

export function useInput (initialValue, validations) {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations)

  const onChange = ({ target }) => {
    setValue(target.value)
  }

  const resetInput = () => {
    setValue('');
    setDirty(false);
  };

  const onBlur = () => {
    setDirty(true)
  }

  return {
    value,
    setValue,
    onChange,
    onBlur,
    resetInput,
    isDirty,
    ...valid
  }

}
