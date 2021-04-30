import React from 'react';
import PropTypes from 'prop-types';
import Gasto from './Gasto';

const Gastos = ({gastos}) => (
    <div className="gastos-realizados">
        <h2>Gastos</h2>
        {
            gastos.map(gasto => 
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                />
            )
        }
    </div>
);

Gastos.propTypes = {
    gastos: PropTypes.array.isRequired
}

export default Gastos;