import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesAction from '../recipes/store/recipe.actions';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) {}

  // storeRecipes() {
  //   const recipes = this.recipeService.getRecipes();
  //   this.http
  //     .put(
  //       'https://ng-cooking-app-6a290.firebaseio.com/recipes.json',
  //       recipes
  //     )
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }

  // fetchRecipes() {
  //   return this.http
  //     .get<Recipe[]>(
  //       'https://ng-cooking-app-6a290.firebaseio.com/recipes.json'
  //     )
  //     .pipe(
  //       map(recipes => {
  //         return recipes.map(recipe => {
  //           return {
  //             ...recipe,
  //             ingredients: recipe.ingredients ? recipe.ingredients : []
  //           };
  //         });
  //       }),
  //       tap(recipes => {
  //         // this.recipeService.setRecipes(recipes);
  //         this.store.dispatch(new RecipesAction.SetRecipes(recipes));
  //       })
  //     );
  // }
}
