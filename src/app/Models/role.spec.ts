import { Role } from './role';

describe('Role Model', () => {
  let role: Role;

  beforeEach(() => {
    role = new Role();
  });

  describe('Construtor', () => {
    it('deve criar uma instância válida', () => {
      expect(role).toBeTruthy();
      expect(role instanceof Role).toBeTruthy();
    });

    it('deve inicializar com valores padrão', () => {
      expect(role.id).toBe('');
      expect(role.roleName).toBe('');
    });
  });

  describe('Atribuição de Propriedades', () => {
    it('deve permitir atribuição de id', () => {
      const testId = '123';
      role.id = testId;
      expect(role.id).toBe(testId);
    });

    it('deve permitir atribuição de roleName', () => {
      const testRoleName = 'Administrador';
      role.roleName = testRoleName;
      expect(role.roleName).toBe(testRoleName);
    });
  });

  describe('Integridade do Objeto', () => {
    it('deve manter a integridade dos dados após múltiplas atribuições', () => {
      // Arrange
      const testData = {
        id: '456',
        roleName: 'Usuário'
      };

      // Act
      role.id = testData.id;
      role.roleName = testData.roleName;

      // Assert
      expect(role.id).toBe(testData.id);
      expect(role.roleName).toBe(testData.roleName);
    });
  });
});
