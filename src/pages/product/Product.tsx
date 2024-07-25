import { useLocation } from "react-router-dom"
import { LayoutWithHeader } from "../layout/Layout";
import cls from './Product.module.scss';
import {ReactComponent as Star} from '../../images/product/Star.svg';
import {ReactComponent as StarIdle} from '../../images/product/StarIdle.svg'
import { CartData, ICartItem } from "../../store/cart.ts";
import React, { useMemo, useState } from "react";

export const Product = () =>{
    const { state } = useLocation();

    const { imgSrc,name,price } = state.card;
    const [stars,setStars] = useState<{
        one:boolean,
        two:boolean,
        three:boolean,
        four:boolean,
        five:boolean
    }>({
        one:false,
        two:false,
        three:false,
        four:false,
        five:false
    })

    const characteristics = [
        ['Характеристика 1','256'],
        ['Характеристика 1','256'],
        ['Характеристика 1','256'],
        ['Характеристика 1','256'],
        ['Характеристика 1','256'],
        ['Характеристика 1','256'],
    ]

    const storedItems = CartData(state=>state.cartItems)
    const setCartItems = CartData(state=>state.setCartItems)

    const storedItemsOrArray = useMemo(()=>storedItems || [],[storedItems])

    const increaseCountOfItem = (cartItems:ICartItem[],item:ICartItem) =>{
        //поиск индекса телефона индентичной тому, который в корзине
        const sameModelItemIndex = cartItems.findIndex(cartItem=>cartItem.name === item.name)
        //Если совпадения модели не наидено, то записываем новую модель в массив
        if(sameModelItemIndex === -1){
            setCartItems([...cartItems,item])
        }
        //Иначе, если совпадение наидено
        else{
            const tmpArray = [...cartItems]
            //прибавляем количество телефонов идентичной модели
            tmpArray[sameModelItemIndex].count++
            //записываем в корзину новые данные
            setCartItems(tmpArray)
        }
    }

    const buttonClickHandler = (item:ICartItem) =>{
        
        if(storedItems !== null){
            increaseCountOfItem(storedItems,item)
            console.log(storedItems,'storedItems')
        }
        else{
            setCartItems([item])
        }
    }

    const starClickHandler = (key:string) =>{
        const updatedStars = {...stars };

    
    const index = Object.keys(updatedStars).findIndex(k => k === key);

    
    if (index!== -1) {
        
        updatedStars[key] = true;

        
        if (!updatedStars[key]) {
            for (let i = 0; i < index; i++) {
                updatedStars[Object.keys(updatedStars)[i]] = true;
            }
        }
        
        else {
            for (let i = 0; i < index; i++) {
                updatedStars[Object.keys(updatedStars)[i]] = true;
            }
            
            for (let i = index + 1; i < Object.keys(updatedStars).length; i++) {
                updatedStars[Object.keys(updatedStars)[i]] = false;
            }
        }
    }

    
    setStars(updatedStars);
    }

    return (
        <LayoutWithHeader>
        <div className={cls.wrapper}>
            <div className={cls.cardBackground}>
                <div className={cls.cardLeftSide}>
                    <div className={cls.cardLeftSideTop}>
                        <div className={cls.photoWrapper}>
                            <img className={cls.photo} src={`/${imgSrc}`}/>
                        </div>
                        <div className={cls.phoneDescription}>
                            <h2 className={cls.model}>
                                {name}
                            </h2>
                            <h3 className={cls.price}>
                                {price}
                            </h3>
                            <ul className={cls.characteristicWrapper}>
                                {
                                    characteristics.map(char=>{
                                        return (
                                            <li 
                                            key={Math.random()}className={cls.characteristic}>
                                                <span>{char[0]}</span>
                                                <span>{char[1]}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={cls.cardLeftSideBottom}>
                        <p className={cls.textDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className={cls.cardRightSide}>
                        <button onClick={()=>buttonClickHandler({...state.card,count:1})} className={cls.button}>В корзину</button>
                    <div className={cls.raiting}>
                        {
                            Object.keys(stars).map(key=>{
                                if(stars[key] === true){
                                    return <div onClick={()=>starClickHandler(key)}><Star/></div>
                                }else{
                                    return <div onClick={()=>starClickHandler(key)}><StarIdle/></div>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        </LayoutWithHeader>
    )
}