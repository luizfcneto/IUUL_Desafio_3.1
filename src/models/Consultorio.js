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

    listaTodosPacientesComAgendados(){
        const dataCorrente = new Date();
        const pacientesAgendados = this.#consultas.filter(consulta => {
            return consulta.horaInicial > dataCorrente;
        });

        let todosPacientesComAgendados = this.#pacientes.map(paciente => {
            const [consultaAgendada] = pacientesAgendados.filter(consulta => consulta.paciente.cpf === paciente.cpf);
            if(consultaAgendada !== 0){
                return {
                    paciente,
                    consulta: consultaAgendada
                }
            }else {
                return {
                    paciente
                }
            }
        });

        return todosPacientesComAgendados;
    }

    listaTodasConsultas(dataInicial = undefined, dataFinal = undefined){
        if(dataInicial && dataFinal){
            const consultasPorPeriodo = this.#consultas.filter(consulta => {
                const data = new Date(consulta.data);
                return dataInicial <= data && data <= dataFinal; 
            });
            return consultasPorPeriodo;
        }else {
            return this.consultas;
        }
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