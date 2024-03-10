const { Router } = require("express");
const { createNewIndex, getIndices, removeIndex } = require("../controller/indices.controller");

const router = Router()

router.post("/create" , createNewIndex)
router.get("/list" , getIndices)
router.delete("/delete/:indexName" , removeIndex )





module.exports ={
    indicesRoutes : router
}