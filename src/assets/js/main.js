$(document).ready(function() {
  console.log("I'm working !");

  $(".js-show-navbar").click(() => {
    $(".header__wrap-links").toggleClass("active-navbar");
    $("#modal").toggleClass("modal-deliver", 3000);
  });
});
