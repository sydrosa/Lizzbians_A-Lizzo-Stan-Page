class QuestionsController < ApplicationController
    def index
        # byebug
        questions = Question.all 
        render json: questions.to_json(:include => {
            :answers => {:only => [:content, :id]}
            },:except => [:updated_at, :created_at])
    end
end
