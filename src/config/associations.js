import Paciente from "../models/Paciente.js";
import Consulta from "../models/Consulta.js";

const criaAssociacoesTabelas = () => {
    Paciente.hasMany(Consulta, {
        foreignKey: "pacienteId",
        as: "consultas",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    Consulta.belongsTo(Paciente, {
        foreignKey: "pacienteId",
        as: "paciente",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });
}

export default criaAssociacoesTabelas;