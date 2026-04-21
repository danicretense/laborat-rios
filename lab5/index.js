const express = require("express");
const fs = require("fs");
const app= express()

const arquivo= 'jogos.db'
app.listen(3000, () =>{
 console.log('API de jogo em execução na porta 3000')
}
)


app.get('/jogos',(req,res)=>{

    let data=fs.readFileSync(arquivo)
    let jogos= JSON.parse(data)

    //Verifica se foi passado um paramentro de busca
    if(req.query.categoria){
        jogos=jogos.filter(jogo=>jogo.categoria.toLowerCase().includes(req.query.categoria.toLowerCase()))
    }
    res.send(jogos)

})

app.get('/jogos/:id',(req,res) => {
  let data= fs.readFileSync(arquivo)
  let jogos= JSON.parse(data)
  let jogo= jogos.find(jogo=>jogo.id==req.params.id)

  if (jogo){
    res.send(jogo)
  }else{
res.status(404).send("Jogo Não Encontrado")
  }

})


app.post('/jogos',(req,res) => {
    let data= fs.readFileSync(arquivo)
    let jogos= JSON.parse(data)
    let novoJogo= req.body
    novoJogo.id=jogos.length+1
    jogos.push(novoJogo)
    fs.writeFileSync(arquivo, JSON.stringify(jogos))
    res.status(201).send(novoJogo)

    app.use(express.json())
})

app.put('/jogos/:id',(req,res)=>{
   let data= fs.readFileSync(arquivo)
   let jogos= JSON.parse(data)
   let novoValor=req.body
   let jogo= jogos.find(jogo => {
    if(jogo.id==req.params.id){
        jogo.nome=novoValor.nome
        jogo.categoria=novoValor.categoria
        jogo.ano=novoValor.ano
        fs.writeFileSync(arquivo, JSON.stringify(jogos))
        return jogo
    }
   })

   if(jogo){
    res.send(jogo)
   }else{
    res.status(404).send('Jogo Não Encontrado')
   }


})

app.delete('/jogos/:id',(req,res) => {

   let data= fs.readFileSync(arquivo)
   let jogos= JSON.parse(data)
   
   if(!jogos.find(jogo=>jogo.id==req.params.id)){
    return res.status(404).send('Jogo Não encontrado' )
   }

   let jogosAtualizados= jogos.filter(jogo=> jogo.id !=req.params.id)

   fs.writeFileSync(arquivo, JSON.stringify(jogosAtualizados))
   res.send('Jogo removido com sucesso')  

})
