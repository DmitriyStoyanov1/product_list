import React from "react";
import { CircleButton } from '../button-circle';
import { ReactComponent as DollarIcon} from '../../assets/dollar.svg';
import { ReactComponent as ShoppingBagIcon} from '../../assets/shopping-bag.svg';

import styles from './card.module.css';

export function Card({ onClick, name, category, price, id }) {
  const handleCardButtonClick = () => {
    onClick && onClick(id)
  }
  
  return (
    <div className={styles.card}>
      <div className={styles.category}>{category}</div>
      <div className={styles.title}>{name}</div>

      <div className={styles.priceWrapper}>
        <div className={styles.price}>
          <DollarIcon />
          {price}
        </div>

        <CircleButton
          icon={<ShoppingBagIcon />}
          onClick={handleCardButtonClick}
        />
      </div>
    </div>
  );
}
