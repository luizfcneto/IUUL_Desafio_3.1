import ConsultorioService from "../services/ConsultorioService.js";
import { listPacientes, showPacienteCadastradoComSucesso, showPacienteFalha, showPacienteRemovidoComSucesso } from "../views/PacienteView.js";

class PacienteController {
    #consultorioService;

    constructor(){
        this.#consultorioService = new ConsultorioService();
    }

    async cadastrarPaciente(){
        try {
            await this.#consultorioService.cadastrarPaciente();
            showPacienteCadastradoComSucesso();
        }catch(error){ 
            showPacienteFalha(error.message);
        }
    }

    async excluirPaciente(){
        try {
            await this.#consultorioService.excluirPaciente();
            showPacienteRemovidoComSucesso();
        }catch(error){
            showPacienteFalha(error.message);
        }
    }

    async listarPacientes(orderBy = undefined){
        const pacientesEComConsultasAgendadas = await this.#consultorioService.listarPacientes(orderBy);       
        listPacientes(pacientesEComConsultasAgendadas);
    }

}

export default new PacienteController();