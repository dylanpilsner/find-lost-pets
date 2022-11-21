const logo = require("../assets/logo.png");
const closeImg = require("../assets/close.png");
const user = require("../assets/user.png");

class Header extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  addListeners() {}

  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const header = document.createElement("header");
    const style = document.createElement("style");
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

        .logo-container{
          height:100%;
        }
        
        .logo{
          height:55px;
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
          display:none;
          position:absolute;
          height:100%;
          width:100%;
          background-color:#D1ADCF;
          top:0;
          left:0;
          flex-direction: column;
          align-items: center;
          justify-content:center;
          gap:20px;
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
        }
        .sign {
          font-size:16px;
          font-weight:500;
        }

        .nav-menu.open{
          display:flex;
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
     <nav class="nav-item">Mis datos</nav>
     <nav class="nav-item">Mis mascotas reportadas</nav>
     <nav class="nav-item">Reportar mascota</nav>
     <div class="account-container">
     <img class="user-img" src=${user} />
     <span class="user">Invitadx</span>
     </div>
     <a class="sign" href="">INICIAR SESIÓN</a>
     </nav>
    `;

    shadow.appendChild(header);
    shadow.appendChild(style);

    const openNavMenu = header.querySelector(".open-nav-menu");
    openNavMenu.addEventListener("click", (e) => {
      const navMenu = header.querySelector(".nav-menu");
      navMenu.classList.toggle("open");
    });

    const closeNavMenu = header.querySelector(".close-nav-menu");

    closeNavMenu.addEventListener("click", (e) => {
      console.log("hola");
      const navMenu = header.querySelector(".nav-menu");
      navMenu.classList.toggle("open");
    });
  }
}

customElements.define("custom-header", Header);
