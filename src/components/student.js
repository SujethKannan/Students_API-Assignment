const db = require('../connector/db');

module.exports = {
    getStudents: async(request,response)=>{
        try{
        const data = await getStudentsModel();
        return response.status(200).json(data)
        }catch(error){
            return response.status(500).json({error:'unable to get data'})
        }

    }, 
    getStudentsById: async (request,response)=>{
        try{
        const id =request.params.id;    
        const data = await getStudentsByIdModel(id);
        if(!data){
            return response.status(400).json({message:'no data found'})
        }
        return response.status(200).json(data)
        } catch(error){
            return response.status(500).json({error: 'unable to get data'})
        }
    },
    insertStudents:async (request,response)=>{
        try{
        const data =request.body; 
        if (!data.NAME || !data.STREAM || !data.DEPARTMENT || !data.MOBILE_NO || !data.BATCH) {
            return response.status(400).json({ message: "please pass all the required fields" });
        }   
        await insertStudentsModel(data);
        return response.status(201).json({message:'data posted successfully'})
        } catch(error){
            return response.status(500).json({error: 'unable to insert data'})
        }
    },
    updateStudentsById:async (request,response)=>{
        try{
        const id =request.params.id;
        const data =request.body;  
        if (!data.NAME || !data.STREAM || !data.DEPARTMENT || !data.MOBILE_NO || !data.BATCH) {
            return response.status(400).json({ message: "please pass all the required fields" });
        }   
        const studentsExists=await getStudentsByIdModel(id)
        if(!studentsExists){
            return response.status(400).json({message:'student does not exists'})
        }
        await updateStudentsByIdModel(data,id);
        return response.status(200).json({message:'data updated(put) successfully'})
        } catch(error){
            return response.status(500).json({error: 'unable to update data'})
        }
    },
    deleteStudentsById:async (request,response)=>{
        try{
        const id =request.params.id; 
        const studentsExists=await getStudentsByIdModel(id)
        if(!studentsExists){
            return response.status(400).json({message:'student does not exists'})
        }
        await deleteStudentsByIdModel(id);
        return response.status(200).json({message:'data deleted successfully'})
        } catch(error){
            return response.status(500).json({error: 'unable to delete data'})
        }
    }
}
   

const getStudentsModel = () =>{
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM STUDENTS'
        db.appDatabase.all(
            sql,
            [],
            (err,rows)=>{
                if(err){
                    return reject('[getStudentsModel]: something went wrong')
                }
                return resolve(rows)
            }
        )
    })
}
const getStudentsByIdModel =(id)=>{
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT*FROM STUDENTS WHERE ID =?'
        db.appDatabase.get(
            sql,
            [id],
            (err,row)=>{
                if(err){
                return reject('[getStudentsByIdModel]: something went wrong')
                }
                resolve(row)
            }
        )

    })
}

const insertStudentsModel=(data)=>{
    return new Promise((resolve,reject)=>{
    const sql ='INSERT INTO STUDENTS(NAME,STREAM,DEPARTMENT,MOBILE_NO,BATCH) VALUES (?,?,?,?,?)';
    db.appDatabase.run(
        sql,
        [data.NAME,data.STREAM,data.DEPARTMENT,data.MOBILE_NO,data.BATCH],
        (err,result)=>{
            if(err){
                console.log(err);
                return reject('[insertStudentsModel]:unable to insert data')
            }
            resolve('success')
        }
    )
})
}
const updateStudentsByIdModel=(data,id)=>{
    return new Promise((resolve,reject)=>{
        const sql= 'UPDATE STUDENTS SET NAME=?,STREAM=?,DEPARTMENT=?,MOBILE_NO=?,BATCH=? WHERE ID=?';
        db.appDatabase.run(
            sql,
            [data.NAME,data.STREAM,data.DEPARTMENT,data.MOBILE_NO,data.BATCH,id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    return reject('[updateStudentsByIdModel]:unable to update data')
                }
                resolve('success')
            }
        )
    })
}
const deleteStudentsByIdModel=(id)=>{
    return new Promise((resolve,reject)=>{
        const sql= 'DELETE FROM STUDENTS WHERE ID=?';
        db.appDatabase.run(
            sql,
            [id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    return reject('[deleteStudentsByIdModel]:unable to delete data')
                }
                resolve('success')
            }
        )
    })
}

