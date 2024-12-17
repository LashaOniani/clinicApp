import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserPageAdminComponent } from './user-page-admin/user-page-admin.component';
import { UserPageAdminCategoriesComponent } from './user-page-admin-categories/user-page-admin-categories.component';
import { UserPageAdminEmpRegComponent } from './user-page-admin-emp-reg/user-page-admin-emp-reg.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarBookingComponent } from './calendar-booking/calendar-booking.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { UserPageUserComponent } from './user-page-user/user-page-user.component';
import { CalendarMyBookingsComponent } from './calendar-my-bookings/calendar-my-bookings.component';
import { CalendarHelperBtnsComponent } from './calendar-helper-btns/calendar-helper-btns.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    LoginComponent,
    SearchComponent,
    MainComponent,
    HeaderComponent,
    NavigationComponent,
    UserPageComponent,
    UserPageAdminComponent,
    UserPageAdminCategoriesComponent,
    UserPageAdminEmpRegComponent,
    UserPageAdminEmpRegComponent,
    BookingPageComponent,
    CalendarComponent,
    CalendarBookingComponent,
    CategoryListComponent,
    UserPageUserComponent,
    CalendarMyBookingsComponent,
    CalendarHelperBtnsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
