import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'one-click-tab-section',
  templateUrl: './tab-section.component.html',
  styleUrls: ['./tab-section.component.scss'],
})
export class TabSectionComponent implements OnChanges {

  @Input() selectedIndex: number = 0;
  @Output() tabChange = new EventEmitter();
  @Input() tabList: Array<any> = [];

  changeTab(index: number) {
    this.selectedIndex = index;
    this.tabChange.emit(this.selectedIndex);
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
