import {Router} from 'express'
import { Todo } from '../models/todos'
import { type } from 'os'
type requestBody={text:string}
type requestParams={todo_id:string}
const router=Router()
const todos:Todo[]=[]

router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos})
})

router.post('/todo',(req,res,next)=>{
    const body=req.body as requestBody

    const newTodo:Todo={
        id:new Date().toISOString(),
        text:body.text
    };

    todos.push(newTodo)

    res.status(201).json({message:'Added todo',todo:newTodo,todos:todos})
})

router.delete('/todo/:todo_id',(req,res,next)=>{
    const params=req.params as requestParams
    const todos_list=todos.filter((todoItem)=>todoItem.id!==params.todo_id)
    res.status(200).json({message:'Deleted todo',todos:todos_list})
})

router.put('/todo/:todo_id',(req,res,next)=>{
    const body=req.body as requestBody
    const params=req.params as requestParams
    todos.forEach((todo)=>{
        if(todo.id===params.todo_id){
            todo.text=body.text
        }
    })
    res.status(200).json({message:'Todo Updated',todos:todos})

})

export default router;