// linking to posts in until folder
const { getPosts, getPost, makePost, removePost, changePost} = require("../controllers/posts_controller")
//  below needed when dividing files
const express = require("express")
// ??redirecting to middleware? Not needing to do 
const router = express.Router()

// READ
// GET on '/posts'
// Returns all posts
router.get("/", getPosts) //define in controller

// READ
// GET on '/posts/:id'
// Returns post with given id
router.get("/:id", getPost)

router.post("/", makePost)
router.delete("/:id", removePost)
router.put("/:id", changePost)

// needed when dividing files
module.exports = router