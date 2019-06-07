export default () => {
  fetch(`${URL}/create-session`, {
    method: "POST",
    body: JSON.stringify({ path: "beans" })
  })
    .then(x => console.log("x", x))
    .catch(err => console.log("err", err));
};
