import React from 'react'
import { Breadcrumb, BreadcrumbItem, Label } from 'reactstrap'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../route'
import { routesAuth } from '../../route/auth'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons'

const BreadcrumbPage = (props) => {
 
  const { parent, child,littleChild, nameParent, nameChild, newProduct1 } = props

  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes, routesAuth) => {
    const currentRoute = routes.filter((item) => item.path == pathname)
    const currentRouteAuth = routesAuth.filter((item) => item.path == pathname)
    return currentRoute[0] || currentRouteAuth[0]
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr,  index, array) => {
      const currentPathname = `${prev}/${curr}`
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes, routesAuth),
        active: index + 1 === array.length ? true : false,
      })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)
  const breadcrumbsClean = breadcrumbs.filter(item => item.active == true ? item.name : null)

  return (
    <div>
      {currentLocation == '/' ? ('') : (
        <Breadcrumb>
          <BreadcrumbItem><Link to={'/'}><Label><FontAwesomeIcon icon={faHomeAlt} className="icon-header icon-home mr-5" style={{ fontSize: 14 }} />Home</Label></Link></BreadcrumbItem>
          {
            parent &&
            <BreadcrumbItem active><Label className=''>{newProduct1.length >= 1 ? (<Label>{breadcrumbs && breadcrumbsClean.length > 0 ? breadcrumbsClean[0].name.name : (newProduct1.length > 0 ? newProduct1[0]?.name : breadcrumbs[0]?.pathname)}</Label>) : (<Link to={breadcrumbs && ((breadcrumbsClean.length == 0 && breadcrumbs[0].active == false && newProduct1.length > 0)) ? breadcrumbs[1]?.pathname : breadcrumbs[0]?.pathname}>{breadcrumbs && breadcrumbsClean.length > 0 ? breadcrumbsClean[0].name.name : (newProduct1.length > 0 ? newProduct1[0].name : nameParent)}</Link>)}</Label>
            </BreadcrumbItem>
          }
      
          {
            (child && breadcrumbs.length > 1 && newProduct1.length <= 0) && <BreadcrumbItem active><Label><Link to={child}>{breadcrumbsClean.length >= 1 ? breadcrumbsClean.name && '' : nameChild}</Link></Label></BreadcrumbItem>
          }

        </Breadcrumb>

      )}
    </div>
  )
}

export default BreadcrumbPage