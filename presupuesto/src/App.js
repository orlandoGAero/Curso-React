import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Gastos from './components/Gastos';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  const [presupuesto,actualizarPresupuesto] = useState(0);
  const [restante,actualizarRestante] = useState(0);
  const [mostrarpregunta,actualizarPregunta] = useState(true);
  const [gastos,actualizarGastos]= useState([]);
  const [gasto,actualizarGasto] = useState({});
  const [creargasto,actualizarCrearGasto] = useState(false);

  useEffect(() => {
    if(creargasto) {
      // Agrega el nuevo presupuesto
      actualizarGastos([...gastos,gasto])

      // Resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      actualizarRestante(presupuestoRestante);

      // resetear a false
      actualizarCrearGasto(false);
    }
  }, [gasto,creargasto,gastos,restante]);

  return (
    <div className="container">
      <h1>Gasto Semanal</h1>
      <div className="contenido-principal contenido">
        {
          mostrarpregunta 
          ?
            (
              <Pregunta
                actualizarPresupuesto={actualizarPresupuesto}
                actualizarRestante={actualizarRestante}
                actualizarPregunta={actualizarPregunta}
              />
            )
          :
            (
              <div className="row">
                <div className="one-half column">
                  <Formulario
                    actualizarGasto={actualizarGasto}
                    actualizarCrearGasto={actualizarCrearGasto}
                  />
                </div>
                <div className="one-half column">
                  <Gastos
                    gastos={gastos}
                  />
                  <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                  />
                </div>
              </div>
            )
        }

      </div>
    </div>
  );
}

export default App;
