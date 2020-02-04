const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", () => { 
    fetchTrainers()
})
function fetchTrainers(){ 
    fetch('http://localhost:3000/trainers') 
    .then(r => r.json() )
    .then( trainers => trainers.forEach(trainer => buildTrainerCard(trainer)))
}
function fetchPokemon(){ 
    fetch('http://localhost:3000/pokemons')
    .then(r => r.json())
    .then(pokemon => console.log(pokemon))
}
function buildTrainerCard(trainer){ 
     let page = document.querySelector('main')
    let trainerCard = document.createElement('div')
     trainerCard.className = "card" 
     trainerCard.dataset.id = trainer.id 
     page.appendChild(trainerCard)
     pokeUl = document.createElement('ul')
     trainer.pokemons.forEach(pokemon => { 
         let pokemonLi = document.createElement('li')
         pokemonLi.innerText = ` ${pokemon.nickname} (${pokemon.species}) `
          let releaseBtn = document.createElement('button')
          releaseBtn.innerText = "Release"
          releaseBtn.addEventListener('click', releasePokemon)
          releaseBtn.dataset.id = pokemon.id
        pokemonLi.appendChild(releaseBtn)
         pokeUl.appendChild(pokemonLi)
     })
     let trainerName = document.createElement('p')
     trainerName.innerText = trainer.name
     trainerCard.append(trainerName, pokeUl)
}
function releasePokemon(e) { 
    let pokemonID = e.target.dataset.id 
    fetch('http://localhost:3000/pokemons/'+pokemonID, {
        method: "DELETE", 
       })
       .then(r => r.json())
       .then( data => console.log(data))
       event.target.parentElement.remove()
}