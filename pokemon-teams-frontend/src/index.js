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
          releaseBtn.className = "release"
          releaseBtn.addEventListener('click', releasePokemon)
          releaseBtn.dataset.id = pokemon.id
          
        pokemonLi.appendChild(releaseBtn)
         pokeUl.appendChild(pokemonLi)
     })
     let trainerName = document.createElement('p')
     trainerName.innerText = trainer.name
     let addPokemn = document.createElement('button')

     addPokemn.innerText = "Add Pokemon"
     
     trainerCard.append(trainerName, addPokemn, pokeUl)
     addPokemn.addEventListener('click', createPokemon)
     
    
}

function releasePokemon(e) { 
      
    let pokemonID = e.target.dataset.id 
    fetch('http://localhost:3000/pokemons/'+pokemonID, {
        method: "DELETE", 

       })
       .then(r => r.json() )
       .then( data => console.log(data) )
       
       event.target.parentElement.remove()
}

function createPokemon(event){ 

    let teamSize = event.target.nextElementSibling.childElementCount
    if (teamSize >= 6 ){
        alert("Sorry Your Team is full!")
    }
    else{ 

    
    
    let trainerID = event.target.parentElement.dataset.id
    let ul = event.target.nextSibling

     fetch('http://localhost:3000/pokemons/', { 
         method: "POST", 
         headers:{
            'Content-Type': 'application/json'
         }, 
         body:  JSON.stringify({trainer_id: trainerID})
     })
     .then(r => r.json())
     .then(pokemon => { 
         let li = document.createElement('li')
         li.innerText = ` ${pokemon.nickname} (${pokemon.species}) `
         let releaseBtn = document.createElement('button')
          releaseBtn.innerText = "Release"
          releaseBtn.className = "release"
          releaseBtn.addEventListener('click', releasePokemon)
          releaseBtn.dataset.id = pokemon.id
          
        li.appendChild(releaseBtn)
         ul.appendChild(li)

     }) 
    }
     

}
