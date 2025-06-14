import { Router } from 'express'
import protectAdminRoute from '../middlewares/protectAdminRoute.middleware.js'
import { getUser, getAllUser } from '../controllers/admin.controller.js'


const router = Router()


router.get('/allUsers', protectAdminRoute, getAllUser)
router.get('/user/:id', protectAdminRoute, getUser)


export default router;