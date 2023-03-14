const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const openModalImg = document.getElementById('openModalImg')
const modalDetails = document.getElementById('modalDetails');
const backdrop = document.getElementById('modalBackdrop')
const detailsPokemon = document.getElementById('detailsPokemon')




const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img onclick="abrir()"  id="openModalImg" class="pokemon-photo" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function loadPokemon(id) {
    pokeApi.getPokemonId(id).then((pokemon) => {
        const newHtml = convertPokemonToDetails(pokemon)
        pokemonList.innerHTML += newHtml
    })
}
/* 
function convertPokemonToDetails(pokemon) {
    return `
        <div
        <h3>${pokemon}</h3>
          
        </div>
    `;
} */

function abrir(){
    modalDetails.style.display = 'block';
    backdrop.style.display ='block';
 /*  debugger
  
  const pokemon = { name: 'teste' };
  const html = convertPokemonToDetails(pokemon);
  detailsPokemon.innerHTML = html */;
}

function fechar(){
    modalDetails.style.display = 'none';
    backdrop.style.display= 'none';
}



