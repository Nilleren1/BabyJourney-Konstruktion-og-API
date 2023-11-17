import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DatetimePopoverComponent } from 'src/app/datetime-popover/datetime-popover.component';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { FirestoreService } from 'src/services/database';
import { Router } from '@angular/router'

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {
  @ViewChild('popoverContent') popoverContent!: TemplateRef<any>;
  selectedDate = '01 January 1970';
  // imageUrl: string | undefined;
  description: string = '';

  milestone: any = {
    title: '',
    date: '',
    description: '',
    image: '',
    child_id: null,
  };

  constructor(
    private modalController: ModalController,
    public popoverController: PopoverController,
    private firestoreService: FirestoreService,
    private apiService: FirestoreService,
    private toastController: ToastController,
    private router: Router
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.milestone.image = image.dataUrl;
  }

  async openGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    if (image.dataUrl) {
      this.milestone.image = image.dataUrl;
    }
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DatetimePopoverComponent,
      event: ev,
      translucent: true,
    });

    // Listen for the 'dateChange' event from the popover
    popover.onDidDismiss().then((data) => {
      if (data.data) {
        this.updateDate(data.data);
      }
    });

    return await popover.present();
  }

  updateDate(date: string) {
    this.selectedDate = date;
    this.milestone.date = this.selectedDate;
  }

  async save() {
    const data = {
      title: this.milestone.title,
      date: new Date(this.milestone.date),
      description: this.milestone.description,
      image: this.milestone.image,
    };
    try {
      await this.apiService.createMilestone(data).subscribe(
        (milestones) => {
          console.log('Milestone posted succesfully:', milestones);
         location.reload();
        },
        (error) => {
          console.error('Failed to create a new milestone: ', error);
        }
      );
    } catch (e) {
      console.error('Error adding milestone: ', e);
      // Tilføj din toaster her for fejl
      const toast = await this.toastController.create({
        message: 'Something went wrong!',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }

    this.modalController.dismiss();
  }

  // async save() {
  //   const data = {
  //     Date: Timestamp.fromDate(new Date(this.selectedDate)),
  //     Description: this.description,
  //     PhotoURL: this.imageUrl,
  //   };

  //   try {
  //     const docRef = await addDoc(collection(this.firestoreService.db, 'Konrad'), data);
  //     console.log('Document written with ID: ', docRef.id);
  //     // Tilføj din toaster her for succes
  //     const toast = await this.toastController.create({
  //       message: 'New memory added successfully',
  //       duration: 2000,
  //       color: 'success'
  //     });
  //     toast.present();
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //     // Tilføj din toaster her for fejl
  //     const toast = await this.toastController.create({
  //       message: 'Something went wrong',
  //       duration: 2000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }

  //   this.modalController.dismiss();
  // }

  ngOnInit() {}
}
