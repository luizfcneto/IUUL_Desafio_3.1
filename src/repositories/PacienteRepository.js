import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelizeConfig.js";
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
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_CONSULTA_PACIENTE);
        }
    }

    async getAllPacientesOrderBy(orderProp){
        try {
            // return await Paciente.findAll({
            //     order: [ [orderProp, "ASC"] ]
            // });
            return await sequelize.query(
                `SELECT p.id, p.nome, p.cpf, p."dataNascimento", c.data, c."horaInicial", c."horaFinal", c."pacienteId" 
                    FROM "Paciente" p 
                    LEFT OUTER JOIN "Consulta" c ON p.id = c."pacienteId"
                        WHERE c."data" ISNULL OR c."data" > :dataCorrente
                        ORDER BY ${orderProp} ASC;`,
                {
                    replacements: { dataCorrente: new Date() },
                    type: QueryTypes.SELECT
                }
            );
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