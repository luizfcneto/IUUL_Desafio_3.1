export const showPacienteCadastradoComSucesso = () => {
    console.log("Paciente cadastrado com sucesso!");
}


export const showPacienteFalha = (errorMessage) => {
    console.log(errorMessage);
}

export const listPacientes = (pacientes) => {
    console.log(
`----------------------------------------------------------------------
CPF \t\tNome \t\t\t\tDt.Nasc. \tIdade
----------------------------------------------------------------------`
    );
    pacientes.map((paciente, index) => {
        console.log(paciente.toString());
    });
    console.log(
`----------------------------------------------------------------------`
    );

}