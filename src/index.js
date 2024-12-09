import MenuAppController from "./controllers/MenuAppController.js";
import sequelize from "./config/sequelizeConfig.js";
import criaAssociacoesTabelas from "./config/associations.js";

try {
    await sequelize.authenticate();
    criaAssociacoesTabelas();
    await sequelize.sync({ alter: true });
    console.log("Conexão com banco de dados estabelecida com sucesso");
    console.log("Sistema de Agenda para Consultório Odontológico");
    await new MenuAppController().init();
}catch(error){
    console.log(error.name, error.message);
    console.log("Não foi possível estabelecer conexão com banco de dados");
}