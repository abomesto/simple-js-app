 // pokemon objects
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";


  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  //let modalContainer = document.querySelector("#modal-container");
  // modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
  //  let target = e.target;
   // if (target === modalContainer) {
  //    hideModal();
  //  }
  //});

  // function showModal(pokemon) {
  //   modalContainer.innerHTML = "";
  //  let modal = document.createElement("div");
  //   modal.classList.add("modal");

  //   let closeButtonElement = document.createElement("button");
  //   closeButtonElement.classList.add("modal-close");
  //   closeButtonElement.innerText = "Close";
  //   closeButtonElement.addEventListener("click", hideModal);

  //   let titleElement = document.createElement("h1");
  //   titleElement.innerText = pokemon.name;

  //   let imageElement = document.createElement("img")
  //   imageElement.src = pokemon.imageUrl;

  //   let contentElement = document.createElement("p");
  //   contentElement.innerText = pokemon.height;



  //   modal.appendChild(closeButtonElement);
  //   modal.appendChild(titleElement);
  //   modal.appendChild(imageElement);
  //   modal.appendChild(contentElement);
  //   modalContainer.appendChild(modal);
    
  //   modalContainer.classList.add("is-visible");
  // }

  // function hideModal() {
  //   modalContainer.classList.remove("is-visible");
  // }
  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //     hideModal();  
  //   }
  // });
 // modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
  //  let target = e.target;
 //   if (target === modalContainer) {
//     hideModal();
//    }
 // });

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItemPokemon = document.createElement("li");
    listItemPokemon.classList.add("list-group-item");
    listItemPokemon.classList.add('col-12'); 
    listItemPokemon.classList.add('col-md-4'); 
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add('btn-block');
    button.setAttribute('data-toggle', 'modal'); 
    button.setAttribute('data-target', '#modal');
    button.classList.add('button-class');
    listItemPokemon.appendChild(button);
    pokemonList.appendChild(listItemPokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }
  
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  $('#myList a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      showModal(item);
    
    });
  }
  function showModal(item) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    //Clear all existing modal content
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    //creating element for name in modal content
    let nameElement = document.createElement('h1');
    nameElement.innerText = item.name;
    //creating img in modal content
    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.setAttribute('src', item.imageUrl);
    imageElement.classList.add('float-right'); // bootstrap class
    //creating element for height in modal content
    let heightElement = document.createElement('p');
    heightElement.innerText = 'height: ' + item.height;
    //creating element for type in modal content
    function typeCount(item) {
        if(item.types.length === 2) {
            return item.types[0].type.name + ', ' + item.types[1].type.name;
        } else {
            return item.types[0].type.name;
        }
    }
    let typeElement = document.createElement('p');
    typeElement.innerText = 'type: ' + typeCount(item);

    //Add the new modal content
    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typeElement);
} ;

  return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

const searchInpt = document.getElementById("searchInp");
searchInpt.addEventListener("input", (e) => {
  const keyword = e.target.value;
  const pList = [...document.querySelectorAll(".list-group-item")];
  pList.forEach(li => {
    if (li.innerText.toLowerCase().includes(keyword.toLowerCase())) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  })
});

pokemonRepository.loadList().then(function() {
  // Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  }); 
});

