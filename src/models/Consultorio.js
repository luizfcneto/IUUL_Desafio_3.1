import Agenda from "./Agenda.js";
import Paciente from "./Paciente.js";

export default class Consultorio {
    #pacientes;
    #agenda;

    constructor(consultorio){
        if(consultorio === null){
            this.#pacientes = [];
            this.#agenda = new Agenda();
        }else {
            this.#pacientes = consultorio?.pacientes?.length > 0 ? consultorio.pacientes.map(paciente => Paciente.fromObject(paciente)) : [];
            this.#agenda = consultorio?.agenda === null || consultorio?.agenda === undefined ? new Agenda() : consultorio.agenda;
        }
    }

    findPacienteByCPF(cpf) {
        return this.#pacientes.filter((paciente) => paciente.cpf === cpf);
    }

    addNewPaciente(paciente){
        this.#pacientes.push(paciente);
        return true;
    }

    toString(){
        return `Agenda: ${this.#agenda.toString()}\nListaPacientes: ${this.#pacientes.toString()}`;
    }

    get pacientes(){
        return this.#pacientes;
    }

    get agenda(){
        return this.#agenda;
    }

    toJSON(){
        return {
            pacientes: this.pacientes,
            agenda: this.agenda
        }
    }

}