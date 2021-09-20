import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from 'src/app/service/registro.service';

@Component({
  selector: 'app-create-registro',
  templateUrl: './create-registro.component.html',
  styleUrls: ['./create-registro.component.css']
})
export class CreateRegistroComponent implements OnInit {
  createRegistro: FormGroup;
  submitted: boolean = false;
  id: string | null;
  titulo: string = 'Agregar Registro'

  constructor(private fb: FormBuilder, 
    private _registroService:RegistroService,
    private router:Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) { 
    this.createRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required]
    })  

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.editar()
  }

  agregarEditarRegistro(){
    this.submitted = true
    if(this.createRegistro.invalid)
    {
      return
    }
    if(this.id == null){
      this.agregarRegistro()
    }
    else{
      this.editarRegistro(this.id)
    }
  }

  agregarRegistro(){
    const registro: any = {
      nombre: this.createRegistro.value.nombre,
      apellido: this.createRegistro.value.apellido,
      telefono: this.createRegistro.value.telefono,
      correo: this.createRegistro.value.correo,
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    }

    this._registroService.agregarRegistro(registro).then(()=>{
      console.log("Registro Agregado");
      this.toastr.success("El empleado fue agregado", "Creación Exitosa",{
        progressBar: true
      })
      this.router.navigate(['/list'])
    }).catch(error =>{
      console.log("Error")
    })
  }

  editar(){
    this.titulo = 'Editar Registro'
    if(this.id != null){
      this._registroService.getRegistro(this.id).subscribe(registro =>
        this.createRegistro.setValue({
          nombre: registro.payload.data()['nombre'],
          apellido: registro.payload.data()['apellido'],
          telefono: registro.payload.data()['telefono'],
          correo: registro.payload.data()['correo']
        })
    )}
  }

  editarRegistro(id: string){
    const registro: any = {
      nombre: this.createRegistro.value.nombre,
      apellido: this.createRegistro.value.apellido,
      telefono: this.createRegistro.value.telefono,
      correo: this.createRegistro.value.correo,
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    }
    this._registroService.actualizarRegistro(id, registro).then(() => {
      this.toastr.info("El registro ha sido modificado", "Modificación Éxitosa")
    })
    this.router.navigate(['/list'])
  }
}
