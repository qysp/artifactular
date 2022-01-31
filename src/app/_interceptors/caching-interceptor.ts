import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpEvent, HttpRequest,
  HttpResponse, HttpInterceptor, HttpHandler
} from '@angular/common/http';
import { RequestCache } from '../_services/request-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCache) {}

  intercept(
      req: HttpRequest<any>,
      next: HttpHandler): Observable<HttpEvent<any>> {

    const cachedResponse = this.cache.get(req);
    return cachedResponse
      ? of(cachedResponse)
      : sendRequest(req, next, this.cache);
  }
}

function sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache): Observable<HttpEvent<any>> {

  return next.handle(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.put(req, event);
      }
    })
  );
}
