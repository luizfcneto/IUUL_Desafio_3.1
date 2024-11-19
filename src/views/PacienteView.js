export const showPacienteCadastradoComSucesso = () => {
    console.log("Paciente cadastrado com sucesso!");
}


export const showPacienteFalha = (errorMessage) => {
    console.log(errorMessage);
}

export const listPacientes = (pacientes) => {
    console.log(
`--------------------------------------------------------------------------
CPF             Nome                                Dt.Nasc.        Idade
--------------------------------------------------------------------------`
    );
    pacientes.forEach((paciente) => {
        console.log(paciente.toString());
    });
    console.log(
`--------------------------------------------------------------------------`
    );

}