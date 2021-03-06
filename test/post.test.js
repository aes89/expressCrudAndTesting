// need the expect stuff?
const expect = require("expect")
const fs = require("fs")
//for testing utilities file
const utilities = require("../server/utils/utilities")
// Use test data file
const testDataFile = "../server/data/blog_posts.test.json"
// When we write to the file, the path is relative to app.js
// 
const testDataFileForWrite = utilities.getDataFileRelativeToApp(testDataFile) 

beforeEach(() => {
	// Set and load data from test data file
	setupData()
})

describe("getAllPosts", () => {
	test("should get a post if one exists", () => {
		// Pass an empty req object. grabs keys from object in the form of an array. 
		expect(Object.keys(utilities.getAllPosts({})).length).toBe(1)
	})
	test("user of first post should be tester", () => {
		expect(utilities.getAllPosts({})["1"].username).toBe("tester")
	})
})

describe("getPostById", () => {
	// Define a req object with the expected structure to pass a parameter
	const req = {
		params: {
			id: "1"
		}
	}
	test("user of post with id 1 should be tester", () => {
		expect(utilities.getPostById(req).username).toBe("tester")
	})
})
describe("addPost", () => {
	test("should add a post", () => {
		// define a req object with expected structure
		const req = {
			body: {
				title: "Another post",
				username: "tester",
				content: "This is another blog post!",
				category: ""
			}
		}
		let post = utilities.addPost(req)
		expect(post.title).toBe(req.body.title)
	})

	test("should get all blogPosts", () => {
        // add the post again because setupData will clear the one we created
        const req = {
			body: {
				title: "Another post",
				username: "tester",
				content: "This is another blog post!",
				category: ""
			}
		}
		utilities.addPost(req)
		let posts = utilities.getAllPosts({})
		expect(Object.keys(posts).length).toBe(2)
	})
})

describe("deletePost", () => {
	test("should delete the specified post", () => {
		let id = "1"
		let blogPosts = utilities.deletePost(id)
		let ids = Object.keys(blogPosts)
		expect(ids.includes("1")).toBe(false)
	})
})

// updatePost
describe("updatePost", () => {
	test("should update a post", () => {
		// set up a req object
		const req = {
			params: {
				id: "1"
			},
			body: {
				title: "Updated post",
				username: "tester",
				content: "This is an updated blog post!",
				category: ""
			}
		}
		let post = utilities.updatePost(req)
		expect(post.title).toBe(req.body.title)
	})
})

// Setup and tear down functions
// writes test data newly each time it is run
function setupData() {
	let testPostData = {}
	let testPost = {}
	let date = Date.now()
	testPost.title = "Test post 1"
	testPost.username = "tester"
	testPost.create_date = date
	testPost.modified_date = date
	testPost.content = "This is the first test post"
	testPost.category = ""
	testPostData["1"] = testPost

	fs.writeFileSync(testDataFileForWrite, JSON.stringify(testPostData))
	utilities.loadData(testDataFileForWrite)
}


// destructuring:

// const expect = require("expect")
// // testing unit functions (defined in utilities.js)
// const {getAllPosts,loadData,getDataFileRelativeToApp} = require("../server/util/utilities")
// const fs= require("fs")
// // require test data file
// const testdataFile = "../server/data/blog_posts.test.json"
// const testdataFileForWrite = getDataFileRelativeToApp(testdataFile)

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

// function setupData(){
//     let testPostData = {}
//     let testPost = {}
//     let date = Date.now()
//     testPost.title = "Test Post 1"
//     testPost.username = "Luke"
//     testPost.create_date = date
//     testPost.modified_date = date
//     testPostData["1"] = testPost

//     fs.writeFileSync(testdataFileForWrite, JSON.stringify(testPostData))
//     loadData(testdataFileForWrite)
// }
