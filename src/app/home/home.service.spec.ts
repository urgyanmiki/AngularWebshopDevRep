import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRoutes, Routes } from '@angular/router';



describe('HomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers:[
      HomeService,
      
    ]
  }));

  it('should be created', () => {
    const service: HomeService = TestBed.get(HomeService);
    expect(service).toBeTruthy();
  });
});
