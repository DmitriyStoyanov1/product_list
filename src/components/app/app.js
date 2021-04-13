import React, { useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

import Card from "../card/card";
import dollar from "../../assets/$.png";
import './app.css';

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.8)"
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    borderRadius          : '12px',
    padding               : '30px 40px 52px',
  }
};

function App() {

  const CARDS = 6;

  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [serverData,setServerData] = React.useState(null);
  const [modalOpenCard,setModalOpenCard] = React.useState(null);

  useEffect(() => {
    axios.get('https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e')
    .then(function (response) {
      const data = response.data.filter((_, i) => i < CARDS)
      console.log(data, "data from server");
      setServerData(data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  console.log(serverData, 'server data')

  function openModal(id) {
    setModalOpenCard(serverData[id])
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        { modalOpenCard &&
        <>
        <div className="card__item--type modal__item--type">{modalOpenCard.category}</div>
        <div className="card__item--title modal__item--title">{modalOpenCard.name}</div>
        <div className="card__item--price modal__item--price">
          <div className="price-wrapper">
            <img className="dollar-image" src={dollar} alt="dollar"/>
            <div className="price">{modalOpenCard.price}</div>
          </div>
        </div>
        <form className="card__form">
          <input className="card__form--input" id="name" type="text"/>
          <input className="card__form--input" id="number"/>
          <button className="buy-button modal-button" onClick={closeModal}>ORDER</button>
        </form>
        </>
        }
      </Modal>

      <div className="wrapper">
      {serverData && serverData.map((item, i) => 
        <Card 
          onClick={openModal} 
          id={i}
          key={item}
          name={item.name}
          category={item.category}
          price={item.price}
      />)}
      </div>
      <button className="buy-button">Buy cheapest</button>
    </div>
  );
}

export default App;
