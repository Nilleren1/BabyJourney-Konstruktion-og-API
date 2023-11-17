import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  getFirestore,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api';

const app = initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  db = getFirestore(app);

  constructor(private http: HttpClient) {}

  //MySQL db________________________________________________________________

  //Create milestone
  createMilestone(data: any): Observable<any> {
    return this.http.post<{ message: string }>(baseUrl + '/milestone', data);
  }

  //GetAll milestones
  getAllMilestones(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + '/milestone');
  }

  //Get a single milestone
  getMilestone(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/milestone/${id}`);
  }

  //Delete a milestone
  deleteMilestone(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/milestone/${id}`);
  }

  //Update milestone
  updateMilestone(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/milestone/${id}`, data);
  }

  //Firestore_________________________________________________________________
  fetchData() {
    const q = query(collection(this.db, 'Konrad'), orderBy('Date', 'desc'));

    return getDocs(q)
      .then((querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData) {
            docData['Date'] = new Date(
              docData['Date'].seconds * 1000
            ).toLocaleDateString('da-DK');
            docData['id'] = doc.id;
            data.push(docData);
          }
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents:', error);
      });
  }

  getNextData(lastDoc: any) {
    let q = query(
      collection(this.db, 'Konrad'),
      orderBy('Date', 'desc'),
      startAfter(lastDoc),
      limit(4)
    );
    return getDocs(q);
  }

  async addData(data: any) {
    try {
      const docRef = await addDoc(collection(this.db, 'Konrad'), data);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
      return null;
    }
  }

  fetchDataRealtime(callback: (data: any[]) => void) {
    const q = query(collection(this.db, 'Konrad'), orderBy('Date', 'desc'));

    return onSnapshot(
      q,
      (querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData) {
            docData['Date'] = new Date(
              docData['Date'].seconds * 1000
            ).toLocaleDateString('da-DK');
            docData['id'] = doc.id;
            data.push(docData);
          }
        });
        callback(data);
      },
      (error) => {
        console.log('Error getting documents:', error);
      }
    );
  }

  async deleteData(docId: string) {
    try {
      await deleteDoc(doc(this.db, 'Konrad', docId));
      console.log('Document deleted with ID: ', docId);
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  }

  async updateData(docId: string, data: any) {
    try {
      await updateDoc(doc(this.db, 'Konrad', docId), data);
      console.log('Document updated with ID: ', docId);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }
}
