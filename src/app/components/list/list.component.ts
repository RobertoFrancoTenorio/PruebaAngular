import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RegistroService } from 'src/app/service/registro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  registros: any[]=[]

  constructor(private _registroService:RegistroService,
    private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(){
    this._registroService.getRegistros().subscribe(data=>{
      data.forEach((element: any) => {
        this.registros.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarRegistro(id: string){
    this._registroService.eliminarRegistro(id).then(() => {
      console.log("Registro Eliminado");
      this.toastr.error('El registro fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    });
  }
}
