import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/authService/auth.service';
import { ProfileService } from 'src/app/service/profileService/profile.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  public _file: File;
  constructor(private profileService: ProfileService, private authService: AuthService, private toastrService: ToastrService) { }
  public email: string;
  ngOnInit(): void {
    this.email = this.authService.getUserEmail();
  }

  public onFileChanged(file: File): void {
    this._file = file;
  }

  public createUpload() {
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      const test = {
        resume: reader.result,
        fileName: this._file.name,
      }
      this.uploadUserResume(test);
    }
    if (this._file) {
      reader.readAsDataURL(this._file);
    }
  }

  public uploadUserResume(data) {
    this.profileService.uploadResume(data, this.email).subscribe((res) => {
      this.toastrService.success("File : " + res.fileName + " Successfully uploaded");
      this._file = null;
    });
  }

  public viewResume() {
    this.profileService.getUpdatedResume(this.email).subscribe((res) => {
      console.log(res);
      const TYPED_ARRAY = new Uint8Array(res.resume.data);
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
      this.blobToSaveAs(res.fileName, STRING_CHAR)
    });
  }

  blobToSaveAs(fileName, source) {
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}`
    link.click();
  }
}
