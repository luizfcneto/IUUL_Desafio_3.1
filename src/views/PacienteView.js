export const showPacienteCadastradoComSucesso = () => {
    console.log("Paciente cadastrado com sucesso!");
}

export const showPacienteFalha = (errorMessage) => {
    console.log(errorMessage);
}

export const showPacienteRemovidoComSucesso = () => {
    console.log("Paciente excluído com sucesso!");
}

export const listPacientes = (pacientesComAgendados) => {
    console.log(
`--------------------------------------------------------------------------
CPF             Nome                                Dt.Nasc.        Idade
--------------------------------------------------------------------------`
    );
    pacientesComAgendados.forEach((paciente) => {
        console.log(paciente.toString());        
    });
    console.log(
`--------------------------------------------------------------------------`
    );

}