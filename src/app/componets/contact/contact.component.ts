import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('form', { static: true }) form!: ElementRef<HTMLFormElement>;
  @ViewChild('mail', { static: true }) mailButton!: ElementRef<HTMLAnchorElement>;

  ngOnInit() {
    this.form.nativeElement.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    const formData = new FormData(this.form.nativeElement);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const empresa = formData.get('empresa') as string;
    const message = formData.get('message') as string;

    const mailtoLink = `mailto:leonardopoved@gmail.com?subject= Nombre: ${name} Email: ${email}&body= Nombre de la empresa o proyecto: ${empresa}, Asunto: ${message}`;
    
    this.mailButton.nativeElement.setAttribute('href', mailtoLink);
    this.mailButton.nativeElement.click();
  }
}
