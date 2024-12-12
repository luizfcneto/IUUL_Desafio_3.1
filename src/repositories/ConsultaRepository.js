import { messageError } from "../errors/constant.js";
import Consulta from "../models/Consulta.js";
import sequelize from "../config/sequelizeConfig.js";
import { Op, QueryTypes } from "sequelize";
import Paciente from "../models/Paciente.js";

export default class ConsultaRepository {
    constructor(){}

    async getConsulta(cpf){
        try {
            const consultaEncontrada = await sequelize.query(
                `SELECT c."data", c."horaInicial", c."horaFinal", c.tempo, p.cpf, p.nome, p."dataNascimento" FROM "Consulta" c 
                    INNER JOIN "Paciente" p ON c."pacienteId" = p.id 
	                WHERE p.cpf = :cpf;`,
                {
                    replacements: { cpf },
                    type: QueryTypes.SELECT,
                }
            );
            return consultaEncontrada;
        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_BUSCA_DE_UMA_CONSULTA);
        }
    }
    
    async verificaHorarioDisponivel(consultaNova){
        const { data, horaInicial, horaFinal } = consultaNova;
        try {
            const [results, metadata] = await sequelize.query(
                `SELECT 1
                 FROM "Consulta" c
                    WHERE c."data" = :data
                        AND :horaInicial < c."horaFinal"
                        AND :horaFinal > c."horaInicial";`
                ,
                {
                    replacements: {data, horaInicial, horaFinal} 
                }
            )
            return results.length === 0;
        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_CONSULTA_COM_HORARIO_INDISPONIVEL);
        }
    }

    async verificaConsultaFutura(cpf){
        try {
            const dataCorrente = new Date();
            const consultaEncontrada = await sequelize.query(
                `SELECT 1
                 FROM "Consulta" c
                    INNER JOIN "Paciente" p ON c."pacienteId" = p.id
                    WHERE c."data" > :dataCorrente AND p.cpf = :cpf;`,
                {
                    replacements: { dataCorrente, cpf },
                    type: QueryTypes.SELECT
                }
            );

            return consultaEncontrada.length >= 1;

        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_PACIENTE_JA_POSSUI_CONSULTA_MARCADA);
        }
    }


    async addConsulta(consulta){
        try {
            const consultaCriada = await Consulta.create({
                data: consulta.data,
                horaInicial: consulta.horaInicial,
                horaFinal: consulta.horaFinal,
                tempo: consulta.tempo,
                pacienteId: consulta.paciente
            });

            return consultaCriada;
        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_CRIACAO_CONSULTA);
        }
    }

    async removeConsultasPassadasPaciente(id){
        try {
            await Consulta.destroy({
                where: {
                    pacienteId: id
                }
            });

        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_EXCLUIR_CONSULTAS_PASSADAS_PACIENTE);
        }
    }

    async removeConsultaPacienteDataComHorarioInicio(pacienteId, dataComHorarioInicioConsulta){
        try {
            await sequelize.query(
                `DELETE FROM "Consulta" c
                    WHERE c."pacienteId" = :pacienteId
                    AND c."horaInicial" = :dataComHorarioInicioConsulta;`,
                {
                    replacements: { pacienteId, dataComHorarioInicioConsulta },
                    type: QueryTypes.DELETE 
                }
            );

        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_EXCLUSAO_CONSULTA_PACIENTE);
        }
    }

    async listaTodasConsultas(dataInicial = null, dataFinal = null){
        try {
            const whereClause = {};
            if(dataInicial && dataFinal){
                whereClause.data = {
                    [Op.between]: [dataInicial, dataFinal]
                };
            }

            await Consulta.findAll({
                where: whereClause,
                include: [{
                    model: Paciente,
                    as: "paciente",
                }],
                order: [['data', 'ASC'],  ['horaInicial', 'ASC']]
            });

        }catch(error){
            console.log(error.name, error.message);
            throw new Error(messageError.BANCO_DE_DADOS_ERRO_LISTAR_TODAS_CONSULTAS);
        }
    }
}