import { model, Schema } from "mongoose";

const EmpleadoSchema = new Schema({
    nombre: {type: String,
        required: [true, "el nombre del trabajador es requerido"],
        minlength:[2, "Minimo 2 caracteres"],
        maxlength:[50, "maximo 50 caracteres"]},
    fechaIngreso: {
        type: Date,
        required: [true, "todo trbajador tiene una fecha de ingreso"]},
    fechaRetiro: {
        type: Date,
    },
    salario:{
        type: Number,
        required: [true, "todo trabajador debe de tener un salario"]
    },
    diasLaborados:{
        type:Number,
        required: [true, "todo trabajador tiene un numero de dias laborados, asi sean 0"]
    },
    documento:{
        type: String,
        required: [true, "es necesario el documento del empledo"],
        minlength:[2, "Minimo 10 caracteres"],
        maxlength:[50, "maximo 12 caracteres"]
    },
    cesantias: {
        type: Number
    }
})

EmpleadoSchema.pre('save', function(next) {
    if (this.isModified('salario') || this.isModified('diasLaborados')) {
        this.cesantias = (this.salario * this.diasLaborados) / 360;
    }
    next();
});

export default model("Empleado", EmpleadoSchema, "empleado")