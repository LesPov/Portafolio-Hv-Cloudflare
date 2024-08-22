import { Injectable, ElementRef, QueryList } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileAnimationsService {
  // Array para almacenar los identificadores de los intervalos de animación activos
  private animationIntervals: any[] = [];

  /**
   * Inicia las animaciones móviles en las tarjetas, wrappers y tickets.
   * Aplica una animación de rebote a las tarjetas y un movimiento aleatorio a los tickets.
   * @param cardRefs - Lista de referencias a las tarjetas.
   * @param wrapperRefs - Lista de referencias a los wrappers.
   * @param ticketRefs - Lista de referencias a los tickets.
   */
  startMobileAnimations(cardRefs: QueryList<ElementRef<HTMLDivElement>>, wrapperRefs: QueryList<ElementRef<HTMLDivElement>>, ticketRefs: QueryList<ElementRef<HTMLDivElement>>) {
    // Inicia la animación de rebote en cada tarjeta
    cardRefs.forEach((cardRef) => this.startBouncingAnimation(cardRef.nativeElement));

    // Inicia un movimiento aleatorio en cada ticket dentro de su wrapper correspondiente
    wrapperRefs.forEach((wrapperRef, index) => {
      const ticketRef = ticketRefs.toArray()[index];
      const intervalId = setInterval(() => this.randomMove(ticketRef.nativeElement), 1000);
      // Almacena el identificador del intervalo para poder detenerlo posteriormente
      this.animationIntervals.push(intervalId);
    });
  }

  /**
   * Detiene todas las animaciones móviles.
   * Limpia los intervalos de animación activos y resetea las posiciones de los elementos animados.
   */
  stopMobileAnimations() {
    this.clearIntervals();
    this.resetPositions();
  }

  /**
   * Inicia una animación de rebote en la tarjeta especificada.
   * La tarjeta se moverá de manera continua y rebotará al alcanzar los bordes de su contenedor.
   * @param card - Elemento de la tarjeta que se animará.
   */
  private startBouncingAnimation(card: HTMLDivElement) {
    let x = 50, y = 50; // Posición inicial de la tarjeta
    let dx = 1, dy = 1; // Incrementos de movimiento en cada eje

    const move = () => {
      const rect = card.getBoundingClientRect();

      // Cambia la dirección del movimiento si la tarjeta alcanza los bordes
      if (x <= 0 || x >= rect.width) dx = -dx;
      if (y <= 0 || y >= rect.height) dy = -dy;

      // Actualiza la posición de la tarjeta
      x += dx;
      y += dy;

      // Aplica la nueva posición utilizando variables CSS personalizadas
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    };

    // Inicia el intervalo de animación que moverá la tarjeta continuamente
    const intervalId = setInterval(move, 10);
    this.animationIntervals.push(intervalId);
  }

  /**
   * Aplica un movimiento aleatorio a un ticket.
   * El ticket rotará en los ejes X e Y en ángulos aleatorios.
   * @param ticket - Elemento del ticket que se animará.
   */
  private randomMove(ticket: HTMLDivElement) {
    // Genera ángulos de rotación aleatorios
    const rotationX = (Math.random() - 0.5) * 60;
    const rotationY = (Math.random() - 0.5) * 60;

    // Aplica la rotación al ticket
    ticket.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }

  /**
   * Limpia todos los intervalos de animación activos.
   * Detiene todas las animaciones móviles al limpiar los intervalos.
   */
  private clearIntervals() {
    this.animationIntervals.forEach(intervalId => clearInterval(intervalId));
    this.animationIntervals = [];
  }

  /**
   * Resetea las posiciones de los elementos animados.
   * Restaura las posiciones iniciales de las tarjetas y los tickets.
   */
  private resetPositions() {
    // Resetea las posiciones de las tarjetas
    this.resetCardPositions();

    // Resetea las posiciones de los tickets
    this.resetTicketPositions();
  }

  /**
   * Restaura la posición inicial de las tarjetas.
   */
  private resetCardPositions() {
    document.querySelectorAll<HTMLDivElement>('.card1').forEach((card) => {
      card.style.setProperty('--x', '50px');  // Posición inicial en X
      card.style.setProperty('--y', '50px');  // Posición inicial en Y
    });
  }

  /**
   * Restaura la posición inicial de los tickets.
   */
  private resetTicketPositions() {
    document.querySelectorAll<HTMLDivElement>('.ticket').forEach((ticket) => {
      ticket.style.transform = 'rotateX(0deg) rotateY(0deg)';  // Posición inicial sin rotación
    });
  }
}
