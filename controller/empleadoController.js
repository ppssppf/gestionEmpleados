import empleado from "../models/empleado.js";
import Empleado from "../models/empleado.js";

export async function getEmpleado(req, res){
    try{
        const empleados = await Empleado.find()
        res.json(empleados)
    }catch(error){
        res.status(500).json({error})
    }
}

export async function postEmpleado(req, res) {
    const { nombre, fechaIngreso, fechaRetiro, salario, diasLaborados, documento } = req.body;

    // Calcular las cesantías
    const cesantias = (salario * diasLaborados) / 360;

    try {
        const empleado = new Empleado({
            nombre,
            fechaIngreso,
            fechaRetiro,
            salario,
            diasLaborados,
            documento,
            cesantias // Incluye el valor calculado
        });
        await empleado.save();
        res.status(201).json("Empleado creado con éxito");
    } catch (error) {
        res.status(500).json({ error: "Problemas con la creación del empleado", details: error.message });
    }
}

export async function putEmpleado(req, res){
    const {nombre,fechaIngreso,fechaRetiro,salario,diasLaborados,cesantias,documento} = req.body
    try{
        await empleado.findOneAndUpdate({documento:documento},{nombre:nombre, fechaIngreso:fechaIngreso, fechaRetiro:fechaRetiro, salario:salario, diasLaborados:diasLaborados, cesantias:cesantias})
        res.status(200).json("empleado actualizado con exito")
    }catch(error){
        res.status(500).json(error)
    }
}

export async function deleteEmpleado(req, res){
    const _id = req.params.id //tomar el id desde el postman o el thuder (en la url)
    try {
        await Empleado.findByIdAndDelete({_id:_id})
        res.json("Empleado eliminado con exito")
    } catch (error) {
        res.status(404).json("error en la eliminacion del empleado")
    }
}