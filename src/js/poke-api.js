const pokeApi = {};

// Converte os detalhes do Pokémon para a instância da classe Pokemon
function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon(
        pokeDetail.id,
        pokeDetail.name,
        pokeDetail.types.map((typeSlot) => typeSlot.type.name),
        pokeDetail.sprites.other.dream_world.front_default
    );

    // Atribui o primeiro tipo como o principal
    pokemon.type = pokemon.types[0];

    //ADICIONA ALTURA, PESO E HABILIDADES
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    return pokemon;
}

// Busca os detalhes de um Pokémon
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .catch((error) => {
            console.error('Erro ao obter detalhes do Pokémon:', error);
        });
};

// Busca a lista de Pokémons
pokeApi.getPokemons = async (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    try{
        const response = await fetch(url);
        const jsonBody = await response.json();
        const pokemons = jsonBody.results;

        const pokemonsDetailsPromises = pokemons.map(pokeApi.getPokemonDetail);
        const pokemonDetails = await Promise.all(pokemonsDetailsPromises);

        return pokemonDetails;
    } catch (error) {
        console.error('Erro ao carregar Pokémons:', error);
        return [];
    }
};