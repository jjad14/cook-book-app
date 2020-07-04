import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../loggin.service';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private logginService: LoggingService,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.subscription = this.store.select('shoppingList').subscribe(); alternative to template async

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.idChangeSub = this.shoppingListService.ingredientsChanged
    //       .subscribe(
    //         (ingredients: Ingredient[]) => {
    //           this.ingredients = ingredients;
    //         }
    //       );

    this.logginService.printLog('Hello from Shopping-list!');
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.idChangeSub.unsubscribe();
    // this.subscription.unsubscribe();
  }

}
