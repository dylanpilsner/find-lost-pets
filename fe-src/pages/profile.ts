import { Router } from "@vaadin/router";
import { state } from "../state";

class Profile extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  addListeners() {
    const form = this.querySelector(".form") as any;
    const name = form.name;
    const password = form.password;
    const confirmPassword = form["confirm-password"];

    state.pullProfile({ name, password, confirmPassword });
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
        // align-self:start;
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
      }
      .password-alert.active{
        display:initial;
      }
      
      `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <div class="auth-page-container">
     <h1 class="title">Mis datos</h1>
     <form class="form data">
     <label class="label-form">
     <div class="nombre">NOMBRE</div>
     <input placeholder="Ingresa tu nombre" type="text" class="data-input name" name="name" required/>
     </label>
     <label class="label-form">
     <div class="email">CONTRASEÑA</div>
     <input type="password" class="data-input password" name="password"required />
     </label>
     <label class="label-form">
     <div class="email">REPETIR CONTRASEÑA</div>
     <input type="password" class="data-input confirm-password" name="confirm-password" required/>
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
