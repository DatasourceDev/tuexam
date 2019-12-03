import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor() { 

  } 
 
  setToken(token : string){  
    localStorage.setItem('tuexam-token', token); 
  }

  getToken(){ 
    return localStorage.getItem('tuexam-token');
  }
  
  setData(data : string){  
    localStorage.setItem('tuexam-data', data); 
  }

  getData(){ 
    return localStorage.getItem('tuexam-data');
  }

  isLoggedIn = function(){ 
    var token = this.getToken();  
    if(token){
      return true;
    }else{
      return false;
    }
  };

  logIn = function(token,data){  
    this.setData(data);
    this.setToken(token);
    return this.getToken();
  };

  logOut = function(){
    localStorage.removeItem('tuexam-token');
    localStorage.removeItem('tuexam-data');
  };
  
  checkAccessButton(url){
    var routing = url.split("/");
    let access = []; 
    access = JSON.parse(this.getData()).Access;
	
    var root = "";
    for (const key of Object.keys(access)) {
      if((key != "UserLevelId") && (key != "Name")){
        if(routing[3]){
          root = routing[0]+"/"+routing[1]+"/"+routing[2]+"/"+routing[3]; 
          if(root == key){
            var split1 = access[key];
            var split2 = split1.split(''); 
            if(split2[0] == "1"){
              return true;
            }else{
              return false;
            }
          }
        }
        else if(routing[2]){
          root = routing[0]+"/"+routing[1]+"/"+routing[2];
          if(root == key){
            var split1 = access[key];
            var split2 = split1.split(''); 
            if(split2[0] == "1"){
              return true;
            }else{
              return false;
            }
          }
        }
        else if(routing[1]){
          root = routing[0]+"/"+routing[1];
          if(root == key){
            var split1 = access[key];
            var split2 = split1.split(''); 
            if(split2[0] == "1"){
              return true;
            }else{
              return false;
            }
          }
        }
        else if(routing[0]){
          root = routing[0];
          if(root == key){
            var split1 = access[key];
            var split2 = split1.split(''); 
            if(split2[0] == "1"){
              return true;
            }else{
              return false;
            }
          }
        }
      }
    }
  }
}
