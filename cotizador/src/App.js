import { useState, Fragment } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #fff;
  padding: 3rem;
`;

function App() {

  const [resumen, actualizarResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: '',
    }
  });

  const [cargando, actualizarCargando] = useState(false);

  const {cotizacion,datos} = resumen;

  return (
    <Contenedor>
      <Header titulo="Cotizador de Seguros"/>
      <ContenedorFormulario>
        <Formulario
          actualizarResumen={actualizarResumen}
          actualizarCargando={actualizarCargando}
        />

        {
          cargando 
          ? 
            <Spinner/> 
          :
            <Fragment>
              <Resumen
                datos={datos}
              />
              <Resultado
                cotizacion={cotizacion}
              />
            </Fragment>
        }

      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
