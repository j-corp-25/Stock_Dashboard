class User < ApplicationRecord
  has_secure_password
  validates :username,
    uniqueness: true,
    length: { in: 3..30 }
    format: {without: URI::MailTo::EMAIL_REGEXP, messages: "cant be an email"}
  validates :email,
    uniqueness: true,
    length: { in: 3..255 },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presense: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  
end
