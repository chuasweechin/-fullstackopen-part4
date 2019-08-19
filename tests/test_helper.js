const Blog = require('../models/blog')
const User = require('../models/user')

const users = [{
    username: 'warrior',
    password: '123456',
    name: 'horror'
}]

const listWithOneBlog = [{
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
}]

const blogs = [{
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
},
{
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
},
{
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
},
{
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
},
{
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
},
{
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
}]

const listWithOneAuthor = [{
    author: 'Edsger W. Dijkstra',
    blogs: 2
}]

const authors = [{
    author: 'Michael Chan',
    blogs: 1
},
{
    author: 'Edsger W. Dijkstra',
    blogs: 2,
},
{
    author: 'Robert C. Martin',
    blogs: 3
},
{
    author: 'George Orwell',
    blogs: 10
}]

const getAllBlogsInDB = async () => {
    const blogs = await Blog.find()
    return blogs.map((b) => b.toJSON())
}

const getAllUsersInDB = async () => {
    const users = await User.find()
    return users.map((u) => u.toJSON())
}

module.exports = {
    users,
    listWithOneBlog,
    blogs,
    listWithOneAuthor,
    authors,
    getAllBlogsInDB,
    getAllUsersInDB
}