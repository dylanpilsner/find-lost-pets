import { Router } from "../router";
import { state } from "../state";

const logo = require("../assets/logo.png");
const closeImg = require("../assets/close.png");
const user = require("../assets/user.png");

class Header extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  addListeners(container: HTMLElement) {
    const myData = container.querySelector(".my-data");
    const cs = state.getState();
    myData.addEventListener("click", (e) => {
      if (cs.token != "") {
        Router.go("/profile");
      } else Router.go("/auth-page");
    });

    const reportedPets = container.querySelector(".my-reported-pets");
    reportedPets.addEventListener("click", (e) => {
      if (cs.token == "") {
        window.alert(
          "Para ver sus mascotas reportadas, por favor inicie sesión"
        );
        state.setRedirect("my-reported-pets");
        Router.go("/auth-page");
      } else {
        Router.go("/my-reported-pets");
      }
    });
    const reportPet = container.querySelector(".report-pet");
    reportPet.addEventListener("click", (e) => {
      if (cs.token == "") {
        window.alert("Para reportar una mascota, por favor inicie sesión");
        state.setState("report-pet");
        Router.go("/auth-page");
      } else {
        Router.go("/report-pet");
      }
    });

    const sign = container.querySelector(".sign");
    sign.addEventListener("click", (e) => {
      const target = e.target as any;
      if (target.textContent == "INICIAR SESIÓN") {
        Router.go("/auth-page");
      } else {
        state.signOut();
        if (location.pathname == "/home") {
          location.reload();
        } else {
          Router.go("/home");
        }
      }
    });

    const logo = container.querySelector(".logo");
    logo.addEventListener("click", (e) => {
      Router.go("/home");
    });
  }

  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const header = document.createElement("header");
    const style = document.createElement("style");
    const cs = state.getState();
    header.classList.add("header");
    style.innerHTML =
      /*css*/
      `
        .header{
          height:90px;
          background-color:#79927a;
          display:flex;
          border-bottom:1px solid black;
          align-items: center;
          padding:0 10%;
          justify-content: space-between;
        }
        
        .logo{
          height:55px;
          cursor:pointer;
        }

        .open-nav-menu{
          width:55px;
          height:55px;
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:10px;
          cursor:pointer;
        }
        
        .hamburger-top-bread {
          width:100%;
          height:6px;
          border-radius:4px;
          background-color:black;
        }
        .hamburger-top-patty {
          width:100%;
          height:6px;
          border-radius:4px;
          background-color:black;
        }
        .hamburger-bottom-bread {
          width:100%;
          height:6px;
          border-radius:4px;
          background-color:black;
        }
        
        .nav-menu {
          display:flex;
          position:fixed;
          height:100%;
          z-index:1;
          width:100%;
          top:-2160px;
          left:0;
          bottom:0;
          background-color:#ADBDD1;
          flex-direction: column;
          align-items: center;
          justify-content:center;
          gap:20px;
        }

        .nav-menu.opened{
          animation-duration: 0.3s;
          animation-name: navgetsdown;
          animation-fill-mode: forwards;
          animation-timing-function: ease-in-out;
        }

        .nav-menu.closed{
          animation-duration: 0.3s;
          animation-name: navgetsup;
          animation-fill-mode: forwards;
          animation-timing-function: ease-in-out;
          top:0px;
        }
        
        @keyframes navgetsup{
          100%{
            top:-2160px;
          }
        }

        @keyframes navgetsdown{
          100%{
            top:0;
          }
        }

        .close-nav-menu{
          position:absolute;
          top:4%;
          right:11%;
          height:35px;
          width:35px;
        }

        .nav-item {
          font-size:24px;
          font-weight:700;
          cursor:pointer;
        }
        .account-container {
          margin-top:100px;
          display:flex;
          gap:8px;
        }

        .user-img{
          height:20px;
          align-self:center;
        }
        
        .user {
          font-size:24px;
          font-weight:400;
          text-align:center;
        }
        .sign {
          font-size:16px;
          font-weight:500;
          color: #C6558B;
          cursor: pointer;
          text-decoration: underline;
        }

    
        
      `;

    header.innerHTML =
      /*html*/
      `
     <img class="logo" src=${logo} />
     <div class="open-nav-menu">
     <div class="hamburger-top-bread"></div>
     <div class="hamburger-top-patty"></div>
     <div class="hamburger-bottom-bread"></div>
     </div>
     <nav class=nav-menu>
     <img class="close-nav-menu" src=${closeImg}/>
     <nav class="nav-item my-data">Mis datos</nav>
     <nav class="nav-item my-reported-pets">Mis mascotas reportadas</nav>
     <nav class="nav-item report-pet">Reportar mascota</nav>
     <div class="account-container">
     <img class="user-img" src=${user} />
     <span class="user">${cs.email == "" ? "Invitadx" : cs.email}</span>
     </div>
     <div class="sign">${
       cs.email == "" ? "INICIAR SESIÓN" : "CERRAR SESIÓN"
     }</div>
     </nav>
    `;

    shadow.appendChild(header);
    shadow.appendChild(style);

    const openNavMenu = header.querySelector(".open-nav-menu");
    openNavMenu.addEventListener("click", (e) => {
      const navMenu = header.querySelector(".nav-menu");
      navMenu.classList.toggle("opened");
      navMenu.classList.remove("closed");
    });

    const closeNavMenu = header.querySelector(".close-nav-menu");

    closeNavMenu.addEventListener("click", (e) => {
      const navMenu = header.querySelector(".nav-menu");
      navMenu.classList.toggle("opened");
      navMenu.classList.toggle("closed");
    });

    this.addListeners(header);
  }
}

customElements.define("custom-header", Header);
