import './App.scss';
import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage';
import { NavMenu } from './components/nav-menu/NavMenu';
import { Footer } from './components/footer/Footer';
import { TodosPage } from './pages/TodosPage/TodosPage';
import { GalleryPage } from './pages/GalleryPage/GalleryPage';

type Routes = (RouteObject & { name?: string })[]
export const routes: Routes = [
  { path: '/', name: 'Home', element: <HomePage /> },
  { path: '/todos', name: 'Todos', element: <TodosPage /> },
  { path: '/gallery', name: 'Art Gallery', element: <GalleryPage /> },
  { path: '*', element: <ErrorPage /> }
];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes
  }
]);

function RootLayout() {
  return (
    <>
      <header>
        <NavMenu />
      </header>
      <main className="max-w-screen-xl mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function App() {
  return <RouterProvider router={router} />;
}