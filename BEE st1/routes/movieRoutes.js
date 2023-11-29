const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
    content:{type:String, required:true, maxlength:500},
    rating:{type:Number, required:true, min:1, max:5},
    author:{type:String, required:true},
    createdAt:{type:Date, default:Date.now}
});
const movieSchema=new mongoose.Schema({
    title:{type:String, required:true, maxlength:255},
    description:{type:String, required:true, maxlength:1000},
    genre:{type:String, required:true},
    releaseYear:{type: Number, required:true, min:1800, max:new Date().getFullYear()},
    reviews:[reviewSchema]
});
const Movie=mongoose.model('Movie', movieSchema);
module.exports=Movie;