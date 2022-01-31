import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  cachedAt: number;
}

export abstract class RequestCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {
  // Cache lifetime of 5 minutes
  readonly maxAge = 300000;
  cache = new Map<string, RequestCacheEntry>();

  constructor() { }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.cachedAt < (Date.now() - this.maxAge);
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const entry = { url, response, cachedAt: Date.now() };
    this.cache.set(url, entry);

    // remove expired cache entries
    const expired = Date.now() - this.maxAge;
    this.cache.forEach(cacheEntry => {
      if (cacheEntry.cachedAt < expired) {
        this.cache.delete(cacheEntry.url);
      }
    });
  }
}
