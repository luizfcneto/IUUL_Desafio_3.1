import ConsultorioService from "../services/ConsultorioService.js";
import { listPacientes, showPacienteCadastradoComSucesso, showPacienteFalha, showPacienteRemovidoComSucesso } from "../views/PacienteView.js";

class PacienteController {
    #consultorioService;

    constructor(){
        this.#consultorioService = new ConsultorioService();
    }

    async cadastrarPaciente(){
        try {
            this.#consultorioService.cadastrarPaciente();
            await this.#consultorioService.atualizarArquivoConsultorio();
            showPacienteCadastradoComSucesso();
        }catch(error){ 
            showPacienteFalha(error.message);
        }
    }

    async excluirPaciente(){
        try {
            this.#consultorioService.excluirPaciente();
            await this.#consultorioService.atualizarArquivoConsultorio();  
            showPacienteRemovidoComSucesso();
        }catch(error){
            showPacienteFalha(error.message);
        }
    }

    listarPacientes(orderBy = undefined){
        const pacientesEComConsultasAgendadas = this.#consultorioService.listarPacientes(orderBy);
        listPacientes(pacientesEComConsultasAgendadas);
    }

}

export default new PacienteController();