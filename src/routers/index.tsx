import { Switch, Route, HashRouter,Redirect } from "react-router-dom";
import {routes} from './routes'
import AmstLayout from '../layout'

const Routes = () => {
    return (
        <AmstLayout >
            <HashRouter>
                <Switch>
                    {
                        routes.map(item => (
                            <Route path={item.path} component={item.components} key={item.path} />
                        ))
                    }
                    <Redirect to={localStorage.getItem('token') ? '/firstPro'  : '/login'} from={'/'} />
                </Switch>
            </HashRouter>
        </AmstLayout>


        
    )
}
export default Routes