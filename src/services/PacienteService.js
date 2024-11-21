import PromptSync from "prompt-sync";
import { validateCPF, validateDataNascimento, validateNome } from "../validations/PacienteValidation.js";
import ConsultorioService from "./ConsultorioService.js";
import Paciente from "../models/Paciente.js";
import { messageError } from "../Errors/constant.js";

const prompt = new PromptSync({sigint: true});

class PacienteService {
    #consultorioService;

    constructor(){
        this.#consultorioService = new ConsultorioService();
    }

    cadastrarPaciente(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);

        const pacienteJaExistente = this.#consultorioService.findPacienteByCPF(cpf);
        if(pacienteJaExistente.length !== 0){
            throw new Error(messageError.PACIENTE_JA_CADASTRADO);
        }

        let nome = this.leEntrada("Nome: ");
        validateNome(nome);

        let dataNascimento = this.leEntrada("Data de Nascimento: ");
        validateDataNascimento(dataNascimento);
        const pacienteNovo = new Paciente(cpf, nome, dataNascimento);
        this.#consultorioService.addPaciente(pacienteNovo);
    }

    excluirPaciente(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);
        const [pacienteExiste] = this.#consultorioService.findPacienteByCPF(cpf);
        this.#consultorioService.removePaciente(pacienteExiste.cpf);
    }

    leEntrada(variavelEntrada){
        return prompt(variavelEntrada);
    }

    listarPacientes(){
        return this.#consultorioService.listPacientes();
    }

}

export default PacienteService;