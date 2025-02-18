const express = require('express')
const isuserauthenticated = require('../middlewares/Auth')
const {createpost,getAllPosts,deletepost} = require("../controllers/postController")


const router = express.Router()

router.get('/getallposts',isuserauthenticated,getAllPosts)
router.post('/createpost',isuserauthenticated,createpost)
router.delete('/deletepost',isuserauthenticated,deletepost)


module.exports = router