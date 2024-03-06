import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadModule } from './fileupload/file-upload.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { environment } from 'src/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { DocumentService } from './fileupload/service/document-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FileUploadModule,
    FormsModule,
    ReactiveFormsModule,AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
