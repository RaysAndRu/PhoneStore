import React, { useEffect, useState } from 'react';
import cls from './CountResult.module.scss';
import { CartData } from '../../store/cart.ts';

interface ICountResultProps {
  count:number,
  storedItemIndex:number,
}

const CountResult = ({count,storedItemIndex}:ICountResultProps) => {

    const [clientCount,setClientCount] = useState<number>()

    const setCartItems = CartData(state=>state.setCartItems)
    const cartItems = CartData(state=>state.cartItems)
  
    // Функция для увеличения числа
    const increaseNumber = () => {
      if (cartItems !== null) {
        const updatedCartItems = [...cartItems]; // Создаем новый массив, копируя старый
        updatedCartItems[storedItemIndex].count++; // Изменяем копию массива
        setCartItems(updatedCartItems); // Сохраняем новый массив в состояние
      }
    };
  
    // Функция для уменьшения числа
    const decreaseNumber = () => {
    if (cartItems !== null) {
      const updatedCartItems = [...cartItems]; // Создаем новый массив, копируя старый
      if(updatedCartItems[storedItemIndex].count !==0) {
        updatedCartItems[storedItemIndex].count--; // Изменяем копию массива
        setCartItems(updatedCartItems); // Сохраняем новый массив в состояние
      }
    }
  };

    useEffect(()=>{
      if(cartItems !== null){
        setClientCount(cartItems[storedItemIndex].count)
      }

    },[cartItems,storedItemIndex])
    
    return (
      <div className={cls.itemWrapperCount}>
        <button onClick={decreaseNumber} className={cls.countButton}>-</button>
        <p className={cls.count}>{clientCount}</p>
        <button onClick={increaseNumber} className={cls.countButton}>+</button>
      </div>
    )
}

export default CountResult;