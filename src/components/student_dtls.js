const db = require('../connector/db');

module.exports ={
    getStudentsDtls: async(request,response)=>{
        try{
        const data = await getStudentsDtlsModel();
        return response.status(200).json(data)
        }catch(error){
            return response.status(500).json({error:'unable to get data'})
        }

    },
    getStudentsDtlsById: async (request,response)=>{
        try{
        const id =request.params.id;    
        const data = await getStudentsDtlsByIdModel(id);
        if(!data){
            return response.status(400).json({message:'no data found'})
        }
        return response.status(200).json(data)
        } catch(error){
            return response.status(500).json({error: 'unable to get data'})
        }
    },
    insertStudentsDtls:async (request,response)=>{
        // console.log('test');
        try{ 
        const data =request.body; 
        if (!data.STUDENTS_ID || !data.AGE || !data.ADDRESS || !data.BLOOD_GROUP) {
            return response.status(400).json({ message: "please pass all the required fields" });
        }   
        await insertStudentsDtlsModel(data);
        return response.status(201).json({message:'data posted successfully'})
        } catch(error){
            // console.log('error:',error);
            return response.status(500).json({error: 'unable to insert data'})
        }
    },
    updateStudentsDtlsById:async (request,response)=>{
        try{
        const id =request.params.id;
        const data =request.body;  
        if ( !data.AGE || !data.ADDRESS || !data.BLOOD_GROUP) {
            return response.status(400).json({ message: "please pass all the required fields" });
        }   
        const studentsdtlsExists=await getStudentsDtlsByIdModel(id)
        if(!studentsdtlsExists){
            return response.status(400).json({message:'student Details does not exists'})
        }
        await updateStudentsDtlsByIdModel(data,id);
        return response.status(200).json({message:'data updated(put) successfully'})
        } catch(error){
            return response.status(500).json({error: 'unable to update data'})
        }
    },
    deleteStudentsDtlsById:async (request,response)=>{
        try{
        const id =request.params.id; 
        const studentsExists=await getStudentsDtlsByIdModel(id)
        if(!studentsExists){
            return response.status(400).json({message:'student does not exists'})
        }
        await deleteStudentsDtlsByIdModel(id);
        return response.status(200).json({message:'data deleted successfully'})
        } catch(error){
            return response.status(500).json({error: 'unable to delete data'})
        }
    }
}


const getStudentsDtlsModel = () =>{
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM STUDENTS_DTLS'
        db.appDatabase.all(
            sql,
            [],
            (err,rows)=>{
                if(err){
                    return reject('[getStudentsDtlsModel]: something went wrong')
                }
                return resolve(rows)
            }
        )
    })
}
const getStudentsDtlsByIdModel =(id)=>{
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT*FROM STUDENTS_DTLS WHERE STUDENTS_ID =?'
        db.appDatabase.get(
            sql,
            [id],
            (err,row)=>{
                if(err){
                return reject('[getStudentsDtlsByIdModel]: something went wrong')
                }
                resolve(row)
            }
        )

    })
}

const insertStudentsDtlsModel=(data)=>{
    // console.log('----');
    return new Promise((resolve,reject)=>{
    const sql ='INSERT INTO STUDENTS_DTLS(STUDENTS_ID,AGE,ADDRESS,BLOOD_GROUP) VALUES (?,?,?,?)';
    db.appDatabase.run(
        sql,
        [data.STUDENTS_ID,data.AGE,data.ADDRESS,data.BLOOD_GROUP],
        (err,result)=>{
            if(err){
                console.log(err);
                return reject('[insertStudentsDtlsModel]:unable to insert data')
            }
            resolve('success')
        }
    )
})
}
const updateStudentsDtlsByIdModel=(data,id)=>{
    return new Promise((resolve,reject)=>{
        const sql= 'UPDATE STUDENTS_DTLS SET AGE=?,ADDRESS=?,BLOOD_GROUP=? WHERE STUDENTS_ID=?';
        db.appDatabase.run(
            sql,
            [data.AGE,data.ADDRESS,data.BLOOD_GROUP,id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    return reject('[updateStudentsDtlsByIdModel]:unable to update data')
                }
                resolve('success')
            }
        )
    })
}
const deleteStudentsDtlsByIdModel=(id)=>{
    return new Promise((resolve,reject)=>{
        const sql= 'DELETE FROM STUDENTS_DTLS WHERE STUDENTS_ID=?';
        db.appDatabase.run(
            sql,
            [id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    return reject('[deleteStudentsDtlsByIdModel]:unable to delete data')
                }
                resolve('success')
            }
        )
    })
}