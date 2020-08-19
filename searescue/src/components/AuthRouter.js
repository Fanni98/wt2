import React from 'react'
import { Route } from 'react-router-dom'

import PreLoad from './PreLoad'

const AuthRouter = ({ component: Component, parentClass: parentClass, ...rest }) => (
    <Route {...rest} render={props => (
        (localStorage.token != undefined && localStorage.token != '') ? (
            parentClass.state.isLoggedIn == true ? (
                <Component {...props} parentClass={parentClass} />
            ) : (
                <PreLoad parentClass={parentClass} />
            )
        ) : (
            //console.log('hiba')
            window.location.href = '/'
        )
    )} />
)

export default AuthRouter