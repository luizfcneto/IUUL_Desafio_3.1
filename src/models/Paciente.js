export default class Paciente {
    #cpf;
    #nome;
    #dataNascimento;
    #idade;

    constructor(cpf, nome, dataNascimento){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
        this.#setIdade();
    }

    #setIdade(){
        const [dia, mes, ano] = this.#dataNascimento.split('/');
        const dataCorrente = new Date();
        const dateNascimento = new Date(ano, mes - 1, dia);

        let idade = dataCorrente.getFullYear() - dateNascimento.getFullYear();
        const mesAtual = dataCorrente.getMonth();
        const diaAtual = dataCorrente.getDate();

        if(mesAtual < dateNascimento.getMonth() || (mesAtual === dateNascimento.getMonth() && diaAtual < dateNascimento.getDate())){
            idade--;
        }

        this.#idade = idade;
    }

    get cpf(){
        return this.#cpf;
    }

    get nome(){
        return this.#nome;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }

    get idade(){
        return this.#idade;
    }

    toString(){
        return `${this.cpf} \t${this.nome} \t\t${this.dataNascimento} \t${this.idade}`;
    }

    toJSON(){
        return {
            cpf: this.cpf,
            nome: this.nome,
            dataNascimento: this.dataNascimento,
            idade: this.idade
        }
    }

}