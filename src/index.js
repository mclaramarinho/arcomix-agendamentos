import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
import StartColab from './pages/StartColab'
import StartForn from './pages/StartForn'
import { createBrowserRouter, RouterProvider, useParams} from 'react-router-dom';
import './styles/login.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path:'/login',
    element: <Login />,
  },
  {
    path:'/colaborador/:id',
    element: <StartColab  />
  },
  {
    path:'/fornecedor/:id',
    element: <StartForn  />
  },
])
root.render(
  <RouterProvider router={router} />
);