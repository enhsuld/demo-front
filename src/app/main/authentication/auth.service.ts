import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthService {
  constructor(
    private _router: Router, private _http: HttpClient){}
 
  obtainAccessToken(loginData){
    let params = new URLSearchParams();
    params.append('username',loginData.email);
    params.append('password',loginData.password);    
    params.append('grant_type','password');
    params.append('client_id','devglan-client');

    let httpHeaders  = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("devglan-client:devglan-secret")});
    ;
    let options = ({ headers: httpHeaders });
     this._http.post('http://localhost:8080/oauth/token', params.toString(), options)
    ///.map(res => res.json())
    .subscribe(
      data => this.saveToken(data),
      err => alert('Invalid Credentials')
    ); 
  }


  saveToken(token){
    localStorage.setItem('currentUser', JSON.stringify({userName:token.username, token: token.access_token }));
  /*   var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate); */
    console.log('Obtained Access token');
    this._router.navigate(['/sample']);
  }

  /* getResource(resourceUrl) : Observable<Foo>{
     var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
     var options = ({ headers: headers });
     return this._http.get(resourceUrl, options)
                    .subscribe((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  } */

  checkCredentials(){
    if (!Cookie.check('access_token')){
        this._router.navigate(['/login']);
        return false;
    }
    else{
      return true;
    }
  } 

  logout() {
    Cookie.delete('access_token');
    this._router.navigate(['/login']);
  }
}