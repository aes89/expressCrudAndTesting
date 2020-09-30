//need to access data file
let dataFile = "../../server/data/blog_posts.json"
let blogPosts = require(dataFile) //only use "require" once

const fs = require('fs');

const getAllPosts = (req) => {
	return blogPosts
}

const getPostById = (req) => {
	//whenever using dynamic route can use "params"
	let post = blogPosts[req.params.id]
	if (post) return post
	// what req.error is in posts_controller
	else req.error = "Post not found"
}
const addPost = (req) => {
	try {
		const date = Date.now()
		let blogPost = {
			title: req.body.title,
			create_date: date,
			modified_date: date,
			username: req.body.username,
			content: req.body.content,
			category: req.body.category || ""
		}
		blogPosts[getNextId()] = blogPost
		// node file write: in future this will be replaced with mogodb create
		fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(blogPosts))
		return blogPost
	}
	catch(error) {
		console.error(error)
		req.error = error
		return null
	}
}

const deletePost = (id) => {
	if (Object.keys(blogPosts).includes(id)) {
		delete blogPosts[id]
		fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(blogPosts))
	} 
	return blogPosts
}

// Returns the next available id for a blog post. Sorting - gets the next ID number.
function getNextId() {
	let sortedIds = Object.keys(blogPosts).sort()
	nextId = (sortedIds.length != 0) 
			? parseInt(sortedIds[sortedIds.length-1]) + 1
			: 1
	return nextId
}

const updatePost = (req) => {
	try {
		let id = req.params.id
		if (!blogPosts[id]) throw "Post not found"
		blogPosts[id].title = req.body.title
		blogPosts[id].content = req.body.content
		blogPosts[id].category = req.body.category 
				? req.body.category 
				: blogPosts[id].category
		blogPosts[id].modified_date = Date.now()
		fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(blogPosts))
		return blogPosts[id]
	} catch (error) {
		req.error = error
		return null
	}
}

// Allows flexibility for testing
// Loads data from dataFile with fs
// code from node documentation - syntax easier when using mongo
function loadData(path) {
  blogPosts = JSON.parse(fs.readFileSync(path,'utf8'))
}


//whenever reading content from specific file, in respect to app.js. need to return the file address from the other file, that's what this code is doing. 
const getDataFileRelativeToApp = (file) => {
	// Remove the ../ from the dataFile path for writing
	// because the writeFile looks for path relative to the app, not utilities.js
	return file.substring(file.lastIndexOf("../") + 3, file.length)
}

module.exports = {
	getAllPosts,
    getPostById,
    addPost,
    deletePost,
    updatePost,
	loadData,
	getDataFileRelativeToApp
}



// with desctructured names

// const expect = require("expect")
// // testing unit functions (defined in utilities.js)
// const {getAllPosts,loadData,getDataFileRelativeToApp, getPostById, addPost } = require("../server/util/utilities")
// const fs= require("fs")
// // require test data file
// const testdataFile = "../server/data/blog_posts.test.json"
// const testDataFileForWrite = getDataFileRelativeToApp(testdataFile)

// // setup a test data to begin with
// beforeEach(() => {
//     setupData()
// })

// describe("get All posts", () => {
//     test("should get a post if one exists",() =>{
//         expect(Object.keys(getAllPosts({})).length).toBe(1)
//     })
//     test("user name of the first post must be Luke",() =>{
//         expect(getAllPosts({})["1"].username).toBe("Luke")
//     })
// })

// describe("getPostById", () =>{
//     const req = {
//         params:{
//             id: "1"
//         }
//     }
//     test("user of post with id 1 should be Luke", () =>{
//         expect(getPostById(req).username).toBe("Luke")
//     })
// })

// describe("addPost", () => {
//         test("should add a post", () => {
//         // define a req object with expected structure
//             const req = {
//             body: {
//             title: "Another post",
//             username: "tester",
//             content: "This is another blog post!",
//             category: ""
//             }
//         }
//         let post = addPost(req)
//         console.log(post)
//         expect(post.title).toBe(req.body.title)
//     })
// })

// function setupData() {
// 	let testPostData = {}
// 	let testPost = {}
// 	let date = Date.now()
// 	testPost.title = "Test post 1"
// 	testPost.username = "Luke"
// 	testPost.create_date = date
// 	testPost.modified_date = date
// 	testPost.content = "This is the first test post"
// 	testPost.category = ""
// 	testPostData["1"] = testPost

// 	fs.writeFileSync(testDataFileForWrite, JSON.stringify(testPostData))
// 	loadData(testDataFileForWrite)
// }
// // function setupData(){
// //     let testPostData = {}
// //     let testPost = {}
// //     let date = Date.now()
// //     testPost.title = "Test Post 1"
// //     testPost.username = "Luke"
// //     testPost.create_date = date
// //     testPost.modified_date = date
// //     testPostData["1"] = testPost

// //     fs.writeFileSync(testdataFileForWrite, JSON.stringify(testPostData))
// //     loadData(testdataFileForWrite)
// // }
