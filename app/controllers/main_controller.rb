class MainController < ApplicationController
  def home
  end

  def index
    puts "index================="
    render json: { result: "success"}
  end

  def show 

  end  
  

end
