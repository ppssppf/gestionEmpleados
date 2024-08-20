import express, { Router } from "express"
import "dotenv/config"
import dbConnection from "../database/config.js"
import { getEmpleado, postEmpleado, putEmpleado, deleteEmpleado } from "../controller/empleadoController.js"

export default class Server{
    constructor(){
        this.app = express()
        this.listen()
        this.dbConnect()
        this.pathEmpleado = "/api/empleado"
        this.route()
    }

    listen(){
        this.app.listen(process.env.PORT, () =>{
            console.log(`el servidor esta corriendo en ${process.env.PORT}`)
        })
    }

    async dbConnect(){
        await dbConnection()
    }
    
    route(){
        this.app.use(express.json())
        this.app.put(this.pathEmpleado, putEmpleado)
        this.app.get(this.pathEmpleado, getEmpleado)
        this.app.post(this.pathEmpleado,postEmpleado)
        this.app.delete(this.pathEmpleado+'/:id', deleteEmpleado)
    }
}