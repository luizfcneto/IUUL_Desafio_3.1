import { messageError } from "../Errors/constant.js";
import { consultorio } from "../index.js";
import Consulta from "../models/Consulta.js";
import Paciente from "../models/Paciente.js";
import ConsultorioRepository from "../repositories/ConsultorioRepository.js";
import { buildDate } from "../utils/dateUtils.js";
import { validateData, validateDataConsulta, validateEntradaListagemConsulta, validateHorario } from "../validations/ConsultaValidation.js";
import { validateCPF, validateDataNascimento, validateNome } from "../validations/PacienteValidation.js";
import { showConsultorioError } from "../views/ConsultorioView.js";
import PromptSync from "prompt-sync";

const prompt = new PromptSync({sigint: true});

export default class ConsultorioService{
    #consultorioRepository;

    constructor(consultorioRepository){
        if(!consultorioRepository){
            this.#consultorioRepository = new ConsultorioRepository();
        }
    }

    cadastrarPaciente(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);

        const pacienteJaExistente = this.#consultorioRepository.buscarPacientePorCPF(cpf);
        if(pacienteJaExistente.length !== 0){
            throw new Error(messageError.PACIENTE_JA_CADASTRADO);
        }

        let nome = this.leEntrada("Nome: ");
        validateNome(nome);

        let dataNascimento = this.leEntrada("Data de Nascimento: ");
        validateDataNascimento(dataNascimento);
        const pacienteNovo = new Paciente(cpf, nome, dataNascimento);
        this.#consultorioRepository.addPaciente(pacienteNovo);
    }

    excluirPaciente(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);
        const [pacienteExiste] = this.#consultorioRepository.buscarPacientePorCPF(cpf);

        const pacienteComConsultaFutura = this.#consultorioRepository.verificaConsultaFuturaPaciente(cpf);
        if(pacienteComConsultaFutura){
            throw new Error(messageError.PACIENTE_AGENDADO);
        }

        this.#consultorioRepository.removeConsultasPassadasDoPaciente(pacienteExiste.cpf);
        this.#consultorioRepository.removerPaciente(pacienteExiste.cpf);
    }

    listarPacientes(orderBy = undefined){
        if(orderBy === "CPF"){
            let orderedByCPF = consultorio.listaTodosPacientesComAgendados();
            return orderedByCPF.sort((a, b) => a.paciente.cpf.localeCompare(b.paciente.cpf));
        }else {
            let orderedByNome = consultorio.listaTodosPacientesComAgendados();
            return orderedByNome.sort((a, b) => a.paciente.nome.localeCompare(b.paciente.nome));
        }
    }

    agendarConsulta(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);
        
        let pacienteCadastrado = this.#consultorioRepository.buscarPacientePorCPF(cpf);
        if(pacienteCadastrado.length === 0){
            throw new Error(messageError.PACIENTE_NAO_CADASTRADO);
        }

        let pacienteCadastradoTemConsultaFutura = this.#consultorioRepository.verificaConsultaFuturaPaciente(cpf);
        if(pacienteCadastradoTemConsultaFutura){
            throw new Error(messageError.PACIENTE_JA_POSSUI_CONSULTA_FUTURA);
        }

        let dataConsulta = this.leEntrada("Data da consulta: ");
        validateDataConsulta(dataConsulta);
        
        let horaInicial = this.leEntrada("Hora inicial: ");
        validateHorario(horaInicial);
        
        let horaFinal = this.leEntrada("Hora final: ");
        validateHorario(horaFinal);
        
        const dateHorarioInicial = buildDate(dataConsulta, horaInicial);
        const dateHorarioFinal = buildDate(dataConsulta, horaFinal);

        if(dateHorarioFinal < dateHorarioInicial){
            throw new Error(messageError.DATA_CONSULTA_INVALIDA);
        }

        const dataConsultaDisponivel = this.#consultorioRepository.verificaDataConsultaDisponivel(dateHorarioInicial, dateHorarioFinal);
        if(dataConsultaDisponivel){
            const consultaNova = new Consulta(dateHorarioInicial, dateHorarioInicial, dateHorarioFinal, pacienteCadastrado[0]);
            this.#consultorioRepository.addConsulta(consultaNova);
        }else {
            throw new Error(messageError.HORARIO_CONSULTA_INDISPONIVEL);
        }
    }

    cancelarConsulta(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);
        
        let pacienteCadastrado = this.#consultorioRepository.buscarPacientePorCPF(cpf);
        if(pacienteCadastrado.length === 0){
            throw new Error(messageError.PACIENTE_NAO_CADASTRADO);
        }

        let dataConsulta = this.leEntrada("Data da consulta: ");
        validateDataConsulta(dataConsulta);
        
        let horaInicial = this.leEntrada("Hora inicial: ");
        validateHorario(horaInicial);

        const dateHorarioInicioConsulta = buildDate(dataConsulta, horaInicial);
        this.#consultorioRepository.removeConsultaDePacientePorCPFEData(cpf, dateHorarioInicioConsulta);
    }

    listarAgenda(){
        let tipoApresentacao = this.leEntrada("T-Toda ou P-Periodo: ");
        validateEntradaListagemConsulta(tipoApresentacao);

        if(tipoApresentacao === "T"){
            const listaAgendaSemPeriodo = consultorio.listaTodasConsultas();
            return listaAgendaSemPeriodo;
        }else if(tipoApresentacao === "P"){
            let dataInicial = this.leEntrada("Data inicial: ");
            validateData(dataInicial);

            let dataFinal = this.leEntrada("Data final: ");
            validateData(dataFinal);

            dataInicial = buildDate(dataInicial);
            dataFinal = buildDate(dataFinal);

            const listaAgendaComPeriodo = consultorio.listaTodasConsultas(dataInicial, dataFinal);
            return listaAgendaComPeriodo;
        }else {
            throw new Error(messageError.APRESENTACAO_AGENDA_INVALIDO);
        }
    }

    leEntrada(variavelEntrada){
        return prompt(variavelEntrada);
    }

    async atualizarArquivoConsultorio(){
        try {
            await this.#consultorioRepository.atualizarConsultorio(consultorio);
        }catch(error){
            showConsultorioError(error.message);
        }
    }

    async getConsultorioFromFile(){
        try {
            return await this.#consultorioRepository.getConsultorio();
        }catch(error){
            showConsultorioError(error.message);
            return null;
        }
    }

}