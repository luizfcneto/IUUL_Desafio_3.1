import { buildDateStringFromDate, buildHorarioStringFromDate, convertTempoDuracaoToString } from "../utils/dateUtils.js";
import PacienteDTO from "./PacienteDTO.js";

export default class ConsultaDTO {
    #data;
    #horaInicial;
    #horaFinal;
    #paciente;
    #tempo;

    constructor(data, horaInicial, horaFinal, paciente, tempo = undefined){
        this.#data = data;
        this.#horaInicial = new Date(horaInicial);
        this.#horaFinal = new Date(horaFinal);
        this.#paciente = paciente;
        this.#tempo = horaInicial && horaFinal ? this.#setTempo() : undefined;
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
        return `${buildDateStringFromDate(new Date(this.data)).padEnd(11)} ${buildHorarioStringFromDate(new Date(this.horaInicial)).padEnd(7)} ${buildHorarioStringFromDate(new Date(this.horaFinal)).padEnd(7)} ${this.tempo.padEnd(7)} ${this.paciente.nome.padEnd(25)} ${this.paciente.dataNascimento}`;
    }

    toShortString(){
        return `                Agendado para: ${buildDateStringFromDate(new Date(this.data))} 
                ${buildHorarioStringFromDate(new Date(this.horaInicial))} às ${buildHorarioStringFromDate(new Date(this.horaFinal))}`
    }

    toJSON(){
        return {
            data: this.data,
            horaInicial: this.horaInicial,
            horaFinal: this.horaFinal,
            tempo: this.tempo,
            // paciente: this.paciente.toJSON()
        }
    }

    static fromObject(obj){
        return new ConsultaDTO(obj.data, obj.horaInicial, obj.horaFinal, PacienteDTO.fromObject(obj.paciente));
    }

    static fromEntity(entity) {
        return new ConsultaDTO(
            entity.data,
            entity.horaInicial,
            entity.horaFinal,
            entity.pacienteId
        );
    }
    
    static fromEntities(entities) {
        return entities.map(entity => ConsultaDTO.fromEntity(entity));
    }
}