import { toast } from 'react-toastify'

const defaultCart = process.env.REACT_APP_DEFAULT_CART

export const saveLocalStorage = (valueArray, localStorageName) => {
  let valueString = JSON.stringify(valueArray)
  localStorage.setItem(localStorageName, valueString)
}

export const addCartNotUserFunc = (body) => {

  const cart = localStorage.getItem(defaultCart)

  if(!cart) {
    let cartArray = []
    cartArray.push(body)
    saveLocalStorage(cartArray, defaultCart)
    toast.success('Thêm sản phẩm giỏ hàng thành công!')
    window.location.reload(false)
  } else {
    const cartJson = JSON.parse(cart)
    let newCartJson = [...cartJson]
    const checkCartJson = newCartJson.findIndex(item => item.productId === body.productId)
    if(checkCartJson == -1) {
      newCartJson.push(body)
      saveLocalStorage(newCartJson, defaultCart)
      toast.success('Thêm sản phẩm giỏ hàng thành công!')
      setTimeout(() => {
        window.location.reload(false)
      },1000)
    } else {
      toast.success('Sản phẩm đã có trong giỏ hàng!')
    }
  }
}

export const countCartNotUserFunc = () => {
  const cart = localStorage.getItem(defaultCart)
  if(!cart) {
    const countStorage = 0
    return countStorage
  } else {
    const cartJson = JSON.parse(cart)
    let newCartJson = [...cartJson]
    const countStorage = newCartJson.length
    return countStorage
  }
}

export const listCartNotUser = () => {
  const cart = localStorage.getItem(defaultCart)
  if(!cart) {
    const listCartStorage = []
    return listCartStorage
  } else {
    const listCartJson = JSON.parse(cart)
    return listCartJson
  }
}

export const deleteCartNotUser = (id) => {
  const cart = localStorage.getItem(defaultCart)
  const cartJson = JSON.parse(cart)
  let newCartJson = [...cartJson]
  newCartJson = newCartJson.filter(item => item.productId != id)
  saveLocalStorage(newCartJson, defaultCart)
  window.location.reload(false)
}