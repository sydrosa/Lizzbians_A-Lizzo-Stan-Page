class User < ApplicationRecord
    has_many :games

    validates :username, presence: true
    validates :username, uniqueness: true
end
