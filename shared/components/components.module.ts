import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ToastComponent } from './toast/toast.component';
import { ToasterComponent } from './toaster/toaster.component';
import { MaterialModule } from '../third-party-libraries/material-ui/material-components.module';
import { RouterModule } from '@angular/router';
import { AlertBoxComponent } from './alert-box/alert-box.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    ToastComponent,
    ToasterComponent,
    AlertBoxComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    PageHeaderComponent,
    ToastComponent,
    ToasterComponent,
    AlertBoxComponent,
  ],
})
export class SharedComponentsModule {}
