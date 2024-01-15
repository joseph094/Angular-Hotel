import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminreservationsComponent } from './adminreservations/adminreservations.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvailableComponent } from './available/available.component';
import { CalenderChambersComponent } from './calender-chambers/calender-chambers.component';
import { CategoriesComponent } from './categories/categories.component';
import { UpdatecategorieComponent } from './categories/updatecategorie/updatecategorie.component';
import { ChambersComponent } from './chambers/chambers.component'; // must go before plugins
import { FooterComponent } from './footer/footer.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

import { CommentComponent } from './comment/comment.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UpdateroomComponent } from './rooms/updateroom/updateroom.component';
import { UpdateuserComponent } from './users/updateuser/updateuser.component';
import { UsersComponent } from './users/users.component';


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
    CommentComponent,
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
