class Pokemon {
    //CONSTRUTOR QUE RECEBE PARÂMETROS E
    // OS INICIALIZA DIRETAMENTE
    constructor(number, name, types = [], photo){
        this.number = number;
        this.name = name;
        this.types = types;
        this.photo = photo;
    }
}
