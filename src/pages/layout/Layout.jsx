import cls from './Layout.module.scss'
import { Header } from '../../components/header/Header'

export const LayoutWithHeader = ({children}) =>{
    return (
        <div cls={cls.container}>
            <Header/>
            {children}
        </div>
    )
}