import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([{ path: "/home", component: "home-page" }]);
if (location.pathname == "/") {
  Router.go("/home");
}
