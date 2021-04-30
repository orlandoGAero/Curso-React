import styled from '@emotion/styled';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear,calcularMarca,calcularPlan } from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width: 100%;
    margin-top: 2rem;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color ease;

    &:hover {
        background-color: #26c6da;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    margin-bottom: 2rem;
    text-align: center;
`;

const Formulario = ({actualizarResumen,actualizarCargando}) => {

    const [datos, actualizarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });
    const [error, actualizarError] = useState(false);

    const obtenerInformación = e => {
        actualizarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const {marca, year, plan} = datos;

    const cotizarSeguro = e => {
        e.preventDefault();

        //Validar datos
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            actualizarError(true);
            return;
        }

        actualizarError(false);

        // valor base
        let base = 2000;

        // obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);
        
        // por cada año hay que restar el 3%
        base -= ((diferencia * 3) * base / 100);

        // Segun marca incrementar
        // Asiatico 5%
        // Americano 15%
        // Europeo 30%
        base = calcularMarca(marca) * base;
        
        // Según plan aumenta 
        // Básico 20%
        // Completo 50%
        const obtenerPlan = calcularPlan(plan);
        base = parseFloat(obtenerPlan * base).toFixed(2);

        actualizarCargando(true);
        
        setTimeout(() => {
            actualizarCargando(false);
            
            actualizarResumen({
                cotizacion: Number(base),
                datos
            });
        }, 3000);

    }

    return (
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null}

            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformación}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformación}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio" 
                    name="plan"
                    value="basico"
                    checked={plan === 'basico'}
                    onChange={obtenerInformación}
                /> Básico
                <InputRadio 
                    type="radio" 
                    name="plan"
                    value="completo"
                    checked={plan === 'completo'}
                    onChange={obtenerInformación}
                /> Completo
            </Campo>

            <Boton type="submit">Cotizar</Boton>
        </form>
    );
}

Formulario.propTypes = {
    actualizarResumen: PropTypes.func.isRequired,
    actualizarCargando: PropTypes.func.isRequired
}

export default Formulario;