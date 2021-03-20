import FirstClass from '../pages/firstClass'
import SecondsPro from '../pages/secondsPro'
import Login from '../pages/login'
import Banner from '../pages/baner'
import catefullyChosen from '../pages/catefullyChosen'
import SeasonClean from '../pages/seasonClean'


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
    },{
        path:'/catefullyChosen',
        components:catefullyChosen
    },{
        path:'/seasonClean',
        components:SeasonClean
    }
]