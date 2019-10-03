class GamesController < ApplicationController
    def index
        games = Game.all.where('game_type = ?', params['game_type']).limit(10).order('score desc')
        render json: games.to_json(:include => {
            :user => {:only => [:username]}
            },:except => [:updated_at, :created_at])
    end

    def create
        puts params
        user = User.find_by(username: params[:username])
        game = Game.create(user_id: user.id, score: params[:score], game_type: params[:game_type])
        render json: {status: 'yay!'}
    end

    # def game_params
    #     params.permit(:user_id, :game_type, :score)
    # end
end
