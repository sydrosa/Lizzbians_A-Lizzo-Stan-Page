class GamesController < ApplicationController
    def index
        games = Game.all.where('game_type = ?', params['game_type']).limit(10).order('score desc')
        render json: games.to_json(:include => {
            :user => {:only => [:username]}
            },:except => [:updated_at, :created_at])
    end

    def create
        game = Game.create(game_params)
        render json: { 'yay!'}
    end

    def game_params
        params.require(:game).permit(:user_id, :game_type, :score)
    end
end
