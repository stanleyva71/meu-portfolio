// Tema escuro
const temaEscuro = () => {
  document.body.setAttribute('data-bs-theme', 'dark');
  atualizarLogoGithub();

  document.querySelector('#dl-icon-mobile')
    .setAttribute('class', 'bi bi-sun-fill fs-3');

  document.querySelector('#dl-icon-desktop')
    .setAttribute('class', 'bi bi-sun-fill fs-3');
}

// Tema claro
const temaClaro = () => {
  document.body.setAttribute('data-bs-theme', 'light');
  atualizarLogoGithub();

  document.querySelector('#dl-icon-mobile')
    .setAttribute('class', 'bi bi-moon-fill fs-3');

  document.querySelector('#dl-icon-desktop')
    .setAttribute('class', 'bi bi-moon-fill fs-3');
}

// Trocar tema
const trocarTema = () => {
  document.body.getAttribute('data-bs-theme') === "light"
    ? temaEscuro()
    : temaClaro();
}

const atualizarLogoGithub = () => {
  const logo = document.getElementById('github-logo');

  if (document.body.getAttribute('data-bs-theme') === 'dark') {
    logo.src = './assets/img/github-logo.png';
  } else {
    logo.src = './assets/img/github-logo2.png';
  }
}


// Máquina de escrever
const typeWriter = () => {
  const text = "Stanley Vale";
  const element = document.getElementById('typed-name');
  let index = 0;

  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 200);
    }
  };

  setTimeout(type, 1500);
};
document.addEventListener('DOMContentLoaded', typeWriter);


// Funcionalidade de alternância de habilidades
const skillsToggleBox = document.querySelector('[data-toggle-box]');
const toggleBtns = document.querySelectorAll('[data-toggle-btn]');
const skillsBox = document.querySelector('[data-skills-box]');

toggleBtns.forEach((btn, index) => {

  btn.addEventListener('click', () => {

    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // botão Ferramentas
    if (index === 1) {
      skillsToggleBox.classList.add('active');
      skillsBox.classList.add('active');

    }

    // botão Habilidades
    else {
      skillsToggleBox.classList.remove('active');
      skillsBox.classList.remove('active');

    }
  });
});


// Funcionalidade de mostrar mais projetos
document.addEventListener('DOMContentLoaded', () => {
  const btnVerMais = document.querySelector('.see-more button');
  const projetosEscondidos = document.querySelectorAll('.project-box.hidden');

  btnVerMais.addEventListener('click', () => {
    projetosEscondidos.forEach(projeto => {
      // Adiciona a classe que mostra o elemento
      projeto.classList.toggle('show');
    });

    // Opcional: Mudar o texto do botão
    if (btnVerMais.textContent === 'Ver mais') {
      btnVerMais.textContent = 'Ver menos';
    } else {
      btnVerMais.textContent = 'Ver mais';
    }
  });
});

// Fechar o menu em dispositivos móveis ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
  link.addEventListener('click', () => {

    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

    if (bsCollapse) {
      bsCollapse.hide();
    }

  });
});


// Animação de revelação ao rolar a página
const reveals = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  }
);
reveals.forEach((el) => observer.observe(el));


// Envio do Formulário com EMAILJS
const form = document.getElementById("contact-form");

if (form) {
  const button = form.querySelector("button");
  const modalElement = document.getElementById("messageModal");
  const modal = modalElement ? new bootstrap.Modal(modalElement) : null;
  const modalIcon = document.getElementById("modal-icon");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // VALIDAÇÃO HTML5
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    form.classList.add("was-validated");

    // LOADING BOTÃO
    button.disabled = true;
    button.innerHTML = `
      <span class="spinner-border spinner-border-sm"></span>
      Enviando...
    `;

    // ENVIO EMAILJS
    emailjs.sendForm(
      "service_qein97j",
      "template_076jg2r",
      form
    )

      // SUCESSO
      .then(() => {

        if (modal && modalIcon && modalTitle && modalMessage) {
          modalIcon.className =
            "bi bi-check-circle-fill text-success";
          modalTitle.innerText = "Sucesso!";
          modalMessage.innerText =
            "Sua mensagem foi enviada com sucesso.";
          modal.show();
        }

        form.reset();
        form.classList.remove("was-validated");

        button.disabled = false;
        button.innerHTML = `
        Enviar mensagem
        <i class="bi bi-send"></i>
      `;
      })

      // ERRO
      .catch((error) => {
        console.log(error);

        if (modal && modalIcon && modalTitle && modalMessage) {
          modalIcon.className =
            "bi bi-x-circle-fill text-danger";

          modalTitle.innerText = "Erro!";
          modalMessage.innerText =
            "Ocorreu um erro ao enviar sua mensagem.";
          modal.show();
        }

        button.disabled = false;
        button.innerHTML = `
        Enviar mensagem
        <i class="bi bi-send"></i>
      `;
      });
  });
}

// Faz o scroll indicator sumir após 5 segundos
setTimeout(() => {
  document.querySelector('.scroll-indicator')
    .classList.add('hide');
}, 2200);