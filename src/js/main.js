
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonOnClickContent = document.getElementsByClassName('pokemon');
const maxRecords = 151;
const limit = 8;
let offset = 0;
// OTIMIZAÇÃO DE DESEMPENHO ADCIONAL
let isLoading = false;

//SELECIONAR O CONTEINER DE DETALHES
const pokemonDetailsSection = document.getElementById('pokemonModals');
const pokemonDetails = document.getElementById('pokemonDetails')
const pokemonName = document.getElementById('pokemonName');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonStats = document.getElementById('pokemonStats');
const closeDetailsButton = document.getElementById('closeDetailsButton');

//CARREGAR OS POKÉMONS INCLUINDO O CLIQUE
function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon) =>

                `<li class="pokemon ${pokemon.type}" type="button" data-pokemon-id="${pokemon.number}">
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

            //ADICIONANDO O EVENTO DE CLIQUE
            document.querySelectorAll('.pokemon').forEach(item => {
                item.addEventListener('click', (event) => {
                    const pokemonId = event.currentTarget.getAttribute('data-pokemon-id');
                    const selectedPokemon = pokemons.find(pokemon => pokemon.number == pokemonId);
                    showPokemonDetails(selectedPokemon);
                });
            });

        })
        // TRATAMENTO DE ERRO ADICIONAL
        .catch(error => {
            console.error('Erro ao carregar os pokémons:', error);
            pokemonList.innerHTML = `<p>Desculpe, houve um erro ao carregar os Pokémons. Tente novamente mais tarde.</p>`;
        })
}

//FUNÇÃO PARA EXIBIR DETALHES DO POKÉMON
function showPokemonDetails(pokemon) {
    pokemonName.textContent = pokemon.name;
    pokemonImage.src = pokemon.photo;
    pokemonTypes.innerHTML = pokemon.types.map(type =>
        `<li class="type ${type}">${type}</li>`
    ).join('');

    //EXIBINDO OS STATS DO POKÉMON
    pokemonStats.innerHTML = `

        <span class="detailsHeight">
            <strong>Altura</strong>
        </span>
        <p>${pokemon.height} cm</p>
        <span class="detailsWeight">
            <strong>Peso</strong>
        </span>
        <p>${pokemon.weight / 10} kg</p>
        <span class="detailsAbilities">
            <strong>Habilidades</strong>
        </span>
        <p>${pokemon.abilities.join(', ')}</p>
    `;

    pokemonDetails.className = 'pokemonModal';
    if(pokemon.types.length > 0){
        pokemonDetails.classList.add(pokemon.types[0]);
    }

    //EXIBIR A SEÇÃO DE DETALHES
    pokemonDetailsSection.style.display = 'block';
}

//FUNÇÃO PARA FECHAR OS DETALHES
closeDetailsButton.addEventListener('click', () => {
    pokemonDetailsSection.style.display = 'none';
});

//FECHAR O MODAL AO CLICAR FORA DA ÁREA
window.onclick = function(event){
    if(event.target == pokemonDetailsSection){
        pokemonDetailsSection.style.display = 'none';
    }
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    // OTIMIZAÇÃO DE DESEMPENHO ADCIONAL
    if (isLoading) return;
    isLoading = true;

    offset += limit
    const qtdRecordWithNextPage = offset + limit

    if (qtdRecordWithNextPage >= maxRecords) {

        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        // REMOVE O BOTÃO
        // loadMoreButton.parentElement.removeChild(loadMoreButton);

        //OCULTA O BOTÃO
        loadMoreButton.style.display = 'none';
    } else {
        loadPokemonItems(offset, limit);
    }

    // Após a requisição, permite novas requisições
    isLoading = false;

})