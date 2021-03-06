import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContenedorFrase = styled.div`
    background-color: #fff;
    padding: 3rem;
    border-radius: .5rem;
    max-width: 800px;

    @media (min-width: 992px) {
        margin-top: 18rem;
    }

    h1 {
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        position: relative;
        padding-left: 4rem;

        &::before {
            content: open-quote;
            font-size: 10rem;
            color: black;
            position: absolute;
            left: -1rem;
            top: -2rem;
        }
    }

    p {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 1.4rem;
        font-weight: bold;
        text-align: right;
        color: #666;
        margin-top: 2rem;
    }
`;

const Frase = ({frase: {author,quote}}) => 
    ( 
        <ContenedorFrase>
            <h1>{quote}</h1> 
            <p>- {author}</p>
        </ContenedorFrase>
    );

Frase.propTypes = {
    frase: PropTypes.object.isRequired
}

export default Frase;