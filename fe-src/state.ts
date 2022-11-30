const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const state = {
  data: {
    geolocation: {
      latitude: "",
      longitude: "",
    },
    email: "",
    token: "",
    reportedPets: [],
  },
  listeners: [],

  init() {
    const state = JSON.parse(localStorage.getItem("saved-state")!);

    if (state) {
      this.setState(state);
    }
  },

  getState() {
    return this.data;
  },

  async pullProfile(params) {
    const cs = this.getState();
    const res = await fetch(`${API_BASE_URL}/profile`, {
      headers: {
        authorization: `bearer ${cs.token}`,
      },
    });
    const data = await res.json();
    return data;
    // params.name.value = data.first_name;
    // params.password.value = data.password.slice(0, 16);
    // params.confirmPassword.value = data.password.slice(0, 16);

    // console.log(data);
  },

  setGeolocation(lat: number, lng: number) {
    const cs = this.getState();
    cs.geolocation.latitude = lat;
    cs.geolocation.longitude = lng;
    this.setState(cs);
  },

  async verifyEmail(email: string) {
    const res = await fetch(`${API_BASE_URL}/verify-user`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    return data.verifiedEmail;
  },

  async updateName(first_name: string) {
    const cs = this.getState();
    const res = await fetch(`${API_BASE_URL}/update-name`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${cs.token}`,
      },
      body: JSON.stringify({ first_name }),
    });
  },
  async updatePassword(password: string) {
    const cs = this.getState();
    const res = await fetch(`${API_BASE_URL}/update-password`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${cs.token}`,
      },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    return data;
  },

  async signUp(email: string, first_name: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, first_name, password }),
    });
    const data = await res.json();
    console.log(data);
  },

  async authenticate(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/user/token`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    return data;
  },

  async reportLostPet(params: {
    name: string;
    last_location_lat: number;
    last_location_lng: number;
    point_of_reference: string;
    pictureURL: string;
  }) {
    const cs = this.getState();
    const res = await fetch(`${API_BASE_URL}/report-lost-pet`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${cs.token}`,
      },
      body: JSON.stringify({
        name: params.name,
        point_of_reference: params.point_of_reference,
        last_location_lat: params.last_location_lat,
        last_location_lng: params.last_location_lng,
        pictureURL: params.pictureURL,
      }),
    });
    const data = await res.json();
    return data;
  },

  signOut() {
    const cs = this.getState();
    cs.email = "";
    cs.token = "";
    this.setState(cs);
  },

  setAccountInformation(email: string, token) {
    const cs = state.getState();
    cs.email = email;
    cs.token = token.token;
    this.setState(cs);
  },

  async getMyPets() {
    const cs = this.getState();
    const res = await fetch(`${API_BASE_URL}/get-my-reported-pets`, {
      headers: {
        authorization: `bearer ${cs.token}`,
      },
    });
    const data = await res.json();

    return data;
  },

  setState(newState: Object) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("Soy el state, he cambiado");
    console.log(this.data);
    localStorage.setItem("saved-state", JSON.stringify(newState));
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
