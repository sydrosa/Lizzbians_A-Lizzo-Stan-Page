class QuestionsController < ApplicationController
    def index
        questions = Question.all 
        render json: questions.to_json(:include => {
            :answers => {:only => [:content]}
            },:except => [:updated_at, :created_at])
    end
end
