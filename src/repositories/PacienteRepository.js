import { messageError } from "../errors/constant.js";
import Paciente from "../models/Paciente.js";

export default class PacienteRepository {

    constructor(){}

    async getPacienteByCPF(cpf){
        try {
            return await Paciente.findOne({
                where: {
                    cpf: cpf
                }
            });
        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_CONSULTA);
        }
    }

    async getAllPacientesOrderBy(orderProp){
        try {
            return await Paciente.findAll({
                order: [ [orderProp, "ASC"] ]
            });
        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRRO_CONSULTA_LISTA);
        }
    }

    async addPaciente(paciente){
        try {
            return await Paciente.create({
                cpf: paciente.cpf,
                nome: paciente.nome,
                dataNascimento: paciente.dataNascimento
            });
        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_CRIACAO_PACIENTE);
        }
    }

    async removePaciente(cpf){
        try {
            const pacienteRemovido = await Paciente.destroy({
                where: {
                    cpf: cpf
                }
            });
            return pacienteRemovido;
        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_EXCLUSAO_PACIENTE);
        }
    }

}