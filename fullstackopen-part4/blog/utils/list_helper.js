const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })

    return {
        title: favorite.title,
        author: favorite.author,
        likes:favorite.likes
    }
}

const mostBlogs = (blogs) => {

    const authorCounts = _.countBy(blogs, 'author')
    const topAuthor = _.maxBy(Object.keys(authorCounts), author => authorCounts[author])

    return {
        author: topAuthor,
        blogs: authorCounts[topAuthor]
    }
}

const mostLikes = (blogs) => {

    const authorLikes = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
    }, {})

    const topAuthor = _.maxBy(Object.keys(authorLikes), author => authorLikes[author])
    return {
        author: topAuthor,
        likes: authorLikes[topAuthor]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}