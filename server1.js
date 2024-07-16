const express = require('express')
const app = express()
const port = 3008
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const axios = require('axios')

const readFileAsync = promisify(fs.readFile)

const urlProduct = 'https://demo.giga.vn/v1/seo'
const urlNew = 'https://news.giga.vn/v1/news/seo'
const title = 'Giga - Đồ gia dụng, công nghệ, chăm sóc sức khỏe, điện tử chính hãng'
const description = 'Giga thế giới đồ gia dụng thông minh, sản phẩm công nghệ, điện tử, chăm sóc sức khỏe, thời trang làm đẹp phục vụ đời sống, hàng chính hãng - giá tốt nhất - bảo hành uy tín. Mua online tại Giga.vn tiện lợi, nhanh chóng, phục vụ tận tâm chuyên nghiệp.'
const image = 'https://img.gigadigital.vn/image/1661826780851-Giga-logo.png'

const indexPath = path.resolve(__dirname, './build', 'index.html')

app.use(express.static(path.resolve(__dirname, './build')))

app.get('*', async (req, res) => {
  try {
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

    let htmlData = await readFileAsync(indexPath, 'utf8');
    htmlData = htmlData
      .replace(`<title>${title}</title>`, `<title>${result.data.title}</title>`)
      .replace(title, result.data.title)
      .replace(description, result.data.description)
      .replace(image, result.data.thumb)
    return res.send(htmlData)
  } catch (error) {
    console.error('Error processing request:', error);
    let htmlData = await readFileAsync(indexPath, 'utf8');
    htmlData = htmlData
      .replace(`<title>${title}</title>`, `<title>${title}</title>`)
      .replace(title, title)
      .replace(description, description)
      .replace(image, image);
    res.status(500).send(htmlData);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`))