import { UserService } from './../../Services/user.service';
import { Component } from '@angular/core';
import { User } from '../../Models/user';
import { Role } from '../../Models/role';
import { RoleService } from '../../Services/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userList: User[] = [];
  roleList: Role[] = [];

  userToModify: User = new User();
  creatingMode: boolean = true;

  constructor(private userService: UserService, private roleService: RoleService) {
    this.getAllUsers();
    this.getAllRoles();
  }

  getAllUsers() {
    this.userService.getAll().subscribe((response: User[]) => {
      this.userList = response;
    });
  }

  getAllRoles() {
    this.roleService.getAll().subscribe((reponse: Role[]) => {
      this.roleList = reponse;
    });
  }

  modifyUser() {
    this.userService.update(this.userToModify).subscribe(() => {
      alert("User Updated Successfully");
      window.location.reload();
    });
  }

  createUser() {
    const newUser = {
      userName: this.userToModify.userName,
      lastName: this.userToModify.lastName,
      role: {
        id: this.userToModify.role.id,
      }
    };
    this.userService.create(newUser).subscribe(() => {
      alert("User Added Successfully");
      window.location.reload();
    });
  }

  deleteUser(userId: string) {
    if (confirm("Are you sure you want to delete this user !!!")) {
      this.userService.delete(userId).subscribe(() => {
        alert("User Deleted Successfully");
        window.location.reload();
      });
    }
  }

  openModel(user: User = new User()) {
    if (user.id == "") {
      this.userToModify = new User();
    } else {
      this.creatingMode = false;
      this.userToModify = user
    }
  }
}
