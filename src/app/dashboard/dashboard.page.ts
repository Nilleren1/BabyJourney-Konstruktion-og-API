import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/services/authentication.service';
import { NavController } from '@ionic/angular';
import { FirestoreService } from 'src/services/database';
import { IonModal } from '@ionic/angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  imageUrl: string | undefined;
  newProfile: any = {
    name: '',
    image: '',
  };
  submitted = false;
  @ViewChild('modal') modal!: IonModal;
  constructor(
    private fireStoreService: FirestoreService,
    private authService: AuthenticationService,
    private router: Router,
    private auth: Auth,
    private navCtrl: NavController,
    private platform: Platform
  ) {
    this.platform = platform;
  }
  username = this.auth.currentUser?.email;

  uid = this.authService.uid;
  openTimeline() {
    this.router.navigate(['tabs/timeline']);
  }

  openModal() {
    this.router.navigate(['/modal-add']);
  }
  async addNewChildProfile() {
    const data: any = {
      name: this.newProfile.name,
      image: this.newProfile.image,
    };

    this.fireStoreService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
    this.modal.dismiss();
  }

  async openGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    this.newProfile.image = image.dataUrl;
  }

  openCamera() {}

  ngOnInit() {}
}
