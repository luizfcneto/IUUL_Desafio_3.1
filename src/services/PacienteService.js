import PromptSync from "prompt-sync";
import { validateCPF, validateDataNascimento, validateNome } from "../validations/PacienteValidation.js";
import ConsultorioService from "./ConsultorioService.js";
import Paciente from "../models/Paciente.js";
const prompt = new PromptSync({sigint: true});

class PacienteService {
    #consultorioService;

    constructor(){
        this.#consultorioService = new ConsultorioService();
    }

    cadastrarPaciente(){
        let cpf = this.leCPF();
        validateCPF(cpf);

        const pacienteJaExistente = this.#consultorioService.findPacienteByCPF(cpf);
        let nome = this.leNome();
        validateNome(nome);

        let dataNascimento = this.leDataNascimento();
        validateDataNascimento(dataNascimento);
        const pacienteNovo = new Paciente(cpf, nome, dataNascimento);
        this.#consultorioService.addPaciente(pacienteNovo);
    }

    leCPF(){
        return prompt("CPF: ");
    }

    leNome(){
        return prompt("Nome: ");
    }

    leDataNascimento(){
        return prompt("Data de Nascimento: ");
    }

    listarPacientes(){
        return this.#consultorioService.listPacientes();
    }

}

export default PacienteService;