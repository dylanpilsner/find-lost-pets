import { Router } from "@vaadin/router";
import { state } from "../state";
const edit = require("../assets/edit.png");

class Profile extends HTMLElement {
  async connectedCallback() {
    this.render();
    const form = this.querySelector(".form") as any;
    const name = form.name;
    const password = form.password;
    const confirmPassword = form["confirm-password"];
    const accountData = await state.pullProfile({
      name,
      password,
      confirmPassword,
    });
    name.value = accountData.first_name;
    password.value = accountData.password.slice(0, 10);
    confirmPassword.value = accountData.password.slice(0, 10);
  }

  addListeners() {
    const editName = this.querySelector(".name.edit");
    const editPassword = this.querySelector(".password.edit");
    const form = this.querySelector(".form");
    editName.addEventListener("click", async (e) => {
      const password = this.querySelector(".password.data-input");
      if (password.hasAttribute("readonly")) {
        const name = this.querySelector(".name.data-input") as any;
        name.toggleAttribute("readonly");
      }
    });

    editPassword.addEventListener("click", (e) => {
      const name = this.querySelector(".name.data-input");
      if (name.hasAttribute("readonly")) {
        const password = this.querySelector(".password.data-input") as any;
        const confirmPassword = this.querySelector(
          ".confirm-password.data-input"
        ) as any;
        password.value = "";
        confirmPassword.value = "";
        password.toggleAttribute("readonly");
        confirmPassword.toggleAttribute("readonly");
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const password = this.querySelector(".data-input.password");
      const confirmPassword = this.querySelector(
        ".data-input.confirm-password"
      );
      const passwordAlert = this.querySelector(".password-alert");

      if (target.password.value != target["confirm-password"].value) {
        passwordAlert.textContent = "Las contraseñas no coinciden";
        passwordAlert.classList.add("active");
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target = e.target as any;
      const name = this.querySelector(".data-input.name");
      const password = this.querySelector(".data-input.password");
      const passwordAlert = this.querySelector(".password-alert");
      const editName = name.hasAttribute("readonly");
      const editPassword = password.hasAttribute("readonly");
      if (!editName && editPassword) {
        await state.updateName(target.name.value);
        location.reload();
      }

      if (
        editName &&
        !editPassword &&
        target.password.value == target["confirm-password"].value
      ) {
        const updatedPassword = await state.updatePassword(
          target.password.value
        );
        if (!updatedPassword.changeStatus) {
          passwordAlert.textContent =
            "Por favor, introduzca una contraseña distinta a la anterior";
          passwordAlert.classList.add("active");
        } else {
          passwordAlert.textContent = "Contraseña actualizada correctamente!";
          passwordAlert.classList.add("active");
          passwordAlert.classList.add("success");
        }
      }
    });
  }

  render() {
    const style = document.createElement("style");

    style.innerHTML =
      /*css*/
      `
      .auth-page-container{
        display:flex;
        flex-direction:column;
        align-items:center;
        padding:10px;
      }
      
      .title{
        margin:20px 0;
        font-size:40px;
      }

      .form {
        width:90%;
        display:flex;
        max-width:500px;
        flex-direction:column;
        align-items:center;
        gap:30px;
      }
      .label-form {
        font-size:16px;
        width:100%;
        font-weight:500;
      }

      .edit-container{
        display:flex;
        align-items:center;
        justify-content:space-between;
      }

      .nombre{
        align-content:end;
      }

      .edit{
        height:25px;
        align-self:flex-end;
        margin-right:10px;
        margin-bottom:5px;
      }

      .email {
      }

      .data-input {
        height:70px;
        border:2px solid black;
        width:100%;
        border-radius: 10px;
        font-size:20px;
        text-align:center;
        outline:none;
      }
      .data-input:read-only {
        background-color:#d6d5da;
      }

      .data-input.name{
        margin-bottom:30px;
      }

      .invisible-button{
        width:100%;
        border:none;
        background-color:transparent;
        margin-bottom:20px;
      }

      .password-alert{
        color:#eb4034;
        font-weight:500;
        display:none;
        text-align:center;
      }
      .password-alert.active{
        display:initial;
      }

      .password-alert.active.success{
        color:blue;
      }
      
      
      `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <div class="auth-page-container">
     <h1 class="title">Mis datos</h1>
     <form class="form data">
     <label class="label-form">
     <div class="edit-container">
     <div class="nombre">NOMBRE</div>
     <img class="edit name" src=${edit}/>
     </div>
     <input placeholder="Ingresa tu nombre" type="text" class="data-input name" name="name" required readonly/>
     </label>
     <label class="label-form">
     <div class="edit-container">
     <div class="email">CONTRASEÑA</div>
     <img class="edit password" src=${edit}/>
     </div>
     <input type="password" class="data-input password" name="password" required readonly />
     </label>
     <label class="label-form">
     <div class="email">REPETIR CONTRASEÑA</div>
     <input type="password" class="data-input confirm-password" name="confirm-password" required readonly/>
     </label>
     <span class="password-alert"></span>
     <button class="invisible-button">
     <custom-button class="button" id="button">Guardar</custom-button>
     </button>
     </form>
    </div>
    `;

    this.appendChild(style);
    this.addListeners();
  }
}

customElements.define("profile-page", Profile);
