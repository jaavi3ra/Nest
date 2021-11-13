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

const router= new Router();
router.use('/api/users', usersRouter.routes());
router.use('/api/section', sectionRouter.routes());
router.use('/api/subject', subjectRouter.routes());
router.use('/api/teacher', teacherRouter.routes());
router.use('/api/session', sessionRouter.routes());
router.use('/api/evaluation', EvaluationRouter.routes());
router.use('/api/attendance', AttendanceRouter.routes());
router.use('/api/submission', SubmissionRouter.routes());
router.use('/api/student', StudentRouter.routes());
router.use('/login', AuthRouter.routes());




export default router