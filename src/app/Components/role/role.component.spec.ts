import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RoleComponent } from './role.component';
import { RoleService } from '../../Services/role.service';
import { NavigationService } from '../../Services/navigation.service';
import { Role } from '../../Models/role';
import { of } from 'rxjs';

describe('RoleComponent', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;
  let roleService: jasmine.SpyObj<RoleService>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  const mockRoles: Role[] = [
    { id: '1', roleName: 'Admin' },
    { id: '2', roleName: 'User' }
  ];

  beforeEach(async () => {
    const roleSpy = jasmine.createSpyObj('RoleService', ['getAll', 'create', 'update', 'delete']);
    const navSpy = jasmine.createSpyObj('NavigationService', ['reload']);

    roleSpy.getAll.and.returnValue(of(mockRoles));
    roleSpy.create.and.returnValue(of({}));
    roleSpy.update.and.returnValue(of({}));
    roleSpy.delete.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RoleComponent ],
      providers: [
        { provide: RoleService, useValue: roleSpy },
        { provide: NavigationService, useValue: navSpy }
      ]
    }).compileComponents();

    roleService = TestBed.inject(RoleService) as jasmine.SpyObj<RoleService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com lista vazia e modo de criação', () => {
    expect(component.roleList).toBeDefined();
    expect(component.creatingMode).toBeTruthy();
    expect(component.newRole).toBeDefined();
  });

  it('deve carregar roles ao inicializar', () => {
    expect(roleService.getAll).toHaveBeenCalled();
    expect(component.roleList).toEqual(mockRoles);
  });

  describe('getAllRoles', () => {
    it('deve atualizar roleList com dados do serviço', () => {
      component.roleList = [];
      component.getAllRoles();
      expect(roleService.getAll).toHaveBeenCalled();
      expect(component.roleList).toEqual(mockRoles);
    });
  });

  describe('createRole', () => {
    it('deve chamar create no service com novos dados', () => {
      const newRole = { roleName: 'NewRole' };
      component.newRole.roleName = 'NewRole';
      
      spyOn(window, 'alert');

      component.createRole();

      expect(roleService.create).toHaveBeenCalledWith(newRole);
      expect(window.alert).toHaveBeenCalledWith('Role Created Successfully');
      expect(navigationService.reload).toHaveBeenCalled();
    });
  });

  describe('modifyRole', () => {
    it('deve chamar update no service com dados atualizados', () => {
      const updatedRole = new Role();
      updatedRole.id = '1';
      updatedRole.roleName = 'UpdatedRole';
      component.newRole = updatedRole;

      spyOn(window, 'alert');

      component.modifyRole();

      expect(roleService.update).toHaveBeenCalledWith(updatedRole);
      expect(window.alert).toHaveBeenCalledWith('Role Updated Successfully');
      expect(navigationService.reload).toHaveBeenCalled();
    });
  });

  describe('deleteRole', () => {
    it('deve chamar delete no service quando confirmado', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(window, 'alert');

      component.deleteRole('1');

      expect(roleService.delete).toHaveBeenCalledWith('1');
      expect(window.alert).toHaveBeenCalledWith('Role Deleted Successfully');
      expect(navigationService.reload).toHaveBeenCalled();
    });

    it('não deve chamar delete no service quando não confirmado', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.deleteRole('1');

      expect(roleService.delete).not.toHaveBeenCalled();
    });
  });

  describe('openModel', () => {
    it('deve resetar newRole quando aberto sem role existente', () => {
      const emptyRole = new Role();
      component.openModel();
      
      expect(component.newRole).toEqual(emptyRole);
      expect(component.creatingMode).toBeTrue();
    });

    it('deve configurar modo de edição quando aberto com role existente', () => {
      const existingRole = new Role();
      existingRole.id = '1';
      existingRole.roleName = 'ExistingRole';

      component.openModel(existingRole);

      expect(component.newRole).toEqual(existingRole);
      expect(component.creatingMode).toBeFalse();
    });
  });
});
