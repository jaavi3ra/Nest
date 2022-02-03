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
import studentListRouter from './studentList.js'
import scheduleRouter from './schedule.js'
import authRouter from './authLogin.js'
import authPass from './authPass.js'
import careerRouter from './career.js'
import authRequired from '../middle/authRequired.js'


const router= new Router();
router.use('/api/users', authRequired, usersRouter.routes());
router.use('/api/section', authRequired, sectionRouter.routes());
router.use('/api/subject', authRequired, subjectRouter.routes());
router.use('/api/teacher', authRequired, teacherRouter.routes());
router.use('/api/session', authRequired, sessionRouter.routes());
router.use('/api/evaluation', authRequired, evaluationRouter.routes());
router.use('/api/attendance', authRequired, attendanceRouter.routes());
router.use('/api/submission', authRequired, submissionRouter.routes());
router.use('/api/student', authRequired, studentRouter.routes());
router.use('/api/studentList', authRequired, studentListRouter.routes())
router.use('/api/schedule', authRequired, scheduleRouter.routes())
router.use('/api/career', careerRouter.routes()); //log out
router.use('/changePassword',authRequired, authPass.routes()); //log in
router.use('/login', authRouter.routes());
router.use('/NewPassword', authPass.routes()); //log out




export default router