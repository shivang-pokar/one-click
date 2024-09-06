import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'one-click-summary-menu',
  templateUrl: './summary-menu.component.html',
  styleUrls: ['./summary-menu.component.scss'],
})
export class SummaryMenuComponent implements OnInit {

  @Input() summary: string = "";
  @Output() saveSummery = new EventEmitter();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone) {

  }

  ngOnInit(): void {

  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  saveSummeryFn() {

  }

}
