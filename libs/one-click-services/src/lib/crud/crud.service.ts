import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, } from '@angular/fire/compat/storage';
import { ContentWrite, PostContent } from '@one-click/data';
import { forkJoin, map } from 'rxjs';
import * as firebase from 'firebase/compat/app';
import "firebase/compat/database"
import "firebase/compat/firestore";
import { CookieService } from 'ngx-cookie-service';

const videoExtensions = ['video/mpg', 'video/mp2', 'video/mpeg', 'video/mpe', 'video/mpv', 'video/mp4'] //you can add more extensions
const imageExtensions = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'] // you can add more extensions

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  firebase: any = firebase.default;
  database = this.firebase.database();
  uid = this.cookieService.get('uid');



  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireStorage: AngularFireStorage,
    @Inject('env') public env: any,
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  update(collName: string, obj: any, id: string) {
    obj["updatedBy"] = this.uid;
    obj["deleteFlag"] = "N";
    obj["updatedAt"] = new Date().getTime();
    obj = JSON.parse(JSON.stringify(obj));
    return this.angularFirestore.collection<any>(collName).doc(id).update(obj);
  }

  add(collName: string, obj: any, id?: string) {
    if (!id) {
      id = this.angularFirestore.createId();
    }
    obj["id"] = id;
    obj["createdBy"] = this.uid;
    obj["createdAt"] = new Date().getTime();
    obj["updatedBy"] = this.uid;
    obj["updatedAt"] = new Date().getTime();
    obj["deleteFlag"] = "N";
    obj = JSON.parse(JSON.stringify(obj));
    return this.angularFirestore.collection<any>(collName).doc(id).set(obj, { merge: true });
  }

  collection$(path: string, query?: any) {
    /* query = query.orderBy('updatedAt', 'desc').where("deleteFlag", "==", "N"); */
    return this.angularFirestore.collection(path, query).snapshotChanges().pipe(
      map(actions => {
        return actions.map((a: any) => {
          const data: Object = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  collectData(collName: string) {
    return this.angularFirestore.collection<any>(collName, ref => ref.orderBy('updatedAt', 'desc').where("deleteFlag", "==", "N")).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );;
  }

  fileUpload(path: string, file: any) {
    let ref = this.angularFireStorage.ref(path)
    let task = ref.put(file);

    return task.snapshotChanges().pipe(
      /* take(1), */
      map((action: any) => {
        return action.ref
      }))
  }


  fileUploadService(path: string, event: any, preFix?: any) {
    return new Promise(async (resolve, reject) => {
      let filesList: any = [];
      let dimentations: any = [];

      for (let i = 0; i < event.target.files.length; i++) {

        let name = preFix ? `${preFix}_${event.target.files[i].name}` : event.target.files[i].name;
        filesList.push(this.fileUpload(`${path}/${name}`, event.target.files[i]));

        if (this.isImage(event.target.files[i])) {
          const { width, height } = await this.getImageDimentation(event.target.files[i]);
          dimentations.push({ width: width, height: height, type: 'IMAGE' });
        }
        if (this.isVideo(event.target.files[i])) {
          const { width, height } = await this.getVideoDimentation(event.target.files[i]);
          dimentations.push({ width: width, height: height, type: 'VIDEO' });
        }
      }


      forkJoin(filesList).subscribe((resp: any) => {
        let fileList: any = [];
        resp.forEach(async (fileItem: any, keyIndex: number) => {
          let meta = await fileItem.getMetadata();
          meta.parent = fileItem.parent.name;
          let url = await fileItem.getDownloadURL()
          meta.url = url;
          meta.type = dimentations[keyIndex].type;
          meta.width = dimentations[keyIndex].width;
          meta.height = dimentations[keyIndex].height;
          fileList.push(this.uploadFileStorage(meta))
          if (keyIndex == (resp.length - 1)) {
            resolve(fileList);
          }
        }, (er: any) => {
          reject(er)
        })
      });
    })
  }

  getImageDimentation(file: any): Promise<{ width: number, height: number }> {
    return new Promise((resolve, reject) => {
      var img: any;
      var _URL = window.URL || window.webkitURL;
      if (file) {
        img = new Image();
        var objectUrl = _URL.createObjectURL(file);
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          });
          _URL.revokeObjectURL(objectUrl);
        };
        img.src = objectUrl;
      }
    })
  }

  getVideoDimentation(file: any): Promise<{ width: number, height: number }> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const $video = document.createElement("video");
      $video.src = url;
      $video.addEventListener("loadedmetadata", function () {
        resolve({
          width: this.videoWidth,
          height: this.videoHeight
        })
        console.log("width:", this.videoWidth);
        console.log("height:", this.videoHeight);
      });
    });
  }

  uploadFileStorage(resp: any) {
    let filesItem: any = {};
    filesItem.id = Math.random().toString(16).slice(2);
    filesItem.fileName = resp.name;
    filesItem.fileType = resp.contentType;
    filesItem.size = resp.size;
    filesItem.lastModifiedDateTime = resp.updated;
    filesItem.url = resp.url;
    filesItem.parentFolder = resp.parent;
    filesItem.width = resp.width;
    filesItem.height = resp.height;
    filesItem.type = resp.type;
    return filesItem;
  }


  createPost(body: any) {
    return this.http.post(`${this.env.API_BASE_URL}/post/create-post`, body);
  }
  createSchedule(body: any) {
    return this.http.post(`${this.env.API_BASE_URL}/schedule/create-schedule`, body);
  }

  setRealTimeData(path: string, obj: any) {

    obj["createdBy"] = this.uid;
    obj["createdAt"] = new Date().getTime();
    obj["updatedBy"] = this.uid;
    obj["updatedAt"] = new Date().getTime();
    obj["deleteFlag"] = "N";
    obj = JSON.parse(JSON.stringify(obj));

    return this.database.ref(path).set(obj);
  }

  softRemove(path: string, obj: any, id: string) {
    obj["deleteFlag"] = 'Y';
    obj["updatedBy"] = this.uid;
    return this.angularFirestore.collection(path).doc(id).update(obj);
  }

  getContentRealTimeOrderBy(path: string, orderBy: any) {
    return this.database.ref(path).orderByChild(orderBy).get();
  }


  /* 
  Check Is Image
   */

  isImage(file: any) {
    const fileType = file['type'];
    return imageExtensions.includes(fileType);
  }

  isVideo(file: any) {
    const fileType = file['type'];
    return videoExtensions.includes(fileType);
  }

  stripeCheckout() {
    return this.http.post(`${this.env.API_BASE_URL}/payment/checkout`, {});
  }
  stripeSession(session_id: string) {
    return this.http.post(`${this.env.API_BASE_URL}/payment/session`, {
      session_id: session_id,
    });
  }

  createContent(content: ContentWrite, UID: string) {
    return this.http.post(`${this.env.API_BASE_URL}/content-writing/writing`, {
      content: content,
      UID: UID
    });
  }

  cancelSubscription(subscriptions_id: string) {
    return this.http.post(`${this.env.API_BASE_URL}/payment/cancel`, {
      subscriptions_id: subscriptions_id
    });
  }
  resumeSubscription(subscriptions_id: string) {
    return this.http.post(`${this.env.API_BASE_URL}/payment/resume`, {
      subscriptions_id: subscriptions_id
    });
  }

}
