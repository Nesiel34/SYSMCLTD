import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { CustomersTableComponent } from './customers-table/customers-table.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ContactComponent } from './contact/contact.component';
import { AddressComponent } from './address/address.component';






@NgModule({
  declarations: [
    AppComponent,
    CustomersTableComponent,
    OnlyNumberDirective,
    AddressComponent,
    EditUserComponent,
    ContactComponent
  ],
  imports: [
    MatInputModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
