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
        timezone: "-03:00",
    },
    horaInicial: {
        type: DataTypes.TIME,
        allowNull: false,
        timezone: "-03:00",
    },
    horaFinal: {
        type: DataTypes.TIME,
        allowNull: false,
        timezone: "-03:00",
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