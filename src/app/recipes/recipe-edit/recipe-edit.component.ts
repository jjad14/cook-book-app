import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesAction from '../../recipes/store/recipe.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  private storeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
        .subscribe(
          (params: Params) => {
            // tslint:disable-next-line: no-string-literal
            this.id = +params['id'];
            // tslint:disable-next-line: no-string-literal
            this.editMode = params['id'] != null;
            this.initForm();
          }
        );
  }

  onSubmit() {
                                 // tslint:disable-next-line: no-string-literal
    // const newRecipe = new Recipe(this.recipeForm.value['name'], 
    //                              // tslint:disable-next-line: no-string-literal
    //                              this.recipeForm.value['description'],
    //                              // tslint:disable-next-line: no-string-literal
    //                              this.recipeForm.value['imagePath'],
    //                              // tslint:disable-next-line: no-string-literal
    //                              this.recipeForm.value['ingredients']);
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipesAction.UpdateRecipe({index: this.id, newRecipe: this.recipeForm.value}));
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesAction.AddRecipe(this.recipeForm.value));
    }

    this.onCancel();
  }

  onAddIngredient() {
    // (<FormArray>this.recipeForm.get('ingredients'))
     (this.recipeForm.get('ingredients') as FormArray).push(
       new FormGroup({
          // tslint:disable-next-line: object-literal-key-quotes
          'name': new FormControl(null, Validators.required),
          // tslint:disable-next-line: object-literal-key-quotes
          'amount': new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
       })
     );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipes, index) => {
          return index === this.id;
        });
      })).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        // tslint:disable-next-line: no-string-literal
        if (recipe['ingredients']) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                // tslint:disable-next-line: object-literal-key-quotes
                'name': new FormControl(ingredient.name, Validators.required),
                // tslint:disable-next-line: object-literal-key-quotes
                'amount': new FormControl(ingredient.amount, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/)
                    ])
              })
            );
          }
        }
      });

    }

    this.recipeForm = new FormGroup({
      // tslint:disable-next-line: object-literal-key-quotes
      'name': new FormControl(recipeName, Validators.required),
      // tslint:disable-next-line: object-literal-key-quotes
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      // tslint:disable-next-line: object-literal-key-quotes
      'description': new FormControl(recipeDescription, Validators.required),
      // tslint:disable-next-line: object-literal-key-quotes
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }

  }

}
