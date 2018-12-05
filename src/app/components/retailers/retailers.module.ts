import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetailersRoutingModule } from './retailers-routing.module';

import {
    RetailersComponent,
    RetailerListComponent,
    RetailerApprovalComponent
} from './index';

@NgModule({
    declarations: [
        RetailersComponent,
        RetailerListComponent,
        RetailerApprovalComponent
    ],
    imports: [
        CommonModule,
        RetailersRoutingModule
    ]
})
export class RetailersModule {}