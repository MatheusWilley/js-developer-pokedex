class Pokemon {
    //CONSTRUTOR QUE RECEBE PARÂMETROS E
    // OS INICIALIZA DIRETAMENTE
    constructor(id, name, types = [], photo, height = 0, weight = 0, abilities = []){
        this.number = id;
        this.name = name;
        this.types = types;
        this.type = types[0] || null;
        this.photo = photo;
        this.height = height;
        this.weight = weight;
        this.abilities = abilities;
    }
}
