import { Router } from "@vaadin/router";
import { state } from "../state";

class ReportedPets extends HTMLElement {
  async connectedCallback() {
    this.render();
  }

  addListeners() {}

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
     <h1 class="title">Mis mascotas reportadas</h1>
    </div>
    `;

    this.appendChild(style);
    this.addListeners();
  }
}

customElements.define("reported-pets-page", ReportedPets);
