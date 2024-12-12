import ConsultorioService from "../services/ConsultorioService.js";
import { listAgenda, showConsultaAgendadaComSucesso, showConsultaCanceladaComSucesso, showConsultaFalha } from "../views/ConsultaView.js";

class ConsultaController {
    #consultorioService;

    constructor(){
        this.#consultorioService = new ConsultorioService();
    }

    async agendarConsulta(){
        try {
            await this.#consultorioService.agendarConsulta();
            showConsultaAgendadaComSucesso();
        }catch(error){
            showConsultaFalha(error.message);
        }
    }

    async cancelarConsulta(){
        try {
            await this.#consultorioService.cancelarConsulta();
            showConsultaCanceladaComSucesso();
        }catch(error){
            showConsultaFalha(error.message);
        }
    }

    async listarAgenda(){
        try {
            const agenda = await this.#consultorioService.listarAgenda();
            listAgenda(agenda);
        }catch(error){
            showConsultaFalha(error.message);
        }
    }
}

export default new ConsultaController();