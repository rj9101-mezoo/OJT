import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { MonitorComponent } from './home/monitor/monitor.component';
import { HistoryComponent } from './home/history/history.component';
import { ManualComponent } from './home/manual/manual.component';
import { SettingComponent } from './home/setting/setting.component';
import { CrmComponent } from './crm/crm/crm.component';
import { HospitalComponent } from './crm/hospital/hospital.component';
import { ListComponent } from './crm/hospital/list/list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'auth/login', component: LoginComponent },
  { path: 'monitor', component: MonitorComponent, canActivate: [AuthGuard]},
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  { path: 'manual', component: ManualComponent, canActivate: [AuthGuard]},
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard]},
  { path: 'crm', component: CrmComponent},
  { path: 'crm/hospital', component: HospitalComponent},
  { path: 'crm/hospital/:id', component: ListComponent},
  { path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
