(function () {
  if (typeof window === "undefined" || typeof window.THREE === "undefined") {
    return;
  }

  var THREE = window.THREE;

  var vertexShader = [
    "uniform float time;",
    "varying vec2 vUv;",
    "varying vec3 vPosition;",
    "void main() {",
    "  vUv = uv;",
    "  vPosition = position;",
    "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
    "}",
  ].join("\n");

  var fragmentShader = [
    "uniform sampler2D uDataTexture;",
    "uniform sampler2D uTexture;",
    "uniform vec4 resolution;",
    "varying vec2 vUv;",
    "void main() {",
    "  vec2 uv = vUv;",
    "  vec4 offset = texture2D(uDataTexture, vUv);",
    "  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);",
    "}",
  ].join("\n");

  function toNumber(value, fallback) {
    var num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  }

  function GridDistortion(container) {
    this.container = container;
    this.grid = Math.max(2, Math.round(toNumber(container.dataset.grid, 15)));
    this.mouse = Math.max(0.01, toNumber(container.dataset.mouse, 0.1));
    this.strength = Math.max(0, toNumber(container.dataset.strength, 0.15));
    this.relaxation = Math.min(0.999, Math.max(0.5, toNumber(container.dataset.relaxation, 0.9)));
    this.imageSrc = container.dataset.imageSrc || "";
    this.mouseState = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };
    this.animationId = null;
    this.resizeObserver = null;
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.plane = null;
    this.uniforms = null;
    this.geometry = null;
    this.material = null;
    this.dataTexture = null;
    this.texture = null;
    this.destroyed = false;

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.animate = this.animate.bind(this);
  }

  GridDistortion.prototype.init = function () {
    if (!this.imageSrc) return;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.domElement.className = "grid-distortion-canvas";

    this.container.innerHTML = "";
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    this.camera.position.z = 2;

    this.uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null },
      uDataTexture: { value: null },
    };

    var size = this.grid;
    var data = new Float32Array(4 * size * size);
    for (var i = 0; i < size * size; i += 1) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 1;
    }

    this.dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    this.dataTexture.needsUpdate = true;
    this.uniforms.uDataTexture.value = this.dataTexture;

    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);

    var loader = new THREE.TextureLoader();
    var self = this;
    loader.load(
      this.imageSrc,
      function (texture) {
        if (self.destroyed) {
          texture.dispose();
          return;
        }
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        self.texture = texture;
        self.uniforms.uTexture.value = texture;
        self.handleResize();
      },
      undefined,
      function () {
        self.destroy();
      }
    );

    this.container.addEventListener("pointermove", this.handlePointerMove);
    this.container.addEventListener("pointerleave", this.handlePointerLeave);

    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener("resize", this.handleResize);
    }

    this.handleResize();
    this.animate();
  };

  GridDistortion.prototype.handlePointerMove = function (event) {
    var rect = this.container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var x = (event.clientX - rect.left) / rect.width;
    var y = 1 - (event.clientY - rect.top) / rect.height;
    this.mouseState.vX = x - this.mouseState.prevX;
    this.mouseState.vY = y - this.mouseState.prevY;
    this.mouseState.x = x;
    this.mouseState.y = y;
    this.mouseState.prevX = x;
    this.mouseState.prevY = y;
  };

  GridDistortion.prototype.handlePointerLeave = function () {
    this.mouseState.x = 0;
    this.mouseState.y = 0;
    this.mouseState.prevX = 0;
    this.mouseState.prevY = 0;
    this.mouseState.vX = 0;
    this.mouseState.vY = 0;
  };

  GridDistortion.prototype.handleResize = function () {
    if (!this.renderer || !this.camera || !this.plane) return;
    var rect = this.container.getBoundingClientRect();
    var width = rect.width;
    var height = rect.height;
    if (width === 0 || height === 0) return;

    var aspect = width / height;
    this.renderer.setSize(width, height, false);
    this.plane.scale.set(aspect, 1, 1);

    var frustumHeight = 1;
    var frustumWidth = frustumHeight * aspect;
    this.camera.left = -frustumWidth / 2;
    this.camera.right = frustumWidth / 2;
    this.camera.top = frustumHeight / 2;
    this.camera.bottom = -frustumHeight / 2;
    this.camera.updateProjectionMatrix();
    this.uniforms.resolution.value.set(width, height, 1, 1);
  };

  GridDistortion.prototype.animate = function () {
    var self = this;
    this.animationId = window.requestAnimationFrame(function () {
      self.animate();
    });

    if (!this.renderer || !this.scene || !this.camera || !this.dataTexture || !this.uniforms.uTexture.value) {
      return;
    }

    this.uniforms.time.value += 0.05;
    var size = this.grid;
    var data = this.dataTexture.image.data;
    var i;

    for (i = 0; i < size * size; i += 1) {
      data[i * 4] *= this.relaxation;
      data[i * 4 + 1] *= this.relaxation;
    }

    var gridMouseX = size * this.mouseState.x;
    var gridMouseY = size * this.mouseState.y;
    var maxDist = size * this.mouse;

    for (var y = 0; y < size; y += 1) {
      for (var x = 0; x < size; x += 1) {
        var dx = gridMouseX - x;
        var dy = gridMouseY - y;
        var distSq = dx * dx + dy * dy;
        var minDistSq = 0.0001;
        if (distSq < maxDist * maxDist) {
          var index = 4 * (x + size * y);
          var power = Math.min(maxDist / Math.sqrt(Math.max(distSq, minDistSq)), 10);
          data[index] += this.strength * 100 * this.mouseState.vX * power;
          data[index + 1] -= this.strength * 100 * this.mouseState.vY * power;
        }
      }
    }

    this.dataTexture.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  };

  GridDistortion.prototype.destroy = function () {
    this.destroyed = true;
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    } else {
      window.removeEventListener("resize", this.handleResize);
    }

    this.container.removeEventListener("pointermove", this.handlePointerMove);
    this.container.removeEventListener("pointerleave", this.handlePointerLeave);

    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
    if (this.dataTexture) this.dataTexture.dispose();
    if (this.texture) this.texture.dispose();
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.forceContextLoss) this.renderer.forceContextLoss();
      if (this.renderer.domElement && this.container.contains(this.renderer.domElement)) {
        this.container.removeChild(this.renderer.domElement);
      }
    }
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.plane = null;
  };

  function initGridDistortions() {
    var nodes = document.querySelectorAll("[data-grid-distortion]");
    if (!nodes.length) return;
    for (var i = 0; i < nodes.length; i += 1) {
      var instance = new GridDistortion(nodes[i]);
      instance.init();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGridDistortions);
  } else {
    initGridDistortions();
  }
})();
