const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('total likes', () => {
    test('when list has no blog', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(helper.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has many blogs equals the likes of them', () => {
        const result = listHelper.totalLikes(helper.blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('when list has no blog', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.favoriteBlog(helper.listWithOneBlog)
        expect(result).toEqual({
            'author': 'Edsger W. Dijkstra',
            'likes': 5,
            'title': 'Go To Statement Considered Harmful'
        })
    })

    test('when list has many blogs equals the likes of them', () => {
        const result = listHelper.favoriteBlog(helper.blogs)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            likes: 12,
            author: 'Edsger W. Dijkstra'
        })
    })
})

describe('most blog', () => {
    test('when list has no author', () => {
        const result = listHelper.authorWithMostBlogs([])
        expect(result).toEqual({})
    })

    test('when list has only one author', () => {
        const result = listHelper.authorWithMostBlogs(helper.listWithOneAuthor)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 2
        })
    })

    test('when list has many authors', () => {
        const result = listHelper.authorWithMostBlogs(helper.authors)
        expect(result).toEqual({
            author: 'George Orwell',
            blogs: 10
        })
    })
})

describe('most liked author', () => {
    test('when list has no author', () => {
        const result = listHelper.authorWithMostLikes([])
        expect(result).toEqual({})
    })

    test('when list has only one author', () => {
        const result = listHelper.authorWithMostLikes(helper.listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('when list has many authors', () => {
        const result = listHelper.authorWithMostLikes(helper.blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})