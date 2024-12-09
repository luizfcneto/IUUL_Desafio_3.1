import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig.js";

class Consulta extends Model {};

Consulta.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    horaInicial: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    horaFinal: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    tempo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Consulta',
    timestamps: false
});


export default Consulta;