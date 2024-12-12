import { messageError } from "../errors/constant.js";
import Consulta from "../models/Consulta.js";
import sequelize from "../config/sequelizeConfig.js";
import { QueryTypes } from "sequelize";

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
            throw new Error("Erro: erro ao tentar realizar uma busca de uma consulta");
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
                        AND :horaFinal > c."horaInicial;"`
                ,
                {
                    replacements: {data, horaInicial, horaFinal} 
                }
            )
            return results.length === 0;
        }catch(error){
            console.log(error.name, error.message);
            throw new Error("Erro: erro ao tentar verificar consulta com horario disponível");
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
            throw new Error("Erro: erro ao tentar cadastrar nova consulta, pois paciente já possui consulta marcada");
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

            console.log(consultaCriada);
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
            throw new Error("Erro: erro ao tentar remover consultas passadas de paciente");
        }
    }

    async removeConsultaPacienteDataComHorarioInicio(pacienteId, dataComHorarioInicioConsulta){
        console.log(pacienteId, dataComHorarioInicioConsulta);
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
            throw new Error("Erro: erro ao tentar remover uma consulta de um paciente");
        }

    }
}