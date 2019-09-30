class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games.to_json(:include => {
            :user => {:only => [:username]}
            },:except => [:updated_at, :created_at])
        
    end
end
