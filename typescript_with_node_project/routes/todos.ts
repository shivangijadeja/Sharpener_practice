import {Router} from 'express'
import { Todo } from '../models/todos'
const router=Router()
const todos:Todo[]=[]

router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos})
})

router.post('/todo',(req,res,next)=>{
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:req.body.text
    };

    todos.push(newTodo)

    res.status(201).json({message:'Added todo',todo:newTodo,todos:todos})
})

router.delete('/todo/:todo_id',(req,res,next)=>{
    const todos_list=todos.filter((todoItem)=>todoItem.id!==req.params.todo_id)
    res.status(200).json({message:'Deleted todo',todos:todos_list})
})

router.put('/todo/:todo_id',(req,res,next)=>{
    todos.forEach((todo)=>{
        if(todo.id===req.params.todo_id){
            todo.text=req.body.text
        }
    })
    res.status(200).json({message:'Todo Updated',todos:todos})

})

export default router;