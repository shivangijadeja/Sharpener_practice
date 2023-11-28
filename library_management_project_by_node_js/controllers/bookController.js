const Book=require('../models/books')

const addBook=async (req,res,next)=>{
    const name=req.body.name
    const taken_on=req.body.taken_on
    const return_on=req.body.return_on
    const book_fine=req.body.book_fine
    const is_return=req.body.is_return

    const data=await Book.create({
        name:name,
        taken_on:taken_on,
        return_on:return_on,
        book_fine:book_fine,
        is_return:is_return
    }).then((data)=>{
        console.log(data)
    }).catch((err)=>{
        console.log(err)
    })
}

const getAllBooks=(req,res,next)=>{
    Book.findAll().then((rows)=>{
        res.status(200).json({books:rows})
    }).catch((err)=>{
        console.log(err)
    })
}

const updateBook=(req,res,next)=>{
    const id=req.params.id
    let book_fine;
    const selected_book=Book.findOne({where:{id:id}}).then((res)=>{
        var diff=new Date().getTime()-res.dataValues.return_on.getTime()
        diff/=(60*60);
        const hours=Math.abs(Math.round(diff))/365
        book_fine=Math.round(hours)*10
    }).then(()=>{
        Book.update({
            is_return:true,
            book_fine:book_fine
        },{
            where:
            {id:id}
        })
    })
    
}

module.exports={
    addBook,
    getAllBooks,
    updateBook
}