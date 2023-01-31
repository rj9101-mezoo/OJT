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
import { CrmComponent } from './crm/crm/crm.component';
import { HospitalComponent } from './crm/hospital/hospital.component';
import { AgencyComponent } from './crm/agency/agency.component';
import { PointComponent } from './crm/point/point.component';
import { ListComponent } from './crm/hospital/list/list.component';
import { CrmBarComponent } from './crm/crm-bar/crm-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRippleModule} from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';
import { InformationComponent } from './crm/hospital/information/information.component';
import { GroupsComponent } from './home/monitor/groups/groups.component';
import { FooterComponent } from './footer/footer.component';
import { SpaceCentralComponent } from './home/monitor/groups/space-central/space-central.component';
import { TickCentralComponent } from './home/monitor/groups/tick-central/tick-central.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MonitorComponent,
    HeaderComponent,
    HistoryComponent,
    ManualComponent,
    SettingComponent,
    CrmComponent,
    HospitalComponent,
    AgencyComponent,
    PointComponent,
    ListComponent,
    CrmBarComponent,
    InformationComponent,
    GroupsComponent,
    FooterComponent,
    SpaceCentralComponent,
    TickCentralComponent
  ],
  imports: [
    // material style
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatSortModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRippleModule,

    // browser
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
