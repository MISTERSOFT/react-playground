import './App.scss';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '*', element: <ErrorPage /> }
    ]
  }
]);

function RootLayout() {
  return (
    <>
      <header>
        <h1>My Super Cool App</h1>
        Nav goes here
      </header>
      <main>
        {/* Render the app routes via the Layout Outlet */}
        <Outlet />
      </main>
      <footer>2023 c</footer>
    </>
  );
}

export function App() {
  return <RouterProvider router={router} />;
}