import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import PropTypes from 'prop-types';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({actualizarMoneda, actualizarCriptomoneda}) => {

    const [listaCripto, setListaCripto] = useState([]);
    const [error, setError] = useState(false);

    // Utilizar useMoneda
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ];

    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige criptomoneda', '', listaCripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

            const resultado = await axios.get(url);

            setListaCripto(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    const consultarCriptomonedas = e => {
        e.preventDefault();

        if(moneda === '' || criptomoneda === '') {
            setError(true);
            return;
        }

        // si todo es valido
        setError(false);
        actualizarMoneda(moneda);
        actualizarCriptomoneda(criptomoneda);
    }

    return (
        <form
            onSubmit={consultarCriptomonedas}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas/>

            <SelectCripto/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

Formulario.propTypes = {
    actualizarMoneda : PropTypes.func.isRequired,
    actualizarCriptomoneda: PropTypes.func.isRequired
}

export default Formulario;