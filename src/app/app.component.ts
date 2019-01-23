import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";
import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

import * as fromRoot from './reducers';

@Component({
  selector: 'my-app',
  styleUrls: ['main.scss', './app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  views = views;
  isLoading: Observable<any>;
  constructor(
    private cache: TransferState,
    public route: ActivatedRoute,
    public router: Router,
    public store: Store<fromRoot.AppState>
  ) {
    this.isLoading = this.store.pipe(
      select((state: fromRoot.AppState) => state.loading.active)
    )
    this.isLoading.subscribe(data => console.log(data));

  }

  ngOnInit() {
   
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
