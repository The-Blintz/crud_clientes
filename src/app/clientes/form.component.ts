import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  constructor(
    private clienteService: ClienteService, 
    private router: Router,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activateRouter.params.subscribe(params => {
      let id =params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success')
      }
      //response => this.router.navigate(['/clientes'])
    )
  }

  updateCliente(): void{
    this.clienteService.update(this.cliente)
    .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire(
          'Cliente Actualizado',
          `Cliente ${cliente.nombre} actualizado Exitosamente`,
          'success'
        )
      })
  }
}
