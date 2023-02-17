import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];

  constructor(private clientesService: ClienteService) { }

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Esta seguro?',
    text: `de Eliminar este REGISTRO! ${cliente.nombre} ${cliente.apellido}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Borrarlo',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
  if (result.isConfirmed) {
          this.clientesService.delete(cliente.id).subscribe(
            response => {
              this.clientes = this.clientes.filter(cli => cli !== cliente)
              swalWithBootstrapButtons.fire(
              'Borrado!',
              'Su REGISTRO fue Borrado exitosamente.',
              'success'
              )
            }
          )
      }
      })
  }

}
