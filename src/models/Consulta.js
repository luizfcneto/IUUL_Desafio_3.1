import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig.js";

class Consulta extends Model {};

Consulta.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    horaInicial: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    horaFinal: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tempo: {
        type: DataTypes.TIME,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Consulta',
    timestamps: false
});


export default Consulta;