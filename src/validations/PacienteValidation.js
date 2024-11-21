import { messageError } from "../Errors/constant.js";

export const validateCPF = (cpf) => {
    if(cpf.length !== 11){
        throw new Error(messageError.CPF_INVALIDO);
    }

    const regexSomenteNumeros = /^\d+$/;
    if(!regexSomenteNumeros.test(cpf)){
       throw new Error(messageError.CPF_INVALIDO); 
    }

    const regexTodosDigitosIguais = /^(\d)\1+$/;
    if (regexTodosDigitosIguais.test(cpf)) {
        throw new Error(message.CPF_INVALIDO);
    }

    const digitos = cpf.split('').map(Number);
    const primeiroDigito = calcularDigitoCPF(digitos.slice(0, 9), [10, 9, 8, 7, 6, 5, 4, 3, 2]);
    const segundoDigito = calcularDigitoCPF(digitos.slice(0, 10), [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);

    if(primeiroDigito !== digitos[9] && segundoDigito !== digitos[10]){
        throw new Error(message.CPF_INVALIDO);
    }
}

const calcularDigitoCPF = (base, pesos) => {
    const soma = base.reduce((acc, num, index) => acc + num * pesos[index], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}


export const validateNome = (nome) => {
    if(nome === null || nome === undefined || nome.length < 1 || nome === ""){
        throw new Error(messageError.NOME_INVALIDO);
    }

    const regexSomenteLetras = /^[a-zA-ZÀ-ÿ\s]+$/;

    if (!regexSomenteLetras.test(nome)) {
        throw new Error(messageError.NOME_INVALIDO);
    }
}

export const validateDataNascimento = (dataNascimento) => {
    if(dataNascimento === null || dataNascimento === undefined || dataNascimento.length < 10){
        throw new Error(messageError.DATA_NASCIMENTO_INVALIDA);
    }

    const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([1-9]\d{3})$/;
    if (!regexData.test(dataNascimento)) {
        throw new Error(messageError.DATA_NASCIMENTO_INVALIDA);
    }

    const [_, dia, mes, ano] = dataNascimento.match(regexData).map(Number);
    const dateObj = new Date(ano, mes - 1, dia);
    if(dateObj.getFullYear() !== ano || dateObj.getMonth() !== mes - 1 || dateObj.getDate() !== dia ){
        throw new Error(messageError.DATA_NASCIMENTO_INVALIDA);
    }

    const dataCorrente = new Date();

    if(dataNascimento > dataCorrente){
        throw new Error(messageError.DATA_NASCIMENTO_INVALIDA);
    }

    let idade = dataCorrente.getFullYear() - dateObj.getFullYear();
    const mesAtual = dataCorrente.getMonth();
    const diaAtual = dataCorrente.getDate();

    if(mesAtual < dateObj.getMonth() || (mesAtual === dateObj.getMonth() && diaAtual < dateObj.getDate())){
        idade--;
    }

    if(idade < 13){
        throw new Error(messageError.PACIENTE_MENOR_13_ANOS);
    }
}