import React, {Fragment,useState} from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types'

const Formulario = ({guardarCita}) => {

    const [cita,actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [error,actualizarError] = useState(false);

    // Funcion que se ejecuta cada que el usuario escribe en el input
    const actualizarState = e => 
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });

    // Extraer valores de la cita
    const { mascota,propietario,fecha,hora,sintomas } = cita;

    // Cuando el usuario presiona el botón Agregar Cita
    const crearCita = e => {
        e.preventDefault();
        
        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ) {
            actualizarError(true);
            return;
        }

        // Eliminar Mensaje de error
        actualizarError(false);

        // Asignar id
        cita.id = uuid();

        // Crear la cita
        guardarCita(cita);

        // reiniciar Form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }

    return ( 
    
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>: null}

            <form 
                onSubmit={crearCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Dueño"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>

    );
}

Formulario.propTypes = {
    guardarCita: PropTypes.func.isRequired
}

export default Formulario;