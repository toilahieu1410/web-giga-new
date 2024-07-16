// Tai khoan
import Profile from '../components/profile/index'
import OrderManage from '../components/profile/orderManage'
import OrderDetail from '../components/profile/orderManage/orderDetail'
import Waitting from '../components/notification/waitting'

import CartOrder from '../screen/order/cartOrder'
import CartOrderErp from '../screen/order/cardOrderErp'
import FormInputOrder from '../screen/order/formInputOrder'
import FormInputOrderNotUser from '../screen/order/formInputOrderNotUser'

export const routesAuth = [
  // Tai khoan
  {path:"/tai-khoan/bang-dieu-khien", Component: Waitting, name: "Bảng điều khiển"},
  {path:"/tai-khoan/thong-tin", Component: Profile, name: "Thông tin tài khoản"},
  {path:"/tai-khoan/don-hang", Component: OrderManage, name: "Lộ trình đơn hàng"},
  {path:"/tai-khoan/san-pham-yeu-thich", Component: Waitting, name: "Sản phẩm yêu thích"},

  {path:"/don-hang/gio-hang", Component: CartOrder},
  {path:"/don-hang/gio-hang-erp", Component: CartOrderErp},
  {path:"/don-hang/chi-tiet-don-hang", Component: OrderDetail},
  {path:"/don-hang/thanh-toan", Component: FormInputOrderNotUser}
]