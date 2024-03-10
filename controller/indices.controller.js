const createHttpError = require('http-errors')
const { elasticClient } = require('../config/elastic.config')

async function createNewIndex(req , res , next){
try {
    const {indexName} = req.body
     if(!indexName) throw createHttpError.BadRequest('invalid index value')
     const result = await elasticClient.indices.create({index: indexName})
    return res.json({result , message:"index created"})
} catch (error) {
    next(error)
}
}


async function removeIndex(req, res , next){
try {
    const {indexName} = req.params
    const removeResult = await elasticClient.indices.delete({index :indexName})
    return res.json(removeResult)

} catch (error) {
    next(error)
}
}


async function getIndices(req, res , next){
try {
    const indices = await elasticClient.indices.getAlias();
    return res.json({
        indices :Object.keys(indices).filter(key =>   !key.startsWith('.'))
    })
} catch (error) {
    next(error)
}
}


module.exports ={
    createNewIndex,
    getIndices,
    removeIndex
}