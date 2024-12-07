import fs from "fs/promises";
import path from "path";
import { messageError } from "../Errors/constant.js";
import { fileURLToPath } from "url";
// import { consultorio } from "../index.js";

export default class ConsultorioRepository {
    #consultorioPath;

    constructor() {
        const __filename = import.meta.url;
        const __dirname = path.dirname(fileURLToPath(__filename));
        this.#consultorioPath = path.join(__dirname, '../data/consultorio.json');
    }

    get consultorioPath(){
        return this.#consultorioPath;
    }

    async atualizarConsultorio(){
        try {
            const data = JSON.stringify(consultorio, null, 2);
            await fs.writeFile(this.consultorioPath, data, 'utf8');
        }catch(error){
            throw new Error(messageError.ERRO_ATUALIZAR_CONSULTORIO);
        }
    }

    async getConsultorio(){
        try {
            const data = await fs.readFile(this.consultorioPath, 'utf8');
            return JSON.parse(data);
        }catch(error){
            throw new Error(messageError.ERRO_BUSCAR_CONSULTORIO);
        }
    }

    buscarPacientePorCPF(cpf){
        return consultorio.pacientes.filter((paciente) => paciente.cpf === cpf);
    }

    addPaciente(paciente){
        consultorio.pacientes.push(paciente);
        return true;
    }

    removerPaciente(cpf){
        const pacienteIndex = consultorio.pacientes.findIndex((paciente) => {
            return paciente.cpf === cpf;
        });

        if(pacienteIndex === -1){
            throw new Error(messageError.PACIENTE_NAO_CADASTRADO);
        }

        const pacienteRemovido = consultorio.pacientes.splice(pacienteIndex, 1); 
        return pacienteRemovido;
    }

    addConsulta(consulta) {
        consultorio.consultas.push(consulta);
        return true;
    }

    verificaDataConsultaDisponivel(dataComHorarioInicial, dataComHorarioFinal){
        const colisao =  consultorio.consultas.some((consulta) => {
                return (dataComHorarioInicial >= consulta.horaInicial && dataComHorarioInicial < consulta.horaFinal) 
                    || (dataComHorarioFinal > consulta.horaInicial && dataComHorarioFinal <= consulta.horaFinal) 
                    || (dataComHorarioInicial <= consulta.horaInicial && dataComHorarioFinal >= consulta.horaFinal);
            });
        return !colisao;
    }

    verificaConsultaFuturaPaciente(cpf){
        const dataCorrente = new Date();
        const jaPossuiConsulta = consultorio.consultas.some((consulta) => {
            return consulta.horaInicial > dataCorrente && consulta.paciente.cpf === cpf;
        });
        
        return jaPossuiConsulta;
    }

    removeConsultaDePacientePorCPFEData(cpf, dataComHorarioInicial){
        const consultaIndex = consultorio.consultas.findIndex((consulta) => {
            return consulta.paciente.cpf === cpf && consulta.horaInicial.getTime() == dataComHorarioInicial.getTime();
        });

        if(consultaIndex === -1){
            throw new Error(messageError.CONSULTA_NAO_ENCONTRADA);
        }

        const consultaRemovida = consultorio.consultas.splice(consultaIndex, 1);
        return consultaRemovida;
    }

    removeConsultasPassadasDoPaciente(cpf){
        const dataCorrente = new Date();
        const consultaIndex = consultorio.consultas.map((consulta, index) => {
            if(consulta.horaFinal < dataCorrente && consulta.paciente.cpf === cpf){
                return index;   
            }
        });
        consultaIndex.sort((a, b) => b - a);
        consultaIndex.forEach(index => this.removeConsultaDePaciente(index)); 
    }

    removeConsultaDePaciente(consultaIndex){
        const consultaRemovida = consultorio.consultas.splice(consultaIndex, 1);
        return consultaRemovida;
    }
}
