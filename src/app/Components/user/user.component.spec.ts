import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserService } from '../../Services/user.service';
import { RoleService } from '../../Services/role.service';
import { NavigationService } from '../../Services/navigation.service';
import { User } from '../../Models/user';
import { Role } from '../../Models/role';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let roleService: jasmine.SpyObj<RoleService>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  const mockRole: Role = { id: '1', roleName: 'Admin' };
  const mockRoles: Role[] = [
    mockRole,
    { id: '2', roleName: 'User' }
  ];

  const mockUsers: User[] = [
    { id: '1', userName: 'John', lastName: 'Doe', role: mockRole },
    { id: '2', userName: 'Jane', lastName: 'Smith', role: mockRole }
  ];

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['getAll', 'create', 'update', 'delete']);
    const roleSpy = jasmine.createSpyObj('RoleService', ['getAll']);
    const navSpy = jasmine.createSpyObj('NavigationService', ['reload']);

    userSpy.getAll.and.returnValue(of(mockUsers));
    userSpy.create.and.returnValue(of({}));
    userSpy.update.and.returnValue(of({}));
    userSpy.delete.and.returnValue(of({}));
    roleSpy.getAll.and.returnValue(of(mockRoles));

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ UserComponent ],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: RoleService, useValue: roleSpy },
        { provide: NavigationService, useValue: navSpy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    roleService = TestBed.inject(RoleService) as jasmine.SpyObj<RoleService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com listas vazias e modo de criação', () => {
    expect(component.userList).toBeDefined();
    expect(component.roleList).toBeDefined();
    expect(component.creatingMode).toBeTrue();
    expect(component.userToModify).toBeDefined();
  });

  it('deve carregar users e roles ao inicializar', () => {
    expect(userService.getAll).toHaveBeenCalled();
    expect(roleService.getAll).toHaveBeenCalled();
    expect(component.userList).toEqual(mockUsers);
    expect(component.roleList).toEqual(mockRoles);
  });

  describe('getAllUsers', () => {
    it('deve atualizar userList com dados do serviço', () => {
      component.userList = [];
      component.getAllUsers();
      expect(userService.getAll).toHaveBeenCalled();
      expect(component.userList).toEqual(mockUsers);
    });
  });

  describe('getAllRoles', () => {
    it('deve atualizar roleList com dados do serviço', () => {
      component.roleList = [];
      component.getAllRoles();
      expect(roleService.getAll).toHaveBeenCalled();
      expect(component.roleList).toEqual(mockRoles);
    });
  });

  describe('createUser', () => {
    it('deve chamar create no service com dados corretos', () => {
      const newUser = new User();
      newUser.userName = 'NewUser';
      newUser.lastName = 'Test';
      newUser.role.id = '1';
      component.userToModify = newUser;

      spyOn(window, 'alert');

      component.createUser();

      expect(userService.create).toHaveBeenCalledWith({
        userName: 'NewUser',
        lastName: 'Test',
        role: { id: '1' }
      });
      expect(window.alert).toHaveBeenCalledWith('User Added Successfully');
      expect(navigationService.reload).toHaveBeenCalled();
    });
  });

  describe('modifyUser', () => {
    it('deve chamar update no service com dados atualizados', () => {
      const updatedUser = new User();
      updatedUser.id = '1';
      updatedUser.userName = 'UpdatedUser';
      updatedUser.lastName = 'Updated';
      updatedUser.role = mockRole;
      component.userToModify = updatedUser;

      spyOn(window, 'alert');

      component.modifyUser();

      expect(userService.update).toHaveBeenCalledWith(updatedUser);
      expect(window.alert).toHaveBeenCalledWith('User Updated Successfully');
      expect(navigationService.reload).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('deve chamar delete no service quando confirmado', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(window, 'alert');

      component.deleteUser('1');

      expect(userService.delete).toHaveBeenCalledWith('1');
      expect(window.alert).toHaveBeenCalledWith('User Deleted Successfully');
      expect(navigationService.reload).toHaveBeenCalled();
    });

    it('não deve chamar delete no service quando não confirmado', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.deleteUser('1');

      expect(userService.delete).not.toHaveBeenCalled();
    });
  });

  describe('openModel', () => {
    it('deve resetar userToModify quando aberto sem user existente', () => {
      const emptyUser = new User();
      component.openModel();
      
      expect(component.userToModify).toEqual(emptyUser);
      expect(component.creatingMode).toBeTrue();
    });

    it('deve configurar modo de edição quando aberto com user existente', () => {
      const existingUser = mockUsers[0];
      component.openModel(existingUser);

      expect(component.userToModify).toEqual(existingUser);
      expect(component.creatingMode).toBeFalse();
    });
  });
});
