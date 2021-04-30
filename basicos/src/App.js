import React, { Fragment, useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer';
import Producto from './components/Producto';
import Carrito from './components/Carrito';

function App() {

  // State lista de productos
  const [productos, guardarProductos] = useState([
    {id: 1, nombre: 'Camisa Javascript', precio: 60},
    {id: 2, nombre: 'Camisa React Js', precio: 70},
    {id: 3, nombre: 'Camisa Angular', precio: 80},
    {id: 4, nombre: 'Camisa Vue JS', precio: 40},
  ]);

  // State carrito de compras
  const [carrito, agregarProducto] = useState([]);

  const titulo = 'Tienda Virtual';
  const fecha = new Date().getFullYear();

  return (
    <Fragment>
      <Header 
        titulo={titulo}
      />

      <h1>Listado de Productos</h1>
      
      {
        productos.map( producto =>
          <Producto 
            key={producto.id}
            productos={productos}
            producto={producto}
            carrito={carrito}
            agregarProducto={agregarProducto}
          />
        )
      }

      <Carrito
        carrito={carrito}
        agregarProducto={agregarProducto}
      />

      <Footer 
        fecha={fecha}
      />
    </Fragment>
  );
}

export default App;
