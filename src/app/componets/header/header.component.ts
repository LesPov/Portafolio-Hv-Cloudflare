import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private toastr: ToastrService) {

  }
  showsuccess(): void {
    this.toastr.warning('En proximas actualizaciones se agregara.', 'Warning');
  }
}
