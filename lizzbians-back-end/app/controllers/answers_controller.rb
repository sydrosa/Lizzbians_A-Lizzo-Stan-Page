class AnswersController < ApplicationController
    def show
        answer = Answer.find_by(id: params[:id])
        render json: answer, only: [:is_correct]
    end

    def index
        answers = Answer.all 
        render json: answers, only: [:question_id, :is_correct]
    end
end
