import mongoose = require("mongoose");
import {iInterventor, getInterventor} from "./Interventor"
import {connectMongoDB} from "./helpers"

interface IBeneficiario extends mongoose.Document{
    nombre: string;
    id: number;
    edad: number;
    telefono: string;
    interventor: iInterventor;
}

const BeneficiarioSchema = new mongoose.Schema({
    nombre: {type: String, required:true},
    id: {type: Number, required:true},
    edad: {type: Number, required:true},
    telefono: {type: String, required:true},
    interventor: {type: mongoose.Schema.Types.ObjectId, ref: "Interventor"}
})

export const Beneficiario = mongoose.model<IBeneficiario>("Beneficiario", BeneficiarioSchema);

export const CreateBeneficiario= async function (nombreInterventor:string, nombre: string, id: number, edad: number, telefono: string){
    await connectMongoDB;

    const Interv: any = await getInterventor(nombreInterventor);

    const Benef = new Beneficiario();
    Benef.nombre = nombre;
    Benef.id = id;
    Benef.edad = edad;
    Benef.telefono = telefono;
    Benef.interventor = Interv;

    Benef.save((err:any)=>{
        if (err){
            console.log(err.message);
        }else{
            console.log(Benef)
        }
    });
}