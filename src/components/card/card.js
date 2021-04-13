import React from "react";
import './card.css';

import dollar from "../../assets/$.png";

function Card({onClick, name, category, price, id}) {
  console.log(name, category, price, id)
  return (
    <div className="card__item">
      <div className="card__item--type">{category}</div>
      <div className="card__item--title">{name}</div>
      <div className="card__item--price">
        <div className="price-wrapper">
          <img className="dollar-image" src={dollar} alt="dollar"/>
          <div className="price">{price}</div>
        </div>
        <button onClick={() => onClick(id)} className="basket-button"/>
      </div>
    </div>
  );
}

export default Card;
