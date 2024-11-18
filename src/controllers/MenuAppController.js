import promptSync from "prompt-sync";
import Consultorio from "../models/Consultorio.js";
import Agenda from "../models/Agenda.js";
import { menuAgenda, menuCadastroPacientes, menuPrincipalView, showEncerrandoPrograma, showEntradaInvalida, showVoltandoMenuPrincipal } from "../views/MenuView.js";

const prompt = promptSync({sigint: true});

export default class MenuAppController {
    #consultorio;

    constructor(){
        this.#consultorio = new Consultorio([], new Agenda());
    }

    init(){
        if(this.#consultorio == null){
            this.#consultorio = new Consultorio([], new Agenda());
        }

        let input;
        do {
            menuPrincipalView();
            input = this.leEntrada();
            
            switch(input){
                case 1:
                    this.showMenuCadastroPaciente();
                    break;
                case 2:
                    this.showMenuAgenda();
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

    showMenuCadastroPaciente(){
        let input;
        do {
            menuCadastroPacientes();
            input = this.leEntrada();
            switch(input){
                case 1: 
                    console.log("Cadastrar Novo Paciente");
                    break;
                case 2: 
                    console.log("Excluir Paciente");
                    break;
                case 3:
                    console.log("Listar Pacientes ordenado por CPF");
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

    showMenuAgenda(){
        let input;

        do {
            menuAgenda();
            input = this.leEntrada();

            switch(input){
                case 1: 
                    console.log("Agendar Consulta");
                    break;
                case 2: 
                    console.log("Cancelar Agendamento");
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