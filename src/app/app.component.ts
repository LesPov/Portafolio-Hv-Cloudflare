import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from './componets/body/body.component';
import { PerfilComponent } from './componets/perfil/perfil.component';
import { HeaderComponent } from './componets/header/header.component';
import { SidenavComponent } from './componets/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BodyComponent,
    PerfilComponent,
    HeaderComponent,
    SidenavComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'portafoliov2';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.handleScrollUpVisibility();
  }

  // Método para controlar la visibilidad del botón "scroll up"
  private handleScrollUpVisibility(): void {
    const scrollUpElement = document.getElementById('scroll-up');
    if (scrollUpElement) {
      if (window.scrollY >= 560) {
        scrollUpElement.classList.add('show-scroll');
        scrollUpElement.classList.remove('scrollup--inactive');
      } else {
        scrollUpElement.classList.remove('show-scroll');
        scrollUpElement.classList.add('scrollup--inactive');
      }
    }
  }

  // Método que se ejecuta cuando se oprime el botón "scroll up"
  scrollToTop(): void {
    const scrollUpElement = document.getElementById('scroll-up');
    if (scrollUpElement) {
      // Verificar si el usuario está en la parte inferior de la página
      if (window.scrollY >= 560) {
        // Añadir la clase 'clicked' para activar la animación de rebote
        scrollUpElement.classList.add('clicked');
        
        // Eliminar la clase 'clicked' después de que la animación haya terminado
        setTimeout(() => {
          scrollUpElement.classList.remove('clicked');
        }, 600); // La duración de la animación en milisegundos
      }

      // Desplazarse hacia arriba
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Esto hará que el desplazamiento sea suave
      });
    }
  }
}