const Router = require('express').Router();
const student= require('../components/student');
const student_dtls = require('../components/student_dtls');
const student_dtls_view = require('../components/student_dtls_view');

Router.get('/students',student.getStudents);
Router.get('/students/:id',student.getStudentsById);
Router.post('/students',student.insertStudents);
Router.put('/students/:id',student.updateStudentsById);
Router.delete('/students/:id',student.deleteStudentsById);
Router.get('/studentsdetails',student_dtls.getStudentsDtls);
Router.get('/studentsdetails/:id',student_dtls.getStudentsDtlsById);
Router.post('/studentsdetails',student_dtls.insertStudentsDtls);
Router.put('/studentsdetails/:id',student_dtls.updateStudentsDtlsById);
Router.delete('/studentsdetails/:id',student_dtls.deleteStudentsDtlsById);
Router.get('/allstudentsdetail',student_dtls_view.getStudentsDtlsView);
Router.get('/allstudentsdetails/:id',student_dtls_view.getStudentsDtlsViewById);

module.exports = Router;