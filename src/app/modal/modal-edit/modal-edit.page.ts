import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  AlertController,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { Timestamp, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { DatetimePopoverComponent } from 'src/app/datetime-popover/datetime-popover.component';
import { FirestoreService } from 'src/services/database';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements OnInit {
  @ViewChild('popoverContent') popoverContent!: TemplateRef<any>;
  item: any;
  docId: string = '';
  selectedDate = '01 January 1970';
  imageUrl: string | undefined;
  description: string = '';
  isEditingPhoto = false;

  //API
  milestone: any = {
    milestone_id: null,
    title: '',
    date: '',
    description: '',
    image: '',
    child_id: null,
  };

  constructor(
    private modalController: ModalController,
    private firestoreService: FirestoreService,
    public popoverController: PopoverController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private apiService: FirestoreService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const modal = await this.modalController.getTop();
    if (modal && modal.componentProps) {
      this.item = modal.componentProps['item'];
      this.milestone.milestone_id = modal.componentProps['milestone_id'];
      this.milestone.date = this.item.date;
      this.milestone.description = this.item.description;
      this.milestone.image = this.item.image;
      this.isEditingPhoto = false;

      this.cdr.detectChanges();
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  editPhoto() {
    this.isEditingPhoto = true;
  }
  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.milestone.image = image.dataUrl;
    this.isEditingPhoto = false;
  }

  async openGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    this.milestone.image = image.dataUrl;
    this.isEditingPhoto = false;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DatetimePopoverComponent,
      event: ev,
      translucent: true,
    });

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


  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.delete();
          },
        },
      ],
    });

    await alert.present();
  }

  async delete() {
    console.log(this.docId);
    await this.firestoreService.deleteData(this.docId);
    this.modalController.dismiss({ delete: true });
  }

  async save(id: any) {
    const data = {
      id: this.milestone.milestone_id,
      title: this.milestone.title,
      date: new Date(this.milestone.date),
      description: this.milestone.description,
      image: this.milestone.image,
    };
    try {
      this.apiService.updateMilestone(id, data).subscribe(
        (milestones) => {
          console.log('Milestone edited succesfully:', milestones);
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

//   async save() {
//     const data = {
//       Date: Timestamp.fromDate(new Date(this.selectedDate)),
//       Description: this.description,
//       PhotoURL: this.imageUrl,
//     };
//     try {
//       const docRef = doc(this.firestoreService.db, 'Konrad', this.docId);
//       await updateDoc(docRef, data);
//       console.log('Document updated with ID: ', this.docId);
//     } catch (e) {
//       console.error('Error updating document: ', e);
//     }
  
//     this.modalController.dismiss();
//   }
 }
