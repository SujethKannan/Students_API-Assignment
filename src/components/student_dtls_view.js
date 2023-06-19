const db = require('../connector/db');

module.exports ={
    getStudentsDtlsView: async(request,response)=>{
        try{
        const data = await getStudentsDtlsViewModel();
        return response.status(200).json(data)
        }catch(error){
            return response.status(500).json({error:'unable to get data'})
        }
    },
    getStudentsDtlsViewById: async (request,response)=>{
        try{
        const id =request.params.id;    
        const data = await getStudentsDtlsViewByIdModel(id);
        if(!data){
            return response.status(400).json({message:'no data found'})
        }
        return response.status(200).json(data)
        } catch(error){
            return response.status(500).json({error: 'unable to get data'})
        }
    }
}


const getStudentsDtlsViewModel = () =>{
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM STUDENTS_DTLS_RELATION_V'
        db.appDatabase.all(
            sql,
            [],
            (err,rows)=>{
                if(err){
                    return reject('[getStudentsDtlsViewModel]: something went wrong')
                }
                return resolve(rows)
            }
        )
    })
}
const getStudentsDtlsViewByIdModel =(id)=>{
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT*FROM STUDENTS_DTLS_Relation_V WHERE STUDENTS_ID =?'
        db.appDatabase.get(
            sql,
            [id],
            (err,row)=>{
                if(err){
                return reject('[getStudentsDtlsViewByIdModel]: something went wrong')
                }
                resolve(row)
            }
        )

    })
}