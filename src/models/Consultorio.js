export default class Consultorio {
    #pacientes;
    #agenda;

    constructor(pacientes = [], agenda){
        this.#agenda = agenda;
        this.#pacientes = pacientes;
    }

    
}