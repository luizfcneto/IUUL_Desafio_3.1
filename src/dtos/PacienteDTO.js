import { buildDateStringFromDate } from "../utils/dateUtils.js";
import ConsultaDTO from "./ConsultaDTO.js";

export default class PacienteDTO {
    #cpf;
    #nome;
    #dataNascimento;
    #idade;
    #consultas;

    constructor(cpf, nome, dataNascimento, idade = undefined, consultas = undefined) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento,
        this.#idade = idade ? idade : this.calculaIdade();
        this.#consultas = consultas;
    }

    calculaIdade(){
        const dataCorrente = new Date();
        let idade = dataCorrente.getFullYear() - this.dataNascimento.getFullYear();
        const mesAtual = dataCorrente.getMonth();
        const diaAtual = dataCorrente.getDate();

        if(mesAtual < this.dataNascimento.getMonth() || (mesAtual === this.dataNascimento.getMonth() && diaAtual < this.dataNascimento.getDate())){
            idade--;
        }

        return idade;
    }

    get cpf(){
        return this.#cpf;
    }

    get nome(){
        return this.#nome;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }

    get idade(){
        return this.#idade;
    }

    get consultas(){
        return this.#consultas;
    }

    toString(){
        const baseInfo = `${this.cpf.padEnd(15)} ${this.nome.padEnd(35)} ${buildDateStringFromDate(this.dataNascimento).padEnd(15)} ${this.idade}`;
        if (this.consultas && this.consultas.length > 0) {
            return baseInfo + `\n` + this.consultas.map(consulta => consulta.toShortString()).join('\n');
        }
        return baseInfo;    }

    toJSON(){
        return {
            cpf: this.cpf,
            nome: this.nome,
            dataNascimento: buildDateStringFromDate(this.dataNascimento),
            idade: this.idade,
            consultas: this.consultas
        }
    }

    static fromObject(obj){
        return new PacienteDTO(obj.cpf, obj.nome, obj.dataNascimento, obj.idade);
    }

    static fromEntity(entity){
        console.log("fromEntity de PacienteDTO", entity);
        // const consultas = entity.consultas ? ConsultaDTO.fromEntities(entity.data, entity.horaInicial, entity.horaFinal, entity.pacienteId) : [];
        return new PacienteDTO(
            entity.cpf, 
            entity.nome, 
            new Date(entity.dataNascimento), 
            null, 
            entity.consultas === undefined || entity.consultas === null ? ConsultaDTO.fromEntity({...entity}) : entity.consultas
        );

    }

    static fromEntities(entities){  
        return entities.map(entity => PacienteDTO.fromEntity(entity));
    }
}