export const checkNumber = (data) => {
  if(data) {
    const number = `${data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.',)}₫`
      return number
  }
  return data
}

export const checkNumberHide = (data) => {
  if(data.toString().length == 4) {
    const number = data.toString().slice(0, 0) + '?.' + data.toString().slice(1)
    const result = checkNumber(number)
    return result
  }
  if(data.toString().length == 5) {
    const number = data.toString().slice(0, 0) + '?' + data.toString().slice(1)
    const result = checkNumber(number)
    return result
  }
  if(data.toString().length == 6) {
    const number = data.toString().slice(0, 1) + '?' + data.toString().slice(2)
    const result = checkNumber(number)
    return result
  }
  if(data.toString().length == 7) {
    const number = data.toString().slice(0, 1) + '.??' + data.toString().slice(3)
    const result = checkNumber(number)
    return result
  }
  if(data.toString().length == 8) {
    const number = data.toString().slice(0, 2) + '.??' + data.toString().slice(4)
    const result = checkNumber(number)
    return result
  }
  const result = checkNumber(data)
  return result
}

export const checkImage = (image) => {
  if(image) {
    const check = image.indexOf('http')
    if(check == -1) {
      return `${process.env.REACT_APP_IMAGE}/image/${image}`
    } else {
      return image
    }
  }
}
export const checkImageGiga = (image) => {
  if(image) {
    const check = image.indexOf('http')
    if(check == -1) {
      return `${process.env.REACT_APP_IMAGE_GIGA}/image/${image}`
    } else {
      return image
    }
  }
}

export const checkVideoServer = (video) => {
    if(video) {
      const check = video.indexOf('http')
      if(check == -1) {
        return `${process.env.REACT_APP_VIDEO_GIGA}/video/${video}`
      } else {
        return video
      }
    }
  }
  
export const checkImageNews = (image) => {
  if(image) {
    const check = image.indexOf('http')
    if(check == -1) {
      return `${process.env.REACT_APP_IMAGE}/new/${image}`
    } else {
      return image
    }
  }
}