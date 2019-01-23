import { Injectable } from '@angular/core';
import { Http, ResponseContentType, Headers } from '@angular/http';
import { saveAs } from 'file-saver';

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class CertificateService {

  private response;

  constructor(
    private http: Http,
    private angularDatabaseService: AngularFireDatabase
  ) { }

  createCertificate(incomingDate) {
    console.log('Generating Certificate')
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ certificateId: 11223344 });
      }, 1000);
    });
    return promise;
  }

  downloadCertificate(uniqueId) {
    let httpHeaders = {
      headers: new Headers({
       'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      })
    };

    // this.http.get(`https://s3-ap-southeast-2.amazonaws.com/ngau-hosting-certificates/${uniqueId}.pdf`, {responseType: ResponseContentType.Blob})
    //   .subscribe((response) => {
    //     const blob = new Blob([response.blob()], {type: 'application/pdf'});
    //     const filename = 'file.pdf';
    //     saveAs(blob, filename);
    // });

    this.http.get(`https://ngau-hosting.firebaseio.com/secret2.json`)
      .subscribe((response) => {
        console.log(response);
    });

    this.angularDatabaseService.list<any>('/').valueChanges()
      .subscribe((data) => {
        console.log(data);
      });

  }
}














