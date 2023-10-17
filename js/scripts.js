//pokemon objects
let pokemonRepository = (function() {
let pokemonList= [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
function add(pokemon) {
    pokemonList.push(pokemon);
}

function getAll() {
 return pokemonList;
}

function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function() {
        showDetails(pokemon);
    });
  }
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

return{
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
};

})();
console.log(pokemonRepository.getAll())

// Add Threshold value of Pokemon Height
let thresholdHeight = 1.5;

// Iterate over each Pokémon object in the pokemonList array
/* for (let i = 0; i < pokemonList.length; i++) {
    // Get the name and height of the Pokémon
    let pokemonName = pokemonList[i].name;
    let pokemonHeight = pokemonList[i].height;
    
    // Initialize a variable to store the label
    let label = '';
    
    // Condition if Pokémon's height is above the threshold
    if (pokemonHeight > thresholdHeight) {
        label = " - Wow that's a big pokemon!";
    }
    
    // Write the Pokémon name, height, and label to the DOM
    document.write(`${pokemonName} (height: ${pokemonHeight}${label})<br>`);
} */
    pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
  });

        