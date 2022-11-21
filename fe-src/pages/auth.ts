import { Router } from "@vaadin/router";
import { state } from "../state";

class Auth extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  addListeners() {
    const form = this.querySelector(".form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
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
      }
      
      .title{
        margin:50px 0;
        font-size:40px;
      }

      .form {
        width:90%;
        display:flex;
        max-width:500px;
        flex-direction:column;
        align-items:center;
      }
      .label-form {
        font-size:16px;
        width:100%;
        font-weight:500;
      }

      .email {
      }

      .sign-input {
        height:70px;
        border:2px solid black;
        width:100%;
        border-radius: 10px;
        font-size:20px;
        text-align:center;
      }

      .invisible-button{
        margin-top:30px;
        width:100%;
        border:none;
        background-color:transparent;
      }

      .button{
      }
      
      `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <div class="auth-page-container">
     <h1 class="title">Ingresar</h1>
     <form class="form">
     <label class="label-form">
     <div class="email">EMAIL</div>
     <input type="email" class="sign-input" name="email" />
     </label>
     <button class="invisible-button">
     <custom-button class="button">Siguiente</custom-button>
     </button>
     </form>
    </div>
    `;

    this.appendChild(style);

    this.addListeners();
  }
}

customElements.define("auth-page", Auth);
