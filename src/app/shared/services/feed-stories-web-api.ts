import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FeedStoriesWebApi {
    constructor(private http: HttpClient) { }

    public async post<requestType, responseType>(uri: string, request: requestType, options: Object = {}): Promise<responseType> {
        Object.assign(options, {
            headers: {
                // Add Required Header over here , not neeeded now
            }
        });
        return firstValueFrom(this.http.post<responseType>(`${environment.apiUrl}${uri}`, request, options))
    }
}