class UsersController < ApplicationController
    def show
        user = User.find_by(id: params[:id])
        render json: user, include: [:games], except: [:password_digest, :updated_at, :created_at]
    end
end
