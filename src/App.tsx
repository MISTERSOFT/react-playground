import './App.scss';
import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage';
import { NavMenu } from './components/nav-menu/NavMenu';
import { Footer } from './components/footer/Footer';
import { TodosPage } from './pages/TodosPage/TodosPage';
import { GalleryPage } from './pages/GalleryPage/GalleryPage';
// import { AuthContext } from './contexts/authContext';
// import { useReducer } from 'react';
// import { authReducer } from './redux/reducers/authReducer';
import { ReduxProvider } from './redux/ReduxProvider';
import { StorePage } from './pages/StorePage/StorePage';
import { ProductPage } from './pages/StorePage/ProductPage';
import { StoreIndexPage } from './pages/StorePage/StoreIndexPage';
import { ShoppingCartDrawer } from './components/shopping-cart-drawer/ShoppingCartDrawer';
import { PaymentSuccessfulModal } from './components/payment-successful-modal/PaymentSuccessfulModal';
import { ToastContainer } from './components/toast/ToastContainer';

type Routes = (RouteObject & { name?: string })[]
export const routes: Routes = [
  { path: '/', name: 'Home', element: <HomePage /> },
  { path: 'todos', name: 'Todos', element: <TodosPage /> },
  { path: 'gallery', name: 'Art Gallery', element: <GalleryPage /> },
  {
    path: 'store',
    name: 'Store',
    element: <StorePage />,
    children: [
      { index: true, element: <StoreIndexPage /> },
      { path: ':productId', element: <ProductPage /> }
    ]
  },
  { path: '*', element: <ErrorPage /> }
];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes
  }
]);

// const initialAuth = {
//   user: undefined
// };

function RootLayout() {
  // const [loggedUser, dispatch] = useReducer(authReducer, initialAuth);
  // const authContextValue = { user: loggedUser.user, dispatch };

  return (
    <ReduxProvider>
      {/* <AuthContext.Provider value={authContextValue}> */}
        <header>
          <NavMenu />
        </header>
        <main className="max-w-screen-xl mx-auto p-4">
          <Outlet />
          <ShoppingCartDrawer />
          <PaymentSuccessfulModal />
          <ToastContainer />
        </main>
        <Footer />
      {/* </AuthContext.Provider> */}
    </ReduxProvider>
  );
}

export function App() {
  return <RouterProvider router={router} />;
}