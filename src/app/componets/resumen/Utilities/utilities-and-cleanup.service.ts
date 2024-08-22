import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesAndCleanupService {
  private animationIntervals: any[] = [];

  /**
   * Limpia todos los intervalos de animación almacenados.
   * 
   * @description
   * Este método recorre el array `animationIntervals` y limpia cada intervalo usando `clearInterval`. 
   * Luego, vacía el array para asegurarse de que no queden referencias a los intervalos eliminados.
   */
  clearIntervals() {
    this.animationIntervals.forEach(intervalId => clearInterval(intervalId));
    this.animationIntervals = [];
  }

  /**
   * Desuscribe todas las suscripciones de RxJS y vacía el array de suscripciones.
   * 
   * @param {Subscription[]} subscriptions - Array de suscripciones de RxJS que se deben desuscribir.
   * 
   * @description
   * Este método recorre el array `subscriptions` y llama al método `unsubscribe` en cada una para 
   * cancelar la suscripción. Luego, se vacía el array para eliminar cualquier referencia a las suscripciones anteriores.
   */
  clearSubscriptions(subscriptions: Subscription[]) {
    subscriptions.forEach(subscription => subscription.unsubscribe());
    subscriptions.length = 0;
  }

  /**
   * Restablece las posiciones de los elementos `cardRefs` y `ticketRefs` a sus valores iniciales.
   * 
   * @param {HTMLDivElement[]} cardRefs - Array de elementos `div` que representan las tarjetas cuya posición se va a restablecer.
   * @param {HTMLDivElement[]} ticketRefs - Array de elementos `div` que representan los tickets cuya rotación se va a restablecer.
   * 
   * @description
   * Este método restablece las propiedades CSS `--x` y `--y` de los elementos `cardRefs` a "50%", 
   * y restablece la transformación `rotateX` y `rotateY` de los elementos `ticketRefs` a "0deg".
   */
  resetPositions(cardRefs: HTMLDivElement[], ticketRefs: HTMLDivElement[]) {
    cardRefs.forEach(card => {
      card.style.setProperty('--x', `50%`);
      card.style.setProperty('--y', `50%`);
    });

    ticketRefs.forEach(ticket => {
      ticket.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  /**
   * Agrega un nuevo identificador de intervalo de animación al array de intervalos.
   * 
   * @param {any} intervalId - El identificador del intervalo de animación que se va a agregar.
   * 
   * @description
   * Este método almacena un nuevo identificador de intervalo de animación en el array `animationIntervals`. 
   * Esto permite gestionar los intervalos posteriormente, por ejemplo, para limpiarlos cuando ya no sean necesarios.
   */
  addAnimationInterval(intervalId: any) {
    this.animationIntervals.push(intervalId);
  }
}
