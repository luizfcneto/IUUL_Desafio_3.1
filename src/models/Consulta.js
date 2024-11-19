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

    get data(){
        return this.#data;
    }

    get horaInicial(){
        return this.#horaInicial;
    }

    get horaFinal(){
        return this.#horaFinal
    }

    get paciente(){
        return this.#paciente;
    }

    toJSON(){
        return {
            data: this.data,
            horaInicial: this.horaInicial,
            horaFinal: this.horaFinal,
            paciente: this.paciente
        }
    }
}