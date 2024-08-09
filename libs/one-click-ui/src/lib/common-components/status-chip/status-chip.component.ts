import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonServiceService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
  /* changeDetection: ChangeDetectionStrategy.OnPush, */
})
export class StatusChipComponent implements OnInit {


  @Input() selectedlabelId: any;
  

  constructor(
    public commonServiceService: CommonServiceService
  ) {

  }

  ngOnInit(): void {
    
  }

  


}
