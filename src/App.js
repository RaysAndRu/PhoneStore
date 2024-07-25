import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import { Cart } from "./pages/cart/Cart.tsx";
import { Profile } from "./pages/profile/Profile";
import { Products } from './pages/products/Products.tsx';
import { Product } from './pages/product/Product.tsx';

const router = createBrowserRouter([
  {
    path:'/cart',
    element:<Cart/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/',
    element:<Products/>
  },
  {
    path:'/product/:id',
    element:<Product/>
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
