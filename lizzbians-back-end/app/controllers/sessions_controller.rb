class SessionsController < ApplicationController
    def new
        user = User.new
    end

    def create
        @user = User.find_by(username: params[:username])
        if !@user
            render json: {error: `bad`, code: 3000, message: "Can't find user"}
        else
            render json: {status: "yay!"}
        end
    end

end