class AnswersController < ApplicationController
    def show
        answer = Answer.find_by(id: params[:id])
        render json: answer, only: [:is_correct]
    end
end
