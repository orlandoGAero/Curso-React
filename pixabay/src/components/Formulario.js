import { useState } from 'react';
import Error from "./Error";

const Formulario = ({setBusqueda,setPaginaActual}) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);
    const buscarImagenes = e => {
        e.preventDefault();

        // validar
        if(termino.trim() === "") {
            setError(true);
            return;
        }

        setError(false);

        // enviar el termino de busqueda al componente principal
        setBusqueda(termino);
        setPaginaActual(1);
    }

    return (
        <form
            onSubmit={buscarImagenes}
        >
            <div className="form-row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {(error) ? <Error mensaje="Ingresa un término de búsqueda"/> : null}
        </form>
    );
}
 
export default Formulario;