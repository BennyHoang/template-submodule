import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { agGridLicenseKey } from '../../../../ag-grid-license-key';
import { AgGridModule } from 'ag-grid-angular';
import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey(agGridLicenseKey);

@NgModule({
  imports: [CommonModule],
  exports: [AgGridModule],
})
export class AgGridAngularModule {}
