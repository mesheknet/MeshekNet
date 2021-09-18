const AllInput = document.getElementById("AllInput");

AllInput.addEventListener("input", (e) => {
  validate(e);
});

function validate(e) {
  if (e.target.value == "") {
    e.target.setAttribute("style", "border-color:red;");
    e.target.nextElementSibling.classList.remove("hide");
    e.target.previousElementSibling.classList.add("eror");
    return false;
  } else {
    e.target.setAttribute("style", "border: 1px solid #9f9f9f;");
    e.target.nextElementSibling.classList.add("hide");
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
    e.target.setAttribute("style", "border-color:red;");
    e.target.nextElementSibling.classList.remove("hide");
    e.target.nextElementSibling.innerHTML = "מייל לא תקין";
    e.target.previousElementSibling.classList.add("eror");
    return false;
  }
  e.target.setAttribute("style", "border: 1px solid #9f9f9f;");
  e.target.nextElementSibling.classList.add("hide");
}
function validateTel(e) {
  const re = /^\d{10}$/;
  if (!re.test(e.target.value)) {
    e.target.setAttribute("style", "border-color:red;");
    e.target.nextElementSibling.classList.remove("hide");
    e.target.previousElementSibling.classList.add("eror");

    return false;
  }
  e.target.setAttribute("style", "border: 1px solid #9f9f9f;");
  e.target.nextElementSibling.classList.add("hide");
}
