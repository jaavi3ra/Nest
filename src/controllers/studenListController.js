import moongose from 'mongoose'
import * as yup from 'yup';
import studentList from '../Model/studentList.js'

const { ObjectId } = moongose.Types

const getStudentListController = () => {

    const getAll = async ctx => {
        const dataList = await studentList.find().populate('user').exec()
        ctx.body = dataList
    }

    const getById = async ctx => {
        const { id } = ctx.request.params
        if (ObjectId.isValid(id)) {
            const dataList = await studentList.findOne({ user: id }).populate('user').exec()

            if (!dataList) {
                ctx.body = 'Not found'
                ctx.status = 404
                return
            } else {
                ctx.body = dataList
                ctx.status = 200
            }

        } else {
            ctx.body = 'Invalid Credetial (1)'
            ctx.status = 400
            return
        }
    }

    const createList = async ctx => {
        const payload = ctx.request.body
        const yupSchema = yup.object().shape({
            name: yup.string().required(),
            user: yup.array().of(yup.string().test({
                name: 'ObjectId',
                message: 'Invalid ObjectId',
                test: val => ObjectId.isValid(val)
            }))
        })

        try {
            yupSchema.validateSync(payload)
        } catch (e) {
            ctx.status = 400
            ctx.body = e.message
            return
        }
        const newList = new studentList(payload)
        try {
            const createdlist = await newList.save()
            ctx.body = createdlist
            ctx.status = 200
        } catch (e) {
            if (e.code === 11000) {
                ctx.status = 400
                return
            }
            ctx.status = 500
            ctx.body = e.message
            return
        }
    }

    const updateById = async ctx => {
        const { id } = ctx.request.params //id lista deseada
        if (!ObjectId.isValid(id)) {
            ctx.status = 404
            ctx.body = 'Params invalid'
            return
        }
        const payload = ctx.request.body
        const yupSchema = yup.object().shape({
            user: yup.string().test({
                name: 'ObjectId',
                message: 'Invalid ObjectId',
                test: val => ObjectId.isValid(val)
            })
        })
        try {
            yupSchema.validateSync(payload)
        } catch (e) {
            ctx.status = 400
            ctx.body = e.message
            console.log('error (2)')
            return
        }

        const student = payload.user
        const list = await studentList.find({ user: student })
        if (list.length > 2) {
            try {
                for (let i = 0; i < list.length; i++) {
                    tryUpdate(id, student, ctx)
                }
            } catch (e) {
                ctx.status = 400
                ctx.body = e.message
                console.log('error (1)')
                return
            }

        } else {

            const listUser = await studentList.find({ _id: id })

            for (let i = 0; i < listUser.length; i++) {
                for (let j = 0; j < listUser[i].user.length; j++) {
                    var userslist = listUser[i].user[j]
                    console.log(userslist +' '+ student);
                    if (userslist = student) {
                        ctx.status = 400
                        ctx.body = 'Student Exists!'
                        console.log('Student Exists!')
                        return
                    } else {
                        tryUpdate(id, student, ctx)
                    }
                }
            }

        }
    }

    const deleteById = async ctx => {
        const { id } = ctx.request.params
        studentList.deleteOne({ _id: id })
        ctx.status = 200
    }

    const tryUpdate = async (list, student, ctx) => {
        try {
            await studentList.updateOne(
                { _id: new ObjectId(list) },
                { $push: { user: student } })

            ctx.status = 200
            ctx.body = 'update successfully'

        } catch (e) {
            ctx.status = 400
            ctx.body = e.message
            console.log('error')
            return
        }
    }

    return {
        getAll,
        getById,
        createList,
        updateById,
        deleteById
    }
}
export default getStudentListController