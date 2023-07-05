import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'one-click-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

  @Input() fullWidth: boolean = false;
  @Input() typeSmall: boolean = false;
  @Input() largeBtn: boolean = false;
  @Input() color: string = 'primary';
  @Input() buttonText: string;
  @Input() isloading: boolean = false;
  @Input() icon: string;
}
