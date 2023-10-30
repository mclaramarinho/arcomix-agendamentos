import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
import Start from './pages/Start'
import { createBrowserRouter, RouterProvider, useParams} from 'react-router-dom';
import './styles/index.css'
import './styles/login.css'
import './styles/Navbar.css'
import './styles/BackBtn.css'
import './styles/MenuTabs.css'
import './styles/TabAgendar.css'
import './styles/TabAgendamentos.css'
import './styles/TabBtn.css'
import './styles/PerfilColab.css'

import Perfil from './pages/Perfil';
import Relatorio from './pages/PDFViewer';

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
    element: <Start />,
    
  }, 
  {
    path: "/colaborador/:id/relatorio/:tipoRelatorio",
    element: <Relatorio />
  },
  {
    path: "/colaborador/:id/perfil",
    element: <Perfil />
  },
  {
    path:'/fornecedor/:id',
    element: <Start />,
    children:[{
      path: "relatorio",
      element: <Relatorio />
    }]
  }  
])


root.render(
  <RouterProvider router={router} />
);