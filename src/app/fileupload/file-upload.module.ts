import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadRoutingModule } from './file-upload-routing.module';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UploadDocumentComponent,
    FibonacciComponent
  ],
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FileUploadModule { }
