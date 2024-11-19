export default class Agenda {
    #consultas;

    constructor(consultas = []){
        this.#consultas = consultas;
    }


    get consultas(){
        return this.#consultas;
    }

    toString(){
        return `${this.#consultas}`;
    }

    toJSON(){
        return {
            consultas: this.consultas
        }
    }
}