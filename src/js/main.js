
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonOnClickContent = document.getElementsByClassName('pokemon');
const maxRecords = 151;
const limit = 8;
let offset = 0;
// OTIMIZAÇÃO DE DESEMPENHO ADCIONAL
let isLoading = false;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon) =>
    
                `<li class="pokemon ${pokemon.type}" type="button">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.photo}"
                                alt="Pokémon: ${pokemon.name}">
                        </div>
                    </li>`

            ).join('')
            pokemonList.innerHTML += newHtml
        })
        // TRATAMENTO DE ERRO ADICIONAL
        .catch(error => {
            console.error('Erro ao carregar os pokémons:', error);
            pokemonList.innerHTML = `<p>Desculpe, houve um erro ao carregar os Pokémons. Tente novamente mais tarde.</p>`;
        })
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    // OTIMIZAÇÃO DE DESEMPENHO ADCIONAL
    if(isLoading) return;
    isLoading = true;

    offset += limit
    const qtdRecordWithNextPage = offset + limit

    if(qtdRecordWithNextPage >= maxRecords){

        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        
        // REMOVE O BOTÃO
        // loadMoreButton.parentElement.removeChild(loadMoreButton);

        //OCULTA O BOTÃO
        loadMoreButton.style.display = 'none';
    } else{
        loadPokemonItems(offset, limit);
    }

    // Após a requisição, permite novas requisições
    isLoading = false;

})