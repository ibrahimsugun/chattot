// Data Configuration File
// Contains static data arrays used throughout the application

/*
 * THEME PASSWORD REFERENCE (for testing purposes)
 * ================================================
 * 
 * Dark Themes (test-1 to test-9):
 * 1. Purple Theme - Password: "test-1"
 * 2. Ocean Theme - Password: "test-2"
 * 3. Sunset Theme - Password: "test-3"
 * 4. Forest Theme - Password: "test-4"
 * 5. Cyberpunk Theme - Password: "test-5"
 * 6. Amber Theme - Password: "test-6"
 * 7. Lavender Theme - Password: "test-7"
 * 8. Mint Theme - Password: "test-8"
 * 9. Rose Theme - Password: "test-9"
 * 
 * Light Themes (test-11 to test-20):
 * 10. Peach Theme - Password: "test-11"
 * 11. Sky Theme - Password: "test-12"
 * 12. Coral Theme - Password: "test-13"
 * 13. Lime Theme - Password: "test-14"
 * 14. Teal Theme - Password: "test-15"
 * 15. Indigo Theme - Password: "test-16"
 * 16. Gold Theme - Password: "test-17"
 * 17. Orchid Theme - Password: "test-18"
 * 18. Sand Theme - Password: "test-19"
 * 
 * Existing Themes:
 * - Red Theme: (existing hash)
 * - Blue Theme 1: (existing hash)
 * - Blue Theme 2: (existing hash)
 * - Root Admin (Matrix): (existing hash) - Access to ALL themes
 * 
 * Note: All passwords are SHA-256 hashed for security
 */

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
        },
        {
            password: "ed1e1dcf971990c1b89676ae785436106f7548b1ae41d174ca9d3bfb9661a477", // test-1
            userId: "custom_user_purple",
            customTheme: "purple",
            allowedThemes: ['light', 'dark', 'purple']
        },
        {
            password: "e063cdf36f817a24e97839b0799c023644dd1c31c668bda6481869027035a655", // test-2
            userId: "custom_user_ocean",
            customTheme: "ocean",
            allowedThemes: ['light', 'dark', 'ocean']
        },
        {
            password: "2a8c9f051e91be1d0f801980a9e87f8495582668d966b633bfde5d8a93d0e049", // test-3
            userId: "custom_user_sunset",
            customTheme: "sunset",
            allowedThemes: ['light', 'dark', 'sunset']
        },
        {
            password: "a9ebf3ad7308478fec2f0240cab4605bcd5876b3361d275d5f4cedf5770fdb12", // test-4
            userId: "custom_user_forest",
            customTheme: "forest",
            allowedThemes: ['light', 'dark', 'forest']
        },
        {
            password: "5f71b27f826ff16d1d955451ad0e2fdfc00390c9c5678da32d3ffa26ed2064c8", // test-5
            userId: "custom_user_cyberpunk",
            customTheme: "cyberpunk",
            allowedThemes: ['light', 'dark', 'cyberpunk']
        },
        {
            password: "e0b714fb3f30724489657a375fd4913a874da4f6a01810ccb6b88743142a4d73", // test-6
            userId: "custom_user_amber",
            customTheme: "amber",
            allowedThemes: ['light', 'dark', 'amber']
        },
        {
            password: "9c71311c5fc4e8453f5dd0d4dd41773325ea5ab5e188a7341cacdb44a7c3df4a", // test-7
            userId: "custom_user_lavender",
            customTheme: "lavender",
            allowedThemes: ['light', 'dark', 'lavender']
        },
        {
            password: "d96164f03222019b42723ed685bb20eed3a5014f78bb4fc1e0b7be71705a251a", // test-8
            userId: "custom_user_mint",
            customTheme: "mint",
            allowedThemes: ['light', 'dark', 'mint']
        },
        {
            password: "770990271fb786bacd994e80c59ebd09c80092256cb8620ec7fc8096b7d72595", // test-9
            userId: "custom_user_rose",
            customTheme: "rose",
            allowedThemes: ['light', 'dark', 'rose']
        },
        {
            password: "aba8c8f7638d612014e04aafbf84c8b3952aed3864669ffdefeb5c22d6e339ec", // test-11
            userId: "custom_user_peach",
            customTheme: "peach",
            allowedThemes: ['light', 'dark', 'peach']
        },
        {
            password: "dd024ed1472c827cecdd1e4491a4ea1ecae86b22c84e5720f80f13426a8c0a98", // test-12
            userId: "custom_user_sky",
            customTheme: "sky",
            allowedThemes: ['light', 'dark', 'sky']
        },
        {
            password: "5de299b8beb678665914339d2814b42298c2c7e1268724ab56518d5e03d600b2", // test-13
            userId: "custom_user_coral",
            customTheme: "coral",
            allowedThemes: ['light', 'dark', 'coral']
        },
        {
            password: "8e23e79decdb7b2265f178871a4af452bc9d6ff8222bb5b523d2244db62862c5", // test-14
            userId: "custom_user_lime",
            customTheme: "lime",
            allowedThemes: ['light', 'dark', 'lime']
        },
        {
            password: "829039d35f37dbaca97d70b80966c52f4ff18a3501eefe4beb6661a785065548", // test-15
            userId: "custom_user_teal",
            customTheme: "teal",
            allowedThemes: ['light', 'dark', 'teal']
        },
        {
            password: "7edd35efe309eca1147b20ecdcd5d1a5ffc58da05f7e240da771cb8557b97b23", // test-16
            userId: "custom_user_indigo",
            customTheme: "indigo",
            allowedThemes: ['light', 'dark', 'indigo']
        },
        {
            password: "83e35b3c3c964814ff82340f1c732f7f4f65dcc93058c48e4bcb3f883e8a2c48", // test-17
            userId: "custom_user_gold",
            customTheme: "gold",
            allowedThemes: ['light', 'dark', 'gold']
        },
        {
            password: "603db798e6426868b003a7efce3d3cfafa35d321021bebeb61f40a1e9aecdee3", // test-18
            userId: "custom_user_orchid",
            customTheme: "orchid",
            allowedThemes: ['light', 'dark', 'orchid']
        },
        {
            password: "3eda906ec4a3ad0966a13ddee1b84930da9a9485de47b5ee39a827978e128f15", // test-19
            userId: "custom_user_sand",
            customTheme: "sand",
            allowedThemes: ['light', 'dark', 'sand']
        }
    ],
    // Root Admin
    root_admin: {
        password: "d72f804b4594611ede24bb42d8904f6ef12ef5ba0d0dc537c49ea00fea531350",
        userId: "root_admin",
        customTheme: "matrix",
        allowedThemes: ['light', 'dark', 'matrix', 'red', 'blue', 'purple', 'ocean', 'sunset', 'forest', 'cyberpunk', 'amber', 'lavender', 'mint', 'rose', 'peach', 'sky', 'coral', 'lime', 'teal', 'indigo', 'gold', 'orchid', 'sand']
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
