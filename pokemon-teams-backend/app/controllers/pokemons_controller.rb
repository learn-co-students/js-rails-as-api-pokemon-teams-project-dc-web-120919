class PokemonsController < ApplicationController
    def index  
        pokemons = Pokemon.all 
        render json: pokemons 
    end 
    def new 
    end 
    def create 
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    poke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: poke
    end 
    def destroy
        poke = Pokemon.find(params[:id]) 
        poke.destroy
    end 
    private 
    def poke_params 
    params.require(:pokemon).permit(:species, :nickname, :trainer_id)
    end 
end
