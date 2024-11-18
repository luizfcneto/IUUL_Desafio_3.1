export default class Agenda {
    #consultas;

    constructor(consultas = []){
        this.#consultas = consultas;
    }
}