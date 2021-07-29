import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { CameraMeetingComponent } from './camera-meeting/camera-meeting.component';
import { ChattingComponent } from './chatting/chatting.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'chatting',component:ChattingComponent},
  {path:'cameraMeeting',component:CameraMeetingComponent},
  {path:'events',component:EventsComponent},
  {path:'aboutme',component:AboutMeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [LoginComponent,RegisterComponent,ProfileComponent,
ProfileComponent,ChattingComponent,CameraMeetingComponent,EventsComponent,AboutMeComponent] 

