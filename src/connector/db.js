const sqlite =require('sqlite3').verbose();
const path = require('path');
const dbpath = path.resolve(__dirname,'../../','student.sqlite');

// console.log(dbpath);

const appDatabase = new sqlite.Database(
    dbpath,
    sqlite.OPEN_READWRITE,
    err=>{
        if(err){
            return console.log('error connecting to the database::', err);
        }
        console.log('app connected to the database');
    }
)

// appDatabase.get(
//     'SELECT * FROM STUDENTS WHERE ID = ?',
//     [],
//     (err,rows)=>{
//         if(err){
//         return console.log(err);
//     }
//     return console.log(rows);
//     }
// )

module.exports={appDatabase}