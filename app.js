import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors)

const serverPort = 5001

app.listen(serverPort, () => {
    console.log(`Express web server running on port ${serverPort}`);
})