// Homepage
import HomeComp from '../components/home/index'

// auth
import Login from '../components/auth/login'
import LoginErp from '../components/auth/loginErp'
import ForgotPassword from '../components/auth/forgotPassword'
import Productdetail from '../components/product/productDetail'
import Categories from '../components/categories/categories'
import CategoriesMobile from '../components/categories/categoriesMobile'

import FlashSale from '../screen/flashSale'
import CartOrderNotUser from '../screen/order/cartOrderNotUser'
import Checkout from '../screen/order/checkout'
import Thankyou from '../screen/order/thankyou'
import ThankyouBK from '../screen/order/thankyouBK'
import BuyNow from '../screen/order/buyNow'
import BuyNowErp from '../screen/order/buyNowErp'
import SearchProduct from '../screen/search'
import BaoHanh from '../components/product/baoHanh'
import CheckOrderNotUser from '../screen/order/checkOrderNotUser'
import FormInputOrder from '../screen/order/formInputOrder'

// Footer
import ChiNhanh from '../components/footer/chiNhanh'
import HoTroKhachHang from '../components/footer/hoTroKhachHang'
import ChinhSach from '../components/footer/chinhSach'
import GioiThieu from '../components/footer/gioiThieu'
import Preferential from '../components/home/preferential'
import SubCategories from '../components/categories/subCategories'
import Brand from '../components/categories/brand'



export const routes = [
  {path:"/", Component: HomeComp},

  // auth
  {path:"/tai-khoan/tao-tai-khoan", Component: Login},
  {path:"/tai-khoan/quen-mat-khau/:id", Component: ForgotPassword},
  {path:"/tai-khoan/erp", Component: LoginErp},
  {path:"/uu-dai", Component: Preferential, name:'Ưu đãi'},

  // Gia hang & thanh toan
  {path:"/don-hang/gio-hang", Component: CartOrderNotUser, name: 'Giỏ hàng'},
  {path:"/don-hang/dat-hang", Component: Checkout, name: 'Đặt hàng'},
  {path:"/don-hang/thanhtoan", Component: FormInputOrder, name: 'Thanh toán'},
  {path:"/don-hang/thankyou", Component: Thankyou, name: 'Thank you'},
  {path:"/don-hang/thankyou1", Component: ThankyouBK, name: 'Thank you BK'},

  {path:"/trung-tam-bao-hanh", Component: BaoHanh, name:'Trung tâm bảo hành'},

  // Chi tiet san pham
  {path:"/flash-sale", Component: FlashSale, name:'Flash Sale'},
  {path:"/mua-ngay/:slug", Component: BuyNow, name: 'Mua ngay'},
  {path:"/mua-ngay-erp/:slug", Component: BuyNowErp, name: 'Mua ngay ERP'},
  {path:"/don-hang/tra-cuu-don-hang", Component: CheckOrderNotUser, name: 'Tra cứu đơn hàng'},
  {path:"/tim-kiem/:search", Component: SearchProduct, name: 'Tìm kiếm'},
  
  // Footer
  {path:"/chi-nhanh/:chiNhanh", Component: ChiNhanh, name:'Chi nhánh'},
  {path:"/ho-tro/:hotro", Component: HoTroKhachHang, name:'Hỗ trợ'},
  {path:"/chinh-sach/:chinhSach", Component: ChinhSach, name:'Chính sách'},
  {path:"/thong-tin-chung/:gioiThieu", Component: GioiThieu, name:'Giới thiệu'},
  
  {path:"/hang/:slug", Component: Brand, name: 'Hãng'},
  {path:"/:categorySlug", Component: Categories, name:'Chi tiết danh mục'}, 
  // {path:"/:categorySlug/:childSlug", Component: SubCategories, name:'Chi tiết danh mục con'}, 
  {path:"/:categorySlug/:slug", Component: Productdetail, name:'Chi tiết sản phẩm'},
  {path:"/danh-muc", Component: CategoriesMobile, name:'Danh mục Mobile'}

]