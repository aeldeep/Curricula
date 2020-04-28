const devEnvironment = {
  curriculaBaseUrl: "http://localhost:8080",
};

const prodEnvironment = {

  curriculaBaseUrl: "http://3.95.224.18:8080",
};

export let environment = prodEnvironment;

if (process.env.REACT_APP_ENV === "production") {
  environment = devEnvironment;
}
