import axios from "axios"

 //export const API_SERVER = 'http://192.168.86.29:8008/v1'
// export const API_SERVER_IMAGE = 'http://192.168.83.125:8008/v1'
// export const API_SERVER_NEWS = 'http://192.168.83.125:8005/v1'

export const API_SERVER = 'https://demo.giga.vn/v1'
export const API_SERVER_GIGA_DIGITAL = 'https://testserver.gigadigital.vn/v1'
export const API_SERVER_IMAGE = 'https://images.giga.vn/v1'
export const API_SERVER_ERP = 'https://sales.hoplong.com'
export const API_SERVER_NEWS = 'https://news.giga.vn/v1'
export const API_SERVER_GHN = process.env.REACT_APP_URL_GHN

const authHeader = () => {

  const token = localStorage.getItem('token')

  if(token) {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-access-token': token
    }
  } else {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}

export const axiosIntance = axios.create({
  headers: authHeader()
})