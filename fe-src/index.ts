import "./router";
import "./pages/home";
import "./pages/auth";
import "./pages/profile";
import "./pages/reported-pets";
import "./pages/report-pet";
import "./components/header";
import "./components/button";
import { state } from "./state";

(function () {
  state.init();
})();
