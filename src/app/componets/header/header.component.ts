import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'; // Importa Toastr para mostrar mensajes de éxito

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string = 'LesPov';
  repo: string = 'Portafolio-Hv-Cloudflare';
  starCount: string = '0';
  errorMessage: string = '';
  repoUrl: string = '';
  private updateSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private toastr: ToastrService) {} // Injecta ToastrService

  ngOnInit() {
    this.repoUrl = `https://github.com/${this.username}/${this.repo}`;
    this.startPeriodicUpdate();
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  // Inicia la actualización periódica cada 20 segundos
  startPeriodicUpdate() {
    this.updateSubscription = interval(5000) // Actualiza cada 20 segundos
      .pipe(
        startWith(0),
        switchMap(() => this.fetchGitHubStats())
      )
      .subscribe(
        (data) => {
          const previousStarCount = this.starCount;
          this.starCount = data.stargazers_count;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error al obtener datos de GitHub:', error);
          this.errorMessage = 'No se pudieron cargar las estadísticas de GitHub.';
        }
      );
  }

  // Llama a la API de GitHub para obtener el número de estrellas
  fetchGitHubStats() {
    const apiUrl = `https://api.github.com/repos/${this.username}/${this.repo}`;
    return this.http.get<any>(apiUrl);
  }

  // Método para redirigir al repositorio de GitHub
  redirectToRepo() {
    window.open(this.repoUrl, '_blank');
  }
}
