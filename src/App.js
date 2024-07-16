import React, { Fragment, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import jwt_decode from "jwt-decode"
import useToken from './utilities/useToken'
import Home from './screen/home'
import News from './screen/news'
import X2OmniWhite from './screen/x2OmniWhite'
import X21KingSmith from './screen/x21Kingsmith'
import { routeNew } from './route/new'
import { routes } from './route/index'
import { routesAuth } from './route/auth'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/app.scss'

import '../node_modules/react-toastify/dist/ReactToastify.css'
import "react-toastify/dist/ReactToastify.css"
import {Helmet} from "react-helmet"

import Error404 from './components/layout/error404'

const App = () => {
  
  const { token } = useToken()

  let decoded
  if (token) { decoded = jwt_decode(token) }
 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment >
      <Helmet>
        <title>{process.env.REACT_APP_TITLE}</title>
        <meta property="og:description" name="description" content={process.env.REACT_APP_DESCRIPTION} />
      </Helmet>
      <BrowserRouter basename={`/`}>
      <Switch>
        <News path={'/tin-tuc'}>
          <TransitionGroup>
            <CSSTransition
              timeout={0}
              unmountOnExit>
              <Switch>
                {
                  routeNew.map(({path, Component}) => (
                    <Route key={path} exact path={`${path}`}>
                      {() => (
                        <Component/>
                      )}
                    </Route>
                  ))
                }
                <Route component={Error404} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </News>

        <X2OmniWhite path={'/ecovacs-x2omni'}></X2OmniWhite>
        <X21KingSmith path={'/kingsmith-x21'}></X21KingSmith>

        <Home token={decoded} path={'/'}>
          <Route exact path={'/'} />
          <TransitionGroup>
            <CSSTransition
              timeout={0}
              unmountOnExit>
              <Switch>
                {
                  token && (
                    routesAuth.map(({ path, Component }) => (
                      <Route key={path} exact path={`${path}`}>
                        {() => (
                          <Component token={decoded} />
                        )}
                      </Route>
                    ))
                  )
                }

                {routes.map(({ path, Component, name }) => (
           
                  <Route key={path} exact path={`${path}`} name={name}>
                 
                    {() => (
                     <Component token={decoded} />
                    )}
                  </Route>
                ))}
                <Route component={Error404} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Home>
      </Switch>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </Fragment>
  )
}

export default App