import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { navbarData } from './nav-data';

interface Song {
  bg: string;
  artist: string;
  songName: string;
  files: {
    song: string;
    cover: string;
  };
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private darkTheme = 'dark-theme';
  private iconTheme = 'uil-sun';
  navData = navbarData;
  navMenu: HTMLElement | null = null;
  navToggle: HTMLElement | null = null;
  navClose: HTMLElement | null = null;
  songs: Song[] = [];
  currentSongIndex: number = 0;
  isPlaying: boolean = false;
  audioPlayer!: HTMLAudioElement;

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    const selectedTheme = this.isWindowAvailable() ? localStorage.getItem('selected-theme') : null;
    const selectedIcon = this.isWindowAvailable() ? localStorage.getItem('selected-icon') : null;

    if (selectedTheme) {
      this.applyTheme(selectedTheme, selectedIcon || '');
    }

    if (typeof document !== 'undefined') {
      this.navMenu = document.getElementById('nav-menu');
      this.navToggle = document.getElementById('nav-toggle');
      this.navClose = document.getElementById('nav-close');

      if (this.navToggle) {
        this.navToggle.addEventListener('click', this.showMenu.bind(this));
      }

      if (this.navClose) {
        this.navClose.addEventListener('click', this.hideMenu.bind(this));
      }
    }

    this.loadSongs(); // Cargar canciones al iniciar
  }

  showsuccess(): void {
    this.toastr.warning('En próximas actualizaciones se agregará.', 'Warning');
  }

  isWindowAvailable(): boolean {
    return typeof window !== 'undefined';
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const currentIcon = this.getCurrentIcon();

    this.applyTheme(currentTheme === 'dark' ? 'light' : 'dark', currentIcon === 'uil-moon' ? 'uil-sun' : 'uil-moon');

    localStorage.setItem('selected-theme', currentTheme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('selected-icon', currentIcon === 'uil-moon' ? 'uil-sun' : 'uil-moon');
  }

  showMenu(): void {
    if (this.navMenu && this.navToggle) {
      this.navMenu.classList.add('show-menu');
      this.navToggle.style.display = 'none';
    }
  }

  hideMenu(): void {
    if (this.navMenu && this.navToggle) {
      this.navMenu.classList.remove('show-menu');
      this.navToggle.style.display = 'block';
    }
  }

  // Métodos relacionados con la música
  loadSongs(): void {
    this.http.get<{ songs: Song[] }>('https://raw.githubusercontent.com/LesPov/musica/main/music-info.json')
      .subscribe(
        data => {
          this.songs = data.songs;
          this.audioPlayer = document.querySelector('audio') as HTMLAudioElement;
        },
        error => console.error('Error al cargar las canciones:', error)
      );
  }

  togglePlayer(): void {
    if (this.songs.length === 0) return;

    if (this.isPlaying) {
      this.audioPlayer.pause();
      this.isPlaying = false;
    } else {
      this.playRandomSong();
    }
  }

  playRandomSong(): void {
    const randomIndex = Math.floor(Math.random() * this.songs.length);
    this.currentSongIndex = randomIndex;
    this.audioPlayer.src = this.songs[this.currentSongIndex].files.song;
    this.audioPlayer.play();
    this.isPlaying = true;
  }

  onSongEnd(): void {
    this.playRandomSong();
  }

  private getCurrentTheme(): string {
    return document.body.classList.contains(this.darkTheme) ? 'dark' : 'light';
  }

  private getCurrentIcon(): string {
    const themeButton = document.getElementById('theme-button');
    return themeButton?.classList.contains(this.iconTheme) ? 'uil-moon' : 'uil-sun';
  }

  private applyTheme(theme: string, icon: string): void {
    document.body.classList[theme === 'dark' ? 'add' : 'remove'](this.darkTheme);
    this.getElementByIdAndApplyClass('theme-button', this.iconTheme, icon === 'uil-moon');
  }

  private getElementByIdAndApplyClass(id: string, className: string, shouldAdd: boolean): void {
    const element = document.getElementById(id);
    if (element) {
      element.classList[shouldAdd ? 'add' : 'remove'](className);
    }
  }
}
