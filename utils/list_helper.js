const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0

    const total = blogs.reduce((a, b) =>  {
        return { likes: a.likes + b.likes }
    })

    return total.likes
}

const favoriteBlog = (blogs) => {
    let topLikes = 0
    let topBlog = {}

    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > topLikes) {
            topLikes = blogs[i].likes
            topBlog = blogs[i]
        }
    }

    delete topBlog.url

    return topBlog
}

const authorWithMostBlogs = (authors) => {
    let blogs = 0
    let topAuthor = {}

    for (let i = 0; i < authors.length; i++) {
        if (authors[i].blogs > blogs) {
            blogs = authors[i].blogs
            topAuthor = authors[i]
        }
    }

    return topAuthor
}

const authorWithMostLikes = (blogs) => {
    if (blogs.length === 0) return {}

    let likesCount = {}
    let bestAuthor = { author: '', likes: 0 }

    for (let i = 0; i < blogs.length; i++) {
        if (likesCount[blogs[i].author] === undefined) {
            likesCount[blogs[i].author] = blogs[i].likes
        } else {
            likesCount[blogs[i].author] += blogs[i].likes
        }

        if (likesCount[blogs[i].author] > bestAuthor.likes) {
            bestAuthor.author = blogs[i].author
            bestAuthor.likes = likesCount[blogs[i].author]
        }
    }

    return bestAuthor
}

module.exports = {
    totalLikes,
    favoriteBlog,
    authorWithMostBlogs,
    authorWithMostLikes
}