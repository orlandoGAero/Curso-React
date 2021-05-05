import { useState } from 'react';

const useSelect = (stateInicial, opciones) => {

    const [state, setState] = useState(stateInicial)

    const SelectCategorias = () => (
        <select
            className="browser-default"
            onChange={e => setState(e.target.value)}
            value={state}
        >
            {opciones.map( opcion => (
                <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
            ))}
        </select>
    )

    return [state,SelectCategorias];

}
 
export default useSelect;