import { Op, QueryTypes } from "sequelize";
import { messageError } from "../errors/constant.js";
import Paciente from "../models/Paciente.js";
import Consulta from "../models/Consulta.js";

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
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_CONSULTA_PACIENTE);
        }
    }

    async getAllPacientesOrderBy(orderProp){
        try {
            await Paciente.findAll({
                include: [
                    {
                        model: Consulta,
                        as: 'consultas',
                        where: {
                            data: {
                                [Op.or]: [null, { [Op.gt]: new Date() }]
                            }
                        },
                        required: false
                    }
                ],
                order: [[orderProp, 'ASC']]
            });

        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRRO_CONSULTA_LISTA_PACIENTE);
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
            await Paciente.destroy({
                where: {
                    cpf: cpf
                }
            });
            
        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_EXCLUSAO_PACIENTE);
        }
    }

}