import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'one-click-integration-card',
  templateUrl: './integration-card.component.html',
  styleUrls: ['./integration-card.component.scss'],
})
export class IntegrationCardComponent implements OnInit, OnChanges {
  @Input() social: any;
  @Output() connect = new EventEmitter();
  @Output() disconnect = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  connectSocial(social: any) {
    this.connect.emit(social)
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  disconnectSocial(social: any) {
    this.disconnect.emit(social)
  }
}

