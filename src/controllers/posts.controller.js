const Posts = require ("../models/postsModel")
const Users = require ("../models/usersModel")
const Responses = require ("../models/responsesModel");
const { findByIdAndUpdate } = require("../models/postsModel");

const getPosts = async  (req,res)=>{
    const posts = await Posts.find();

    res.status(200).json(posts)
}
const getResponses = async  (req,res)=>{
    const post = await Posts.findById(req.params.postId);
    const responses = await Responses.find({postId:req.params.postId});

    res.status(200).json({post: post.title, text:post.text, responses: responses})
}

const addPost = async (req,res)=>{
    console.log(req.query)
    if (req.query.type=="post"){
        const newPost = new Posts({
            title: req.body.title,
            text: req.body.text,
            userId: req.userId
        })
        
        try {
            await newPost.save()
        } catch (error) {
            res.status(500).json({message: "Error en la consulta"})
        }
        
        
        res.send("Post agregado"+ newPost)
    }
    else if (req.query.type =="response"){
        
        const newResponse = new Responses({
            text: req.body.text,
            postId : req.query.postId,
            userId: req.userId
        })

        try {
            await newResponse.save()
        } catch (error) {
            res.status(500).json({message: "Error en la consulta"})
        }
        
        
        res.send("Response agregada"+ newResponse)
    }
}

const updatePost = async (req,res)=>{

    try {
       
       if(req.query.type === "post"){
            const matchUserId = await  Posts.findOne({_id:req.params.postId, userId : req.userId })

            if(matchUserId){
                const post = await Posts.findByIdAndUpdate(req.params.postId, req.body)
                res.json({message:"Post Updated Ok"})
            }else{
                res.json({message:"No puede editar un post de otro usuario"})
            }
        }else{
            const matchUserId = await  Responses.findOne({_id:req.params.postId, userId : req.userId })

            if(matchUserId){
                const post = await Responses.findByIdAndUpdate(req.params.postId, req.body)
                res.json({message:"Response Updated Ok"})
            }else{
                res.json({message:"No puede editar la response de otro usuario"})
            }

        }
    } catch (error) {
        res.status(500).json({message: "Error al consultar la base de datos"})
    }

}

const deletePost = async (req,res)=>{
    try {
       
        if(req.query.type === "post"){
             const matchUserId = await  Posts.findOne({_id:req.params.postId, userId : req.userId })
 
             if(matchUserId){
                 const post = await Posts.findByIdAndDelete(req.params.postId, req.body)
                 res.json({message:"Post DELETED Ok"})
             }else{
                 res.json({message:"No puede ELIMINAR un post de otro usuario"})
             }
         }else{
             const matchUserId = await  Responses.findOne({_id:req.params.postId, userId : req.userId })
 
             if(matchUserId){
                 const post = await Responses.findByIdAndDelete(req.params.postId, req.body)
                 res.json({message:"Response DELETED Ok"})
             }else{
                 res.json({message:"No puede ELIMINAR la response de otro usuario"})
             }
 
         }
     } catch (error) {
         res.status(500).json({message: "Error al consultar la base de datos"})
     }
 
 }


module.exports = {getPosts, getResponses, addPost, updatePost, deletePost}