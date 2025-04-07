class SearchPolicy < ApplicationPolicy
  attr_reader :user, :search

  def initialize(user, search)
    @user = user
    @search = search
  end

  def index?
    user.admin? or user.manager?
  end
end
