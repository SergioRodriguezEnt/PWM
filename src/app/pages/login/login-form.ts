import { Component } from '@angular/core';
import {FormTextField} from '../../shared/components/form-text-field/form-text-field';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  imports: [
    FormTextField,
    RouterLink
  ]
})
export class LoginForm {}
/*

async function setupLoginForm() {
  document.getElementById("login-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    let username = getFieldValue("user-field");
    let password = getFieldValue("password-field");

    console.log(username, password);

    let match = await fetch("/src/resources/users.json")
      .then((res) => res.json())
      .then((data) =>
        data.find((u) => u.username === username && u.password === password),
      );

    if (match) {
      setLocal("user", { username: match.username, role: match.role });
      window.location.href = "../search/search-with-user.html";
    } else {
      alert("Invalid username or password");
    }
  });
}
*/
