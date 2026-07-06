


let blogs = [ 
          { 
             id:'1',
             title:'Angular',
             item:"ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"             
           
            },
          { 

            id:'2',
            title:'JavaScript',
            item:"ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
         
          },
          { 
            id:'3',
             title:'CSS',
             item:'"ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"' 
          },
           { 
            id:'4',
             title:'Angular',
             item:"ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"             
          },
          
          {
            id:'5',
            title:'JavaScript',
            item:"ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
          },
          { 
             id:'6',
             title:'CSS',
             item:"ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
          },
]




const express  =require('express');
//after installing cors we will import it in Commonjs
 const cors = require('cors');

const app = express();
 const PORT = 3000;
 
//  [    `http://127.0.0.1:5500`,
//        `http://localhost:5500`,
//         "http://127.0.0.1:5503",
//         "http://localhost:5503"
// ],


 app.use(cors({ 
      origin:"*",
      // credentials:true,          
      methods:['GET','POST','PUT',"PATCH","DELETE"]   
   }))

   app.use(express.json());

   // if we have query params q == 'rxjs' 
   // page =1 and limit == 20 



   //GET API
  app.get('/blogs',(req,res)=>{ 
         try{ 
            res.status(200).json({
                success:true,
                data:blogs
            })
         } catch(err){ 
              res.status(500).json({ 
                   success:false ,
                   message:'Error fetch blogs..!!',
                   error:err.message
               })
         } 
     
  })



     



  app.get('/blogs/:id',(req,res)=>{
       try{
            const id = Number(req.params.id);
            const blog = blogs.find((b)=> b.id==id);

         if(!blog){ 
                 //we used return here  beacuse if we get error it will never execute  next line code   
        
            return res.status(404).json({ 
                status:false ,
                message:`Blog with id ${id} is not found`
             })


         }
  
        res.status(200).json({ 
            status:true,
            data:blog
          })  


       }catch(err){ 
              res.status(500).json({
                 success:false ,
                 message:'Error to fetch blogs !!',
                 error:err.message
              })
          }


  })

//  app.get("/",(req,res)=>{ 
//         res.send(`backend is running successfullly ${PORT}`)
//  })


// Post API 
      app.post('/blogs',(req,res)=>{ 
          try{ 
            
            let {title,item,author} =req.body; 
             
            if(!title || !item){ 
                 return res.status(400).json({ 
                    success:true ,
                    message:'title & content require'
                 })
            }  
                      
               let newObj={ 
                       title,
                       item,  
                       author:author || 'Anonymous',
                      id:blogs.length+1
               } 
               
            //Add new  Object in DB
                blogs.unshift(newObj); 
                 
                 res.status(201).json({ 
                         success:true,
                          data:newObj,
                          message:`The blog is created successfully`               
                 })

                  
           } catch(err){ 
                     res.status(500).json({ 
                         success:false ,
                         message:"Error while creating blog",
                         error:err.message 
                     })
                  }      
            
        })


        
        
        
   app.delete('/blogs/:id',(req,res)=>{ 
           try{ 
              let id= req.params.id;
               
              let getindex = blogs.findIndex(b=>b.id===id); 
              
              if(getindex === -1){ 
                   res.status(404).json({ 
                           success:false,
                           message:`blog with id ${id} is  not found`
                   })
              }

              blogs.splice(getindex,1);
              
              res.status(200).json({ 
                  success:true, 
                  data:blogs,
                  message:'blog is deleted successfully'
               })

             }catch(err){  
               res.status(500).json({ 
                  success:false, 
                  message:'Error while deleting blog',
                  error:err.message                                                    
               })
            }      
         })



      app.patch('/blogs/:id',(req,res)=>{ 
                  
            try{ 
                  let blogId = req.params.id;
                  const { title, item } = req.body;
                  let getIndex= blogs.findIndex(post=>post.id === blogId);
                        if(getIndex === -1){
                           return res.status(404).json({ 
                                    success:false,
                                    message:`Blog with id ${blogId} not found`  
                           })
                        }
                  
                  if(!title || !item){ 
                     return res.status(400).json({ 
                        success:false 
                        })
                     }
                  let updatedBlogs = { 
                          ...blogs[getIndex],
                          ...req.body , 
                          updatedAt:Date.now().toString()
                      }

                  blogs[getIndex] = updatedBlogs;
                  
                  res.status(200).json({ 
                     success:true,
                     message:`the blog with id ${blogId}`,
                     data:updatedBlogs
                  })
                  
            }
            catch(err){
    console.log(err);

    res.status(500).json({
        success:false,
        message:err.message
      });
}
      })


         app.get('/',(req,res)=>{ 
             res.send(

                console.log('server is running...!')
             
             )    
                   
         }) 
         
         app.listen(PORT,() =>{
            console.log(`server is running on Port: http://localhost:${PORT}/blogs`)
           })














// let arr =[1,2,3,4,5,6,7,8,9,10]; 

// let total = arr.reduce((acc,cv)=>acc+cv,0)
//          let avg =  total/arr.length;

// console.log(avg)