import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentService } from '../service/document-service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent {


   //variable declaration
   @ViewChild('fileInput') fileInputRef !: ElementRef;
   public form: FormGroup = Object.create(null);
   imageUrl !: boolean ;
   uploadIconDoc_1 : Boolean = true;
   showVideo: boolean = false;
   url !: any;
   videoUrl !: any;
   documentPath !: string;
   percentage !: string;
   fileName !: string;
   fileType !: string;
 
   constructor(private fb: FormBuilder,private _snackBar: MatSnackBar,private documentService : DocumentService) { }
 
   ngOnInit(): void {
 
     //intalize form
     this.form = this.fb.group({
       doc1: [null, Validators.compose([Validators.required])]
     })
 
     //service call for to check img/video already exist or not.
     this.documentService.getFiles().subscribe((refCompat:any)=> {
 
       this.documentPath = refCompat._delegate._location.path_;
 
       //retrieve thr filename and filetype.
       this.fileName = this.documentPath.slice(10);
       const fileName = this.documentPath;
       const lastIndex = fileName.lastIndexOf('.');
       const lettersAfterLastPeriod = fileName.substring(lastIndex + 1); // Extract letters after the last period
       this.fileType = lettersAfterLastPeriod
 
       //if exist - retrieve a file using service.
       this.documentService.getDocument(this.documentPath).subscribe((data:any)=>{
 
           this.uploadIconDoc_1 = false;
     
           //block will execute for video.
           if (this.documentPath.endsWith('.mp4')) {
             this.videoUrl = data;
             this.showVideo = true;
             this.imageUrl = false;
             this.percentage = "100.00"
           }
          //otherwise - img/png.
           else{
             this.showVideo = false;
             this.imageUrl = true;
             this.url = data;
             this.percentage = "100.00"
           }
       });
 
     });
   }
 
   // Method to handle upload file
   uploadFile() {
 
     if (this.fileInputRef) {
       this.fileInputRef.nativeElement.click();
     }
 
   }
 
   //method to handle whenever user change or upload file.
   onSelectFile(e: any, documentName: string) {
 
     this.uploadIconDoc_1 = false;
 
     //blob
     var reader = new FileReader();
     reader.readAsDataURL(e.target.files[0]); //It reads the file and once its completed,the data is converted into binary data 
     reader.onload = (event: any) => {   //after the file reading is successfully completed onLoad is triggered
 
       const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
       if (e.target.files[0].size <= maxSize && (e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png" || e.target.files[0].type == "video/mp4")) {
         
         //for single document field
         if (documentName == "DOC_1") {
 
           this.percentage = "0.00"
 
           //block will execute for img/png
           if (e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png") {
             this.url = event.target.result;
             this.uploadIconDoc_1 = false;
             this.imageUrl = true;
             this.showVideo = false;
           }
 
           //block will execute for video
           else if (e.target.files[0].type == "video/mp4") {
             this.showVideo = true;
             this.imageUrl = false;
             this.uploadIconDoc_1 = false;
             this.videoUrl = event.target.result;
           }
         }
 
          //retrieve thr filename and filetype.
         const file = e.target.files[0];
         this.fileType = e.target.files[0].type; 
         this.fileName = e.target.files[0].name; 
 
         //before upload new file , delete all exixting a file.
         this.documentService.deleteAllFiles().subscribe((data:any)=>{
           console.log('All files deleted successfully');
       
           //service call - to upload a new file
             this.documentService.pushFileToStorage(file).subscribe((percentage:any) => {
               this.percentage = percentage.toFixed(2);
               console.log(`Uploaded: ${percentage}%`);
             });
     
         },
         //error handling
         (error:any)=>{
           console.error('Error deleting files:', error);
         }
         )
       
       }
 
       //block will executed - when image size > 10MB or Invalid file type.
       else {
 
         // Display error message for image size exceeds limit
         console.error("Image size exceeds the maximum limit (10 MB) and file type not supported");
 
         var errorMsg : string = "";
         
         if(e.target.files[0].size > maxSize){
            errorMsg = "Maximum file size allowed is 10 MB"
         }
         else{
           errorMsg = "Supported file types: PNG, JPG, MP4."
         }
 
         //snack bar
         this._snackBar.open(errorMsg, 'ok', {
         });
   
       }
     }
   }
}
