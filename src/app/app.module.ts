import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { CategoriesComponent } from './categories/categories.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdatecategorieComponent } from './categories/updatecategorie/updatecategorie.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AvailableComponent } from './available/available.component';
import { DatePipe } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminreservationsComponent } from './adminreservations/adminreservations.component';
import { UpdateroomComponent } from './rooms/updateroom/updateroom.component';
import { UsersComponent } from './users/users.component';
import { UpdateuserComponent } from './users/updateuser/updateuser.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalenderChambersComponent } from './calender-chambers/calender-chambers.component';
import { ChambersComponent } from './chambers/chambers.component'; // must go before plugins


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfilComponent,
    CategoriesComponent,
    UpdatecategorieComponent,
    RoomsComponent,
    AvailableComponent,
    ReservationComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminreservationsComponent,
    UpdateroomComponent,
    UsersComponent,
    UpdateuserComponent,
    ForbiddenComponent,
    CalenderChambersComponent,
    ChambersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    FullCalendarModule


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
