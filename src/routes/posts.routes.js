const express = require('express');
const router = express.Router();
const controller = require("../controllers/posts.controller")
const verifyToken = require("../middlewares/verifyToken")

router.get('/api/posts', controller.getPosts)
router.get('/api/posts/:postId', controller.getResponses)

router.post('/api/posts', verifyToken.verifyToken, controller.addPost)

router.put('/api/posts/:postId',verifyToken.verifyToken, controller.updatePost)

router.delete('/api/posts/:postId', verifyToken.verifyToken, controller.deletePost)


module.exports = router;