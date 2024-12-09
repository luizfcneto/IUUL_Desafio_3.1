export default class PacienteDTO {
    #cpf;
    #nome;
    #dataNascimento;
    #idade;

    constructor(cpf, nome, dataNascimento, idade = undefined) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento,
        this.#idade = idade ? idade : this.calculaIdade();
    }

    calculaIdade(){
        const [dia, mes, ano] = this.dataNascimento.split('/');
        const dataCorrente = new Date();
        const dateNascimento = new Date(ano, mes - 1, dia);

        let idade = dataCorrente.getFullYear() - dateNascimento.getFullYear();
        const mesAtual = dataCorrente.getMonth();
        const diaAtual = dataCorrente.getDate();

        if(mesAtual < dateNascimento.getMonth() || (mesAtual === dateNascimento.getMonth() && diaAtual < dateNascimento.getDate())){
            idade--;
        }

        return idade;
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
        return `${this.cpf.padEnd(15)} ${this.nome.padEnd(35)} ${this.dataNascimento.padEnd(15)} ${this.idade}`;
    }

    toJSON(){
        return {
            cpf: this.cpf,
            nome: this.nome,
            dataNascimento: this.dataNascimento,
            idade: this.idade
        }
    }

    static fromObject(obj){
        return new PacienteDTO(obj.cpf, obj.nome, obj.dataNascimento, obj.idade);
    }

    static fromEntity(entity){
        return new PacienteDTO(entity.cpf, entity.nome, entity.dataNascimento);
    }
}