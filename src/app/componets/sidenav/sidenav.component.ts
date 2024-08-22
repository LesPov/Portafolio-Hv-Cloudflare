import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { navbarData } from './nav-data';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
  
})
export class SidenavComponent implements OnInit {
  private darkTheme = 'dark-theme';
  private iconTheme = 'uil-sun';
  navData = navbarData;
  navMenu: HTMLElement | null = null;
  navToggle: HTMLElement | null = null;
  navClose: HTMLElement | null = null;
  constructor(private toastr: ToastrService) {

  }
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
  }
  showsuccess(): void {
    this.toastr.warning('En proximas actualizaciones se agregara.', 'Warning');
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