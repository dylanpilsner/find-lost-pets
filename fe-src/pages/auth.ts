import { Router } from "@vaadin/router";
import { state } from "../state";

class Auth extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  signIn(email: string) {
    const signInForm = this.querySelector(".sign-in.form");
    signInForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target = e.target as any;
      const passwordValue = target.password.value;
      const authentication = await state.authenticate(email, passwordValue);
      if (authentication.token.authenticationCompleted) {
        state.setAccountInformation(email, authentication.token);
        Router.go("/home");
      } else {
        const passwordAlert = this.querySelector(".password-alert");
        passwordAlert.classList.add("active");
        passwordAlert.textContent = "Contraseña incorrecta";
      }
    });
  }

  signUp(email) {
    const registerForm = this.querySelector(".register.form") as any;

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target = e.target as any;
      const password = target.password.value;
      const name = target.name.value;
      const confirmPassword = target["confirm-password"].value;
      const passwordAlert = this.querySelector(".password-alert");

      if (password != confirmPassword) {
        passwordAlert.classList.add("active");
        passwordAlert.textContent = "Las contraseñas no coinciden";
      } else {
        await state.signUp(email, name, password);
        const authentication = await state.authenticate(email, password);
        state.setAccountInformation(email, authentication.token);
        Router.go("/home");
      }
    });
  }

  addListeners(param: { verifyEmail; register; signIn }) {
    const form = this.querySelector(".form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target = e.target as any;
      const emailValue = target.email.value;
      const verifyEmail = await state.verifyEmail(emailValue);
      if (verifyEmail) {
        this.removeChild(param.verifyEmail);
        this.appendChild(param.signIn);
        this.signIn(emailValue);
      } else {
        this.removeChild(param.verifyEmail);
        this.appendChild(param.register);
        this.signUp(emailValue);
      }
    });
  }

  render() {
    const style = document.createElement("style");
    const registerSection = document.createElement("section");
    const signInSection = document.createElement("section");
    registerSection.classList.add("register-container");
    signInSection.classList.add("signIn-container");

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
        gap:30px;
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
        outline:none;
      }

      .sign-input.name{
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
    <section class="verify-email-container">
    <div class="auth-page-container">
     <h1 class="title">Ingresar</h1>
     <form class="form">
     <label class="label-form">
     <div class="email">EMAIL</div>
     <input placeholder="Ingrese su email" type="email" class="sign-input" name="email" required/>
     </label>
     <button class="invisible-button">
     <custom-button class="button">Siguiente</custom-button>
     </button>
     </form>
    </div>
    </section>
    `;

    signInSection.innerHTML = /*html*/ `
    <div class="auth-page-container">
     <h1 class="title">Ingresar</h1>
     <form class="form sign-in">
     <label class="label-form">
     <div class="password">CONTRASEÑA</div>
     <input type="password" class="sign-input" name="password" required/>
     </label>
     <span class="password-alert"></span>
     <button class="invisible-button">
     <custom-button class="button">Siguiente</custom-button>
     </button>
     </form>
    </div>
    `;

    registerSection.innerHTML = /*html*/ `
    <div class="auth-page-container">
     <h1 class="title">Ingresar</h1>
     <form class="form register">
     <label class="label-form">
     <div class="nombre">NOMBRE</div>
     <input placeholder="Ingresa tu nombre" type="text" class="sign-input name" name="name" required/>
     </label>
     <label class="label-form">
     <div class="email">CONTRASEÑA</div>
     <input type="password" class="sign-input password" name="password"required />
     </label>
     <label class="label-form">
     <div class="email">REPETIR CONTRASEÑA</div>
     <input type="password" class="sign-input confirm-password" name="confirm-password" required/>
     </label>
     <span class="password-alert"></span>
     <button class="invisible-button">
     <custom-button class="button" id="button">Guardar</custom-button>
     </button>
     </form>
    </div>
    `;

    this.appendChild(style);
    const verifyEmailContainer = this.querySelector(".verify-email-container")!;

    this.addListeners({
      verifyEmail: verifyEmailContainer,
      register: registerSection,
      signIn: signInSection,
    });
  }
}

customElements.define("auth-page", Auth);
