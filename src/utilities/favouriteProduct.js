const favouriteProduct = process.env.REACT_APP_DEFAULT_FAVOURITE

export const saveLocalStorage = (valueArray, localStorageName) => {
  let valueString = JSON.stringify(valueArray)
  localStorage.setItem(localStorageName, valueString)
}

export const addNewProduct = (body) => {

  const product = localStorage.getItem(favouriteProduct)

  if(!product) {
    let productArray = []
    productArray.push(body)
    saveLocalStorage(productArray, favouriteProduct)
  } 
  // else {
  //   const cartJson = JSON.parse(cart)
  //   let newCartJson = [...cartJson]
  //   const checkCartJson = newCartJson.findIndex(item => item.productId === body.productId)
  //   if(checkCartJson == -1) {
  //     newCartJson.push(body)
  //     saveLocalStorage(newCartJson, favouriteProduct)
  //     toast.success('Thêm sản phẩm giỏ hàng thành công!')
  //   } else {
  //     toast.success('Sản phẩm đã có trong giỏ hàng!')
  //   }
  // }
}

export const countFavouriteProduct = () => {
  const productArray = localStorage.getItem(favouriteProduct)
  if(!productArray) {
    const countStorage = 0
    return countStorage
  } 
  // else {
  //   const cartJson = JSON.parse(cart)
  //   let newCartJson = [...cartJson]
  //   const countStorage = newCartJson.length
  //   return countStorage
  // }
}

export const listFavouriteProduct = () => {
  const productArray = localStorage.getItem(favouriteProduct)
  if(!productArray) {
    const listFavouriteProduct = []
    return listFavouriteProduct
  } else {
    const listFavouriteJson = JSON.parse(productArray)
    return listFavouriteJson
  }
}