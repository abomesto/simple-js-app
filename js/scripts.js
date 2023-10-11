// pokemon objects
let pokemonRepository = (function() {
let pokemonList= [  

    { 
    name:" Pikachu",
    type:"Electric",
    height:0.4
    },

    {
    name:" Jigglypuff",
    type:["fairy","normal"],
    height: 0.5
    },

    {
    name:" Bulbasaur",
    type:["grass", "poison"],
    height:2.5
    }
    
];

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
        showDetails(pokemon.type,pokemon.height);
    });
  }

  function showDetails(pokemon){
    console.log(pokemon) ;
}
return{
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem
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

    pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

  });

        