import {
  Component,
  OnInit
} from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from "rxjs";
import {State as AppState} from './index';
@Component({

  selector: 'spinner',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: ['./spinner.component.css'],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {

  isLoading: Observable<any>;

  constructor(private store: Store<AppState>) {
    // this.isLoading = this.store.select<any>(state => state.loadingSpinner.active); 
    this.isLoading = this.store.pipe(
      select((state: AppState) => state.loading.active)
    );

    this.isLoading.subscribe(data => console.log(data));
  }

  ngOnInit() {

  }



}



