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

        const pacienteComConsultaFutura = this.#consultorioService.verificaConsultaFuturaPaciente(cpf);
        if(pacienteComConsultaFutura){
            throw new Error(messageError.PACIENTE_AGENDADO);
        }

        this.#consultorioService.removeConsultasPassadasPaciente(pacienteExiste.cpf);
        this.#consultorioService.removePaciente(pacienteExiste.cpf);
    }

    leEntrada(variavelEntrada){
        return prompt(variavelEntrada);
    }

    listarPacientes(orderBy = undefined){
        if(orderBy === "CPF"){
            let orderedByCPF = this.#consultorioService.listPacientes();
            return orderedByCPF.sort((a, b) => a.paciente.cpf.localeCompare(b.paciente.cpf));
        }else {
            let orderedByNome = this.#consultorioService.listPacientes();
            return orderedByNome.sort((a, b) => a.paciente.nome.localeCompare(b.paciente.nome));
        }
    }

}

export default PacienteService;