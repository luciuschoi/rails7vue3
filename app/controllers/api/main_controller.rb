class Api::MainController < ApplicationController

  def index
    render json: { result: "success" , blogs: blogs}
  end
  
  def create
    
    blog = Blog.new(blog_params)
    
    puts blog.inspect 
    if blog.save
      render json: { result: "success", blogs: blogs }
    end
  end
  
  
  def update 
    @blog = Blog.find(params[:id])
    if @blog.update(blog_params)
      render json: { result: "success", blogs: blogs }
    else
      render json: { errors: blog.errors.messages}.to_json, status: 422
    end
  end

  def destroy 
    @blog = Blog.find(params[:id])
    if @blog.destroy 
      render json: { result: "success", blogs: blogs }
    else
      render json: { errors: blog.errors.messages}.to_json, status: 422
    end
  end

  private

  def blog_params
    params.require(:blog).permit(:subject, :context, :created_at)
  end

  def blogs
    blog_index = []
    @blogs = Blog.order( created_at: :desc)
    @blogs.each do | b |
      blog_index.push(b.attributes.except("updated_at"))
    end  
    blog_index
  end

end
