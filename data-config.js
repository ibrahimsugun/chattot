// Data Configuration File
// Contains static data arrays used throughout the application

// Password Hashes - SHA-256 encrypted passwords
const PASSWORD_CONFIG = {
    // Standart Kullanıcı Şifreleri
    standard_user: [
        "026cb81be3d27ea4bfb335963902492780c8a257081eef78916ea215994fca4a",
        "3de5f893b3049abc820aab214a659052822bfe577d6d36c6aa55563a6bea1ecb",
        "e73f0a16bd4cc7c02dbfebc6f85d013897235c461e23567ef4faecf86998fb1c",
        "ae340d8a3c66e9469448eb2aab5f2ba7b33cbf92ff1c1a49b717b2553e873e9f",
        "3f9d448fdfe99ddf32d642dab25bbe3a4e3ce4e77697536a23dbd583e1ba8937",
        "ff6e67ebab05cd86d4e4bb01137c8bf5ea79c2581a05d5581bf432950cd49e01",
        "0776ecf06c3973ac615854914d3320784a0abfa2d514e8c32202b15716f122f8",
        "7de3d69c4b295f7480a37f3ed5c7ad1d97ce7e3205cdbe86a9361923ddaffe23",
        "dd06fdcd75377e3fbdcdc6eb4f2e49d28255c4ad2da2dbdadd8e86be7dae4592"
    ],
    // Özel Tema Kullanıcıları
    custom_theme_users: [
        {
            password: "96a1ddbb014d36e8f07963959cdec25b4a0bb70a149609fcbce0453ffddb45ea",
            userId: "custom_user_red",
            customTheme: "red",
            allowedThemes: ['light', 'dark', 'red']
        },
        {
            password: "3d06b7902cde70d31c08de678c47d57cef9f42545e56507f97f70d6d6a23598f",
            userId: "custom_user_blue_1",
            customTheme: "blue",
            allowedThemes: ['light', 'dark', 'blue']
        },
        {
            password: "b993d4fc84fcc45674abbcf602559e4bba08261f68b8bee92a39ce5aa693a19a",
            userId: "custom_user_blue_2",
            customTheme: "blue",
            allowedThemes: ['light', 'dark', 'blue']
        }
    ],
    // Root Admin
    root_admin: {
        password: "d72f804b4594611ede24bb42d8904f6ef12ef5ba0d0dc537c49ea00fea531350",
        userId: "root_admin",
        customTheme: "matrix",
        allowedThemes: ['light', 'dark', 'matrix', 'red', 'blue']
    }
};

// Kullanıcı isimleri
const ASSISTANT_NAMES = [
    "Ahmet Yılmaz", "Mehmet Demir", "Ayşe Kaya", "Fatma Çelik", "Ali Koç",
    "Zeynep Arslan", "Emre Polat", "Elif Aydın", "Mustafa Şahin", "Seda Yurt",
    "Canan Özdemir", "Burak Korkmaz", "Derya Yıldız", "Oğuzhan Tekin", "Cemre Akman",
    "Ege Yalçın", "Sibel Acar", "Merve Kılıç", "Serkan Uysal", "Berkay Çetin",
    "Gizem Yılmaz", "Deniz Aydın", "Hüseyin Yılmaz", "Süleyman Çetin", "Ebru Korkmaz",
    "Aylin Yıldırım", "Cem Yılmaz", "Gökhan Demirtaş", "Pınar Yılmaz", "Seda Korkmaz",
    "Oğuz Yılmaz", "Büşra Çelik", "İsmail Aydın", "Sinem Yıldız", "Tugay Koç",
    "Seda Arslan", "Murat Yılmaz", "Zeynep Demir", "Ali Yıldız", "Ece Çetin",
    "Cemre Yılmaz", "Mert Koç", "Seda Yıldırım", "Emre Çelik", "Burcu Aydın",
    "Serap Yılmaz", "Hakan Demir", "Duygu Yıldız", "Ekin Koç", "Seda Yılmaz",
    "Selin Özkan", "Onur Şimşek", "Ceren Aksoy", "Tolga Erdem", "İpek Güneş",
    "Barış Kaplan", "Aslıhan Doğan", "Yiğit Taş", "Melis Karadağ", "Umut Avcı",
    "Nazlı Şen", "Kaan Mert", "Lara Soylu", "Eren Bulut", "Defne Karaca",
    "Arda Çakır", "İrem Kurt", "Bora Ekinci", "Nisanur Tek", "Doruk Öztürk",
    "Ela Nur", "Kerem Can", "Zara Deniz", "Tuna Ak", "Alara Soyadı",
    "Efe Han", "Lina Kaya", "Rüzgar Bey", "Sude Nur", "Çağan İlhan",
    "Bade Su", "Kutay Öz", "Miraç Tan", "Nida Çiçek", "Alp Eren",
    "Ceren Su", "Egehan Toprak", "İlayda Nur", "Kubilay Şen", "Mavi Deniz",
    "Nehir Ak", "Ozan Mert", "Poyraz Can", "Rüya Yıldız", "Sarp Kaya",
    "Taylan Demir", "Umay Çetin", "Vera Yılmaz", "Yunus Emre", "Zümra Aydın"
];

// Konumlar
const LOCATIONS = [
    "İstanbul", "Ankara", "İzmir", "Bursa", "Adana", "Gaziantep", "Konya", "Antalya", "Kayseri", "Mersin",
    "Sakarya", "Kocaeli", "Eskişehir", "Trabzon", "Aydın", "Tekirdağ", "Manisa", "Samsun", "Hatay", "Diyarbakır",
    "Malatya", "Elazığ", "Kahramanmaraş", "Aksaray", "Çorum", "Zonguldak", "Bolu", "Kastamonu", "Artvin", "Rize",
    "Sinop", "Tokat", "Ordu", "Giresun", "Sivas", "Nevşehir", "Niğde", "Uşak", "Kütahya", "Bartın", "Karabük",
    "Düzce", "Bilecik", "Yalova", "Amasya", "Bayburt", "Gümüşhane", "Kırıkkale", "Kırşehir", "Çankırı", "Burdur",
    "Hong Kong", "New York", "London", "Tokyo", "Berlin", "Paris", "Madrid", "Rome", "Moscow", "Sydney"
];

// E-posta domainleri
const EMAIL_DOMAINS = [
    // Türkiye ve Türkçe Kullanıcılar İçin Yaygın
    "@gmail.com", "@hotmail.com", "@windowslive.com", "@outlook.com", "@yahoo.com",
    "@yandex.com.tr", "@yandex.com", "@mail.com", "@mynet.com", "@superposta.com",
    "@ttnet.net.tr", "@turktelekom.com.tr", "@vodafone.com.tr", "@avea.com.tr", "@turkcell.com.tr",

    // Uluslararası Popüler E-posta Servisleri
    "@icloud.com", "@me.com", "@mac.com", "@protonmail.com", "@proton.me",
    "@tutanota.com", "@zoho.com", "@zoho.eu", "@fastmail.com", "@hey.com",
    "@gmx.com", "@gmx.de", "@gmx.net", "@web.de", "@aol.com",

    // Bölgesel ve Avrupa Odaklı
    "@mail.ru", "@bk.ru", "@inbox.ru", "@list.ru", "@rambler.ru",
    "@hotmail.co.uk", "@hotmail.fr", "@hotmail.de", "@outlook.de", "@live.com",
    "@live.co.uk", "@live.de", "@orange.fr", "@wanadoo.fr", "@sfr.fr",

    // Kurumsal ve Güvenilir Alternatifler
    "@posteo.de", "@runbox.com", "@hushmail.com", "@dispostable.com", "@mailbox.org",
    "@startmail.com", "@countermail.com", "@tuta.com", "@keemail.me", "@pm.me"
];

// Yasaklı kullanıcı adları
const RESTRICTED_USERNAMES = [
    'admin', 'administrator', 'root', 'user', 'system', 'superuser', 'supervisor',
    'moderator', 'mod', 'support', 'helpdesk', 'sysadmin', 'webmaster', 'owner',
    'admin123', 'administrator123', 'root123', 'user123', 'system123'
];
