import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home/home.component';
import { MonitorComponent } from './home/monitor/monitor.component';
import { HeaderComponent } from './header/header.component';
import { HistoryComponent } from './home/history/history.component';
import { ManualComponent } from './home/manual/manual.component';
import { SettingComponent } from './home/setting/setting.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MonitorComponent,
    HeaderComponent,
    HistoryComponent,
    ManualComponent,
    SettingComponent
  ],
  imports: [
    // material style
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    // browser
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
