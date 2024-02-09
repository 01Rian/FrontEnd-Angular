import { Component } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../Services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  roleList: Role[] = [];

  newRole: Role = new Role();

  creatingMode: boolean = true;

  constructor(private roleService: RoleService) {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getAll().subscribe((response: Role[]) => {
      this.roleList = response;
    });
  }

  deleteRole(roleId: string) {
    if (confirm("Are you sure you want to delete this role !!!")) {
      this.roleService.delete(roleId).subscribe(() => {
        alert("Role Deleted Successfully");
        window.location.reload();
      });
    }
  }

  createRole() {
    const newRole = {
      roleName: this.newRole.roleName
    }
    this.roleService.create(newRole).subscribe(() => {
      alert("Role Created Successfully");
      window.location.reload();
    });
  }

  modifyRole() {
    this.roleService.update(this.newRole).subscribe(() => {
      alert("Role Updated Successfully");
      window.location.reload();
    });
  }

  openModel(role: Role = new Role()) {
    if (role.id == "") {
      this.newRole = new Role();
    } else {
      this.creatingMode = false;
      this.newRole = role;
    }
  }
}
