import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  //  private apiBaseUrl = 'http://159.89.228.158/services/';
  public apiBaseUrlShare = 'http://www.losyp.com/';
  public apiBaseUrl = 'http://www.losyp.com/';
  // private apiBaseUrl = 'http://192.168.0.5/services/';

  public days: object;
  user: any;

  constructor(public http: HttpClient) {
    this.days = {
      0: "Lunes",
      1: "Martes",
      2: "Miercoles",
      3: "Jueves",
      4: "Viernes",
      5: "Sábado",
      6: "Domingo"
    };
    this.updateUser();
  }

  get shareUrl(){
    return this.apiBaseUrlShare;
  }

  updateDeviceID(deviceID, os) {
    return this.http
      .post(
        this.apiBaseUrl + "api/updatephone",
        { phone_id: deviceID, phone_os: os },
        {
          headers: new HttpHeaders().set("Authorization", this.user.token)
        }
      )
      .toPromise()
      .then(response => {
        return response["data"];
      })
      .catch(this.handleError);
  }

  updateUser(){
    this.user = JSON.parse(localStorage.getItem('ServCurrentUser'));
  }

  getUser(){
    return this.user;
  }

    payService(id: number, body: any): Promise<any> {
        if (this.user) {
            return this.http.post(this.apiBaseUrl + 'api/payservice/' + id, body, {
                headers: new HttpHeaders().set('Authorization', this.user.token)
            })
                .toPromise().then((response) => {
                    if (response['data']) {
                        return response['data'];
                    } else {
                        return {error: response['error']};
                    }
                }
            );
        }
    }
    payServiceOnline(id: number, body: any): Promise<any> {
        if (this.user) {
            return this.http.post(this.apiBaseUrl + 'api/payservice/' + id, body, {
                headers: new HttpHeaders().set('Authorization', this.user.token)
            })
                .toPromise().then((response) => {
                        if (response['data']) {
                            return response['data'];
                        } else {
                            return {error: response['error']};
                        }
                    }
                );
        }
    }
    pagosrealizados(id:number): Promise<any> {
        if (this.user) {
            return this.http.get(this.apiBaseUrl + 'api/userpays/'+id, {
                headers: new HttpHeaders().set('Authorization', this.user.token)
            }).toPromise().then((response) => {
                    if (response['data']) {
                        return response['data'];
                    } else {
                        return {error: 'Error en el servidor'};
                    }
                }
            ).catch(this.handleError);
        }

    }
    memberships(): Promise<any> {
        if (this.user) {
            return this.http.get(this.apiBaseUrl + 'api/memberships', {
                headers: new HttpHeaders().set('Authorization', this.user.token)
            }).toPromise().then((response) => {
                    if (response['data']) {
                        return response['data'];
                    } else {
                        return {error: 'Error en el servidor'};
                    }
                }
            ).catch(this.handleError);
        }

    }
    contactservice(id): Promise<any> {

    if (this.user) {
      return this.http.get(this.apiBaseUrl + 'api/contactservice/' + id, {
        headers: new HttpHeaders().set('Authorization', this.user.token)
      })
        .toPromise()
        .then(
          (response) => {
            return response;
          }
        ).catch(this.handleError);
    }
  }

  test(): Promise<any> {
    return this.http.get(this.apiBaseUrl + 'api/test')
      .toPromise()
      .then(
        (response) => {
          return response;
        }
      ).catch(this.handleError);
  }

  getCities(): Promise<Object> {
    return this.http.get(this.apiBaseUrl + 'api/cities')
      .toPromise()
      .then(
        (response) => {
          return response;
        }
      ).catch(this.handleError);
  }

  getAllSubCategories(): Promise<Object> {
    return this.http.get(this.apiBaseUrl + 'api/allsubcategories')
      .toPromise()
      .then(
        (response) => {
          return response;
        }
      ).catch(this.handleError);
  }

  allCategories(): Promise<Object> {
    return this.http.get(this.apiBaseUrl + 'api/categories')
      .toPromise()
      .then(
        (response) => {
          return response;
        }
      ).catch()
  }

  addComment(id, comment) {
    if (this.user) {
      return this.http.post(this.apiBaseUrl + 'api/addcomment/' + id, {comment}, {
        headers: new HttpHeaders().set('Authorization', this.user.token)
      })
        .toPromise()
        .then(
          (response) => {
            return response;
          }
        ).catch(this.handleError);
    }
  }

  showComment(id) {
    return this.http.get(this.apiBaseUrl + 'api/showcomment/' + id, {
      headers: new HttpHeaders().set('Authorization', this.user.token)
    })
      .toPromise()
      .then(
        (response) => {
          return response;
        }
      ).catch(this.handleError);
  }

  hideComment(id) {
    return this.http.get(this.apiBaseUrl + 'api/hidecomment/' + id, {
      headers: new HttpHeaders().set('Authorization', this.user.token)
    })
      .toPromise()
      .then(
        (response) => {
          return response;
        }
      ).catch(this.handleError);
  }
    getService(id): Promise<Object> {
        if (this.user.token) {
            return this.http.get(this.apiBaseUrl + 'api/service/' + id, {
                headers: new HttpHeaders().set('Authorization', this.user.token)
            })
                .toPromise()
                .then(
                    (response) => {
                        return response;
                    }
                ).catch(this.handleError);
        }
        else {
            return this.http.get(this.apiBaseUrl + 'api/service/' + id)
                .toPromise()
                .then(
                    (response) => {
                        return response;
                    }
                ).catch(this.handleError);
        }
    }
  reportComment(id, data) {
    return this.http.get(this.apiBaseUrl + 'api/reportcomment/' + id, {
      headers: new HttpHeaders().set('Authorization', this.user.token)
    })
      .toPromise()
      .then(
        (response) => {
          return response;
        }
      ).catch(this.handleError);
  }

  mensajesNoLeidos() {
    if(this.user)
      return this.http.get(this.apiBaseUrl + 'api/mensajesNoleidos', {
      headers: new HttpHeaders().set('Authorization', this.user.token)
    })
      .toPromise()
      .then(
        (response) => {
          return response;
        }
      ).catch(this.handleError);
  }

  mensajes() {
    return this.http.get(this.apiBaseUrl + 'api/mensajes', {
      headers: new HttpHeaders().set('Authorization', this.user.token)
    })
      .toPromise()
      .then(
        (response) => {
          return response['data'];
        }
      ).catch(this.handleError);
  }

  // deleteMensajes(id) {
  //
  //   return this.http.get(this.apiBaseUrl + 'api/borrarmensaje/'+id,  {
  //     headers: new HttpHeaders().set('Authorization', this.user.token)
  //   })
  //
  // }

  deleteMensajes(id): Promise<any> {
    return this.http.get(this.apiBaseUrl + 'api/borrarmensaje/'+id,
    {
      headers: new HttpHeaders().set("Authorization", this.user.token)
    })
      .toPromise()
      .then(
        (response) => {
          return !response['status'];

        }
      ).catch(this.handleError);
  }

  leerMensajes(id): Promise<any> {
    return this.http.get(this.apiBaseUrl + 'api/leermensaje/'+id,
    {
      headers: new HttpHeaders().set("Authorization", this.user.token)
    })
      .toPromise()
      .then(
        (response) => {
          return !response['status'];

        }
      ).catch(this.handleError);
  }

  getbaseUrl(): string {
    return this.apiBaseUrl;
  }

  getDays(): string {
    return this.apiBaseUrl;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }


}
