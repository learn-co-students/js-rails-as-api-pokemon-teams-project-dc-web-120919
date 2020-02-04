const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded",()=>{
    console.log("connected")
    fetchAllTrainers()

})
function fetchAllTrainers(){
    fetch("http://localhost:3000/trainers")
    .then(response =>response.json())
    .then(trainerArray =>{
        trainerArray.forEach(trainer =>buildTrainerCard(trainer))
    })

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
        pokeUl.appendChild(pokemonLi)
    })
    let trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    trainerCard.append(trainerName, pokeUl)
}

