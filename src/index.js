import MenuAppController from "./controllers/MenuAppController.js";
import Consultorio from "./models/Consultorio.js";
import ConsultorioService from "./services/ConsultorioService.js";
import { showConsultorioError } from "./views/ConsultorioView.js";

console.log("Sistema de Agenda para Consultório Odontológico");
const consultorioService = new ConsultorioService();
let consultorioFromFile = null;
try {
    consultorioFromFile = await consultorioService.getConsultorioFromFile();
}catch(error){
    showConsultorioError(error.message);
}
export let consultorio = new Consultorio(consultorioFromFile);
await new MenuAppController(consultorioService).init();