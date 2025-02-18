import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoleService } from './role.service';
import { Role } from '../Models/role';

describe('RoleService', () => {
  let service: RoleService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/role';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoleService]
    });
    service = TestBed.inject(RoleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('Operações Herdadas', () => {
    it('deve buscar todas as funções', () => {
      const mockRoles: Role[] = [
        { id: '1', roleName: 'Admin' },
        { id: '2', roleName: 'User' }
      ];

      service.getAll().subscribe(roles => {
        expect(roles).toEqual(mockRoles);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockRoles);
    });

    it('deve buscar uma função por ID', () => {
      const mockRole: Role = { id: '1', roleName: 'Admin' };
      const roleId = '1';

      service.get(roleId).subscribe(role => {
        expect(role).toEqual(mockRole);
      });

      const req = httpMock.expectOne(`${apiUrl}/${roleId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockRole);
    });

    it('deve criar uma nova função', () => {
      const mockRole: Role = { id: '1', roleName: 'Admin' };

      service.create(mockRole).subscribe(role => {
        expect(role).toEqual(mockRole);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRole);
      req.flush(mockRole);
    });

    it('deve atualizar uma função existente', () => {
      const mockRole: Role = { id: '1', roleName: 'Admin Updated' };

      service.update(mockRole).subscribe(role => {
        expect(role).toEqual(mockRole);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockRole);
      req.flush(mockRole);
    });

    it('deve deletar uma função', () => {
      const roleId = '1';

      service.delete(roleId).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${apiUrl}/${roleId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('Tratamento de Erros', () => {
    it('deve lidar com erro na busca de funções', () => {
      service.getAll().subscribe({
        error: error => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Erro ao buscar funções', { status: 500, statusText: 'Server Error' });
    });
  });
});
