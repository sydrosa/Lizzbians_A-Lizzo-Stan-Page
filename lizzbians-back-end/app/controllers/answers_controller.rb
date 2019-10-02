class AnswersController < ApplicationController
    def show
        question = Question.find_by(id: params[:id])
        render json: question.answers, only: [:is_correct, :id]
    end
end
