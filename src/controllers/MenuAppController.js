import promptSync from "prompt-sync";
import { menuAgenda, menuCadastroPacientes, menuPrincipalView, showEncerrandoPrograma, showEntradaInvalida, showVoltandoMenuPrincipal } from "../views/MenuView.js";
import PacienteController from "./PacienteController.js";
import ConsultorioService from "../services/ConsultorioService.js";
import ConsultaController from "./ConsultaController.js";

const prompt = promptSync({sigint: true});

export default class MenuAppController {
    #consultorioService;

    constructor(consultorioService = null){
        if(consultorioService){
            this.#consultorioService = consultorioService;
        }else {
            this.#consultorioService = new ConsultorioService();
        }
    }

    async init(){
        let input;
        do {
            menuPrincipalView();
            input = this.leEntrada();
            
            switch(input){
                case 1:
                    await this.showMenuCadastroPaciente();
                    break;
                case 2:
                    await this.showMenuAgenda();
                    break;
                case 3: 
                    showEncerrandoPrograma();
                    return;
                default: 
                    showEntradaInvalida();
                    input = this.leEntrada();
            }
        } while (input != 3)
    }

    async showMenuCadastroPaciente(){
        let input;
        do {
            menuCadastroPacientes();
            input = this.leEntrada();
            switch(input) {
                case 1: 
                    await PacienteController.cadastrarPaciente();
                    break;
                case 2: 
                    await PacienteController.excluirPaciente();
                    break;
                case 3:
                    await PacienteController.listarPacientes("p.cpf");
                    break;
                case 4: 
                    await PacienteController.listarPacientes("p.nome");
                    break;
                case 5:
                    showVoltandoMenuPrincipal();
                    return;
                default:
                    showEntradaInvalida();
            }

        } while (input != 5);
    }

    async showMenuAgenda(){
        let input;

        do {
            menuAgenda();
            input = this.leEntrada();

            switch(input){
                case 1: 
                    await ConsultaController.agendarConsulta();
                    break;
                case 2: 
                    await ConsultaController.cancelarConsulta();
                    break;
                case 3:
                    await ConsultaController.listarAgenda();
                    break;
                case 4:
                    showVoltandoMenuPrincipal();
                    return;
                default:
                    showEntradaInvalida();
            }

        } while(input != 4);
    }

    leEntrada() {
        return parseInt(prompt());
    }

}