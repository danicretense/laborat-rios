const sqlite3= require("sqlite3").verbose()
require("dotenv").config()

class Database{

 _createTable(){
    const query=`
    create table if not exists jogos(
      id integer primary key  AUTOINCREMENT,
      nome text not null,
      categoria text not null,
      ano integer not null
    
    );


    `;


    this.db.run(query, (err) =>{

        if(err) console.error('Erro ao criar a tabela: ', err.message)
            else console.log("Tabela 'jogos' verificada/criada com sucesso" )
    })
 }
  
   _connect(){
    this.db= new sqlite3.Database(process.env.DB_NAME, (err)=>{
        if(err){
            console.error("Erro ao se conectar ao SQLite: " , err.message)
        }else{
            console.log("Conectado ao SQLite")
            this._createTable()
        }
    })

   }

   
constructor() {
    if(!Database.instance){
        this._connect()
        Database.instance=this
    }
    return Database.instance
}

}

module.exports= new Database()

