export default class Consulta {
    #data;
    #horaInicial;
    #horaFinal;
    #paciente;

    constructor(data, horaInicial, horaFinal, paciente){
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
        this.#paciente = paciente;
    }
}