# Canlı Destek Web Uygulaması

Bu proje, canlı destek hizmeti sağlayan modern ve kullanıcı dostu bir web uygulamasıdır. Kullanıcılar giriş yaparak müşteri temsilcisi gibi sohbet edebilir.

## 🔹 Proje Özellikleri

### Temel Özellikler
- Kullanıcı girişi ve doğrulama sistemi
- Canlı sohbet arayüzü
- Rastgele kullanıcı simülasyonu
- Gerçek zamanlı mesajlaşma ve bot yanıtları
- Sesli bildirim desteği
- Sohbet geçmişi saklama ve ön izleme
- Sohbet arşivleme ve sonlandırma
- Kullanıcı çevrim içi/çevrim dışı durumu yönetimi

### Gelişmiş Özellikler
- Animasyonlu hata bildirimleri (4 farklı animasyon)
- Otomatik mesaj sistemi (60 saniye yanıt yok)
- Yazıyor göstergesi
- Sohbet önizlemeleri
- Okunmamış mesaj bildirimleri
- Sesli bildirimler
- Responsive tasarım
- Gelişmiş tema değiştirme butonu (güneş/ay/matrix simgeleri ile)
- Üç farklı tema: Light, Dark, Matrix
- Buton animasyonları ve hover efektleri

### Güvenlik Özellikleri
- XSS koruması
- Input validasyonu
- Yasaklı kullanıcı adı kontrolü
- Güvenli oturum yönetimi

## 📁 Dosya Yapısı ve Açıklamalar

### 📌 index.html
- Web uygulamasının ana HTML yapısı
- Responsive tasarım için meta etiketleri
- SEO optimizasyonları
- PWA desteği için meta etiketleri
- FontAwesome ikonları ve CSS bağlantıları

### 📌 script.js
- Modüler JavaScript yapısı
- Kullanıcı girişi ve doğrulama
- SessionStorage veri yönetimi
- Bot yanıtları ve yazıyor göstergesi
- Sohbet arşivleme ve silme işlemleri
- Hata yönetimi ve bildirimler

### 📌 style.css
- Modern ve responsive tasarım
- CSS3 animasyonları
- Flexbox ve Grid kullanımı
- Mobil uyumluluk
- Dark/Light tema desteği
- Özelleştirilebilir renk şeması

### 📌 test.html
- Kapsamlı test senaryoları
- Görsel test sonuçları
- Adım adım test izleme
- İlerleme çubuğu
- Detaylı hata raporlama

### 📌 notification.mp3
- Yeni mesaj bildirim sesi

## 💻 Kurulum ve Kullanım

1. Proje dosyalarını indirin
2. 'index.html' dosyasını bir tarayıcıda açın
3. Kullanıcı adı ve şifre ile giriş yapın (Varsayılan şifre: 123.xx)
4. Sohbet başlatın ve bot yanıtlarını görün
5. Sohbeti arşivleyin veya sonlandırın

## 🔧 Test Etme

1. test.html dosyasını tarayıcıda açın
2. "Tüm Testleri Çalıştır" butonuna tıklayın
3. Test sonuçlarını ve görsel raporları inceleyin
4. Her test adımını detaylı olarak görün
5. Başarılı/başarısız testleri analiz edin

## 📌 Teknik Detaylar

### Kullanılan Teknolojiler
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- SessionStorage
- Web Audio API

### Performans Optimizasyonları
- Lazy loading görüntüler
- Minify edilmiş kaynaklar
- Önbellek yönetimi
- Asenkron script yükleme

### Tarayıcı Desteği
- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)

### Mobil Uyumluluk
- Responsive tasarım
- Touch olayları desteği
- Mobil bildirimler
- PWA özellikleri

## 🔄 Güncellemeler

### v1.1.0
- Animasyonlu hata bildirimleri eklendi
- Test sistemi geliştirildi
- Performans iyileştirmeleri yapıldı
- Hata düzeltmeleri

### v1.0.0
- İlk sürüm yayınlandı

## 📝 Lisans
MIT License - 2025
