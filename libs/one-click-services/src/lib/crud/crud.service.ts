import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, } from '@angular/fire/compat/storage';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireStorage: AngularFireStorage,
  ) { }

  update(collName: string, obj: any, id: string) {
    obj["updatedBy"] = "";
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
    obj["createdBy"] = "";
    obj["createdAt"] = new Date().getTime();
    obj["updatedBy"] = "";
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
    return new Promise((resolve, reject) => {
      let filesList: any = [];
      Array.prototype.forEach.call(event.target.files, (file) => {
        let name = (preFix) ? preFix + '_' + file.name : file.name;
        filesList.push(this.fileUpload(path + '/' + name, file))
      });
      forkJoin(filesList).subscribe((resp: any) => {
        let fileList: any = [];
        resp.forEach(async (fileItem: any, keyIndex: number) => {
          let meta = await fileItem.getMetadata()
          meta.parent = fileItem.parent.name;
          let url = await fileItem.getDownloadURL()
          meta.url = url;
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

  uploadFileStorage(resp: any) {
    let filesItem: any = {};
    filesItem.id = Math.random().toString(16).slice(2);
    filesItem.fileName = resp.name;
    filesItem.fileType = resp.contentType;
    filesItem.size = resp.size;
    filesItem.lastModifiedDateTime = resp.updated;
    filesItem.url = resp.url;
    filesItem.parentFolder = resp.parent;
    return filesItem;
  }

}