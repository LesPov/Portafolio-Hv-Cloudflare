import { Injectable, ElementRef, QueryList } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialCardHoverService {

  /**
   * Inicializa los efectos de hover para cada tarjeta social.
   * Recorre las referencias a las tarjetas y aplica los efectos de hover correspondientes.
   * @param cardRefs - Lista de referencias a los elementos de las tarjetas sociales.
   * @param subscriptions - Array para almacenar las suscripciones activas de RxJS.
   */
  initializeSocialCardHoverEffects(cardRefs: QueryList<ElementRef<HTMLDivElement>>, subscriptions: Subscription[]) {
    cardRefs.forEach(cardRef => {
      // Agrega el efecto de hover a la tarjeta social
      this.addSocialCardHoverEffect(cardRef.nativeElement, subscriptions);
    });
  }

  /**
   * Agrega un efecto de hover a una tarjeta social específica.
   * Ajusta las propiedades CSS personalizadas `--x` y `--y` para crear un efecto de movimiento
   * que sigue al cursor del mouse. Cuando el mouse sale de la tarjeta, las propiedades se resetean.
   * @param card - Elemento de la tarjeta social al cual se aplicarán los efectos de hover.
   * @param subscriptions - Array para almacenar las suscripciones activas de RxJS.
   */
  private addSocialCardHoverEffect(card: HTMLDivElement, subscriptions: Subscription[]) {
    // Suscripción al evento mousemove para ajustar las propiedades CSS según la posición del cursor
    const mouseMove$ = fromEvent<MouseEvent>(card, 'mousemove').subscribe(event => {
      // Calcula la posición del cursor dentro de la tarjeta
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Actualiza las variables CSS personalizadas para crear el efecto de movimiento
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });

    // Suscripción al evento mouseleave para resetear las variables CSS cuando el cursor sale de la tarjeta
    const mouseLeave$ = fromEvent(card, 'mouseleave').subscribe(() => {
      // Resetea las variables CSS a su estado original
      card.style.setProperty('--x', '50%');
      card.style.setProperty('--y', '50%');
    });

    // Agrega las suscripciones al array para gestionar su ciclo de vida
    subscriptions.push(mouseMove$, mouseLeave$);
  }
}
