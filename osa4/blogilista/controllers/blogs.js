const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: user._id,
      likes: body.likes === undefined ? 0 : body.likes
    })

    if (blog.title === undefined || blog.url === undefined) {
      response.status(400).json({ error: 'blog title or url missing' })
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    }

    logger.error("Error:", exception.name, exception.message)
    response.status(400).json({ error: exception.name, message: exception.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    logger.error(exception)
    response.status(400).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, blog, { new: true }
    )
    if (updatedBlog === null) {
      response.status(404).end()
    } else {
      response.json(updatedBlog)
    }
  } catch (exception) {
    logger.error(exception)
    response.status(400).end()
  }
})

module.exports = blogsRouter