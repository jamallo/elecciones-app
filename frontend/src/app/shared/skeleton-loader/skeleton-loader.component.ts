import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: false,
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss',
})
export class SkeletonLoaderComponent {
  @Input() type: 'card' | 'list' | 'grid' = 'card';
  @Input() count: number = 3;

  getArray(): number[] {
    return Array(this.count).fill(0);
  }

}
