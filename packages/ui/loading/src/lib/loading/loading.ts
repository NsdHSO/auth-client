import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-loading',
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  

  @Input()
  /**
   * The height of the loading spinner in rem.
   * This can be adjusted to fit the design requirements of the application.
   */ 
  height: number = 6; // Default height in rem

  
  @Input()
  /**
   * The width of the loading spinner in rem.
   * This can be adjusted to fit the design requirements of the application.
   */
  width: number = 6; // Default width in rem
  

  @Input()
  /**
   * Fill color of the loading spinner.
   * This can be customized to match the application's theme.
   * Default is 'fill-blue-600'.
   */
  fillColor = 'fill-blue-900'; // Default fill color
}
