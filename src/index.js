import MenuAppController from "./controllers/MenuAppController.js";
import sequelize from "./config/sequelizeConfig.js";

try {
    await sequelize.authenticate();
    console.log("Conexão com banco de dados estabelecida com sucesso");
    console.log("Sistema de Agenda para Consultório Odontológico");
    await new MenuAppController().init();
}catch(error){
    console.log(error.name, error.message);
    console.log("Não foi possível estabelecer conexão com banco de dados");
}