class SessionsController < ApplicationController
    def new
        user = User.new
    end

    def create
        user = User.find_by(username: params[:username])
    end

end