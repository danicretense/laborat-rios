const express = require("express");
const db= require('./db') .db
const app= express()

const APP_PORT=process.env.APP_PORT||3000


app.use(express.json())




app.listen(APP_PORT, () =>{
 console.log('API de jogo em execução na porta 3000')
 //console.log(`Acesse a url http://localhost:${APP_PORT}`)
}
)
 app.get('/', (req, res)=> res.send('API version 1.1.0 on-line!'))

app.get('/jogos',(req,res)=>{

   let query= 'SELECT * FROM jogos'
    if(req.query.categoria){
    query+= "WHERE categoria LIKE  '% "+ req.query.categoria+ "%'"

    }

    db.all(query, [], (err,jogos) =>{

      if(err) return res.status(500).json({error: err.message})
        
    res.send(jogos)
    })

})
//--------------------------------
app.get('/jogos/:id',(req,res) => {
 let query= "select * from jogos where id=?"
  db.get(query, [req.params.id]  , (err, jogo) =>{
    if(err)  return res.status(500).json({error: err.message})
      if (jogo){
    res.send(jogo)
  }else{
res.status(404).send("Jogo Não Encontrado")
  }


  })


})

//Post
app.post('/jogos',(req,res) => {

 const {nome, categoria, ano}= req.body
 if(!nome && !categoria && !ano){
  return  res.status(400).json({error: "Campos nome, categoria e ano são obrigatórios"})
 }
    db.run("insert into jogos (nome, categoria, ano)  values (?,?,?)",
      [nome, categoria, ano], function (err) {
        if(err) return res.status(500).json({error: err.message})
          res.status(201).send({id: this.lastID, nome})
      })


    })
//Put

app.put('/jogos/:id',(req,res)=>{
 const { nome, categoria, ano} = req.body
 const id= req.prams.id

 let query= "select *from jogos where id=?"
 db.get(query, [id], (err, jogo)=>{

   if(err) return res.status(500).json({error: err.message})
    if(jogo){
      db.run("update jogos set nome= ?, categoria=?, ano=? where id =?",
    [nome, categoria, ano. id], function (err){

      if (err) return res.status(500).json({error: err.message})
        res.send(jogo)
    })

  }else{
      res.status(404).send('jogo não encontrado.')
    }
})


})


//Delete

app.delete('/jogos/:id',(req,res) => {
 const id= req.params.id

  db.run("delete from jogos where id=?" , [id] , function (err)  {
  if (err) return res.status(500).json({error: err.message})
    res.send('jogo removido com sucesso.')
})

})
