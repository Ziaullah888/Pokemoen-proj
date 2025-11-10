function fetchPokemon() {
    let name = document.getElementById("input").value.toLowerCase();
    fetch(`http://localhost:5000/api/pokemon/name/${name}`)
        .then(res => res.json())
        .then(data => displayPokemon(data))
        .catch(error => {
            document.querySelector(".pokemon-data").innerHTML = 
                `<p style="color:red;">${error.message || "Pokemon not found!"}</p>`;
        });
}

function getRandom() {
    fetch(`http://localhost:5000/api/pokemon/random`)
        .then(res => res.json())
        .then(data => displayPokemon(data))
        .catch(error => {
            document.querySelector(".pokemon-data").innerHTML = 
                `<p style="color:red;">${error.message || "Pokemon not found!"}</p>`;
        });
}

 
async function displayPokemon(data) {
    try {
        let imageUrl = data.sprites.other["official-artwork"].front_default;
        
        await loadImage(imageUrl);

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

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
    });
}
