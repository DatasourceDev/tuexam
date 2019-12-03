import { Observable, BehaviorSubject, EmptyError, Subscription } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from 'src/app/share/service/session.service';
import { AppService } from "../../share/service/app.service";

import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse, HttpEvent, HttpClient
} from '@angular/common/http';
import swal from 'sweetalert2';


@Injectable()
export class Interceptor implements HttpInterceptor {
  private useraccesdata: any;
  private timeLeft: number = 5;
  private stop: string;
  private subscription: Subscription;

  constructor(public session: SessionService, private router: Router, private route: ActivatedRoute, private injector: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.useraccesdata = this.session.getData();
    const token: string = this.session.getToken();
    this.stop = localStorage.getItem("stop");
    this.subscription = this.route.params.subscribe();
    if (token != null) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }

      });
    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',

        }

      });
    }
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
       
      }
    });

  }
}
