const { elasticClient } = require('../config/elastic.config')


async function createNewBlog(req , res , next){
    try {
        const {title , author , text} = req.body

        const result = await elasticClient.index({
            index:"blog" , document : {
                title , text , author
            }
        })
    
        return res.json(result)
        
    } catch (error) {
        next(error)
    }
    }
    
async function getAllBlogs(req , res , next){
    try {
        const {value} = req.params
        const blogs = await elasticClient.search({
            index : 'blog',
            q:value
        })
        return res.json(blogs.hits.hits)
    } catch (error) {
        next(error)
    }

}



async function updateBlog(req,  res , next){
    try {
        const{id} = req.params
        const data = req.body
        Object.keys(data).forEach(key =>{
            if(!data[key]) delete data[key]
        })

        const result = await elasticClient.update({
            index:'blog',
            id,
            doc: data
        })
        return res.json(result)
    } catch (error) {
        next(error)
    }
}
async function removeBlog(req, res , next){
    try {
        const {id}  = req.params
        const result = await elasticClient.deleteByQuery({
            index:'blog',
            query: {
                match:{_id:id}
            }
        })

        return res.json(result)

    } catch (error) {
        next(error)
    }
}

async function searchBytitle(req , res , next){
    try {
        const {title} = req.query
        const result = await elasticClient.search({
            index:'blog',
            query:{
                match:{title}
            }
        })

        return res.json(result)
    } catch (error) {
        next(error)
    }
}

async function searchByMultipleFields(req, res , next){
    try {
        const {value} = req.query
        const result = await elasticClient.search({
            index:'blog',
            query:{
                multi_match:{
                    query:value,
                    fields:['title' , 'text']
                }
            }
        })

        return res.json(result.hits.hits)
    } catch (error) {
        next(error)
    }
}

async function searchByRegex(req, res, next){
try {
    const{search} = req.query
    const result = await elasticClient.search({
        index: 'blog',
        query:{
            regexp:{
                title: `.*${search}.*`
            }
        }
    })
    return res.json(result.hits.hits)
} catch (error) {
    next(error)
}
}

async function searchByMultipleRegex(req, res , next){
    try {
        const {search} = req.query
        const result = await elasticClient.search({
            index:'blog',
            query:{
                bool:{
                    should:[ //should is like or , must is like and , 
                        {regexp:{title:`.*${search}.*`}} ,
                        {regexp:{text:`.*${search}.*`}} ,
                        {regexp:{author:`.*${search}.*`}}
                    ]
                }
            }
        })
        return res.json(result.hits.hits)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    searchBytitle , 
    createNewBlog,
     getAllBlogs,
     removeBlog,
     updateBlog,
     searchByMultipleFields,
     searchByRegex,
     searchByMultipleRegex
}