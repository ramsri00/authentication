import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const mimeType = (
  control: AbstractControl
):
  | Promise<{ [key: string]: any | null }>
  | Observable<{ [key: string]: any | null }> => {
  if (typeof control.value === 'string') {
    return of(null);
  }
  const file = control.value as File;
  console.log('file', file);
  console.log('fileSize', file.size);
  const fileReader: any = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener('loadend', () => {
        const arr = new Uint8Array(fileReader.result).subarray(0, 4);
        let header = '';
        let isValid = false;
        // Resticting maximum file size as 1MB.

        console.log('file.size', file.size);

        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case '89504e47':
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }

        if (isValid) {
          console.log('......', isValid);
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
