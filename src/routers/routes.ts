import FirstClass from '../pages/firstClass'
import SecondsPro from '../pages/secondsPro'
import Login from '../pages/login'
import Banner from '../pages/baner'


export const routes = [
    {
        path:"/login",
        components:Login
    },
    {
        path:'/firstPro',
        components:FirstClass
    },{
        path:'/secondsPro',
        components:SecondsPro
    },{
        path:'/banner',
        components:Banner
    }
]