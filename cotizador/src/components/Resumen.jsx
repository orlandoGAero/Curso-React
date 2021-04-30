import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { primerMayuscula } from '../helper';

const ContenedorResumen = styled.div`
    padding: 1rem;
    margin-top: 1rem;
    background-color: #00838f;
    color: #fff;
    text-align: center;
`;

const Resumen = ({datos: {marca,year,plan}}) => {

    if(marca === '' || year === '' || plan === '') return null;

    return (
        <ContenedorResumen>
            <h2>Resumen cotización</h2>

            <ul>
                <li>Marca: { primerMayuscula(marca) }</li>
                <li>Plan: { primerMayuscula(plan) }</li>
                <li>Año del auto: {year}</li>
            </ul>
        </ContenedorResumen>
    );
}

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}

export default Resumen;