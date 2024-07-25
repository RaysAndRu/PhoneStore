import React, { useEffect, useState } from 'react'
import cls from './Cart.module.scss'
import { LayoutWithHeader } from '../layout/Layout'
import CountResult from '../../components/countResult/CountResult.tsx'
import { CartData } from '../../store/cart.ts'


export const Cart = () =>{
    const cartItems = CartData(state=>state.cartItems)
    const setCartItems = CartData(state=>state.setCartItems)
    const itemsPrices =cartItems && cartItems.map((item,index)=>{
        return Number(item.price.split(' ')[0]) * item.count
    })
    const itemsPrice = itemsPrices && itemsPrices.reduce((price, currentPrice)=>{return currentPrice + price },0)

    const deleteItemsClickHandler = () =>{
        setCartItems(null)
    }
    
    return (
        <LayoutWithHeader>
            <main className={cls.cart}>
                <h1 className={cls.cart__title}>Корзина</h1>
                <div className={cls.cart__wrapper}>
                    <div className={cls.cart__cartContainer}>
                        <ul className={cls.cart__cartList}>
                            {
                                cartItems && cartItems !== null && cartItems.map((item,index)=>{
                                    return (
                                        <li className={cls.cart__cartListItem}>
                                        <div className={cls.cart__itemWrapper}>
                                            <img src={item.imgSrc} alt="Товар iphone." />
                                            <span className={cls.cart__itemText}>{item.name}</span>
                                            <span className={cls.cart__itemText}>{item.price}</span>
                                        </div>
                                        <CountResult count={item.count} storedItemIndex={index}/>
                                    </li>
                                    )
                                })
                            }
                            
                        </ul>
                    </div>
                    <div className={cls.cart__result}>
                        <span className={cls.cart__resultText}>Сумма</span>
                        <span className={cls.cart__resultText}>{itemsPrice} ₽</span>
                        <button className={cls.cart__resultButton}>Продожлить</button>
                        <button onClick={deleteItemsClickHandler} className={cls.cart__resultButton}>Очистить корзину</button>
                    </div>
                </div>
            </main>  
        </LayoutWithHeader>
    )
}