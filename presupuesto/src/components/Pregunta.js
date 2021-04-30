import React, {Fragment,useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({actualizarPresupuesto,actualizarRestante,actualizarPregunta}) => {

    const [cantidad, guardarCantidad] = useState(0);
    const [error, actualizarError] = useState(false);

    const definirPresupuesto = e => guardarCantidad( parseInt(e.target.value, 10) );

    const agregarPresupuesto = e => {
        e.preventDefault();

        // Validar
        if(cantidad <= 0 || isNaN(cantidad)) {
            actualizarError(true);
            return;
        }

        // Si pasa la validacion

        // Eliminar mensaje de error
        actualizarError(false);

        actualizarPresupuesto(cantidad);
        actualizarRestante(cantidad);
        actualizarPregunta(false);
    }

    return (
        <Fragment>
            <h2>Coloca tu Presupuesto</h2>

            {error ? <Error mensaje='El presupuesto es incorrecto'/> : null}

            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ingresa tu presupuesto"
                    onChange={definirPresupuesto}
                />
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />
            </form>
        </Fragment>
    );
}

Pregunta.propTypes = {
    actualizarPresupuesto: PropTypes.func.isRequired,
    actualizarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired,
}

export default Pregunta;