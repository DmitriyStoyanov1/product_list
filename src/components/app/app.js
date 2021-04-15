import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { nanoid } from 'nanoid';
import axios from 'axios';

import { Card } from '../card';
import { Form } from '../form';
import { Button } from '../button';

import { ReactComponent as DollarIcon } from '../../assets/dollar.svg';
import { ReactComponent as ModalCloseIcon } from '../../assets/x.svg';

import styles from './app.module.css';

const MODAL_STYLES = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    padding: '35px 32px',
    overflow: 'visible',
    width: '300px'
  }
}

// На макете показывается именно 6 карточек, при это нет пагинации
// Поэтому завел эту константу
const CARDS_COUNT = 6;

function App() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState({});

  useEffect(() => {
    setIsLoading(true);

    axios.get('https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e')
      .then(response => {
        const data = response.data.slice(0, CARDS_COUNT).map(item => ({ id: nanoid(7), ...item }));

        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsServerError(true);
        setIsLoading(false);
      })
  }, [])

  const handleGetCheapestProductClick = () => {
    setCurrentProduct(data.sort((a, b) => b.price - a.price).slice(-1)[0]);
    setIsOpen(true);
  }

  const openModal = (productId) => {
    const choosedProduct = data.find(product => product.id === productId);

    setCurrentProduct(choosedProduct);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className={styles.app}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={MODAL_STYLES}
        ariaHideApp={false}
      >
        <div className={styles.modalContent}>
          <div className={styles.category}>{currentProduct.category}</div>
          <div className={styles.title}>{currentProduct.name}</div>
          <div className={styles.priceWrapper}>
            <DollarIcon />
            <div className={styles.price}>{currentProduct.price}</div>
          </div>

          <span className={styles.modalCloseButton}>
            <ModalCloseIcon onClick={closeModal}/>
          </span>

          <Form onSubmit={closeModal} />
        </div>
      </Modal>

      {!isLoading ? (
        <React.Fragment>
          <div className={styles.wrapper}>
            {data.map(({ name, category, price, id }, i) => (
              <Card
                key={name}
                id={id}
                name={name}
                category={category}
                price={price}
                onClick={openModal}
              />
            ))}
          </div>
          <Button onClick={handleGetCheapestProductClick}>Buy cheapest</Button>
        </React.Fragment>
      ) : (
        <div>Загрузка...</div>
      )}

      {isServerError && (
        <h1>Ошибка сервера. Приложение не работает :(</h1>
      )}
    </div>
  );
}

export default App;
