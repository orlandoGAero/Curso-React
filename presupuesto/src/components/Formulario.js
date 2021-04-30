import React, { useState } from 'react';
import shortid from 'shortid'
import PropTypes from 'prop-types';
import Error from './Error';

const Formulario = ({actualizarGasto,actualizarCrearGasto}) => {

    const [nombre, actualizarNombre] = useState("");
    const [cantidad, actualizarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === "" || cantidad <= 0 || isNaN(cantidad)) {
            guardarError(true);
            return;
        }
        
        guardarError(false);
        
        //Construir el gasto
        const gasto = {
            nombre: nombre.trim(),
            cantidad,
            id: shortid.generate()
        }

        //Pasar el gasto al componente principal
        actualizarGasto(gasto);
        actualizarCrearGasto(true);

        //Resetear el form
        actualizarNombre("");
        actualizarCantidad(0);
    }

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            {error ? <Error mensaje="Ambos campos son obligatorios o cantidad incorrecta" /> : null}
            
            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className='u-full-width'
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => actualizarNombre(e.target.value)}
                />
            </div>
            
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className='u-full-width'
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => actualizarCantidad( parseInt( e.target.value,10 ) )}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    );
}

Formulario.propTypes = {
    actualizarGasto: PropTypes.func.isRequired,
    actualizarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;