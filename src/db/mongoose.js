const { default: mongoose } = require("mongoose")

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true
})

// const user = new User({
//     name:'Priti',
//     age: 34
// })

// user.save().then(() =>{
//    console.log('user saved successfully', user)
// }).catch((e) =>{
//    console.log(e)
// })

// const Task =mongoose.model('task',{
//     description:{
//         type: String
//     },
//     completed:{
//         type: Boolean
//     }
// })

// const task = new Task({
//     description: 'Clean the house',
//     Completed: true
// })

// task.save().then(()=>{
//   console.log(task)
// }).catch((e)=> {
//     console.log(e)
// })