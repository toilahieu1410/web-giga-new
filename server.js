const express = require('express')
const app = express()
const port = 3008
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const http = require('http')

const urlProduct = 'https://demo.giga.vn/v1/seo'
const urlNew = 'https://news.giga.vn/v1/news/seo'
// const urlNew = 'https://news.giga.vn/v1/status'
const title = 'Giga - Đồ gia dụng, công nghệ, chăm sóc sức khỏe, điện tử chính hãng'
const description = 'Giga thế giới đồ gia dụng thông minh, sản phẩm công nghệ, điện tử, chăm sóc sức khỏe, thời trang làm đẹp phục vụ đời sống, hàng chính hãng - giá tốt nhất - bảo hành uy tín. Mua online tại Giga.vn tiện lợi, nhanh chóng, phục vụ tận tâm chuyên nghiệp.'
const image = 'https://img.gigadigital.vn/image/1661826780851-Giga-logo.png'

const indexPath  = path.resolve(__dirname, './build', 'index.html')

app.use(express.static(path.resolve(__dirname, './build')))

app.get('*', async (req, res) => {
  console.log(req.url);

    let result; // Đặt biến result ở đây để tránh vấn đề phạm vi
    if (req.url.includes('tin-tuc')) {
      const valueArray = req.url.split('/');
      const params = { value: valueArray[valueArray.length - 1], type: 'new' };
      console.log(params);
      console.log(urlNew);
      try {
        result = await axios.get(`${urlNew}`);
        console.log(result.status); // Log response status code
        console.log(result.data); // Log response data
      } catch (error) {
        console.error('Error calling API:', error);
        throw error; // Ném lỗi để chuyển đến khối catch bên dưới
      }
    } else {
      const valueArray = req.url.split('/');
      console.log(valueArray,'vaa')
      const params = { value: valueArray[valueArray.length - 1] };
      if (valueArray.length === 3) {
        params.type = 'product';
        params.url = urlProduct;
      }
      if (valueArray.length === 2) {
        params.type = 'category';
        params.url = urlProduct;
      }
      result = await axios.get(`${urlProduct}`, { params });
    }


  // if(req.url.indexOf('tin-tuc') !== -1) {
  //   const valueAray = req.url.split('/')
  //   let params = { value: valueAray[valueAray.length - 1], type: 'new' }
  //   const result = await axios.get(urlNew, {
  //     params: params,
  //     httpAgent: new http.Agent({ keepAlive: false }) // Thêm dòng này
  //   })
  //   console.log(result.status)
  //   console.log(result.data)
  //   await fs.readFile(indexPath, 'utf8', (err, htmlData) => {
  //     htmlData = htmlData.replace (
  //       `<title>${title}</title>`,
  //       `<title>${result.data.title}</title>`
  //     )
  //     .replace(title, result.data.title)
  //     .replace(description, result.data.description)
  //     .replace(image, result.data.thumb)
  //     return res.send(htmlData)
  //   })
  // } else if ( req.url.indexOf('dat-truoc-iphone-14') != -1 ) {
  //   const result = {
  //     title: 'Đặt trước Iphone 14 series chính hãng - giá siêu ưu đãi',
  //     description: 'Giga Digital nhận đặt trước Iphone 14 series chính hãng với giá siêu ưu đãi dành cho quý khách hàng, chất lượng tốt, bảo hành chính hãng 12 tháng, giao hàng toàn quốc, đổi mới trong 15 ngày, hỗ trợ trả góp 0%. Hotline 0966.061.170',
  //     thumb: 'https://img.gigadigital.vn/image/1662615509223-iphone-14-pro-1.jpg'
  //   }
  //   await fs.readFile(indexPath, 'utf8', (err, htmlData) => {
  //     htmlData = htmlData.replace (
  //       `<title>${result.title}</title>`,
  //       `<title>${result.title}</title>`
  //     )
  //     .replace(title, result.title)
  //     .replace(description, result.description)
  //     .replace(image, result.thumb)
  //     return res.send(htmlData)
  //   })
  // } else {
  //   const valueAray = req.url.split('/')
  //   let params = { value: valueAray[valueAray.length - 1] }
  //   if(valueAray.length == 3) {
  //     params.type = 'product',
  //     params.url = urlProduct
  //   }
  //   if(valueAray.length == 2) {
  //     params.type = 'category',
  //     params.url = urlProduct
  //   }
  //   const result = await axios.get(`${urlProduct}`, {
  //     params: params
  //   })
  //   console.log(result.status)
  //   console.log(result.data)
  //   await fs.readFile(indexPath, 'utf8', (err, htmlData) => {
  //     htmlData = htmlData.replace (
  //       `<title>${title}</title>`,
  //       `<title>${result.data.title}</title>`
  //     )
  //     .replace(title, result.data.title)
  //     .replace(description, result.data.description)
  //     .replace(image, result.data.thumb)
  //     return res.send(htmlData)
  //   })
  // }
  
})


app.listen(port, () => console.log(`Listening on port ${port}`))