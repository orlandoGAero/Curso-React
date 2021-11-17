import { useState, useEffect } from 'react';

import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [totalpaginas, setTotalPaginas] = useState(1);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {

    const consultarAPI = async () => {
      if(busqueda === '') return;

      const porPagina = 30;
      const key = '19890564-53c558cac49b796a84bbd816a';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${porPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // Calcular total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / porPagina);
      setTotalPaginas(calcularTotalPaginas);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultarAPI();
  }, [busqueda,paginaActual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;

    if(nuevaPaginaActual === 0) return;

    setPaginaActual(nuevaPaginaActual);
  }
  
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    setPaginaActual(nuevaPaginaActual);
  }
  
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario setBusqueda={setBusqueda} setPaginaActual={setPaginaActual}/>
      </div>
      <div className="row justify-content-center mb-5">
        <ListadoImagenes 
          imagenes={imagenes}
        />
        { imagenes.length > 0 
          ? (<>
              { paginaActual === 1 ? null : ( 
                <button 
                  type="button"
                  className="btn-info mr-1"
                  onClick={paginaAnterior}
                >&laquo; Anterior</button>
              ) }

              { paginaActual === totalpaginas ? null : (
                <button 
                  type="button"
                  className="btn-info"
                  onClick={paginaSiguiente}
                >Siguiente &raquo;</button>
              ) }
              </> 
            )
          : null
        }
      </div>
    </div>
  );
}

export default App;
