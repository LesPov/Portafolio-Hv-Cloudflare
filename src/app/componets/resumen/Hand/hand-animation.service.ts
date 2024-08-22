import { Injectable, ElementRef, QueryList } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandAnimationService {

  /**
   * Inicializa las animaciones de mano para una lista de tarjetas.
   * 
   * @param {QueryList<ElementRef<HTMLDivElement>>} cardRefs - Lista de referencias de elementos `div` que contienen las tarjetas.
   * @param {Subscription[]} subscriptions - Array de suscripciones de eventos que se agregan para su posterior limpieza.
   * 
   * @description
   * Para cada tarjeta en `cardRefs`, se asocian eventos de mouse (mouseenter, mouseleave, click) a secciones clicables específicas, 
   * y un evento de click al documento para mostrar o ocultar la animación de una mano. La animación comienza cuando el ratón 
   * entra en la sección clicable, se detiene cuando sale, y se oculta al hacer click. Si se hace click fuera de la tarjeta, 
   * la animación se restablece.
   */
  initializeHandAnimation(cardRefs: QueryList<ElementRef<HTMLDivElement>>, subscriptions: Subscription[]) {
    cardRefs.forEach((cardRef, index) => {
      const handElement = document.getElementById(`hand${index + 1}`);
      const clickableSection = document.getElementById(`clickableSection${index + 1}`);
      const card1 = cardRef.nativeElement;

      if (handElement && clickableSection && card1) {
        // Suscripción al evento mouseenter para iniciar la animación de la mano
        const mouseEnter$ = fromEvent(clickableSection, 'mouseenter').subscribe(() => {
          handElement.classList.remove('hidden');
          handElement.style.animation = 'click-animation 1.5s infinite ease-in-out';
        });

        // Suscripción al evento mouseleave para detener la animación de la mano
        const mouseLeave$ = fromEvent(clickableSection, 'mouseleave').subscribe(() => {
          handElement.style.animation = 'none';
        });

        // Suscripción al evento click para ocultar la mano
        const click$ = fromEvent(clickableSection, 'click').subscribe(() => {
          handElement.classList.add('hidden');
        });

        // Suscripción al evento click en el documento para restablecer la animación si se hace click fuera de la tarjeta
        const documentClick$ = fromEvent(document, 'click').subscribe((event: Event) => {
          if (!card1.contains(event.target as Node)) {
            handElement.classList.remove('hidden');
            setTimeout(() => {
              handElement.style.animation = '';
            }, 2);
          }
        });

        // Agregar todas las suscripciones al array para su posterior limpieza
        subscriptions.push(mouseEnter$, mouseLeave$, click$, documentClick$);
      }
    });
  }
}
