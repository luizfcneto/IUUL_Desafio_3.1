import { validateData, validateDataConsulta, validateEntradaListagemConsulta, validateHorario } from "../validations/ConsultaValidation.js";
import { validateCPF } from "../validations/PacienteValidation.js";
import ConsultorioService from "./ConsultorioService.js";
import { messageError } from "../Errors/constant.js";
import { buildDate } from "../utils/dateUtils.js";
import PromptSync from "prompt-sync";
import Consulta from "../models/Consulta.js";

const prompt = new PromptSync({sigint: true});

export default class ConsultaService {
    #consultorioService;

    constructor(){
        this.#consultorioService = new ConsultorioService();
    }

    agendarConsulta(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);
        
        let pacienteCadastrado = this.#consultorioService.findPacienteByCPF(cpf);
        if(pacienteCadastrado.length === 0){
            throw new Error(messageError.PACIENTE_NAO_CADASTRADO);
        }

        let pacienteCadastradoTemConsultaFutura = this.#consultorioService.verificaConsultaFuturaPaciente(cpf);
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

        const dataConsultaDisponivel = this.#consultorioService.verificaDataConsultaDisponivel(dateHorarioInicial, dateHorarioFinal);
        if(dataConsultaDisponivel){
            const consultaNova = new Consulta(dateHorarioInicial, dateHorarioInicial, dateHorarioFinal, pacienteCadastrado[0]);
            this.#consultorioService.addConsulta(consultaNova);
        }else {
            throw new Error(messageError.HORARIO_CONSULTA_INDISPONIVEL);
        }
    }

    cancelarConsulta(){
        let cpf = this.leEntrada("CPF: ");
        validateCPF(cpf);
        
        let pacienteCadastrado = this.#consultorioService.findPacienteByCPF(cpf);
        if(pacienteCadastrado.length === 0){
            throw new Error(messageError.PACIENTE_NAO_CADASTRADO);
        }

        let dataConsulta = this.leEntrada("Data da consulta: ");
        validateDataConsulta(dataConsulta);
        
        let horaInicial = this.leEntrada("Hora inicial: ");
        validateHorario(horaInicial);

        const dateHorarioInicioConsulta = buildDate(dataConsulta, horaInicial);
        this.#consultorioService.removeConsulta(cpf, dateHorarioInicioConsulta);
    }

    listarAgenda(){
        let tipoApresentacao = this.leEntrada("T-Toda ou P-Periodo: ");
        validateEntradaListagemConsulta(tipoApresentacao);

        if(tipoApresentacao === "T"){
            const listaAgendaSemPeriodo = this.#consultorioService.listAgenda();
            return listaAgendaSemPeriodo;
        }else if(tipoApresentacao === "P"){
            let dataInicial = this.leEntrada("Data inicial: ");
            validateData(dataInicial);

            let dataFinal = this.leEntrada("Data final: ");
            validateData(dataFinal);

            dataInicial = buildDate(dataInicial);
            dataFinal = buildDate(dataFinal);

            const listaAgendaComPeriodo = this.#consultorioService.listAgenda(dataInicial, dataFinal);
            return listaAgendaComPeriodo;
        }else {
            throw new Error(messageError.APRESENTACAO_AGENDA_INVALIDO);
        }

    }

    leEntrada(variavelEntrada){
        return prompt(variavelEntrada);
    }
}