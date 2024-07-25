import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header.jsx";
import { iphones } from '../products/model/data';
import CustomRange from '../../components/range/Range.tsx';
import { Link } from "react-router-dom";
import { CartData, ICartItem } from "../../store/cart.ts";
import cls from "./Products.module.scss";


export const Products = () => {

    const storedItems = CartData(state=>state.cartItems)
    const setCartItems = CartData(state=>state.setCartItems)

    const [seachValue,setSearchValue] = useState<string>('')

    const [priceFilterValue,setPriceFilterValue] = useState<{
        start:number,
        end:number
    }>({
        start:1,
        end:99999,
    })

    const filteredModels = iphones.filter(iphone=>iphone.name.includes(seachValue) &&Number(iphone.price) >= priceFilterValue.start && Number(iphone.price) <= priceFilterValue.end)

    const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchValue(e.currentTarget.value)
    }

    const filterInputChangeHandler = (start:number,end:number) =>{
        setPriceFilterValue({
            end:end,
            start:start
        })

        console.log(priceFilterValue)
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


    return (
        <div className={cls.main__container}>
                <Header/>
                <main>
                    <div className={cls.main__wrapper}>
                        <ul className={cls.main__productCartList}>
                            {
                                filteredModels.map((card)=>{
                                    return (
                                    <li className={cls.main__productCartListItem} key={Math.random()}>
                                        <Link to={`/product/${card.id}`} state={{card:card}}>
                                            <img className={cls.main__productCartImage} src={card.imgSrc} alt={`Товар ${card.name}`} />
                                            <div className={cls.main__productCartItemTextWrapper}>
                                                <span className={cls.main__productCartTextWrapperText}>{card.name}</span>
                                                <span className={cls.main__productCartTextWrapperText}>{card.price}</span>
                                            </div>
                                        </Link>
                                            <button onClick={()=>buttonClickHandler({...card,count:1})} className={cls.main__productCartItemButton}>В корзину</button>
                                    </li>
                                    )
                                })
                            }
                        </ul>
                        <form className={cls.main__form}>
                            <fieldset className={cls.main__formWrapper}>
                                <input className={cls.main__search} value={seachValue} onChange={inputChangeHandler} type="search" name="search" id="search" />
                                <CustomRange setFilterValue={filterInputChangeHandler} />
                                <button onClick={()=>console.log('click')} className={cls.main__productCartItemButton}>В корзину</button>
                            </fieldset>
                        </form>
                    </div>
                </main>
        </div>
    )
}