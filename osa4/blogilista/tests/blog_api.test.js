const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('correct number of blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blogs are identified by field named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
})

test('a blog with no set likes will get 0 likes when added', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const returned = response.body
      .find(r => r.title === newBlog.title)

    expect(returned.likes).toBe(0)
})

test('a blog with no title and url is not added', async () => {
  const newBlog = {
    author: "Robert C. Martin"
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
  
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('succeeds with status code 204 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${validNonexistingId}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('modification of a blog', () => {
  test('succeeds with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
  
    const modifiedBlog = {
      title: blogToModify.title,
      author: blogToModify.author,
      url: blogToModify.url,
      likes: blogToModify.likes + 1
    }
  
    await api.put(`/api/blogs/${blogToModify.id}`)
    .send(modifiedBlog)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart.length).toBe(blogsAtEnd.length)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
    const invalidId = '5a3d5da59070081a82a3445'
  
    const modifiedBlog = {
      title: blogToModify.title,
      author: blogToModify.author,
      url: blogToModify.url,
      likes: blogToModify.likes + 1
    }
  
    await api.put(`/api/blogs/${invalidId}`)
    .send(modifiedBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart.length).toBe(blogsAtEnd.length)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
  
    const modifiedBlog = {
      title: blogToModify.title,
      author: blogToModify.author,
      url: blogToModify.url,
      likes: blogToModify.likes + 1
    }
  
    await api.put(`/api/blogs/${validNonexistingId}`)
    .send(modifiedBlog)
    .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart.length).toBe(blogsAtEnd.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})