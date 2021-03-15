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
                    <Redirect to={'/login'} from={localStorage.getItem('token') ? '/firstPro' : '/'} />
                </Switch>
            </HashRouter>
        </AmstLayout>


        
    )
}
export default Routes