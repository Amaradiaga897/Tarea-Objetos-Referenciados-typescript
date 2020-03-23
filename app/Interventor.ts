import mongoose = require("mongoose");
import { connectMongoDB } from "./helpers";
//import {connectMongoDB} from "./helpers"

export interface iInterventor extends mongoose.Document{
    nombre: string;
    id: number;
    telefono: string;
    proyecto: string;
}

const InterventorSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    id: {type: Number, required: true},
    telefono: {type: String, required: true},
    proyecto: {type: String, required: true},
});

export const Interventor = mongoose.model<iInterventor>("Interventor", InterventorSchema);

export const CreateInterventor = async function(nombre: string, id: number, telefono: string, proyecto: string){
    await connectMongoDB;

    const newInterventor = new Interventor();
    newInterventor.nombre = nombre;
    newInterventor.id = id;
    newInterventor.telefono = telefono;
    newInterventor.proyecto = proyecto;

    newInterventor.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newInterventor)
        }
    });
}

export function getInterventor(_nombre: string):Promise<any>{
    return new Promise<any>( resolve => {
        Interventor.findOne({ nombre: _nombre}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}