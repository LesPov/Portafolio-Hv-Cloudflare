import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialCardsService {

  /**
   * Inicializa la funcionalidad de las tarjetas sociales para una serie de elementos de alternancia.
   * 
   * @param {Subscription[]} subscriptions - Array de suscripciones de eventos que se agregan para su posterior limpieza.
   * 
   * @description
   * Este método agrega suscripciones a eventos de click en una lista de elementos de alternancia (`toggleElement`). 
   * Cuando se hace click en uno de estos elementos, se llama al método `toggleSocialCard` que gestiona la animación 
   * de las tarjetas sociales asociadas.
   */
  initializeSocialCards(subscriptions: Subscription[]) {
    ['card1-toggle1', 'card1-toggle2', 'card1-toggle3'].forEach((toggleId, index) => {
      const socialId = `card1-social${index + 1}`;
      const toggleElement = document.getElementById(toggleId);
      const socialElement = document.getElementById(socialId);

      if (toggleElement && socialElement) {
        // Suscripción al evento click para alternar la animación de la tarjeta social
        subscriptions.push(fromEvent(toggleElement, 'click').subscribe(() => this.toggleSocialCard(socialElement)));
      }
    });
  }

  /**
   * Alterna la animación de la tarjeta social asociada al elemento proporcionado.
   * 
   * @param {HTMLElement} socialElement - Elemento HTML que representa la tarjeta social que se va a animar.
   * 
   * @description
   * Si la tarjeta social (`socialElement`) ya contiene la clase 'animation', se agrega la clase 'down-animation' para 
   * manejar la animación de descenso, y después de un tiempo, se elimina. Finalmente, se alterna la clase 'animation' 
   * para iniciar o detener la animación.
   */
  private toggleSocialCard(socialElement: HTMLElement) {
    if (socialElement.classList.contains('animation')) {
      socialElement.classList.add('down-animation');
      setTimeout(() => socialElement.classList.remove('down-animation'), 1000);
    }
    socialElement.classList.toggle('animation');
  }
}
