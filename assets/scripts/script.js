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

// Aqui
    const scanner = document.getElementById("scanner");

    const canvas = document.createElement("canvas");
    scanner.appendChild(canvas);

    const gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true
    });

    if (!gl) {
        console.error("Seu navegador não suporta WebGL 2.");
    } else {

        // =========================================================
        // CONFIGURAÇÃO
        // =========================================================

        const settings = {
            color1: "#a0715b",
            color2: "#d6a98f",
            color3: "#ffffff",

            speed: 0.5,
            sweepSpeed: 0.25,
            sweepWidth: 1.6,
            sweepFalloff: 6,

            scale: 1.5,
            frequency: 2,
            ripple: 0.22,
            bandDensity: 11,
            lineSharpness: 5.5,

            glow: 0.22,
            colorSpread: 0.7,
            brightness: 1.0,
            contrast: 1.15,
            softness: 1.4,
            vignette: 0.45,

            opacity: 1.0,
            scanline: true,
            grain: true,
            grainIntensity: 0.05,

            mouseInteraction: true,
            mouseRadius: 0.5,
            mouseStrength: 0.5
        };

        // =========================================================
        // CONVERTER HEX -> RGB
        // =========================================================

        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            if (!result) {
                return [1, 1, 1];
            }

            return [
                parseInt(result[1], 16) / 255,
                parseInt(result[2], 16) / 255,
                parseInt(result[3], 16) / 255
            ];
        }

        const color1 = hexToRgb(settings.color1);
        const color2 = hexToRgb(settings.color2);
        const color3 = hexToRgb(settings.color3);

        // =========================================================
        // VERTEX SHADER
        // =========================================================

        const vertexShaderSource = `#version 300 es

        in vec2 position;

        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

        // =========================================================
        // FRAGMENT SHADER
        // =========================================================

        const fragmentShaderSource = `#version 300 es

        precision highp float;

        uniform vec2 iResolution;
        uniform float iTime;

        uniform float uSpeed;
        uniform float uSweepSpeed;
        uniform float uSweepWidth;
        uniform float uSweepFalloff;

        uniform float uScale;
        uniform float uFrequency;
        uniform float uRipple;
        uniform float uBandDensity;
        uniform float uLineSharpness;

        uniform float uGlow;
        uniform float uColorSpread;
        uniform float uBrightness;
        uniform float uContrast;
        uniform float uSoftness;
        uniform float uVignette;

        uniform float uOpacity;

        uniform float uScanline;
        uniform float uGrain;
        uniform float uGrainIntensity;

        uniform vec2 uMouse;
        uniform float uMouseEnabled;
        uniform float uMouseRadius;
        uniform float uMouseStrength;
        uniform float uMouseActive;

        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;

        out vec4 fragColor;

        const float TAU = 6.2831853;

        float signalField(vec2 p, float t) {

            float w = sin(p.x * 1.3 + t * 0.7);

            w += sin(p.y * 1.7 - t * 0.52) * 0.8;

            w += sin((p.x + p.y) * 0.9 + t * 0.91) * 0.6;

            w += sin((p.x - p.y) * 1.53 - t * 0.63) * 0.42;

            return w * 0.35;
        }

        vec3 palette(float f) {

            f = clamp(f, 0.0, 1.0);

            f = pow(f, uContrast);

            vec3 c = mix(
                uColor1,
                uColor2,
                smoothstep(0.08, 0.6, f)
            );

            return mix(
                c,
                uColor3,
                smoothstep(0.68, 1.0, f)
            );
        }

        float scanBand(
            float x,
            float aa,
            float sharp
        ) {

            float v = mix(
                0.5,
                0.5 + 0.5 * cos(x * TAU),
                aa
            );

            return pow(v, sharp);
        }

        void main() {

            float aspect =
                iResolution.x / iResolution.y;

            vec2 uv0 =
                (gl_FragCoord.xy * 2.0 - iResolution.xy)
                / iResolution.y;

            vec2 p =
                uv0 / max(uScale, 0.001);

            float t =
                iTime * uSpeed;

            // Mouse
            float mouseBoost = 0.0;

            if (uMouseEnabled > 0.5) {

                vec2 mUv = vec2(
                    (uMouse.x * 2.0 - 1.0) * aspect,
                    uMouse.y * 2.0 - 1.0
                );

                vec2 md =
                    uv0 - mUv;

                float r =
                    max(uMouseRadius, 0.001);

                mouseBoost =
                    exp(
                        -dot(md, md) /
                        (r * r)
                    )
                    *
                    uMouseStrength
                    *
                    uMouseActive;
            }

            // Direção vertical
            float axis = p.y;

            float sig =
                signalField(
                    p * uFrequency,
                    t
                );

            float coord =
                axis + sig * uRipple;

            float phase =
                coord /
                max(uSweepWidth, 0.05)
                -
                t * uSweepSpeed;

            float sweep =
                pow(
                    0.5 +
                    0.5 * cos(phase * TAU),
                    max(uSweepFalloff, 0.1)
                );

            float lc =
                coord * uBandDensity;

            float aa =
                1.0 /
                (
                    1.0 +
                    uSoftness *
                    fwidth(lc) *
                    3.0
                );

            aa =
                clamp(
                    aa *
                    (1.0 + mouseBoost * 0.6),
                    0.0,
                    1.0
                );

            float bodyBase =
                clamp(
                    0.5 + 0.5 * sig,
                    0.0,
                    1.0
                );

            float body =
                bodyBase *
                bodyBase *
                uGlow *
                sweep;

            float sharp =
                max(
                    uLineSharpness,
                    0.1
                );

            float split =
                uColorSpread * 0.16;

            float fr =
                clamp(
                    scanBand(
                        lc + split,
                        aa,
                        sharp
                    ) *
                    sweep +
                    body,
                    0.0,
                    1.0
                );

            float fg =
                clamp(
                    scanBand(
                        lc,
                        aa,
                        sharp
                    ) *
                    sweep +
                    body,
                    0.0,
                    1.0
                );

            float fb =
                clamp(
                    scanBand(
                        lc - split,
                        aa,
                        sharp
                    ) *
                    sweep +
                    body,
                    0.0,
                    1.0
                );

            vec3 col =
                vec3(
                    palette(fr).r,
                    palette(fg).g,
                    palette(fb).b
                );

            float inten =
                (fr + fg + fb)
                * 0.3333333
                * uBrightness;

            inten *=
                1.0 +
                mouseBoost * 0.9;

            // Scanlines
            if (uScanline > 0.5) {

                inten *=
                    1.0 -
                    0.18 *
                    (
                        0.5 +
                        0.5 *
                        cos(gl_FragCoord.y * 1.7)
                    );
            }

            // Grain
            if (uGrain > 0.5) {

                float g =
                    fract(
                        sin(
                            dot(
                                gl_FragCoord.xy,
                                vec2(
                                    12.9898,
                                    78.233
                                )
                            )
                            +
                            iTime
                        )
                        *
                        43758.5453
                    );

                inten +=
                    (g - 0.5) *
                    uGrainIntensity;
            }

            // Vinheta
            inten *=
                clamp(
                    1.0 -
                    uVignette *
                    smoothstep(
                        0.55,
                        1.65,
                        length(uv0)
                    ),
                    0.0,
                    1.0
                );

            inten =
                clamp(
                    inten,
                    0.0,
                    1.0
                );

            float alpha =
                clamp(
                    inten *
                    uOpacity,
                    0.0,
                    1.0
                );

            fragColor =
                vec4(
                    clamp(col, 0.0, 1.0)
                    * alpha,
                    alpha
                );
        }
    `;

        // =========================================================
        // COMPILAR SHADER
        // =========================================================

        function createShader(type, source) {

            const shader =
                gl.createShader(type);

            gl.shaderSource(
                shader,
                source
            );

            gl.compileShader(shader);

            if (
                !gl.getShaderParameter(
                    shader,
                    gl.COMPILE_STATUS
                )
            ) {

                console.error(
                    gl.getShaderInfoLog(shader)
                );

                gl.deleteShader(shader);

                return null;
            }

            return shader;
        }

        const vertexShader =
            createShader(
                gl.VERTEX_SHADER,
                vertexShaderSource
            );

        const fragmentShader =
            createShader(
                gl.FRAGMENT_SHADER,
                fragmentShaderSource
            );

        if (!vertexShader || !fragmentShader) {
            throw new Error(
                "Não foi possível criar os shaders."
            );
        }

        // =========================================================
        // PROGRAMA
        // =========================================================

        const program =
            gl.createProgram();

        gl.attachShader(
            program,
            vertexShader
        );

        gl.attachShader(
            program,
            fragmentShader
        );

        gl.linkProgram(program);

        if (
            !gl.getProgramParameter(
                program,
                gl.LINK_STATUS
            )
        ) {

            console.error(
                gl.getProgramInfoLog(program)
            );
        }

        gl.useProgram(program);

        // =========================================================
        // QUADRADO FULLSCREEN
        // =========================================================

        const vertices = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,

            -1, 1,
            1, -1,
            1, 1
        ]);

        const buffer =
            gl.createBuffer();

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            buffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            vertices,
            gl.STATIC_DRAW
        );

        const positionLocation =
            gl.getAttribLocation(
                program,
                "position"
            );

        gl.enableVertexAttribArray(
            positionLocation
        );

        gl.vertexAttribPointer(
            positionLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );

        // =========================================================
        // UNIFORMS
        // =========================================================

        const uniforms = {};

        const names = [
            "iResolution",
            "iTime",

            "uSpeed",
            "uSweepSpeed",
            "uSweepWidth",
            "uSweepFalloff",

            "uScale",
            "uFrequency",
            "uRipple",
            "uBandDensity",
            "uLineSharpness",

            "uGlow",
            "uColorSpread",
            "uBrightness",
            "uContrast",
            "uSoftness",
            "uVignette",

            "uOpacity",

            "uScanline",
            "uGrain",
            "uGrainIntensity",

            "uMouse",
            "uMouseEnabled",
            "uMouseRadius",
            "uMouseStrength",
            "uMouseActive",

            "uColor1",
            "uColor2",
            "uColor3"
        ];

        names.forEach(name => {
            uniforms[name] =
                gl.getUniformLocation(
                    program,
                    name
                );
        });

        // =========================================================
        // CONFIGURAR UNIFORMS
        // =========================================================

        gl.uniform1f(
            uniforms.uSpeed,
            settings.speed
        );

        gl.uniform1f(
            uniforms.uSweepSpeed,
            settings.sweepSpeed
        );

        gl.uniform1f(
            uniforms.uSweepWidth,
            settings.sweepWidth
        );

        gl.uniform1f(
            uniforms.uSweepFalloff,
            settings.sweepFalloff
        );

        gl.uniform1f(
            uniforms.uScale,
            settings.scale
        );

        gl.uniform1f(
            uniforms.uFrequency,
            settings.frequency
        );

        gl.uniform1f(
            uniforms.uRipple,
            settings.ripple
        );

        gl.uniform1f(
            uniforms.uBandDensity,
            settings.bandDensity
        );

        gl.uniform1f(
            uniforms.uLineSharpness,
            settings.lineSharpness
        );

        gl.uniform1f(
            uniforms.uGlow,
            settings.glow
        );

        gl.uniform1f(
            uniforms.uColorSpread,
            settings.colorSpread
        );

        gl.uniform1f(
            uniforms.uBrightness,
            settings.brightness
        );

        gl.uniform1f(
            uniforms.uContrast,
            settings.contrast
        );

        gl.uniform1f(
            uniforms.uSoftness,
            settings.softness
        );

        gl.uniform1f(
            uniforms.uVignette,
            settings.vignette
        );

        gl.uniform1f(
            uniforms.uOpacity,
            settings.opacity
        );

        gl.uniform1f(
            uniforms.uScanline,
            settings.scanline ? 1 : 0
        );

        gl.uniform1f(
            uniforms.uGrain,
            settings.grain ? 1 : 0
        );

        gl.uniform1f(
            uniforms.uGrainIntensity,
            settings.grainIntensity
        );

        gl.uniform1f(
            uniforms.uMouseEnabled,
            settings.mouseInteraction ? 1 : 0
        );

        gl.uniform1f(
            uniforms.uMouseRadius,
            settings.mouseRadius
        );

        gl.uniform1f(
            uniforms.uMouseStrength,
            settings.mouseStrength
        );

        gl.uniform3fv(
            uniforms.uColor1,
            color1
        );

        gl.uniform3fv(
            uniforms.uColor2,
            color2
        );

        gl.uniform3fv(
            uniforms.uColor3,
            color3
        );

        gl.uniform2f(
            uniforms.uMouse,
            0.5,
            0.5
        );

        gl.uniform1f(
            uniforms.uMouseActive,
            0
        );

        // =========================================================
        // TAMANHO
        // =========================================================

        function resize() {

            const rect =
                scanner.getBoundingClientRect();

            const dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );

            canvas.width =
                Math.max(
                    1,
                    Math.floor(
                        rect.width * dpr
                    )
                );

            canvas.height =
                Math.max(
                    1,
                    Math.floor(
                        rect.height * dpr
                    )
                );

            canvas.style.width =
                rect.width + "px";

            canvas.style.height =
                rect.height + "px";

            gl.viewport(
                0,
                0,
                canvas.width,
                canvas.height
            );

            gl.uniform2f(
                uniforms.iResolution,
                canvas.width,
                canvas.height
            );
        }

        window.addEventListener(
            "resize",
            resize
        );

        resize();

        // =========================================================
        // MOUSE
        // =========================================================

        let mouseX = 0.5;
        let mouseY = 0.5;

        let targetMouseX = 0.5;
        let targetMouseY = 0.5;

        let mouseActive = 0;
        let targetMouseActive = 0;

        canvas.addEventListener(
            "mousemove",
            event => {

                const rect =
                    canvas.getBoundingClientRect();

                targetMouseX =
                    (event.clientX - rect.left)
                    / rect.width;

                targetMouseY =
                    1 -
                    (
                        (event.clientY - rect.top)
                        / rect.height
                    );

                targetMouseActive = 1;
            }
        );

        canvas.addEventListener(
            "mouseleave",
            () => {
                targetMouseActive = 0;
            }
        );

        // =========================================================
        // ANIMAÇÃO
        // =========================================================

        const startTime =
            performance.now();

        function render(time) {

            const elapsed =
                (time - startTime) / 1000;

            mouseX +=
                0.05 *
                (targetMouseX - mouseX);

            mouseY +=
                0.05 *
                (targetMouseY - mouseY);

            mouseActive +=
                0.05 *
                (
                    targetMouseActive -
                    mouseActive
                );

            gl.uniform1f(
                uniforms.iTime,
                elapsed
            );

            gl.uniform2f(
                uniforms.uMouse,
                mouseX,
                mouseY
            );

            gl.uniform1f(
                uniforms.uMouseActive,
                mouseActive
            );

            gl.clearColor(
                0,
                0,
                0,
                0
            );

            gl.clear(
                gl.COLOR_BUFFER_BIT
            );

            gl.drawArrays(
                gl.TRIANGLES,
                0,
                6
            );

            requestAnimationFrame(
                render
            );
        }

        requestAnimationFrame(render);
    }