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
        const pacienteIndex = consultorio.pacientes.findIndex((paciente) => {
            return paciente.cpf === cpf;
        });

        if(pacienteIndex === -1){
            throw new Error("Erro: paciente nao encontrado");
        }

        const pacienteRemovido = consultorio.pacientes.splice(pacienteIndex, 1); 
        return pacienteRemovido;
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