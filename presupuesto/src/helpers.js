export const revisarRestante = (presupuesto,restante) => {
    let clase;

    // 25% del restante
    if((presupuesto / 4) > restante) {
        clase = 'alert alert-danger';
    } else if((presupuesto / 2) > restante) {
        // 50% del restante
        clase = 'alert alert-warning';
    } else {
        clase = 'alert alert-success';
    }

    return clase;
}