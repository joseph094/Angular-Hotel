import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminreservationsComponent } from './adminreservations/adminreservations.component';
import { AuthGuard } from './auth.guard';
import { AvailableComponent } from './available/available.component';
import { CalenderChambersComponent } from './calender-chambers/calender-chambers.component';
import { CategoriesComponent } from './categories/categories.component';
import { UpdatecategorieComponent } from './categories/updatecategorie/updatecategorie.component';
import { ChambersComponent } from './chambers/chambers.component';
import { CommentComponent } from './comment/comment.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UpdateroomComponent } from './rooms/updateroom/updateroom.component';
import { UpdateuserComponent } from './users/updateuser/updateuser.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'comment', component: CommentComponent, canActivate: [AuthGuard] },
  { path: 'available', component: AvailableComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
  { path: 'reserve', component: ReservationComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  { path: 'admin-reservations', component: AdminreservationsComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  {
    path: 'rooms',
    component: RoomsComponent,
    canActivate: [AuthGuard], data: { role: 'ADMIN' }
  },
  {
    path: 'rooms/:symbol',
    component: UpdateroomComponent,
    canActivate: [AuthGuard], // Requires just authentication
    data: { role: 'ADMIN' },
  },
  {
    path: 'categorie/:symbol',
    component: UpdatecategorieComponent,
    canActivate: [AuthGuard], // Requires just authentication
    data: { role: 'ADMIN' },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard], // Requires just authentication
    data: { role: 'ADMIN' },
  },
  {
    path: 'users/:symbol',
    component: UpdateuserComponent,
    canActivate: [AuthGuard], // Requires just authentication
    data: { role: 'ADMIN' },
  },
  {
    path:"forbidden",
    component:ForbiddenComponent
  },
  {
    path:"chambers",
    component:ChambersComponent,
    canActivate: [AuthGuard], // Requires just authentication
    data: { role: 'USER' },
  },
  {
    path:"calender/chambers/:symbol",
    component:CalenderChambersComponent,
    canActivate: [AuthGuard], // Requires just authentication
    data: { role: 'USER' },
  },

  {
    path:"comment",
    component:CommentComponent,
    canActivate: [AuthGuard], // Requires just authentication
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
