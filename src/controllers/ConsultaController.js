import ConsultorioService from "../services/ConsultorioService.js";
import { listAgenda, showConsultaAgendadaComSucesso, showConsultaCanceladaComSucesso, showConsultaFalha } from "../views/ConsultaView.js";

class ConsultaController {
    #consultorioService;

    constructor(){
        this.#consultorioService = new ConsultorioService();
    }

    async agendarConsulta(){
        try {
            this.#consultorioService.agendarConsulta();
            await this.#consultorioService.atualizarArquivoConsultorio();
            showConsultaAgendadaComSucesso();
        }catch(error){
            showConsultaFalha(error.message);
        }
    }

    async cancelarConsulta(){
        try {
            this.#consultorioService.cancelarConsulta();
            await this.#consultorioService.atualizarArquivoConsultorio();
            showConsultaCanceladaComSucesso();
        }catch(error){
            showConsultaFalha(error.message);
        }
    }

    listarAgenda(){
        try {
            const agenda = this.#consultorioService.listarAgenda();
            listAgenda(agenda);
        }catch(error){
            showConsultaFalha(error.message);
        }
    }
}

export default new ConsultaController();