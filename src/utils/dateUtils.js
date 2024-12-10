export const buildDate = (dateString, horarioString) => {
    const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([1-9]\d{3})$/;
    const [_, dia, mes, ano] = dateString.match(regexData);

    if(horarioString === null || horarioString === undefined){
        horarioString = "0000";
    }
    const hora = parseInt(horarioString.substring(0,2));
    const minutos = parseInt(horarioString.substring(2,4));
    const date = new Date(ano, mes - 1, dia, hora, minutos);
    return date;
}

export const buildDateStringFromDate = (date) => {
    const dia = date.getUTCDate();
    const mes = date.getUTCMonth();
    const ano = date.getUTCFullYear();
    const templateDia = dia < 10 ? "0" + dia : dia;
    const templateMes = mes + 1 < 10 ? "0" + (mes + 1) : mes + 1;
    return `${templateDia}/${templateMes}/${ano}`;
}

export const buildHorarioStringFromDate = (date) => {
    const horario = date.getUTCHours();
    const minutos = date.getUTCMinutes();
    const templateHorario = horario < 10 ? "0" + horario : horario;
    const templateMinutos = minutos < 10 ? "0" + minutos : minutos;
    return `${templateHorario}:${templateMinutos}`;
}

export const convertTempoDuracaoToString = (minutos) => {
    const templateHorario = Math.floor(minutos / 60) > 9 ? Math.floor(minutos / 60) : "0" + Math.floor(minutos / 60);  
    const templateMinutos = minutos % 60 > 9 ? minutos % 60 : "0" + minutos % 60;
    if(minutos < 60){
        return `00:${minutos}`;
    }else {
        return `${templateHorario}:${templateMinutos}`;
    }
}