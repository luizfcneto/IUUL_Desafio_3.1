export const showConsultaAgendadaComSucesso = () => {
    console.log("Agendamento realizado com sucesso!");
}

export const showConsultaCanceladaComSucesso = () => {
    console.log("Agendamento cancelado com sucesso!");
}

export const showConsultaFalha = (errorMessage) => {
    console.log(errorMessage);
}

export const listAgenda = (agenda) => {
    console.log(
`--------------------------------------------------------------------------
Data        H.ini   H.Fim   Tempo   Nome                      Dt. Nasc.
--------------------------------------------------------------------------`
    );
    agenda.forEach((consulta) => {
        console.log(consulta.toString());
    });
    console.log(
`--------------------------------------------------------------------------`
    );
}