import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // leer citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  const [citas, actualizarCitas] = useState(citasIniciales);

  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas])

  const guardarCita = cita =>
    actualizarCitas([...citas, cita]);
  
  // Eliminar una cita del state
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    actualizarCitas(nuevasCitas);
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              guardarCita={guardarCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {
              citas.map( cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
