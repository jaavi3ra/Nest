import Router from '@koa/router'
import usersRouter from './users.js'
import sectionRouter from './section.js'
import subjectRouter from './subject.js'
import teacherRouter from './teacher.js'
import sessionRouter from './session.js'
import evaluationRouter from './evaluation.js'
import attendanceRouter from './attendance.js'
import submissionRouter from './submission.js'
import studentRouter from './student.js'
import authRouter from './authLogin.js'
import password from './authPass.js'
import authRequired from '../middle/authRequired.js'
import getsubject from '../routes/getIDs/getByIdSection.js'


const router= new Router();
router.use('/api/users' , authRequired, usersRouter.routes());
router.use('/api/section', authRequired, sectionRouter.routes());
router.use('/api/subject', authRequired, subjectRouter.routes());
router.use('/api/teacher', authRequired, teacherRouter.routes());
router.use('/api/session', authRequired, sessionRouter.routes());
router.use('/api/evaluation', authRequired, evaluationRouter.routes());
router.use('/api/attendance', authRequired, attendanceRouter.routes());
router.use('/api/submission', authRequired, submissionRouter.routes());
router.use('/api/student', authRequired, studentRouter.routes());
router.use('/login', authRouter.routes());
router.use('/changePassword',authRequired, password.routes()); //log in
router.use('/NewPassword', password.routes()); //log out
//rutas get IDs
router.use('/api/users/rut',password.routes()); // log out
router.use('/api/subject/sec', authRequired, getsubject.routes());




export default router