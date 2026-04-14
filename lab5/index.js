const express = require("express");
const fs = require("fs");
const app= express()

const arquivo= 'jogos.db'
app.listen(3000, () =>{
 console.log('API de jogo em execução na porta 3000')
 fs.acess(arquivo, fs.constants.F_OK,(err)=>{
    if(err){
        console.log(`${arquivo} não existe. Criando arquivo...`)
        let jogosIniciais=[
            {id: 1, nome:'Super Mário World', ano:1990, categoria:'Plataforma'},
            {id: 2, nome:'Age of Empires II', ano:1999, categoria:'Estratégia'},
            {id: 3, nome:'The Elder Scrolls V: Skyrim', ano:2011, categoria:'RPG'},
            {id: 4, nome:'the Last of Us', ano:2013, categoria:'Aventura'}
            {id: 5, nome:'God of War', ano:2018, categoria:'Ação'}

        ];
        fs.writeFileSync(arquivo, JSON.stringfy(jogosIniciais))
    }
 })
 


}
)