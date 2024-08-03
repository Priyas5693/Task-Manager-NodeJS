const express = require('express')
const Task = require('../models/tasks')
const auth = require('../middleware/auth')
const router = new express.Router


router.post('/tasks', auth, async(req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
       await task.save()
       res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})
// GET /tasks?completed=true
// router.get('/tasks', auth, async (req, res) => {
//     const match = {}

//     if (req.query.completed) {
//         match.completed = req.query.completed === 'true'
//     }

//     try {
//         await req.user.populate({
//             path: 'tasks',
//             match,
//             strictPopulate:false
//         }).then((result) => {
//             return result;
//         })
//         res.send(req.user.tasks)
        
//     } catch (e) {
//         console.log(e)
//         res.status(500).send()
//     }
// })
router.get('/tasks', auth, async (req, res) => {
    var tasks
try {
    if (req.query.completed) { //query exists: use it
         tasks = await Task.find({owner: req.user._id, completed: req.query.completed})
    } else { //query doesnt exist: dont try and and use it
         tasks = await Task.find({owner: req.user._id})
    }
    if (!tasks) {
        res.status(404).send()
    }
    res.send(tasks)
} catch (e) {
    console.log(e)
    res.status(500).send()
}
})

router.get('/tasks/:id', auth, async(req,res)=>{
    const _id = req.params.id
    try{
        const task= await Task.findOne({_id, owner: req.user._id})
        if(!task){
           return res.status(404).send()
        }
        res.status(200).send(task)

    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try { 
         const task = await task.findById({_id:req.params.id, owner:req.user._id})
         updates.forEach((update)=> task[update]=req.body[update])
          await task.save()

        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByOneAndDelete({_id:req.params.id, owner:req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router