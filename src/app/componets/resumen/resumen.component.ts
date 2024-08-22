import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { HandAnimationService } from './Hand/hand-animation.service';
import { MobileAnimationsService } from './Mobile/mobile-animations.service';
import { SocialCardsService } from './Social/social-cards.service';
import { SocialCardHoverService } from './Social-card/social-card-hover.service';
import { TicketHoverService } from './tikets/ticket-hover.service';
import { UtilitiesAndCleanupService } from './Utilities/utilities-and-cleanup.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements AfterViewInit, OnDestroy {
  
  // Referencias a los elementos del DOM correspondientes a los wrappers, tickets y cards
  @ViewChildren('wrapper1, wrapper2, wrapper3, wrapper4, wrapper5, wrapper6, wrapper7, wrapper8') 
  wrapperRefs!: QueryList<ElementRef<HTMLDivElement>>;
  
  @ViewChildren('ticket1, ticket2, ticket3, ticket4, ticket5, ticket6, ticket7, ticket8') 
  ticketRefs!: QueryList<ElementRef<HTMLDivElement>>;
  
  @ViewChildren('card1') 
  cardRefs!: QueryList<ElementRef<HTMLDivElement>>;

  // Variables para manejar el modo móvil y las suscripciones de RxJS
  private mobileQuery: MediaQueryList | undefined;
  private mobileListener: (() => void) | undefined;
  private mobileMode = false;
  private subscriptions: Subscription[] = [];

  constructor(
    // Inyectando servicios necesarios para manejar las animaciones y la limpieza de recursos
    private handAnimationService: HandAnimationService,
    private mobileAnimationsService: MobileAnimationsService,
    private socialCardsService: SocialCardsService,
    private socialCardHoverService: SocialCardHoverService,
    private ticketHoverService: TicketHoverService,
    private utilitiesService: UtilitiesAndCleanupService
  ) {
    // Inicializa la consulta de medios para detectar si el dispositivo es móvil
    if (typeof window !== 'undefined') {
      this.mobileQuery = window.matchMedia('(max-width: 768px)');
      this.mobileListener = () => this.onMediaChange();
      this.mobileQuery.addEventListener('change', this.mobileListener);
    }
  }

  ngAfterViewInit() {
    // Inicializa los servicios después de que la vista se haya cargado completamente
    if (typeof window !== 'undefined') {
      this.initializeServices();
      this.onMediaChange(); // Verifica el estado inicial del modo móvil
    }
  }

  ngOnDestroy() {
    // Limpia los eventos y suscripciones al destruir el componente
    if (this.mobileQuery && this.mobileListener) {
      this.mobileQuery.removeEventListener('change', this.mobileListener);
    }
    this.utilitiesService.clearIntervals(); // Limpia los intervalos configurados en los servicios
    this.utilitiesService.clearSubscriptions(this.subscriptions); // Limpia las suscripciones activas
  }

  // Inicializa los servicios necesarios para las animaciones y efectos de hover
  private initializeServices() {
    this.ticketHoverService.initializeTicketHoverEffects(this.wrapperRefs, this.ticketRefs, this.subscriptions);
    this.socialCardHoverService.initializeSocialCardHoverEffects(this.cardRefs, this.subscriptions);
    this.socialCardsService.initializeSocialCards(this.subscriptions);
    this.handAnimationService.initializeHandAnimation(this.cardRefs, this.subscriptions);
  }

  // Gestiona los cambios en el modo móvil y aplica las animaciones correspondientes
  private onMediaChange() {
    if (this.mobileQuery && this.mobileQuery.matches) {
      // Si la pantalla es menor a 768px y no está en modo móvil, activa las animaciones móviles
      if (!this.mobileMode) {
        this.mobileMode = true;
        this.mobileAnimationsService.stopMobileAnimations(); // Detiene animaciones móviles previas
        this.mobileAnimationsService.startMobileAnimations(this.cardRefs, this.wrapperRefs, this.ticketRefs);
      }
    } else {
      // Si la pantalla es mayor a 768px y estaba en modo móvil, desactiva las animaciones móviles
      if (this.mobileMode) {
        this.mobileMode = false;
        this.mobileAnimationsService.stopMobileAnimations(); // Detiene las animaciones móviles
      }
    }
  }
}
