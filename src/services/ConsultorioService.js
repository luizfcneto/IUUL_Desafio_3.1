import { messageError } from "../Errors/constant.js";
import { consultorio } from "../index.js";
import ConsultorioRepository from "../repositories/ConsultorioRepository.js";
import { showConsultorioError } from "../views/ConsultorioView.js";

export default class ConsultorioService{
    constructor(){}

    findPacienteByCPF(cpf){
        const paciente = consultorio.findPacienteByCPF(cpf);
        if(paciente.length !== 0){
            throw new Error(messageError.PACIENTE_JA_CADASTRADO);
        }
        return paciente;
    }

    addPaciente(pacienteNovo){
        consultorio.addNewPaciente(pacienteNovo);
        return true;
    }

    listPacientes(){
        return consultorio.pacientes;
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