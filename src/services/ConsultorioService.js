import { messageError } from "../Errors/constant.js";
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
        return consultorio.pacientes;
    }

    verificaDataConsultaDisponivel(dataComHorarioInicial, dataComHorarioFinal){
        return consultorio.verificaDataConsultaDisponivel(dataComHorarioInicial, dataComHorarioFinal);
    }

    verificaConsultaFuturaPaciente(cpf){
        return consultorio.verificaConsultaFuturaPaciente(cpf);
    }

    addConsulta(consultaNova){
        consultorio.addNewConsulta(consultaNova);
        return true;
    }

    removeConsulta(cpf, dataComHorarioInicial){
        consultorio.removeConsultaDePaciente(cpf, dataComHorarioInicial);
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