// Shader and geometry follow the reference particle effect. Simplex noise by Ashima Arts.
const cloudVertexShader =
  "\n                    uniform float time;\n                    uniform float noiseAmp;\n                    uniform float noiseFreq;\n                    uniform float particleSize;\n                    varying vec2 vUv;\n                    varying vec3 vPosition;\n                    \n                    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\n                    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\n                    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }\n                    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\n                    float snoise(vec3 v) { \n                        const vec2 C = vec2(1.0/6.0, 1.0/3.0);\n                        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\n                        vec3 i = floor(v + dot(v, C.yyy));\n                        vec3 x0 = v - i + dot(i, C.xxx);\n                        vec3 g = step(x0.yzx, x0.xyz);\n                        vec3 l = 1.0 - g;\n                        vec3 i1 = min(g.xyz, l.zxy);\n                        vec3 i2 = max(g.xyz, l.zxy);\n                        vec3 x1 = x0 - i1 + C.xxx;\n                        vec3 x2 = x0 - i2 + C.yyy;\n                        vec3 x3 = x0 - D.yyy;\n                        i = mod289(i);\n                        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));\n                        float n_ = 0.142857142857;\n                        vec3 ns = n_ * D.wyz - D.xzx;\n                        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\n                        vec4 x_ = floor(j * ns.z);\n                        vec4 y_ = floor(j - 7.0 * x_);\n                        vec4 x = x_ * ns.x + ns.yyyy;\n                        vec4 y = y_ * ns.x + ns.yyyy;\n                        vec4 h = 1.0 - abs(x) - abs(y);\n                        vec4 b0 = vec4(x.xy, y.xy);\n                        vec4 b1 = vec4(x.zw, y.zw);\n                        vec4 s0 = floor(b0) * 2.0 + 1.0;\n                        vec4 s1 = floor(b1) * 2.0 + 1.0;\n                        vec4 sh = -step(h, vec4(0.0));\n                        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;\n                        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;\n                        vec3 p0 = vec3(a0.xy, h.x);\n                        vec3 p1 = vec3(a0.zw, h.y);\n                        vec3 p2 = vec3(a1.xy, h.z);\n                        vec3 p3 = vec3(a1.zw, h.w);\n                        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));\n                        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;\n                        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n                        m = m * m;\n                        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));\n                    }\n\n                    void main() {\n                        vUv = uv;\n                        vec3 pos = position;\n                        vec3 noisePos = vec3(pos.x * noiseFreq + time, pos.y * noiseFreq + time, pos.z * noiseFreq);\n                        float displacement = snoise(noisePos) * noiseAmp;\n                        pos += normal * displacement;\n                        vPosition = pos;\n                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n                        gl_PointSize = particleSize + (displacement * 5.0);\n                    }\n                ";
const cloudFragmentShader =
  "\n                    uniform vec3 color1;\n                    uniform vec3 color2;\n                    varying vec3 vPosition;\n                    \n                    void main() {\n                        vec2 xy = gl_PointCoord.xy - vec2(0.5);\n                        float ll = length(xy);\n                        if(ll > 0.5) discard;\n                        \n                        float mixRatio = (vPosition.y + 1.5) / 3.0;\n                        vec3 finalColor = mix(color1, color2, mixRatio);\n                        \n                        float alpha = smoothstep(0.5, 0.1, ll) * 0.8;\n                        gl_FragColor = vec4(finalColor, alpha);\n                    }\n                ";
function initPortfolioVisuals(motion) {
  const canvas = document.querySelector('[data-shape="cloud"]');
  const THREE = window.THREE;
  const theme = getComputedStyle(document.documentElement);
  const accentRgb = theme.getPropertyValue("--accent-rgb").trim();
  const secondaryRgb = theme.getPropertyValue("--secondary-rgb").trim();
  // Additive blending needs dark source colors to produce the palette's glow.
  const particleColor = (rgb) =>
    new THREE.Color(
      `rgb(${rgb
        .split(",")
        .map((value) => Math.round(Number(value) * 0.15))
        .join(",")})`,
    );
  let visible = false;
  new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
    },
    { rootMargin: "100px" },
  ).observe(canvas);
  if (THREE) {
    try {
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 5.5;
      const geometry = new THREE.IcosahedronGeometry(1.5, 24);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: particleColor(accentRgb) },
          color2: { value: particleColor(secondaryRgb) },
          noiseAmp: { value: 0.8 },
          noiseFreq: { value: 1.4 },
          particleSize: {
            value: innerWidth >= 810 && innerWidth < 1440 ? 2 : 0.5,
          },
        },
        vertexShader: cloudVertexShader,
        fragmentShader: cloudFragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      function resize() {
        const w = canvas.clientWidth,
          h = canvas.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        material.uniforms.particleSize.value =
          innerWidth >= 810 && innerWidth < 1440 ? 2 : 0.5;
        render(performance.now());
      }
      const start = performance.now();
      function render(now) {
        const elapsed = motion.matches ? 3 : (now - start) / 1000;
        material.uniforms.time.value = elapsed * 0.5;
        particles.rotation.y = elapsed * 0.1;
        particles.rotation.z = elapsed * 0.05;
        renderer.render(scene, camera);
      }
      new ResizeObserver(resize).observe(canvas);
      let last = 0;
      function animate(now) {
        if (!motion.matches && now - last > 33 && visible && !document.hidden) {
          render(now);
          last = now;
        }
        requestAnimationFrame(animate);
      }
      resize();
      requestAnimationFrame(animate);
    } catch (error) {
      console.warn("Particle renderer unavailable.", error.message);
    }
  }
  const globe = document.querySelector('[data-shape="globe"]');
  const context = globe.getContext("2d");
  let globeData = null,
    globeVisible = false,
    globeWidth = 0,
    globeHeight = 0;
  new IntersectionObserver(
    (entries) => {
      globeVisible = entries[0].isIntersecting;
    },
    { rootMargin: "100px" },
  ).observe(globe);
  fetch("assets/globe-land.json")
    .then((r) => r.json())
    .then((data) => {
      globeData = data;
      drawGlobe(0);
    });
  new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    globeWidth = width;
    globeHeight = height;
    const dpr = Math.min(devicePixelRatio, 2);
    globe.width = width * dpr;
    globe.height = height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawGlobe(0);
  }).observe(globe);
  function drawGlobe(time) {
    if (!globeData || !globeWidth) return;
    const w = globeWidth,
      h = globeHeight,
      scale = Math.min(w, h) * 0.465,
      tilt = (42 * Math.PI) / 180,
      rotation = (-15 * Math.PI) / 180 + (motion.matches ? 0 : time * 0.00004);
    context.clearRect(0, 0, w, h);
    context.lineWidth = 0.32;
    function project(lon, lat) {
      let r = (lon * Math.PI) / 180 + rotation,
        p = (lat * Math.PI) / 180,
        x = Math.cos(p) * Math.sin(r),
        y = Math.sin(p),
        z = Math.cos(p) * Math.cos(r);
      const yy = y * Math.cos(tilt) - z * Math.sin(tilt),
        zz = y * Math.sin(tilt) + z * Math.cos(tilt);
      const factor = 2.5 / (2.5 - zz);
      return {
        x: w / 2 + x * scale * factor,
        y: h / 2 - yy * scale * factor,
        z: zz,
      };
    }
    function line(points, color) {
      context.strokeStyle = color;
      context.beginPath();
      let drawing = false;
      for (const [lon, lat] of points) {
        const p = project(lon, lat);
        if (p.z < 0.15) {
          drawing = false;
          continue;
        }
        if (drawing) context.lineTo(p.x, p.y);
        else context.moveTo(p.x, p.y);
        drawing = true;
      }
      context.stroke();
    }
    for (let lat = -75; lat < 90; lat += 15)
      line(
        Array.from({ length: 181 }, (_, i) => [i * 2 - 180, lat]),
        `rgba(${secondaryRgb},.4)`,
      );
    for (let lon = -180; lon < 180; lon += 15)
      line(
        Array.from({ length: 91 }, (_, i) => [lon, i * 2 - 90]),
        `rgba(${secondaryRgb},.4)`,
      );
    globeData.polygons.forEach((p) => line(p, `rgba(${accentRgb},.7)`));
    context.fillStyle = `rgba(${accentRgb},.45)`;
    for (const [lon, lat] of globeData.dots) {
      const p = project(lon, lat);
      if (p.z < 0.15) continue;
      context.fillRect(p.x, p.y, 0.45, 0.45);
    }
  }
  let lastGlobeFrame = 0;
  function globeFrame(now) {
    if (
      !motion.matches &&
      now - lastGlobeFrame > 40 &&
      globeVisible &&
      !document.hidden
    ) {
      drawGlobe(now);
      lastGlobeFrame = now;
    }
    requestAnimationFrame(globeFrame);
  }
  requestAnimationFrame(globeFrame);
}
