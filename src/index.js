import MenuAppController from "./controllers/MenuAppController.js";
import sequelize from "./config/sequelizeConfig.js";
import criaAssociacoesTabelas from "./config/associations.js";
import { showAppErrorDatabaseConnection, showAppInitMessage } from "./views/AppView.js";

try {
    await sequelize.authenticate();
    criaAssociacoesTabelas();
    await sequelize.sync({ alter: true });
    showAppInitMessage();
    await new MenuAppController().init();
}catch(error){
    console.log(error.name, error.message);
    showAppErrorDatabaseConnection();
}