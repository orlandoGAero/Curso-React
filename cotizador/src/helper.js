
// Obtiene la diferencia de años
export function obtenerDiferenciaYear (year) {
    return new Date().getFullYear() - year;
} 

// Calcula el total a pagar segun la marca
export function calcularMarca(marca) {
    let incremento;

    switch (marca) {
        case 'asiatico':
            incremento = 1.05;
            break;
        case 'americano':
            incremento = 1.15;
            break;
        case 'europeo':
            incremento = 1.30;
            break;
    
        default:
            break;
    }

    return incremento;
}

export function calcularPlan(plan) {
    return plan === 'basico' ? 1.20 : 1.50;
}

export function primerMayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}