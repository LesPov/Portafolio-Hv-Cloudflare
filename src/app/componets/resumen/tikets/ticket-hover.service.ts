import { Injectable, ElementRef, QueryList } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketHoverService {

  /**
   * Inicializa los efectos de hover para cada ticket.
   * Recorre las referencias a los wrappers y tickets, y asigna los efectos de hover correspondientes.
   * @param wrapperRefs - Lista de referencias a los elementos wrapper.
   * @param ticketRefs - Lista de referencias a los elementos ticket.
   * @param subscriptions - Array para almacenar las suscripciones activas de RxJS.
   */
  initializeTicketHoverEffects(wrapperRefs: QueryList<ElementRef<HTMLDivElement>>, ticketRefs: QueryList<ElementRef<HTMLDivElement>>, subscriptions: Subscription[]) {
    wrapperRefs.forEach((wrapperRef, index) => {
      // Obtiene la referencia del ticket correspondiente al wrapper actual
      const ticketRef = ticketRefs.toArray()[index];
      // Agrega el efecto de hover al ticket
      this.addTicketHoverEffect(wrapperRef.nativeElement, ticketRef.nativeElement, subscriptions);
    });
  }

  /**
   * Agrega un efecto de hover a un ticket específico.
   * Al mover el mouse sobre el wrapper, rota el ticket en función de la posición del cursor.
   * Cuando el mouse sale del wrapper, el ticket vuelve a su posición original.
   * @param wrapper - Elemento wrapper que envuelve al ticket.
   * @param ticket - Elemento ticket al cual se aplicarán los efectos de hover.
   * @param subscriptions - Array para almacenar las suscripciones activas de RxJS.
   */
  private addTicketHoverEffect(wrapper: HTMLDivElement, ticket: HTMLDivElement, subscriptions: Subscription[]) {
    // Suscripción al evento mousemove para rotar el ticket según la posición del cursor
    const mouseMove$ = fromEvent<MouseEvent>(wrapper, 'mousemove').subscribe(event => {
      const { width, height } = wrapper.getBoundingClientRect();
      const rotationX = ((event.offsetX - width / 2) / width) * 35;
      const rotationY = ((event.offsetY - height / 2) / height) * 35;

      // Aplica la transformación al ticket
      ticket.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });

    // Suscripción al evento mouseleave para resetear la rotación del ticket
    const mouseLeave$ = fromEvent(wrapper, 'mouseleave').subscribe(() => {
      ticket.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });

    // Agrega las suscripciones al array para gestionar su ciclo de vida
    subscriptions.push(mouseMove$, mouseLeave$);
  }
}
