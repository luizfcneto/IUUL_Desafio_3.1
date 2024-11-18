export default class Paciente {
    #cpf;
    #nome;
    #dataNascimento;

    constructor(cpf, nome, dataNascimento){
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
    }
}