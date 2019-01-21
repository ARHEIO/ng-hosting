import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputPageComponent } from './pages/inputpage/inputpage.component';
import { DownloadPageComponent } from './pages/downloadpage/downloadpage.component';

const appRoutes: Routes = [
  { path: 'certificate', component: InputPageComponent },
  { path: 'download/:certificateId', component: DownloadPageComponent },
  { path: '**', redirectTo: '/certificate', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
