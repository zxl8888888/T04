//provided to fill the leading zero.
function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }
  async function fetchPokemon(url) {
    //TODO 4: Fetch the data according to the URL parameter.
    //TODO 5: Obtain the div that created in TODO 2
    //TODO 6: Create the element p, set the class to pid and put the pokemon’s id
    // inside the element and append to the div obtained in TODO 5.
    // HINTS: you can use document.createTextNode(‘text’) to create a text node, and
    // append to the element. <p>test</p> is equivalent to:
    // var p = document.createElement(‘p’);
    // var textNode = document.createTextNode(‘test’);
    // p.appendChild(textNode)
    //TODO 7: Create the img element, set the src to the image link obtained from the
    // API, and append to the div obtained in TODO 5.
    //TODO 8: Create the element p, set the class to “name” and
    // put the pokemon’s name inside the element and
    // append to the div obtained in TODO 5.
    //TODO 9: Create the element p, set the class to “type” and
    // put the pokemon’s type inside the element and
    // append to the div obtained in TODO 5.
    const response = await fetch(url);
    const data = await response.json();
    const pokemonDiv = document.getElementById(data.name);
    const pId = document.createElement("p");
    pId.className = "pid";
    pId.appendChild(document.createTextNode(`${pad(data.id, 3)}`));
    pokemonDiv.appendChild(pId);
  
    const img = document.createElement("img");
    img.src = data.sprites.front_default;
    pokemonDiv.appendChild(img);
  
    const pName = document.createElement("p");
    pName.className = "name";
    pName.appendChild(document.createTextNode(data.name));
    pokemonDiv.appendChild(pName);
  
    const pType = document.createElement("p");
    pType.className = "type";
    const types = data.types
      .map(
        (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
      )
      .join(", ");
    pType.appendChild(document.createTextNode(types));
    pokemonDiv.appendChild(pType);
  }
  // Note that you need to join multiple types into single string.
  async function fetchPokemons() {
    //TODO 1: Call API https://pokeapi.co/api/v2/pokemon?offset=20&limit=20 to fetch
    // the pokemons and store the returned JSON in a variable.
    // const response = await fetch(“https://pokeapi.co/...”);
    //TODO 2: For each pokemon, use “document.createElement” to create a div, set the
    // pokemon’s name as the div’s id, and set the class to ‘pokemon’. Append
    // the new created div to the given pokemons div
    // You may use setAttribute and appendChild function accordingly.
    //TODO 3: After that inside the same loop,
    // call second API to fetch individual Pokémon.
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
    );
    const pokemons = await response.json();
    const pokemonsDiv = document.getElementById("pokemons");
  
    for (const pokemon of pokemons.results) {
      const pokemonDiv = document.createElement("div");
      pokemonDiv.id = pokemon.name;
      pokemonDiv.className = "pokemon";
      pokemonsDiv.appendChild(pokemonDiv);
  
      await fetchPokemon(pokemon.url);
    }
  }
  fetchPokemons();
  
  