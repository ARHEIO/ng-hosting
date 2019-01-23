import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../services/certificate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-page',
  templateUrl: './inputpage.component.html',
  styleUrls: ['./inputpage.component.scss']
})
export class InputPageComponent implements OnInit {

  constructor(private certificateService: CertificateService, private router: Router) { }

  ngOnInit() {
  }

  generateCert() {
    this.certificateService.createCertificate({'stuff': 'stuff'}).then((res: any) => {
      this.router.navigate(['download/' + res.certificateId]);
    })
  }

}
