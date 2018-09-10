window.fbAsyncInit = function() {
  FB.init({
    appId: "1862928357347154",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v3.1"
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    if (response.status == "connected") {
      axios
        .post(
          "https://server-todo.wahyudisetiaji.xyz/users/loginFacebook",
          response.authResponse
        )
        .then(result => {
          localStorage.setItem("token", result.data.token);
          window.location='dashboard.html'
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
}
