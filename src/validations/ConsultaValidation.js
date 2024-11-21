import { messageError } from "../Errors/constant.js";

export const validateDataConsulta = (dataConsulta) => {
    if(dataConsulta === null || dataConsulta === undefined || dataConsulta.length < 10){
        throw new Error(messageError.DATA_CONSULTA_INVALIDA);
    }

    const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([1-9]\d{3})$/;
    if(!regexData.test(dataConsulta)){
        throw new Error(messageError.DATA_CONSULTA_INVALIDA);
    }

    const dataCorrente = new Date();
    const [_, dia, mes, ano] = dataConsulta.match(regexData);
    let consultaDate;
    try {
        consultaDate = new Date(ano, mes - 1, dia);
    }catch(error){
        throw new Error(messageError.DATA_CONSULTA_INVALIDA);
    }

    if(dataCorrente > consultaDate){
        throw new Error(messageError.DATA_CONSULTA_INVALIDA);
    }
}

export const validateHorario = (horario) => {
    if(horario === null || horario === undefined || horario.length !== 4){
        throw new Error(messageError.HORARIO_INDALIDO);
    }

    const regexHorario = /^(0[8-9]|1[0-8])(00|15|30|45)$/;
    if(!regexHorario.test(horario)){
        throw new Error(messageError.HORARIO_INDALIDO);
    }
}