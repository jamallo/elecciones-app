import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShareService } from '../../services/share.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-share-buttons',
  standalone: false,
  templateUrl: './share-buttons.component.html',
  styleUrl: './share-buttons.component.scss',
})
export class ShareButtonsComponent {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() url: string = '';
  @Input() hashtags: string[] = [];
  @Input() showCopy: boolean = true;
  @Input() showImage: boolean = false;
  @Input() imageElementId: string = '';
  @Output() onShare = new EventEmitter<string>();

  constructor(
    private shareService: ShareService,
    private snackBar: MatSnackBar,
    private analytics: AnalyticsService
  ) {}

  shareOnTwitter(): void {
    this.shareService.shareOnTwitter(this.title, this.url, this.hashtags);
    this.analytics.trackShare('twitter', this.title);
    this.onShare.emit('twitter');
  }

  shareOnFacebook(): void {
    this.shareService.shareOnFacebook(this.url, this.title);
    this.onShare.emit('facebook');
  }

  shareOnWhatsApp(): void {
    const text = `${this.title}\n${this.description}\n${this.url}`;
    this.shareService.shareOnWhatsApp(text);
    this.onShare.emit('whatsapp');
  }

  shareOnTelegram(): void {
    this.shareService.shareOnTelegram(this.title, this.url);
    this.onShare.emit('telegram');
  }

  shareOnLinkedIn(): void {
    this.shareService.shareOnLinkedIn(this.url, this.title, this.description);
    this.onShare.emit('linkedin');
  }

  async copyLink(): Promise<void> {
    const success = await this.shareService.copyToClipboard(this.url);
    if (success) {
      this.snackBar.open('Enlace copiado al portapapeles', 'Cerrar', { duration: 2000 });
    } else {
      this.snackBar.open('Error al copiar el enlace', 'Cerrar', { duration: 2000 });
    }
    this.onShare.emit('copy');
  }

  async shareImage(): Promise<void> {
    if (this.imageElementId) {
      const imageData = await this.shareService.generateSummaryImage(this.imageElementId);
      if (imageData) {
        this.shareService.shareImage(imageData, this.title);
        this.snackBar.open('Imagen descargada', 'Cerrar', { duration: 2000 });
      } else {
        this.snackBar.open('Error al generar la imagen', 'Cerrar', { duration: 2000 });
      }
    }
    this.onShare.emit('image');
  }

}
