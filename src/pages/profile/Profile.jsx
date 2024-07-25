import cls from './Profile.module.scss'
import { LayoutWithHeader } from '../layout/Layout'

export const Profile = () =>{
    return (
        <LayoutWithHeader>
            <div className={cls.container}>
                <div className={cls.wrapper}>
                    <div className={cls.content}>
                        <div className={cls.userPic}>
                        </div>
                        <div className={cls.userName}>

                        </div>
                        <div className={cls.userInfo}>
                            <div className={cls.countOfPurchases}>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWithHeader>
    )
}