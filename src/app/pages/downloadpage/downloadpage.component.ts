import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-download-page',
  templateUrl: './downloadpage.component.html',
  styleUrls: ['./downloadpage.component.scss']
})
export class DownloadPageComponent implements OnInit {

  constructor(private certificateService: CertificateService) { }

  ngOnInit() {
    this.certificateService.downloadCertificate('11223344');
  }

}
