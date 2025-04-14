//   pokemonApiKey = "https://pokeapi.co/api/v2/pokemon/ditto";

// Display the search pokemon data on the page
function fetchPokemon() {
    let name = document.getElementById("input").value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;


    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokemon not found!");
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
            
        })
        .catch(error => {
            document.querySelector(".pokemon-data").innerHTML = 
                `<p style="color:red;">${error.toString()}</p>`;
        });
}


// Dsiplay the random pokemon data on the page
function getRandom() {
    let randomIndex = Math.floor(Math.random() * 1025) + 1;
    let url = `https://pokeapi.co/api/v2/pokemon/${randomIndex}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokemon not found!");
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            document.querySelector(".pokemon-data").innerHTML = 
                `<p style="color:red;">${error.toString()}</p>`;
        });
}

// // Display the Pokemon data on the page without waiting for the image to load
//   function displayPokemon(data) {

//         let imageUrl = data.sprites.other["official-artwork"].front_default;
        
//         document.querySelector(".pokemon-data").innerHTML = 
//             `<h2>${data.name.toUpperCase()}</h2>
//             <img src="${imageUrl}" alt="${data.name}">
//             <p>Type: ${data.types ? data.types.map(type => type.type.name).join(", ") : "Unknown"}</p>
//             <p>Weight: ${data.weight}</p>
//             <p>Height: ${data.height}</p>`;
//    };


// Display the pokemon data on the page and wait for the image to load   
async function displayPokemon(data) {
    try {
        let imageUrl = data.sprites.other["official-artwork"].front_default;
        
        // Wait for the image to load
        await loadImage(imageUrl);

        // Once the image is fully loaded, update the UI
        document.querySelector(".pokemon-data").innerHTML = 
            `<h2>${data.name.toUpperCase()} ${data.id}</h2>
            <img src="${imageUrl}" alt="${data.name}">
            <p>Type: ${data.types ? data.types.map(type => type.type.name).join(", ") : "Unknown"}</p>
            <p>Weight: ${data.weight}</p>
            <p>Height: ${data.height}</p>`;
    } catch (error) {
        document.querySelector(".pokemon-data").innerHTML = 
            `<p style="color:red;">Error loading Pokémon data.</p>`;
    }
}

// Helper function to load the image and wait until it's ready
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
    });
}
