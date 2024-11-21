import { messageError } from "../Errors/constant.js";
import Consulta from "./Consulta.js";
import Paciente from "./Paciente.js";

export default class Consultorio {
    #pacientes;
    #consultas;

    constructor(consultorio){
        if(consultorio === null){
            this.#pacientes = [];
            this.#consultas = [];
        }else {
            this.#pacientes = consultorio?.pacientes?.length > 0 ? consultorio.pacientes.map(paciente => Paciente.fromObject(paciente)) : [];
            this.#consultas = consultorio?.consultas?.length > 0 ? consultorio.consultas.map(consulta => Consulta.fromObject(consulta)) : [];
        }
    }

    findPacienteByCPF(cpf) {
        return this.#pacientes.filter((paciente) => paciente.cpf === cpf);
    }

    addNewPaciente(paciente){
        this.#pacientes.push(paciente);
        return true;
    }

    removePaciente(cpf){
        const pacienteIndex = this.#pacientes.findIndex((paciente) => {
            return paciente.cpf === cpf;
        });

        if(pacienteIndex === -1){
            throw new Error(messageError.PACIENTE_NAO_CADASTRADO);
        }

        const pacienteRemovido = this.#pacientes.splice(pacienteIndex, 1); 
        return pacienteRemovido;
    }

    addNewConsulta(consulta){
        this.#consultas.push(consulta);
    }

    verificaDataConsultaDisponivel(dataComHorarioInicial, dataComHorarioFinal){
        const colisao =  this.#consultas.some((consulta) => {
                return (dataComHorarioInicial >= consulta.horaInicial && dataComHorarioInicial < consulta.horaFinal) || (dataComHorarioFinal > consulta.horaInicial && dataComHorarioFinal <= consulta.horaFinal) || (dataComHorarioInicial <= consulta.horaInicial && dataComHorarioFinal >= consulta.horaFinal);
            });
        return !colisao;
    }

    verificaConsultaFuturaPaciente(cpf){
        const dataCorrente = new Date();
        const jaPossuiConsulta = this.#consultas.some((consulta) => {
            return consulta.horaInicial > dataCorrente && consulta.paciente.cpf === cpf;
        });
        
        return jaPossuiConsulta;
    }

    removeConsultaDePaciente(cpf, dataComHorarioInicial){
        const consultaIndex = this.#consultas.findIndex((consulta) => {
            return consulta.paciente.cpf === cpf && consulta.horaInicial.getTime() == dataComHorarioInicial.getTime();
        });

        if(consultaIndex === -1){
            throw new Error(messageError.CONSULTA_NAO_ENCONTRADA);
        }

        const consultaRemovida = this.#consultas.splice(consultaIndex, 1);
        return consultaRemovida;
    }

    toString(){
        return `Consultas: ${this.#consultas.toString()}\nListaPacientes: ${this.#pacientes.toString()}`;
    }

    get pacientes(){
        return this.#pacientes;
    }

    get consultas(){
        return this.#consultas;
    }

    toJSON(){
        return {
            pacientes: this.pacientes.map(paciente => paciente.toJSON()),
            consultas: this.consultas.map(consulta => consulta.toJSON())
        }
    }

}