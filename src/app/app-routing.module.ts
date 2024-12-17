import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserPageAdminEmpRegComponent } from './user-page-admin-emp-reg/user-page-admin-emp-reg.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  // { path: '', component: CalendarComponent },
  { path: '', component: MainComponent},
  // {path: '', component: CategoryListComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: UserRegistrationComponent },
  { path: 'employeeRegistration', component: UserPageAdminEmpRegComponent },
  { path: 'search', component: SearchComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'bookVisit', component: BookingPageComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
