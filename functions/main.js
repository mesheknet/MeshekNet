const AllInput = document.getElementById("AllInput");

AllInput.addEventListener("input", (e) => {
  validate(e);
});

function validate(e) {
  if (e.target.value == "") {
    invalid(e);
    e.target.nextElementSibling.innerHTML = "שדה חובה";
    return false;
  } else {
    isvalid(e);
  }

  if (e.target.id == "email") {
    validateEmail(e);
  }
  if (e.target.id == "tel") {
    validateTel(e);
  }
}

function validateEmail(e) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.test(e.target.value)) {
    invalid(e);
    e.target.nextElementSibling.innerHTML = "מייל לא תקין";
    return false;
  }
  isvalid(e);
}
function validateTel(e) {
  const re = /^\d{10}$/;
  if (!re.test(e.target.value)) {
    invalid(e);
    e.target.nextElementSibling.innerHTML = "טלפון לא תקין";
    return false;
  }
  isvalid(e);
}

function isvalid(e) {
  e.target.setAttribute("style", "border: 1px solid #9f9f9f;");
  e.target.nextElementSibling.classList.add("hide");
  e.target.previousElementSibling.classList.remove("eror");
}
function invalid(e) {
  e.target.setAttribute("style", "border-color:red;");
  e.target.nextElementSibling.classList.remove("hide");
  e.target.previousElementSibling.classList.add("eror");
}
