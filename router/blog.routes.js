const { createNewBlog, getAllBlogs, removeBlog, updateBlog, searchBytitle, searchByMultipleFields, searchByRegex, searchByMultipleRegex } = require('../controller/blog.controller')

const router  = require('express').Router()


router.post('/create' , createNewBlog)
router.get("/list/:value?" , getAllBlogs)
router.delete('/delete/:id' , removeBlog)
router.put('/update/:id' , updateBlog)
router.get('/findByTitle' , searchBytitle)
router.get('/multi-fields' , searchByMultipleFields)
router.get('/regex-search' , searchByRegex)
router.get('/multi-regex' , searchByMultipleRegex)

module.exports = {
    blogRoutes : router
}