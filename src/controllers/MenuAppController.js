import promptSync from "prompt-sync";
import { menuAgenda, menuCadastroPacientes, menuPrincipalView, showEncerrandoPrograma, showEntradaInvalida, showVoltandoMenuPrincipal } from "../views/MenuView.js";
import PacienteController from "./PacienteController.js";
import ConsultorioService from "../services/ConsultorioService.js";

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
                    PacienteController.cadastrarPaciente();
                    await this.#consultorioService.atualizarArquivoConsultorio();
                    break;
                case 2: 
                    console.log("Excluir Paciente");

                    this.#consultorioService.atualizarArquivoConsultorio();
                    break;
                case 3:
                    PacienteController.listarPacientes();
                    break;
                case 4: 
                    console.log("Listar Pacientes ordenado por nome")
                    break;
                case 5:
                    showVoltandoMenuPrincipal();
                    return;
                default:
                    showEntradaInvalida();
                    input = this.leEntrada();
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
                    console.log("Agendar Consulta");
                    this.#consultorioService.atualizarArquivoConsultorio();
                    break;
                case 2: 
                    console.log("Cancelar Agendamento");
                    this.#consultorioService.atualizarArquivoConsultorio();
                    break;
                case 3:
                    console.log("Listar Agenda");
                    break;
                case 4:
                    showVoltandoMenuPrincipal();
                    return;
                default:
                    showEntradaInvalida();
                    input = this.leEntrada();
            }

        } while(input != 4);
    }

    leEntrada() {
        return parseInt(prompt());
    }

}