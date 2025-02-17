import { User } from './user';
import { Role } from './role';

describe('User Model', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  describe('Construtor', () => {
    it('deve criar uma instância válida', () => {
      expect(user).toBeTruthy();
      expect(user instanceof User).toBeTruthy();
    });

    it('deve inicializar com valores padrão', () => {
      expect(user.id).toBe('');
      expect(user.userName).toBe('');
      expect(user.lastName).toBe('');
      expect(user.role instanceof Role).toBeTruthy();
    });
  });

  describe('Atribuição de Propriedades', () => {
    it('deve permitir atribuição de id', () => {
      const testId = '123';
      user.id = testId;
      expect(user.id).toBe(testId);
    });

    it('deve permitir atribuição de userName', () => {
      const testUserName = 'John';
      user.userName = testUserName;
      expect(user.userName).toBe(testUserName);
    });

    it('deve permitir atribuição de lastName', () => {
      const testLastName = 'Doe';
      user.lastName = testLastName;
      expect(user.lastName).toBe(testLastName);
    });

    it('deve permitir atribuição de role', () => {
      const testRole = new Role();
      testRole.id = '456';
      testRole.roleName = 'Admin';
      
      user.role = testRole;
      
      expect(user.role).toBeTruthy();
      expect(user.role instanceof Role).toBeTruthy();
      expect(user.role.id).toBe('456');
      expect(user.role.roleName).toBe('Admin');
    });
  });

  describe('Integridade do Objeto', () => {
    it('deve manter a integridade dos dados após múltiplas atribuições', () => {
      // Arrange
      const testData = {
        id: '789',
        userName: 'Jane',
        lastName: 'Smith',
        role: new Role()
      };
      testData.role.id = '101';
      testData.role.roleName = 'User';

      // Act
      user.id = testData.id;
      user.userName = testData.userName;
      user.lastName = testData.lastName;
      user.role = testData.role;

      // Assert
      expect(user.id).toBe(testData.id);
      expect(user.userName).toBe(testData.userName);
      expect(user.lastName).toBe(testData.lastName);
      expect(user.role.id).toBe(testData.role.id);
      expect(user.role.roleName).toBe(testData.role.roleName);
    });
  });
});
