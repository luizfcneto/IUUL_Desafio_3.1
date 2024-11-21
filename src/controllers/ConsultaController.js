import ConsultaService from "../services/ConsultaService.js";
import { listAgenda, showConsultaAgendadaComSucesso, showConsultaCanceladaComSucesso, showConsultaFalha } from "../views/ConsultaView.js";

class ConsultaController {
    #consultaService;

    constructor(){
        this.#consultaService = new ConsultaService();
    }

    agendarConsulta(){
        try {
            this.#consultaService.agendarConsulta();
            showConsultaAgendadaComSucesso();
        }catch(error){
            showConsultaFalha(error.message);
        }
    }

    cancelarConsulta(){
        try {
            this.#consultaService.cancelarConsulta();
            showConsultaCanceladaComSucesso();
        }catch(error){
            showConsultaFalha(error.message);
        }
    }

    listarAgenda(){
        try {
            const agenda = this.#consultaService.listarAgenda();
            listAgenda(agenda);
        }catch(error){
            showConsultaFalha(error.message);
        }
    }
}

export default new ConsultaController();