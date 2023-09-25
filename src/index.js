import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
import StartColab from './pages/StartColab'
import StartForn from './pages/StartForn'
import { createBrowserRouter, RouterProvider, useParams} from 'react-router-dom';
import './styles/login.css'
import './styles/Navbar.css'
import './styles/BackBtn.css'
import './styles/MenuTabs.css'
import PerfilColab from './pages/PerfilColab';

const root = ReactDOM.createRoot(document.getElementById('root'));


const router = createBrowserRouter([
  {
    path:'/',
    element: <Login />,
    children:[
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path:'/colaborador/:id/',
    element: <StartColab  />
  },  
  {
    path: "/colaborador/:id/perfil",
    element: <PerfilColab />
  },
  {
    path:'/fornecedor/:id',
    element: <StartForn  />
  },
])


root.render(
  <RouterProvider router={router} />
);