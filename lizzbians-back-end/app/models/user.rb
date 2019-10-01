class User < ApplicationRecord
    has_secure_password
    has_many :games

    validates :username, :password_digest, presence: true
    validates :username, uniqueness: true
end
