import {  Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proyect',
  standalone: true,
  imports: [],
  templateUrl: './proyect.component.html',
  styleUrl: './proyect.component.css',

})
export class ProyectComponent {

  constructor(private toastr: ToastrService) {

  }
  showsuccess(): void {
    this.toastr.warning('En proximas actualizaciones se agregara.', 'Warning');
  }
} 