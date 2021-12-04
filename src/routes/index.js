import Router from '@koa/router'
import usersRouter from './users.js'
import sectionRouter from './section.js'
import subjectRouter from './subject.js'
import teacherRouter from './teacher.js'
import sessionRouter from './session.js'
import EvaluationRouter from './evaluation.js'
import AttendanceRouter from './attendance.js'
import SubmissionRouter from './submission.js'
import StudentRouter from './student.js'
import AuthRouter from './authLogin.js'
import authRequired from '../middle/authRequired.js'

const router= new Router();
router.use('/api/users' , authRequired, usersRouter.routes());
router.use('/api/section', authRequired,sectionRouter.routes());
router.use('/api/subject', authRequired,subjectRouter.routes());
router.use('/api/teacher', authRequired,teacherRouter.routes());
router.use('/api/session', authRequired,sessionRouter.routes());
router.use('/api/evaluation', authRequired,EvaluationRouter.routes());
router.use('/api/attendance', authRequired,AttendanceRouter.routes());
router.use('/api/submission', authRequired,SubmissionRouter.routes());
router.use('/api/student', authRequired,StudentRouter.routes());
router.use('/login', AuthRouter.routes());




export default router