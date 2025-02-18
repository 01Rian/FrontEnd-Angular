import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../Models/user';
import { Role } from '../Models/role';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/user';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('Operações Herdadas', () => {
    it('deve buscar todos os usuários', () => {
      const mockRole = new Role();
      mockRole.id = '1';
      mockRole.roleName = 'Admin';

      const mockUsers: User[] = [
        { id: '1', userName: 'john', lastName: 'Doe', role: mockRole },
        { id: '2', userName: 'jane', lastName: 'Smith', role: mockRole }
      ];

      service.getAll().subscribe(users => {
        expect(users).toEqual(mockUsers);
        expect(users[0].role instanceof Role).toBeTruthy();
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('deve buscar um usuário por ID', () => {
      const mockRole = new Role();
      mockRole.id = '1';
      mockRole.roleName = 'Admin';

      const mockUser: User = { 
        id: '1', 
        userName: 'john', 
        lastName: 'Doe', 
        role: mockRole 
      };
      const userId = '1';

      service.get(userId).subscribe(user => {
        expect(user).toEqual(mockUser);
        expect(user.role instanceof Role).toBeTruthy();
      });

      const req = httpMock.expectOne(`${apiUrl}/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('deve criar um novo usuário', () => {
      const mockRole = new Role();
      mockRole.id = '1';
      mockRole.roleName = 'User';

      const mockUser: User = {
        id: '1',
        userName: 'newuser',
        lastName: 'Test',
        role: mockRole
      };

      service.create(mockUser).subscribe(user => {
        expect(user).toEqual(mockUser);
        expect(user.role instanceof Role).toBeTruthy();
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockUser);
    });

    it('deve atualizar um usuário existente', () => {
      const mockRole = new Role();
      mockRole.id = '1';
      mockRole.roleName = 'Admin';

      const mockUser: User = {
        id: '1',
        userName: 'updated',
        lastName: 'User',
        role: mockRole
      };

      service.update(mockUser).subscribe(user => {
        expect(user).toEqual(mockUser);
        expect(user.role instanceof Role).toBeTruthy();
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockUser);
    });

    it('deve deletar um usuário', () => {
      const userId = '1';

      service.delete(userId).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${apiUrl}/${userId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('Tratamento de Erros', () => {
    it('deve lidar com erro na busca de usuários', () => {
      service.getAll().subscribe({
        error: error => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Erro ao buscar usuários', { status: 500, statusText: 'Server Error' });
    });

    it('deve lidar com erro ao criar usuário com dados inválidos', () => {
      const invalidUser = {};

      service.create(invalidUser).subscribe({
        error: error => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Dados de usuário inválidos', { status: 400, statusText: 'Bad Request' });
    });
  });
});
