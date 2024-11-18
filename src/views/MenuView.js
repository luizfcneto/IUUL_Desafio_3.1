export const menuPrincipalView = () => {
    console.log(`Menu Principal
1- Cadastro de pacientes
2- Agenda
3- Fim`);
}

export const menuCadastroPacientes = () => {
    console.log(`Menu do Cadastro de Pacientes
1- Cadastrar novo paciente
2- Excluir paciente
3- Listar pacientes (ordenado por CPF)
4- Listar pacientes (ordenado por nome)
5- Voltar p/ menu principal`);
}


export const menuAgenda = () => {
    console.log(`Agenda
1- Agendar consulta
2- Cancelar agendamento
3- Listar agenda
4- Voltar p/ menu principal`);
}

export const showEntradaInvalida = () => {
    console.log(`Entrada invalida, lendo novamente`);
}


export const showVoltandoMenuPrincipal = () => {
    console.log(`Voltando menu principal...`);
}


export const showEncerrandoPrograma = () => {
    console.log("Encerrando Programa..."); 
}