import { buildDateStringFromDate } from "../utils/dateUtils.js";
import ConsultaDTO from "./ConsultaDTO.js";

export default class PacienteDTO {
    #cpf;
    #nome;
    #dataNascimento;
    #idade;
    #consultas;

    constructor(cpf, nome, dataNascimento, idade = undefined, consultas = []) {
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
        const template = `${this.cpf.padEnd(15)} ${this.nome.padEnd(35)} ${buildDateStringFromDate(this.dataNascimento).padEnd(15)} ${this.idade}`;
        if (this.consultas && this.consultas.length > 0) {
            return template + `\n` + this.consultas.map(consulta => consulta.toShortString()).join('\n');
        }
        return template;    
    }

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

    static fromEntity(entity) {
        const consultas = entity.consultas
            ? entity.consultas.map(consulta => ConsultaDTO.fromEntity(consulta))
            : [];
    
        return new PacienteDTO(
            entity.cpf,
            entity.nome,
            new Date(entity.dataNascimento),
            null,
            consultas
        );
    }
    
    static fromEntities(entities) {
        return entities.map(entity => PacienteDTO.fromEntity(entity));
    }
}