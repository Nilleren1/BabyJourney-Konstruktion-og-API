import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditPageRoutingModule } from './modal-edit-routing.module';

import { ModalEditPage } from './modal-edit.page';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditPageRoutingModule,
    SharedModule
  ],
  providers: [DatePipe],
  declarations: [ModalEditPage]
})
export class ModalEditPageModule {}
