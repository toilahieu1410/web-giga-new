import HomeNew from '../screen/news/layout/homeNew'
import CategoryNews from '../components/news/categoryNews'
import DetailNews from '../components/news/detailNews'
import TagNew from '../components/news/tagNews'
import ListDataVideo from '../components/news/homeNews/video-hot/listDataVideo'
import SearchNews from '../components/news/searchNews'

export const routeNew = [
  {path:"/tin-tuc", Component: HomeNew},
  {path:"/tin-tuc/tim-kiem/:search", Component: SearchNews},
  {path:"/tin-tuc/tag/:tag", Component: TagNew},
  {path:"/tin-tuc/video/:slug", Component: ListDataVideo},
  {path:"/tin-tuc/:slug", Component: CategoryNews},
  {path:"/tin-tuc/:category/:slug", Component: DetailNews},
 
]
