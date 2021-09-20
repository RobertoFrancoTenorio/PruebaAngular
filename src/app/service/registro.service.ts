import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private firestore: AngularFirestore) { }

  agregarRegistro(registro:any):Promise<any> {
    return this.firestore.collection('registros').add(registro);
  }
  
  getRegistros(): Observable<any>
  {
    //.snapshotChanges permite que se carguen los datos en tiempo real
    return this.firestore.collection('registros', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarRegistro(id: string): Promise<any>{
    return this.firestore.collection('registros').doc(id).delete();
  }

  getRegistro(id: string):Observable<any>{
    return this.firestore.collection('registros').doc(id).snapshotChanges();
  }

  actualizarRegistro(id: string, data:any): Promise<any>{
    return this.firestore.collection('registros').doc(id).update(data);
  }
}
