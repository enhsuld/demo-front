import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "./User";
import 'rxjs/add/operator/delay'

@Injectable()
export class ApiService {

  public getUsers(): Observable<any> {
    let fakeUsers : User[] = [{position: 1, firstName: 'Dhiraj', lastName: 'Ray', email: 'dhiraj@gmail.com'},
      {position: 2, firstName: 'Tom', lastName: 'Jac', email: 'Tom@gmail.com'},
      {position: 3, firstName: 'Hary', lastName: 'Pan', email: 'hary@gmail.com'},
      {position: 4, firstName: 'praks', lastName: 'pb', email: 'praks@gmail.com'},
      {position: 5, firstName: 'asd', lastName: 'pb', email: 'praks@gmail.com'},
      {position: 6, firstName: 'sda', lastName: 'pb', email: 'praks@gmail.com'},
      {position: 7, firstName: 'aa', lastName: 'pb', email: 'praks@gmail.com'},
      {position: 8, firstName: 'ddd', lastName: 'pb', email: 'praks@gmail.com'},
      {position: 9, firstName: 'al', lastName: 'pb', email: 'praks@gmail.com'}
    ];
    /* return Observable.from(fakeUsers).delay(500); */

    return Observable.create(obs => {
      obs.next(fakeUsers);
      obs.complete();
    }).delay(3000);
  }
}
