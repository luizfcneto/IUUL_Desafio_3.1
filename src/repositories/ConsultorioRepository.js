import fs from "fs/promises";
import path from "path";
import { messageError } from "../Errors/constant.js";
import { fileURLToPath } from "url";
import { consultorio } from "../index.js";

export default class ConsultorioRepository {
    #consultorioPath;

    constructor() {
        const __filename = import.meta.url;
        const __dirname = path.dirname(fileURLToPath(__filename));
        this.#consultorioPath = path.join(__dirname, '../data/consultorio.json');
    }

    get consultorioPath(){
        return this.#consultorioPath;
    }

    async atualizarConsultorio(){
        try {
            const data = JSON.stringify(consultorio, null, 2);
            await fs.writeFile(this.consultorioPath, data, 'utf8');
        }catch(error){
            throw new Error(messageError.ERRO_ATUALIZAR_CONSULTORIO);
        }
    }

    async getConsultorio(){
        try {
            const data = await fs.readFile(this.consultorioPath, 'utf8');
            return JSON.parse(data);
        }catch(error){
            throw new Error(messageError.ERRO_BUSCAR_CONSULTORIO);
        }
    }
}