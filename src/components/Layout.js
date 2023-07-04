import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


function Layout() {
 
  return ( 
    <div>
      <Header/>
      <Outlet/>  {/* El contenido de las rutas se renderiza aca, lo que genera una especie de Layout como en Jade*/}
      <Footer/>
    </div>
   );
}

export default Layout;