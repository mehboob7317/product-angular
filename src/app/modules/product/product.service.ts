import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IManyResponseDto, IOneResponseDto } from 'src/app/common';
import { IProduct } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiHost = 'http://localhost:8000/api';
  private baseUrl = `${this.apiHost}/products`;

  constructor(protected http: HttpClient) {}

  index(): Observable<IManyResponseDto<IProduct>> {
    return this.http.get<IManyResponseDto<IProduct>>(`${this.baseUrl}`);
  }

  store(payload: any): Observable<IOneResponseDto<IProduct>> {
    return this.http.post<IOneResponseDto<IProduct>>(
      `${this.baseUrl}`,
      payload
    );
  }

  show(id: string): Observable<IOneResponseDto<IProduct>> {
    return this.http.get<IOneResponseDto<IProduct>>(`${this.baseUrl}/${id}`);
  }

  update(id: string, payload: FormData): Observable<IOneResponseDto<IProduct>> {

    // let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.put<IOneResponseDto<IProduct>>(
      `${this.baseUrl}/${id}`,
      payload,
      // {
      //   headers: headers
      // }
    );
  }

  destory(id: string): Observable<IOneResponseDto<IProduct>> {
    return this.http.delete<IOneResponseDto<IProduct>>(`${this.baseUrl}/${id}`);
  }
  uploadToS3(formData:any): Observable<IOneResponseDto<IProduct>> {
    return this.http.post<IOneResponseDto<IProduct>>(
      `${this.baseUrl}/uploadToS3}`,
      formData
      );
  }
}
