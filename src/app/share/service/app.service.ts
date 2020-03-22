import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()

export class AppService {
  private serverurl = "http://localhost:1532/";
  private useraccessdata;
  private token;
  private appversion = "";
  private userRole = [];
  private UserAccessRole = "";
  private username = "";
  constructor(private _http: Http, private http: HttpClient, private router: Router, private session: SessionService) {

    let useracces = this.session.getData();
    this.token = this.session.getToken();
    let UserLevelId = "";

    if (useracces != null) {
      this.useraccessdata = JSON.parse(useracces);

      //this.appversion = this.useraccessdata.Version;
      //this.UserId = this.useraccessdata.UserId;

    }

  }
  get(url, data): Observable<string> {
    let res: any;
    return this._http.get(
      this.serverurl +url,
      //{ headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': '','Token':localStorage.getItem('autodesk-token')}) }
      //{ headers: new Headers({ 'Content-Type': 'application/json', 'Role':this.UserAccessRole,'UserId':this.UserId}) }
    )
      .map((response: Response) => {

        return response.text();
      })
      .catch((err) => {
        //this.rollbar.log("error", err);
        return Observable.throw(err);
      });
  }

  //http client get
  httpClientGet(url, data) {
    let useracces = this.session.getData();
    this.useraccessdata = JSON.parse(useracces);
    let params = new HttpParams();
    if (data != null) {
      for (var i = 0; i < Object.keys(data).length; i++) {
        var value = "";
        if (Object.values(data)[i] != null)
          value = Object.values(data)[i].toString();
        params = params.append(Object.keys(data)[i], value);
      }
    }
    if (this.useraccessdata != null) {
      params = params.append("update_by", this.useraccessdata.username);
      params = params.append("user_id", this.useraccessdata.id);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Method', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    let httpOptions = {
      headers: headers,
      params: params
    };
    
    return this.http.get(this.serverurl + url, httpOptions);
  }

  //http client post
  httpClientPost(url, data) {
    let useracces = this.session.getData();
    this.useraccessdata = JSON.parse(useracces);
    data["update_by"] = this.useraccessdata.username;
    data["user_id"] = this.useraccessdata.id;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Method', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    let httpOptions = {
      headers: headers,
    };
    return this.http.post(this.serverurl + url, data, httpOptions); 

  }
  httpClientFilePost(url, data) {
    return this.http.post(this.serverurl + url, data);
  }
  //http client post
  httpCLientPut(url, data) {
    return this.http.put(this.serverurl +url, data);
  }

  openurl(url) {
    window.open(this.serverurl +url);
  }
  encoder(str) {
    let vslueStr = str;
    for (var i = str.length - 1; i >= 0; i--) {
      if (str[i] == "'" || str[i] == '"' || str[i] == "\n" || str[i] == "\\" || str[i] == "{" || str[i] == "}" || str[i] == "/") {
        var replacement = '&#' + str[i].charCodeAt() + ';';
        vslueStr = vslueStr.substr(0, i) + replacement + vslueStr.substr(i + 1);
      }
    }
    return vslueStr;
  }
  decoder(str) {
    if (str == null || str == '')
      return '';

    str = str.replace("&#10;", " ");
    return str.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
  }

  convert_html_to_string(result, max) {
    if (result && typeof result === 'string') {
      var element = document.createElement('div');
      result = result.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      result = result.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = result;
      result = element.textContent;
      element.textContent = '';

      if (result.length > max) {
        result = result.substring(0, max) + ' ...';
      }
    }
    return result;
  }

}



