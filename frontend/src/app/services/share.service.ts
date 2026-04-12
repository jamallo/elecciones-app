import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class ShareService {

  constructor() { }

  // Compartir en Twitter/X
  shareOnTwitter(text: string, url: string, hashtags?: string[]): void {
    const hashtagsStr = hashtags ? hashtags.join(',') : '';
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtagsStr}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  // Compartir en Facebook
  shareOnFacebook(url: string, quote?: string): void {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}${quote ? `&quote=${encodeURIComponent(quote)}` : ''}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  // Compartir en WhatsApp
  shareOnWhatsApp(text: string): void {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  }

  // Compartir en Telegram
  shareOnTelegram(text: string, url: string): void {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  }

  // Compartir en LinkedIn
  shareOnLinkedIn(url: string, title: string, summary?: string): void {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}${summary ? `&summary=${encodeURIComponent(summary)}` : ''}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  // Copiar al portapapeles
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Error al copiar:', err);
      return false;
    }
  }

  // Generar imagen de resumen
  async generateSummaryImage(elementId: string): Promise<string | null> {
    const element = document.getElementById(elementId);
    if (!element) return null;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: false
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error generando imagen:', error);
      return null;
    }
  }

  // Compartir imagen
  shareImage(imageDataUrl: string, title: string): void {
    // Crear un blob a partir del data URL
    const link = document.createElement('a');
    link.download = `${title.replace(/\s/g, '_')}.png`;
    link.href = imageDataUrl;
    link.click();
  }

}
