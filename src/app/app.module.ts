import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeGridComponent } from './recipe-grid/recipe-grid.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeListItemComponent } from './recipe-list/recipe-list-item/recipe-list-item.component';
import { ToastsComponent } from './toasts/toasts.component';
import { RecipeGridItemComponent } from './recipe-grid/recipe-grid-item/recipe-grid-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TemporaryWarningComponent } from './temporary-warning/temporary-warning.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeGridComponent,
    RecipeViewComponent,
    RecipeListItemComponent,
    ToastsComponent,
    RecipeGridItemComponent,
    RecipeEditComponent,
    HeaderComponent,
    FooterComponent,
    TemporaryWarningComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
