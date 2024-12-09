import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig.js";

class Paciente extends Model {};

Paciente.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "Paciente",
    timestamps: false
});

export default Paciente;