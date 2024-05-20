# Three.js ile Etkileşimli 3D Portföy Web Sitesi Oluşturma

- Web geliştirme portföyünüzü kalabalıktan sıyrılmak için kişiselleştirilmiş bir 3D avatar ekleyerek ön plana çıkarmak mı istiyorsunuz?
- Bu rehberde, Three.js kullanarak portföyünüze etkileşimli bir 3D avatar eklemenin adımlarını göstereceğiz.
- Bu rehberin sonunda şunları öğreneceksiniz:

1. Avatarify kullanarak kişiselleştirilmiş 3D bir avatar oluşturma.
2. Mixamo ve Blender kullanarak avatarınıza animasyonlar eklemek.
3. Three.js kullanarak avatarı portföy web sitenize yerleştirme.
4. Avatarı etkileşimli hale getirerek kullanıcının tıklamalarına yanıt verme.

Hadi adım adım sürece bir göz atalım!

## Adım 1: Avatarify ile 3D Avatar Oluşturma

Avatarify, kişiselleştirilmiş 3D avatarları kolayca oluşturmanıza olanak tanıyan bir araçtır. Avatarınızı oluşturmak için şu adımları izleyin:

1. Avatarify'da bir hesap oluşturun ve üç selfie yükleyerek avatarınızı oluşturma talimatlarını izleyin.
2. Avatarınızı tercihlerinize göre özelleştirin.
3. Avatar modelinizi GLB biçiminde dışa aktarın.

Avatar modeliniz hazır olduğunda, bir sonraki adıma geçin.

## Adım 2: Mixamo ve Blender ile Animasyon Ekleme

Mixamo, avatarınıza uygulayabileceğiniz yüksek kaliteli animasyonların bir kütüphanesini sağlar. Animasyonları eklemek için şu adımları izleyin:

1. Avatar modelinizi Mixamo'ya yükleyin.
2. Avatarınız için animasyonları seçin ve özelleştirin, örneğin el sallama veya tökezleme.
3. Animasyonları uygun şekilde ayarlayarak FBX biçiminde indirin.

Daha sonra, avatar modelini ve animasyonları Blender kullanarak birleştireceğiz:

1. Avatar modelinizi ve animasyonları Blender'a içe aktarın.
2. Animasyonları avatar modeline uygulayın ve NLA şeritleri olarak kaydedin.
3. Birleştirilmiş modeli animasyonlarla birlikte GLB biçiminde dışa aktarın.

Avatar modeliniz ve animasyonlarınız hazır olduğunda, bir sonraki adıma geçelim.

## Adım 3: Portföy Web Sitesini Ayarlama

3D avatarınızı portföy web sitenize entegre etmeden önce, temel bir yapıya sahip olduğunuzdan emin olun. İşte basit bir örnek:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Etkileşimli 3D Portföy</title>
    <!-- Three.js bağımlılıklarını ekleyin -->
    <script type="module">
        import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
        // Gerekli diğer bağımlılıkları ekleyin
    </script>
    <!-- Özel JavaScript dosyanızı ekleyin -->
    <script type="module" src="avatar.js"></script>
</head>
<body>
    <!-- 3D sahne için konteyner -->
    <div id="avatar-container"></div>
    <!-- Yükleme göstergesi -->
    <div id="avatar-loading">Yükleniyor...</div>
    <!-- Portföy içeriğiniz -->
    <header>
        <h1>Merhaba! Ben Dan Greenheck</h1>
        <p>Ben interaktif 3D web deneyimleri oluşturma konusunda tutkulu bir web geliştiriciyim.</p>
    </header>
    <!-- Gerekirse daha fazla bölüm ve içerik ekleyin -->
</body>
</html>
```

## Adım 4: Three.js ile 3D Avatarınızı Entegre Etme

Şimdi, Three.js kullanarak avatarınızı yükleyip görüntülemek için JavaScript kodunu yazalım. Bir `avatar.js` dosyası oluşturun ve aşağıdaki kodu ekleyin:

```javascript
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

// 3D modeli yükleme fonksiyonu
function loadModel() {
    const loader = new GLTFLoader();
    loader.load(
        'path/to/avatar.glb',
        // Model yüklendiğinde
        function (gltf) {
            setupScene(gltf.scene);
            document.getElementById('avatar-loading').style.display = 'none';
        },
        // İlerleme durumunda
        function (xhr) {
            const loadingPercentage = (xhr.loaded / xhr.total) * 100;
            document.getElementById('avatar-loading').innerText = `Yükleniyor... ${Math.round(loadingPercentage)}%`;
            console.log(`${Math.round(loadingPercentage)}% yüklendi`);
        },
        // Hata durumunda
        function (error) {
            console.error('Model yüklenirken hata oluştu:', error);
        }
    );
}

// 3D sahneyi ayarlama fonksiyonu
function setupScene(model) {
    const container = document.getElementById('avatar-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // WebGL renderer oluşturma
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);



    // Kamera oluşturma
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Sahne oluşturma
    const scene = new THREE.Scene();
    scene.add(model);

    // Işıkları ekleyin
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    // Gerekirse daha fazla ışık ekleyin

    // Orbit kontrolleri oluşturma
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minDistance = 3;
    controls.maxPolarAngle = 1.4;
    controls.target.set(0, 0, 0);
    controls.update();

    // Render döngüsü
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

// Pencere yüklendiğinde modeli yükleyin
window.onload = function () {
    loadModel();
};
```
