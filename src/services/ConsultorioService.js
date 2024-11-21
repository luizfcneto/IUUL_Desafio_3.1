import { consultorio } from "../index.js";
import ConsultorioRepository from "../repositories/ConsultorioRepository.js";
import { showConsultorioError } from "../views/ConsultorioView.js";

export default class ConsultorioService{
    constructor(){}

    findPacienteByCPF(cpf){
        return consultorio.findPacienteByCPF(cpf);
    }

    addPaciente(pacienteNovo){
        consultorio.addNewPaciente(pacienteNovo);
        return true;
    }

    removePaciente(cpf){
        return consultorio.removePaciente(cpf);
    }

    listPacientes(){
        return consultorio.listaTodosPacientesComAgendados();
    }

    verificaDataConsultaDisponivel(dataComHorarioInicial, dataComHorarioFinal){
        return consultorio.verificaDataConsultaDisponivel(dataComHorarioInicial, dataComHorarioFinal);
    }

    verificaConsultaFuturaPaciente(cpf){
        return consultorio.verificaConsultaFuturaPaciente(cpf);
    }

    removeConsultasPassadasPaciente(cpf){
        return consultorio.removeConsultasPassadasDoPaciente(cpf);
    }

    addConsulta(consultaNova){
        consultorio.addNewConsulta(consultaNova);
        return true;
    }

    removeConsulta(cpf, dataComHorarioInicial){
        consultorio.removeConsultaDePacientePorCPFEData(cpf, dataComHorarioInicial);
    }

    listAgenda(dataInicial = undefined, dataFinal = undefined){
        return consultorio.listaTodasConsultas(dataInicial, dataFinal);
    }

    async atualizarArquivoConsultorio(){
        try {
            await new ConsultorioRepository().atualizarConsultorio(consultorio);
        }catch(error){
            showConsultorioError(error.message);
        }
    }

    async getConsultorioFromFile(){
        try {
            return await new ConsultorioRepository().getConsultorio();
        }catch(error){
            showConsultorioError(error.message);
            return null;
        }
    }

}