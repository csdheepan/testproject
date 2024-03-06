import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { ListResult } from '@angular/fire/compat/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor( private storage: AngularFireStorage) { }

  //retrieve document file from fiestore storage
  getDocument(docPath: string): Observable<string> {
    const videoRef = this.storage.ref(docPath);
    return videoRef.getDownloadURL();
  }

  //retrieve list of file from fiestore storage
  getFiles(): Observable<any> {
    const storageRef = this.storage.ref('documents/');
    return storageRef.listAll().pipe(
      switchMap((listResult: ListResult) => listResult.items)
    );
  }


  //upload a file in firestore storage.
  pushFileToStorage(fileUpload: any): Observable<any> {
    
    const filePath = `documents/${fileUpload.name}`; //the file path as per in firebase storage.
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload); //upload file in firebase storage.

    return uploadTask.percentageChanges(); //partially update file upload percentage.
  }


  //delete all existing file document in firestore
  deleteAllFiles(): Observable<any> {
    const storageRef = firebase.storage().ref('documents');
    return from(storageRef.listAll().then((listResults: any) => {
      const promises = listResults.items.map((item: any) => {
        return item.delete();
      });
      return Promise.all(promises);
    }));
  }

}
