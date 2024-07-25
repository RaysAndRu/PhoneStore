import cls from "./Header.module.scss";
import { Link } from "react-router-dom";
import { CartData } from '../../store/cart.ts'

export const Header = () => {

    const storedItems = CartData(state=>state.cartItems)

    

    const getStoredItemCount = () => {
        if(storedItems !== null){
            return storedItems.reduce((total, elem) => {
                // Проверяем, что count больше 0, и добавляем его к общей сумме
                return total + (elem.count > 0? elem.count : 0);
            }, 0); // Инициализируем аккумулятор (общую сумму) значением 0
        }else{
            return 0
        }
        
    };

    const storedItemBadgeCount = getStoredItemCount()

    return (
        <header className={cls.header}>
            <div className={cls.header__wrapper}>
                <Link to={'/'} className={cls.header__wrapperLink}> Здесь мог быть ваш логотип</Link>
                <ul className={cls.header__wrapperNav}>
                    <li>
                        <Link to={'/profile'}><img src="https://svgshare.com/i/15eL.svg" alt="Профиль." /></Link>
                    </li>
                    <li className={cls.cart}>
                        <div className={cls.cartBadge}>{storedItemBadgeCount}</div>
                        <Link to={'/cart'}><img src="https://svgshare.com/i/15cx.svg" alt="Корзина." /></Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}