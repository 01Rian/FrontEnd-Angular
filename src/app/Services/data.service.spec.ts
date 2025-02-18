import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const testUrl = 'http://test.api/recursos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DataService,
          useFactory: (http: HttpClient) => new DataService(testUrl, http),
          deps: [HttpClient]
        }
      ]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('deve fazer uma requisição GET para buscar todos os recursos', () => {
      const mockData = [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' }
      ];

      service.getAll().subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(testUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('deve propagar erro em caso de falha na requisição', () => {
      const errorMessage = 'Erro na requisição';

      service.getAll().subscribe({
        error: error => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
        }
      });

      const req = httpMock.expectOne(testUrl);
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('get', () => {
    it('deve fazer uma requisição GET para buscar um recurso específico', () => {
      const mockItem = { id: '1', name: 'Item 1' };
      const itemId = '1';

      service.get(itemId).subscribe(data => {
        expect(data).toEqual(mockItem);
      });

      const req = httpMock.expectOne(`${testUrl}/${itemId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockItem);
    });
  });

  describe('create', () => {
    it('deve fazer uma requisição POST para criar um novo recurso', () => {
      const mockItem = { name: 'Novo Item' };
      const mockResponse = { id: '1', ...mockItem };

      service.create(mockItem).subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(testUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockItem);
      req.flush(mockResponse);
    });
  });

  describe('update', () => {
    it('deve fazer uma requisição PUT para atualizar um recurso', () => {
      const mockItem = { id: '1', name: 'Item Atualizado' };

      service.update(mockItem).subscribe(data => {
        expect(data).toEqual(mockItem);
      });

      const req = httpMock.expectOne(testUrl);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockItem);
      req.flush(mockItem);
    });
  });

  describe('delete', () => {
    it('deve fazer uma requisição DELETE para remover um recurso', () => {
      const itemId = '1';

      service.delete(itemId).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${testUrl}/${itemId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('deve propagar erro em caso de falha na deleção', () => {
      const itemId = '1';
      const errorMessage = 'Erro ao deletar recurso';

      service.delete(itemId).subscribe({
        error: error => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        }
      });

      const req = httpMock.expectOne(`${testUrl}/${itemId}`);
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });
});
