import { create } from "zustand";
import { devtools,persist } from 'zustand/middleware'


export interface ICartItem {
  imgSrc:string,
  name:string,
  price:string,
  count:number,
}

interface ICartData {
  cartItems:ICartItem[] | null,
  setCartItems:(items:ICartItem[] | null)=>void,
}

export const CartData = create<ICartData>()(
    devtools(persist(
        (set)=>({
            cartItems:null,
            setCartItems:(items)=>{set({cartItems:items})}   
          }),
        {name: 'CartData'}
    ))
)