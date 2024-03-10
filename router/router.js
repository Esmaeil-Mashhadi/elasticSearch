const { Router } = require("express");
const { indicesRoutes } = require("./indices.routes");
const { blogRoutes } = require("./blog.routes");

const router = Router()

router.get("/" , (req ,res , next)=>{
    res.json("hi")
})

router.use('/index' , indicesRoutes)
router.use('/blog' , blogRoutes)

module.exports = {
    allRoutes : router
}