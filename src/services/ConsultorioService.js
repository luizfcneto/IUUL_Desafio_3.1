import ConsultaDTO from "../dtos/ConsultaDTO.js";
import PacienteDTO from "../dtos/PacienteDTO.js";
import { messageError } from "../errors/constant.js";
import ConsultaRepository from "../repositories/ConsultaRepository.js";
import PacienteRepository from "../repositories/PacienteRepository.js";
import { buildDate, buildDateOnly } from "../utils/dateUtils.js";
import { validateData, validateDataConsulta, validateEntradaListagemConsulta, validateHorario } from "../validations/ConsultaValidation.js";
import { validateCPF, validateDataNascimento, validateNome } from "../validations/PacienteValidation.js";
import { showConsultorioError } from "../views/ConsultorioView.js";
import PromptSync from "prompt-sync";

const prompt = new PromptSync({sigint: true});

export default class ConsultorioService{
    #consultorioRepository;
    #pacienteRepository;
    #consultaRepository;

    constructor(pacienteRepository = undefined, consultaRepository = undefined){
        this.#pacienteRepository = new PacienteRepository();
        this.#consultaRepository = new ConsultaRepository();
    }

    async cadastrarPaciente(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);

        const pacienteJaExistente = await this.#pacienteRepository.getPacienteByCPF(cpf);
        if(pacienteJaExistente){
            throw new Error(messageError.PACIENTE_JA_CADASTRADO);
        }

        let nome = this.leEntrada("Nome: ");
        validateNome(nome);

        let dataNascimento = this.leEntrada("Data de Nascimento: ");
        validateDataNascimento(dataNascimento);
        dataNascimento = buildDateOnly(dataNascimento);
        const pacienteNovo = new PacienteDTO(cpf, nome, dataNascimento);
        await this.#pacienteRepository.addPaciente(pacienteNovo);
    }

    async excluirPaciente(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);
        const pacienteEntity = await this.#pacienteRepository.getPacienteByCPF(cpf);

        const pacienteTemConsultaFutura = await this.#consultaRepository.verificaConsultaFutura(cpf);
        if(pacienteTemConsultaFutura){
            throw new Error(messageError.PACIENTE_AGENDADO);
        }

        await this.#consultaRepository.removeConsultasPassadasPaciente(pacienteEntity.id);
        await this.#pacienteRepository.removePaciente(pacienteEntity.cpf);
    }

    async listarPacientes(orderBy = undefined){
        const allowedColumns = ['nome', 'cpf'];
        if (!allowedColumns.includes(orderBy)) {
            throw new Error("Erro: Coluna de ordenação inválida");
        }
        const pacientesEntity = await this.#pacienteRepository.getAllPacientesOrderBy(orderBy); 
        return PacienteDTO.fromEntities(pacientesEntity);
    }

    async agendarConsulta(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);
        
        let pacienteCadastrado = await this.#pacienteRepository.getPacienteByCPF(cpf);
        if(!pacienteCadastrado){
            throw new Error(messageError.PACIENTE_NAO_CADASTRADO);
        }

        let pacienteCadastradoTemConsultaFutura = await this.#consultaRepository.verificaConsultaFutura(cpf);
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
        dataConsulta = buildDateOnly(dataConsulta);

        if(dateHorarioFinal < dateHorarioInicial){
            throw new Error(messageError.DATA_CONSULTA_INVALIDA);
        }

        let consultaNova = new ConsultaDTO(dataConsulta, dateHorarioInicial, dateHorarioFinal, pacienteCadastrado.id); 

        const dataConsultaDisponivel = await this.#consultaRepository.verificaHorarioDisponivel(consultaNova);
        if(dataConsultaDisponivel){
            await this.#consultaRepository.addConsulta(consultaNova);
        }else {
            throw new Error(messageError.HORARIO_CONSULTA_INDISPONIVEL);
        }
    }

    async cancelarConsulta(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);
        
        let pacienteCadastrado = await this.#pacienteRepository.getPacienteByCPF(cpf);
        if(pacienteCadastrado.length === 0){
            throw new Error(messageError.PACIENTE_NAO_CADASTRADO);
        }

        let dataConsulta = this.leEntrada("Data da consulta: ");
        validateDataConsulta(dataConsulta);
        
        let horaInicial = this.leEntrada("Hora inicial: ");
        validateHorario(horaInicial);

        const dataComHorarioInicioConsulta = buildDate(dataConsulta, horaInicial);
        await this.#consultaRepository.removeConsultaPacienteDataComHorarioInicio(pacienteCadastrado.id, dataComHorarioInicioConsulta);
    }

    async listarAgenda(){
        let tipoApresentacao = this.leEntrada("T-Toda ou P-Periodo: ");
        validateEntradaListagemConsulta(tipoApresentacao);

        console.log(consulta);
        if(tipoApresentacao === "T"){
            // const listaAgendaSemPeriodo = consultorio.listaTodasConsultas();
            return listaAgendaSemPeriodo;
        }else if(tipoApresentacao === "P"){
            let dataInicial = this.leEntrada("Data inicial: ");
            validateData(dataInicial);

            let dataFinal = this.leEntrada("Data final: ");
            validateData(dataFinal);

            dataInicial = buildDate(dataInicial);
            dataFinal = buildDate(dataFinal);

            // const listaAgendaComPeriodo = consultorio.listaTodasConsultas(dataInicial, dataFinal);
            return listaAgendaComPeriodo;
        }else {
            throw new Error(messageError.APRESENTACAO_AGENDA_INVALIDO);
        }
    }

    leEntrada(variavelEntrada){
        return prompt(variavelEntrada);
    }

}