import express from 'express'
import * as bugControllerMethods from "../Controllers/bugController.js"

const router = express.Router()

router.post('/newBug', bugControllerMethods.insertBugIntoDb);

router.get('/bugs', bugControllerMethods.getBugsFromDb);

export{router as bugsRouter}