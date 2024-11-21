import ConsultaService from "../services/ConsultaService.js";
import { showConsultaAgendadaComSucesso, showConsultaCanceladaComSucesso, showConsultaFalha } from "../views/ConsultaView.js";

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
}

export default new ConsultaController();