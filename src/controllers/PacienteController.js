import PacienteService from "../services/PacienteService.js";
import { listPacientes, showPacienteCadastradoComSucesso, showPacienteFalha } from "../views/PacienteView.js";

class PacienteController {
    #pacienteService;

    constructor(){
        this.#pacienteService = new PacienteService();
    }

    cadastrarPaciente(){
        try {
            this.#pacienteService.cadastrarPaciente();
            showPacienteCadastradoComSucesso();
        }catch(error){ 
            showPacienteFalha(error.message);
        }
    }

    listarPacientes(){
        const pacientes = this.#pacienteService.listarPacientes();
        listPacientes(pacientes);
    }

}

export default new PacienteController();