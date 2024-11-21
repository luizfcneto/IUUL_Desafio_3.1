import { buildDateStringFromDate, buildHorarioStringFromDate, convertTempoDuracaoToString } from "../utils/dateUtils.js";
import Paciente from "./Paciente.js";

export default class Consulta {
    #data;
    #horaInicial;
    #horaFinal;
    #paciente;
    #tempo;

    constructor(data, horaInicial, horaFinal, paciente){
        this.#data = data;
        this.#horaInicial = new Date(horaInicial);
        this.#horaFinal = new Date(horaFinal);
        this.#paciente = paciente;
        this.#tempo = this.#setTempo();
    }

    #setTempo(){
        return convertTempoDuracaoToString((this.#horaFinal - this.#horaInicial) / 60000);
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

    get tempo(){
        return this.#tempo;
    }

    toString(){
        return `${buildDateStringFromDate(this.data)} ${buildHorarioStringFromDate(this.horaInicial)} ${buildHorarioStringFromDate(this.horaFinal)} ${this.tempo} ${this.paciente.nome} ${this.paciente.dataNascimento}`;
    }

    toJSON(){
        return {
            data: this.data,
            horaInicial: this.horaInicial,
            horaFinal: this.horaFinal,
            tempo: this.tempo,
            paciente: this.paciente.toJSON()
        }
    }

    static fromObject(obj){
        return new Consulta(obj.data, obj.horaInicial, obj.horaFinal, Paciente.fromObject(obj.paciente));
    }
}