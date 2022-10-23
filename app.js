const pokedex = document.getElementById('pokedex');
const cachedPokemon = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemonData = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
            1}.png`
    }));

    displayPokemon(pokemonData);
};

const displayPokemon = (pokemonData) => {
    const pokemonHTMLString = pokemonData
        .map(
            (pokemonData) =>
                `
            <li class="card" onclick="selectPokemon(${pokemonData.id})">
                <img class="card-image" src="${pokemonData.image}"/>
                <h2 class="card-title">${pokemonData.id}. ${pokemonData.name}</h2>
                </a>
            </li>
        `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!cachedPokemon[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemonData = await res.json();
        cachedPokemon[id] = pokemonData;
        displayPokemanPopup(pokemonData);
    } else {
        displayPokemanPopup(cachedPokemon[id]);
    }
};

const displayPokemanPopup = (pokemonData) => {
    console.log(pokemonData);
    const type = pokemonData.types.map((type) => type.type.name).join(', ');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div class="card">
                <img class="card-image" src="${
                    pokemonData.sprites['front_default']
                }"/>
                <h2 class="card-title">${pokemonData.name}</h2>
                <p><small>Type: ${type} | Height:</small> ${pokemonData.height} | Weight: ${
                    pokemonData.weight 
                } | Abilities 1 :</small> ${pokemonData.abilities[0].ability.name} | Abilities 2 :</small> ${pokemonData.abilities[1].ability.name}
                
                </p>
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();
