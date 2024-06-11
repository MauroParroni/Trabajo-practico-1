let formularioLogin = document.getElementById("formulario-login");
let userdata;

fetch('./user.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    return response.json();
  })
  .then(data => {
    userdata = data
  })
  .catch(error => {
    console.error('Error al recuperar el JSON:', error);
  });
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("usuarioLogueado")) {
    let botonLogin = document.querySelector(".btn.btn-info");
    botonLogin.style.display = "none";
    let navItemDropdown = document.createElement("li");
    navItemDropdown.classList.add("nav-item", "dropdown");
    navItemDropdown.style.listStyleType = "none";
    let dropdownToggle = document.createElement("a");
    dropdownToggle.classList.add(
      "nav-link",
      "dropdown-toggle",
      "d-flex",
      "align-items-center"
    );
    dropdownToggle.href = "#";
    dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownToggle.innerHTML = `
          <img src="https://pbs.twimg.com/media/EVxyl8rXsAYIjQn.jpg" class="rounded-circle" height="35" alt="Avatar" loading="lazy" />
      `;
      let dropdownMenu = document.createElement("ul");
      dropdownMenu.classList.add("dropdown-menu", "dropdown-menu-end");
      dropdownMenu.setAttribute("aria-labelledby", "navbarDropdownMenuLink");
      dropdownMenu.innerHTML = `
          <li>
              <a class="dropdown-item" href="#">Mi Perfil</a>
          </li>
          <li>
              <a class="dropdown-item" href="#">Configuración</a>
          </li>
          <li>
              <a class="dropdown-item btn-cerrar" href="#">Cerrar Sesión</a>
          </li>
      `;
      let cerrarSesionBtn = dropdownMenu.querySelector('.btn-cerrar');
        cerrarSesionBtn?.addEventListener("click", function() {
            let validation = document.querySelector(".page")
            let validation2 = document.querySelector(".tanks")
            if(validation){
                localStorage.removeItem("usuarioLogueado");
                location.reload();
            }
            if (validation2){
                localStorage.removeItem("usuarioLogueado");
                location.reload();
            }
          localStorage.removeItem("usuarioLogueado");
          location.reload();
      });
    navItemDropdown.appendChild(dropdownToggle);
    navItemDropdown.appendChild(dropdownMenu);
    let navbarNav = document.querySelector("#formLogin");
    navbarNav.appendChild(navItemDropdown);
    new bootstrap.Dropdown(dropdownToggle);
  }
});

formularioLogin?.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("exampleInputEmail1").value;
  let contra = document.getElementById("exampleInputPassword1").value;
  let botonInicioSesion = document.querySelector(
    "#formulario-login button[type='submit']"
  );
  botonInicioSesion.addEventListener("click", function () {
    let modalInicioSesion = document.querySelector("#loginModal");
    let modalBootstrap = new bootstrap.Modal(modalInicioSesion);
    modalBootstrap.hide();
  });

  if (email === userdata.user && contra === userdata.password) {
    localStorage.setItem("usuarioLogueado", userdata);
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario Logueado",
        showConfirmButton: true,
        timer: 1500
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "./index.html";
        }
    });
    if (localStorage.getItem("usuarioLogueado")) {
      let botonLogin = document.querySelector(".btn.btn-info");
      botonLogin.style.display = "none";
    }
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Usuario Incorrecto",
      showConfirmButton: true,
      timer: 1500,
    });
  }
});

