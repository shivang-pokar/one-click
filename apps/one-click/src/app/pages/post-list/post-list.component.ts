import { Component, OnInit } from '@angular/core';
import { PostContainer } from '@one-click/data';
import { CrudService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';


const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'one-click-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  collName = "postContainer";
  company_id = this.cookieService.get('company_id');
  destory$: Subject<void> = new Subject<void>();

  constructor(
    public crudService: CrudService,
    private cookieService: CookieService,
  ) {

  }

  ngOnInit(): void {
    this.crudService.collection$(this.collName, (qry: any) => { return qry.where('company_id', '==', this.company_id).where('status', '==', 'SUCESS').orderBy("createdAt").endBefore(new Date().getTime()).limit(10) }).pipe(takeUntil(this.destory$)).subscribe((resp: Array<PostContainer>) => {
      console.log(resp);

    });
  }
}
