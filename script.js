// Sabit değişkenler ve yapılandırma
const CONFIG = {
    VALID_PASSWORDS: [
        "xx.123",
        "cp.123",
        "Cp.123",
        "cp123",
        "Cp123",
        "cp-123",
        "Cp-123",
        "Egitim123",
        "Egitim.123",
        "CG123"
    ],
    TYPING_DELAY: {
        MIN: 2000,  // 2 saniye
        MAX: 8000   // 8 saniye
    },
    TYPING_DURATION: {
        MIN: 9000,  // 9 saniye
        MAX: 15000   // 15 saniye
    }
};

// Otomatik mesaj için sabitler
const AUTO_MESSAGE = {
    TIMEOUT: 60000, // 60 saniye
    MESSAGES: [
        "Orada mısınız? Biraz acelem var da.",
        "Biraz fazla beklemedik mi?",
        "Hadi birader işimiz gücümüz var"
    ]
};

// Mesaj yönetimi modülü
const MessageManager = {
    playSound() {
        const sound = document.getElementById('messageSound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.log("Ses çalma hatası:", error);
            });
        }
    },

    createMessageElement(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = message;
        return messageDiv;
    },

    updateChatBox(userId) {
        const chatBox = document.getElementById('chatBox');
        if (!chatBox) return;

        chatBox.innerHTML = '';
        
        const messages = ChatStorage.getChatMessages(userId);
        messages.forEach(msg => {
            const messageElement = this.createMessageElement(msg.text, msg.type);
            chatBox.appendChild(messageElement);
        });
        
        chatBox.scrollTop = chatBox.scrollHeight;
    }
};

// Kullanıcı arayüzü modülü
const UIManager = {
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 3 saniye sonra bildirimi kaldır
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    showModal(message, onConfirm) {
        const modal = document.getElementById('confirmModal');
        if (!modal) return;

        const modalMessage = document.getElementById('modalMessage');
        modalMessage.textContent = message;
        
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 10);

        this.setupModalListeners(modal, onConfirm);
    },

    setupModalListeners(modal, onConfirm) {
        const confirmButton = modal.querySelector('.confirm-button');
        const cancelButton = modal.querySelector('.cancel-button');
        const closeButton = modal.querySelector('.close-modal');

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.classList.add('hidden'), 300);
            this.removeModalListeners();
        };

        const handleConfirm = () => {
            onConfirm();
            closeModal();
        };

        confirmButton.addEventListener('click', handleConfirm);
        cancelButton.addEventListener('click', closeModal);
        closeButton.addEventListener('click', closeModal);

        // Listener referanslarını sakla
        this.modalListeners = { handleConfirm, closeModal };
    },

    removeModalListeners() {
        if (this.modalListeners) {
            const modal = document.getElementById('confirmModal');
            const confirmButton = modal.querySelector('.confirm-button');
            const cancelButton = modal.querySelector('.cancel-button');
            const closeButton = modal.querySelector('.close-modal');

            confirmButton.removeEventListener('click', this.modalListeners.handleConfirm);
            cancelButton.removeEventListener('click', this.modalListeners.closeModal);
            closeButton.removeEventListener('click', this.modalListeners.closeModal);
        }
    }
};

// Senaryo yönetimi modülü
const ScenarioManager = {
    scenarios: [],
    userScenarios: new Map(),
    totalScenarioCount: 0,
    usedScenarioIndexes: new Set(),

    // Senaryoları yükle ve parse et
    loadScenarios(scenariosText) {
        try {
            // Senaryoları ayır
            const scenarioBlocks = scenariosText.split('Senaryo:').filter(block => block.trim());
            this.totalScenarioCount = scenarioBlocks.length;
            console.log('Toplam senaryo sayısı:', this.totalScenarioCount);

            // Her bir senaryoyu işle
            this.scenarios = scenarioBlocks.map(block => {
                const lines = block.trim().split('\n');
                const title = 'Senaryo: ' + lines[0].trim();
                const messages = lines
                    .filter(line => line.includes('Müşteri:'))
                    .map(line => line.split('Müşteri:')[1].trim());
                return { title, messages };
            });

            // Storage'a kaydet
            sessionStorage.setItem('scenarios', JSON.stringify(this.scenarios));
            sessionStorage.setItem('totalScenarioCount', this.totalScenarioCount.toString());
            console.log('Senaryolar başarıyla yüklendi ve kaydedildi');
            return true;
        } catch (error) {
            console.error('Senaryo yükleme hatası:', error);
            return false;
        }
    },

    // Storage'dan senaryoları yükle
    loadFromStorage() {
        try {
            const storedScenarios = sessionStorage.getItem('scenarios');
            const storedCount = sessionStorage.getItem('totalScenarioCount');
            
            if (storedScenarios && storedCount) {
                this.scenarios = JSON.parse(storedScenarios);
                this.totalScenarioCount = parseInt(storedCount);
                console.log('Senaryolar storage\'dan yüklendi');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Storage\'dan yükleme hatası:', error);
            return false;
        }
    },

    // Kullanılmamış rastgele senaryo seç
    getUnusedRandomScenarioIndex() {
        if (this.usedScenarioIndexes.size >= this.totalScenarioCount) {
            this.usedScenarioIndexes.clear();
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.totalScenarioCount);
        } while (this.usedScenarioIndexes.has(randomIndex));

        this.usedScenarioIndexes.add(randomIndex);
        return randomIndex;
    },

    // Kullanıcı için senaryo seç veya var olanı getir
    getOrCreateScenario(userId) {
        if (!this.userScenarios.has(userId)) {
            // Senaryolar yüklü değilse storage'dan yükle
            if (this.scenarios.length === 0) {
                this.loadFromStorage();
            }

            // Hala senaryo yoksa hata döndür
            if (this.scenarios.length === 0) {
                console.error('Senaryo bulunamadı');
                return null;
            }

            const randomIndex = this.getUnusedRandomScenarioIndex();
            const scenario = this.scenarios[randomIndex];
            
            if (!scenario) {
                console.error('Seçilen senaryo geçersiz:', randomIndex);
                return null;
            }

            const userScenario = {
                index: randomIndex,
                title: scenario.title,
                messages: scenario.messages,
                currentLineIndex: 0
            };

            this.userScenarios.set(userId, userScenario);
            console.log(`Yeni senaryo atandı (${userId}):`, scenario.title);
            return userScenario;
        }
        return this.userScenarios.get(userId);
    },

    // Chat sebebini güncelle
    updateChatReason(userId) {
        const reasonText = document.querySelector('.reason-text');
        const scenario = this.userScenarios.get(userId);
        if (reasonText && scenario && scenario.title) {
            // "Senaryo:" kelimesini kaldır ve başlığı düzenle
            const cleanTitle = scenario.title.replace('Senaryo: ', '');
            reasonText.textContent = cleanTitle;
        }
    },

    // Sıradaki müşteri mesajını al
    getNextCustomerMessage(userId) {
        const scenario = this.userScenarios.get(userId);
        if (!scenario || !scenario.messages) return null;
        
        if (scenario.currentLineIndex < scenario.messages.length) {
            const message = scenario.messages[scenario.currentLineIndex];
            scenario.currentLineIndex++;
            return message;
        }
        return null;
    },

    // Senaryo durumunu kontrol et
    isScenarioComplete(userId) {
        const scenario = this.userScenarios.get(userId);
        if (!scenario || !scenario.messages) return true;
        return scenario.currentLineIndex >= scenario.messages.length;
    },

    // Kullanıcının senaryosunu sıfırla
    resetUserScenario(userId) {
        this.userScenarios.delete(userId);
    }
};

// Chat yönetimi modülü
const ChatManager = {
    typingTimeouts: {},
    autoMessageTimeouts: {},

    sendMessage() {
        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();
        const currentUser = document.querySelector('.visitor-name').textContent;

        if (!message) return;

        this.addUserMessage(message);
        userInput.value = '';
        
        // Müşteri yanıtını gecikmeyle gönder
        this.simulateCustomerResponse(currentUser);
    },

    simulateCustomerResponse(userId) {
        if (this.typingTimeouts[userId]) {
            clearTimeout(this.typingTimeouts[userId].initial);
            clearTimeout(this.typingTimeouts[userId].typing);
        }

        const initialDelay = Math.floor(Math.random() * 
            (CONFIG.TYPING_DELAY.MAX - CONFIG.TYPING_DELAY.MIN)) + CONFIG.TYPING_DELAY.MIN;
        
        const typingDuration = Math.floor(Math.random() * 
            (CONFIG.TYPING_DURATION.MAX - CONFIG.TYPING_DURATION.MIN)) + CONFIG.TYPING_DURATION.MIN;

        this.typingTimeouts[userId] = {
            initial: setTimeout(() => {
                if (document.querySelector('.visitor-name').textContent === userId) {
                    this.showTypingIndicator();
                }
                
                this.typingTimeouts[userId].typing = setTimeout(() => {
                    this.hideTypingIndicator();
                    this.sendCustomerResponse(userId);
                    delete this.typingTimeouts[userId];
                }, typingDuration);
            }, initialDelay)
        };
    },

    sendCustomerResponse(userId) {
        const nextCustomerMessage = ScenarioManager.getNextCustomerMessage(userId);
        if (nextCustomerMessage) {
            ChatStorage.addMessage(userId, {
                type: 'bot',
                text: nextCustomerMessage
            });
            
            const activeUser = document.querySelector('.visitor-name').textContent;
            if (activeUser === userId) {
                MessageManager.updateChatBox(userId);
            }
            
            MessageManager.playSound();
            this.flashChatItem(userId);
            this.updateChatPreview(userId, nextCustomerMessage);
        }
    },

    addUserMessage(message) {
        const currentUser = document.querySelector('.visitor-name').textContent;
        ChatStorage.addMessage(currentUser, {
            type: 'user',
            text: message
        });
        
        // Son mesaj zamanını güncelle
        ChatStorage.setLastMessageTime(currentUser, Date.now());
        
        // Otomatik mesaj zamanlayıcısını başlat
        if (this.isAutoMessageUser(currentUser)) {
            this.startAutoMessageTimer(currentUser);
        }
        
        MessageManager.updateChatBox(currentUser);
    },

    showTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.classList.remove('hidden');
    },

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.classList.add('hidden');
    },

    flashChatItem(userId) {
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const nameElement = item.querySelector('.chat-item-name');
            if (nameElement && nameElement.textContent === userId) {
                // Aktif chat değilse okunmamış olarak işaretle
                const activeUser = document.querySelector('.visitor-name').textContent;
                if (activeUser !== userId) {
                    item.classList.add('unread');
                }
                
                // Yanıp sönme animasyonunu uygula
                item.classList.remove('flash-animation');
                void item.offsetWidth; // Reflow
                item.classList.add('flash-animation');
            }
        });
    },

    updateChatPreview(userId, message) {
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const nameElement = item.querySelector('.chat-item-name');
            if (nameElement && nameElement.textContent === userId) {
                const previewElement = item.querySelector('.chat-item-preview');
                if (previewElement) {
                    const previewText = typeof message === 'string' ? message : message.text;
                    previewElement.textContent = previewText.substring(0, 30) + 
                        (previewText.length > 30 ? '...' : '');
                }
            }
        });
    },

    startAutoMessageTimer(userId) {
        // Önceki zamanlayıcıyı temizle
        if (this.autoMessageTimeouts[userId]) {
            clearTimeout(this.autoMessageTimeouts[userId]);
        }

        // Yeni zamanlayıcı başlat
        this.autoMessageTimeouts[userId] = setTimeout(() => {
            const currentTime = Date.now();
            const lastMessageTime = ChatStorage.getLastMessageTime(userId);
            const timeDiff = currentTime - lastMessageTime;

            // 60 saniye geçti mi ve daha önce otomatik mesaj gönderilmemiş mi kontrol et
            if (timeDiff >= AUTO_MESSAGE.TIMEOUT && !ChatStorage.getAutoMessageStatus(userId)) {
                const randomMessage = AUTO_MESSAGE.MESSAGES[Math.floor(Math.random() * AUTO_MESSAGE.MESSAGES.length)];
                
                ChatStorage.addMessage(userId, {
                    type: 'bot',
                    text: randomMessage
                });

                // Otomatik mesaj durumunu güncelle
                ChatStorage.setAutoMessageStatus(userId, true);

                // UI'ı güncelle
                const activeUser = document.querySelector('.visitor-name').textContent;
                if (activeUser === userId) {
                    MessageManager.updateChatBox(userId);
                }
                
                this.flashChatItem(userId);
                this.updateChatPreview(userId, randomMessage);
                MessageManager.playSound();
            }
        }, AUTO_MESSAGE.TIMEOUT);
    },

    isAutoMessageUser(userId) {
        const autoMessageUser = sessionStorage.getItem('autoMessageUser');
        return autoMessageUser === userId;
    }
};

// Soru yönetimi modülü
const QuestionManager = {
    QUESTIONS: [
        "Hayatınızda sizi en çok etkileyen olay nedir ve bu olayın size kattığı en önemli ders ne oldu?",
        "Gelecekte kendinizi nasıl bir yaşam sürerken hayal ediyorsunuz? Kariyeriniz, yaşadığınız yer ve sosyal hayatınız nasıl olacak?",
        "En unutulmaz tatil anınızı anlatır mısınız? O anın sizin için özel olmasının nedeni nedir?",
        "Size göre başarının tanımı nedir ve başarılı bir insan olmak için hangi adımları atıyorsunuz?",
        "Hayatta en çok değer verdiğiniz şey nedir ve bunun sizin yaşamınıza nasıl bir etkisi var?",
        "Şimdiye kadar ziyaret ettiğiniz en etkileyici yer neresiydi ve orada yaşadığınız en özel anı nedir?",
        "En sevdiğiniz çocukluk anınız nedir ve o an size ne hissettirdi?",
        "Hayatınızda değiştirmek istediğiniz bir şey olsaydı, bu ne olurdu ve neden?",
        "Size ilham veren kişi kimdir ve bu kişinin hangi özellikleri sizi etkiliyor?",
        "En büyük hayaliniz nedir? Gerçekleştirmek için ne gibi adımlar atıyorsunuz?",
        "Kendinizi üç kelime ile nasıl tanımlarsınız ve neden bu kelimeleri seçtiniz?",
        "Şu ana kadar aldığınız en iyi tavsiye nedir ve bu tavsiyeyi hangi durumlarda uyguluyorsunuz?",
        "Bir süper gücünüz olsaydı, bu ne olurdu ve bu gücü nasıl kullanırdınız?",
        "Sizce mutluluğun sırrı nedir? İnsanlar neden bazen mutluluğu bulmakta zorlanır?",
        "En son okuduğunuz ve sizi derinden etkileyen kitap hangisi? Kitabın size kazandırdığı en önemli şey neydi?",
        "Gelecek nesillere nasıl bir dünya bırakmak istersiniz ve bu konuda hangi adımları atmalıyız?",
        "Hayatta öğrendiğiniz en önemli ders nedir ve bu dersi hangi olaydan çıkardınız?",
        "Sizi en çok motive eden şey nedir ve kendinizi motive etmek için hangi yöntemleri kullanıyorsunuz?",
        "Başkalarına nasıl ilham vermeye çalışıyorsunuz ve insanların sizden ilham almasını sağlayacak en güçlü yanınız nedir?",
        "Yaşamınızda iz bırakan en önemli karar neydi ve bu kararın hayatınıza etkisi nasıl oldu?",
        "Kendinizle ilgili değiştirmek istediğiniz en büyük özellik nedir ve bunu değiştirmek için ne yapıyorsunuz?",
        "Hayatta en çok gurur duyduğunuz başarınız nedir ve bu başarıyı elde ederken hangi zorluklarla karşılaştınız?",
        "Hayatınızda sizi en çok zorlayan an neydi ve bu anın üstesinden nasıl geldiniz?",
        "Eğer geçmişe dönüp kendinize bir tavsiye verebilseydiniz, ne söylerdiniz?",
        "Şu an sahip olduğunuz bilgi ve tecrübeyle 10 yıl önceki halinize ne öğretmek isterdiniz?",
        "İnsan ilişkilerinde en çok dikkat ettiğiniz şey nedir ve sizi en çok rahatsız eden davranışlar nelerdir?",
        "Bir gün boyunca herhangi bir tarihi figürle vakit geçirebilseydiniz, kimi seçerdiniz ve neden?",
        "Hayatta risk almak hakkında ne düşünüyorsunuz? En büyük riskiniz neydi ve sonucunda ne öğrendiniz?",
        "Eğer dünyanın herhangi bir yerinde yaşayabilseydiniz, nerede yaşamak isterdiniz ve neden?",
        "Günlük hayatınızdaki en büyük alışkanlığınız nedir ve bu alışkanlık sizi nasıl etkiliyor?",
        "Kendi hayatınızı bir film olarak düşünecek olsanız, türü ne olurdu ve başrolü kim oynardı?",
        "Hayatınızdaki en değerli insan kim ve onun sizin üzerinizde nasıl bir etkisi var?",
        "Hayatınızın geri kalanında sadece bir hobiyle uğraşmak zorunda kalsaydınız, hangi hobiyi seçerdiniz?",
        "Bir insanın karakterini belirleyen en önemli özellikler nelerdir sizce?",
        "Bugüne kadar karşılaştığınız en büyük zorluk neydi ve bu zorluktan nasıl dersler çıkardınız?",
        "Geriye dönüp baktığınızda, keşke daha önce yapsaydım dediğiniz bir şey var mı?",
        "Hayatınızdaki en büyük şans olarak gördüğünüz olay nedir ve bu olayın hayatınıza etkisi ne oldu?",
        "Eğer bir konuda tamamen uzmanlaşma şansınız olsaydı, hangi konuda uzman olmak isterdiniz?",
        "Hangi alışkanlıklarınızı bırakmak veya değiştirmek isterdiniz ve bunun için bir adım attınız mı?",
        "Eğer bir ay boyunca hiçbir sorumluluğunuz olmasaydı, bu zamanı nasıl değerlendirirdiniz?",
        "En sevdiğiniz sanat dalı nedir ve sizi bu alana çeken şey ne oldu?",
        "Bugüne kadar aldığınız en anlamlı hediye neydi ve sizin için neden özeldi?",
        "Hayatınız boyunca karşılaştığınız en ilginç insan kimdi ve onunla yaşadığınız en unutulmaz an nedir?",
        "Eğer bir gün boyunca istediğiniz herhangi bir mesleği yapabilseydiniz, ne yapardınız?",
        "Sizi en çok rahatlatan aktivite nedir ve bunu ne sıklıkla yapıyorsunuz?",
        "Eğer bir saat boyunca dünyanın herhangi bir yerine ışınlanabilseydiniz, nereye giderdiniz ve neden?",
        "Zamanı geri alma şansınız olsaydı, hayatınızdaki hangi anı yeniden yaşamak isterdiniz?",
        "Eğer kendinize ait bir felsefeniz veya hayat mottosu olsaydı, ne olurdu?",
        "Hayatta en çok hayranlık duyduğunuz insan kim ve onun hangi özellikleri sizi etkiliyor?",
        "Sonsuz bir kaynağınız olsaydı, hangi hayır işini yapmak isterdiniz?",
        "İnsanların sizin hakkınızda en çok neyi hatırlamasını isterdiniz?"
    ],
    shuffledQuestions: [],

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};

// Kullanıcı bilgilerini tutacak nesne
let activeUser = {
    fullName: '',
    initials: '',
    email: '',
    location: '',
    browser: 'Chrome',
    status: 'Aktif'
};

// Kullanıcı isimleri ve konumları
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
    "Serap Yılmaz", "Hakan Demir", "Duygu Yıldız", "Ekin Koç", "Seda Yılmaz"
];
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
    "@gmail.com", "@hotmail.com", "@windowslive.com", "@gmail.de", "@outlook.com",
    "@yahoo.com", "@protonmail.com", "@tutanota.com", "@webkusu.com", "@aol.com",
    "@gmx.com", "@promail.com.tr", "@zoho.com", "@yandex.com", "@outlook.de",
    "@hotmail.co.uk", "@live.com", "@mail.ru", "@protonmail.ch", "@fastmail.com",
    "@promail.com.tr", "@hushmail.com", "@promail.com.tr", "@gezginlerindirturkce.com",
    "@posteo.de", "@promail.com.tr", "@runbox.com"
];

// Türkçe karakter dönüştürme fonksiyonu
function turkishToEnglish(text) {
    const charMap = {
        'ç': 'c', 'Ç': 'C',
        'ğ': 'g', 'Ğ': 'G',
        'ı': 'i', 'İ': 'I',
        'ö': 'o', 'Ö': 'O',
        'ş': 's', 'Ş': 'S',
        'ü': 'u', 'Ü': 'U'
    };
    return text.replace(/[çÇğĞıİöÖşŞüÜ]/g, match => charMap[match]);
}

// Yasaklı kullanıcı adları
const RESTRICTED_USERNAMES = [
    'admin', 'administrator', 'root', 'user', 'system', 'superuser', 'supervisor',
    'moderator', 'mod', 'support', 'helpdesk', 'sysadmin', 'webmaster', 'owner',
    'admin123', 'administrator123', 'root123', 'user123', 'system123'
];

// Rastgele kullanıcı seçme ve bilgileri oluşturma
function generateRandomUser() {
    const fullName = ASSISTANT_NAMES[Math.floor(Math.random() * ASSISTANT_NAMES.length)];
    const initials = fullName.split(' ').map(n => n[0]).join('');
    const email = `${fullName.toLowerCase().replace(' ', '.')}@${EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)].slice(1)}`;
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    
    return {
        fullName,
        initials,
        email,
        location,
        browser: 'Chrome',
        status: 'Aktif'
    };
}

// Kullanıcı bilgilerini güncelleme fonksiyonu
function updateUserInterface(user) {
    // Orta panel başlık - ziyaretçi bilgileri
    document.querySelector(".visitor-name").textContent = user.fullName;
    document.querySelector(".visitor-status").textContent = user.status;
    
    // Sağ panel - ziyaretçi detayları
    document.querySelector(".detail-value[data-field='email']").textContent = turkishToEnglish(user.email);
    document.querySelector(".detail-value[data-field='location']").textContent = user.location;
    document.querySelector(".detail-value[data-field='browser']").textContent = user.browser;
}

// Chat mesajları için sessionStorage yardımcı fonksiyonları
const ChatStorage = {
    // Tüm chat mesajlarını getir
    getAllChats() {
        const chats = sessionStorage.getItem('chatMessages');
        return chats ? JSON.parse(chats) : {};
    },
    
    // Belirli bir chat'in mesajlarını getir
    getChatMessages(userId) {
        const chats = this.getAllChats();
        return chats[userId] || [];
    },
    
    // Son mesajı getir
    getLastMessage(userId) {
        const messages = this.getChatMessages(userId);
        return messages.length > 0 ? messages[messages.length - 1] : null;
    },
    
    // Yeni mesaj ekle
    addMessage(userId, message) {
        const chats = this.getAllChats();
        if (!chats[userId]) {
            chats[userId] = [];
        }
        chats[userId].push(message);
        sessionStorage.setItem('chatMessages', JSON.stringify(chats));
    },
    
    // Chat'i başlat veya sıfırla
    initializeChat(userId) {
        const chats = this.getAllChats();
        if (!chats[userId]) {
            chats[userId] = [];
            sessionStorage.setItem('chatMessages', JSON.stringify(chats));
        }
    },
    
    // Chat'i sil
    deleteChat(userId) {
        const chats = this.getAllChats();
        delete chats[userId];
        sessionStorage.setItem('chatMessages', JSON.stringify(chats));
    },
    
    // Otomatik mesaj durumunu kaydet
    setAutoMessageStatus(userId, status) {
        const autoMessageStatus = JSON.parse(sessionStorage.getItem('autoMessageStatus') || '{}');
        autoMessageStatus[userId] = status;
        sessionStorage.setItem('autoMessageStatus', JSON.stringify(autoMessageStatus));
    },
    
    // Otomatik mesaj durumunu kontrol et
    getAutoMessageStatus(userId) {
        const autoMessageStatus = JSON.parse(sessionStorage.getItem('autoMessageStatus') || '{}');
        return autoMessageStatus[userId] || false;
    },
    
    // Son mesaj zamanını kaydet
    setLastMessageTime(userId, time) {
        const lastMessageTimes = JSON.parse(sessionStorage.getItem('lastMessageTimes') || '{}');
        lastMessageTimes[userId] = time;
        sessionStorage.setItem('lastMessageTimes', JSON.stringify(lastMessageTimes));
    },
    
    // Son mesaj zamanını al
    getLastMessageTime(userId) {
        const lastMessageTimes = JSON.parse(sessionStorage.getItem('lastMessageTimes') || '{}');
        return lastMessageTimes[userId] || 0;
    }
};

// Sayfa yüklendiğinde sessionStorage'ı temizle ve kontrol et
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('chatInterface').classList.add('hidden');
    
    // SessionStorage'ı temizle ve yeniden başlat
    sessionStorage.clear();
    sessionStorage.setItem('chatMessages', JSON.stringify({}));
    sessionStorage.setItem('autoMessageStatus', JSON.stringify({}));
    sessionStorage.setItem('lastMessageTimes', JSON.stringify({}));

    // Kullanıcı adı alanına otomatik odaklan
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.focus();
    }
});

// Login hata yönetimi için yardımcı fonksiyon
function showLoginError(message) {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Bildirim göster
    UIManager.showNotification(message, "error");

    // Rastgele bir hata efekti seç
    const errorEffects = ['error-shake', 'error-bounce', 'error-pulse', 'error-rotate'];
    const randomEffect = errorEffects[Math.floor(Math.random() * errorEffects.length)];

    // Form arkaplanını değiştir ve animasyonu uygula
    loginForm.classList.add('error', randomEffect);

    // Input değerlerini temizle
    usernameInput.value = '';
    passwordInput.value = '';

    // Kullanıcı adı alanına odaklan
    usernameInput.focus();

    // Hata efektlerini temizle
    setTimeout(() => {
        loginForm.classList.remove('error', randomEffect);
    }, 800);
}

// Login fonksiyonunu güncelle
async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Kullanıcı adı kontrolü
    if (!username || username.length < 5) {
        showLoginError("Kullanıcı adı en az 5 karakter olmalıdır!");
        return;
    }

    // Yasaklı kullanıcı adı kontrolü
    const lowerUsername = username.toLowerCase();
    if (RESTRICTED_USERNAMES.some(restricted => lowerUsername.includes(restricted))) {
        showLoginError("Bu kullanıcı adı kullanılamaz!");
        return;
    }

    if (CONFIG.VALID_PASSWORDS.includes(password)) {
        try {
            let scenariosLoaded = ScenarioManager.loadFromStorage();

            if (!scenariosLoaded) {
                const response = await fetch('scenarios.txt');
                if (!response.ok) throw new Error('Senaryo dosyası yüklenemedi');
                
                const scenariosText = await response.text();
                scenariosLoaded = ScenarioManager.loadScenarios(scenariosText);
                
                if (!scenariosLoaded) {
                    throw new Error('Senaryolar yüklenemedi');
                }
            }

            // Agent profile'ı güncelle
            document.querySelector(".profile-name").textContent = username;
            
            // Status'u başlat
            initializeAgentStatus();
            
            // Ziyaretçi bilgilerini güncelle
            activeUser = generateRandomUser();
            updateUserInterface(activeUser);
            
            // Chat'i başlat
            ChatStorage.initializeChat(activeUser.fullName);
            
            // Senaryo seç ve başlat
            const scenario = ScenarioManager.getOrCreateScenario(activeUser.fullName);
            if (scenario) {
                ScenarioManager.updateChatReason(activeUser.fullName);
                createChatList();
                
                // Login formunu gizle, chat arayüzünü göster
                document.getElementById("loginForm").classList.add("hidden");
                document.getElementById("chatInterface").classList.remove("hidden");
                
                UIManager.showNotification("Başarıyla giriş yapıldı!", "success");
            } else {
                throw new Error('Senaryo atanamadı');
            }
        } catch (error) {
            console.error('Login hatası:', error);
            showLoginError('Sistem başlatılırken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    } else {
        showLoginError("Hatalı şifre!");
    }
}

// Agent status yönetimi için yeni fonksiyonlar
function initializeAgentStatus() {
    const statusWrapper = document.querySelector(".profile-status-wrapper");
    const statusIndicator = document.querySelector(".status-indicator");
    const statusText = document.querySelector(".profile-status");
    const statusImage = document.querySelector(".status-image");
    
    // Başlangıç durumu
    setAgentStatus(true);
    
    // Click event listener'ları ekle
    statusWrapper.addEventListener("click", toggleAgentStatus);
    statusImage.addEventListener("click", toggleAgentStatus);
}

function setAgentStatus(isOnline) {
    const statusIndicator = document.querySelector(".status-indicator");
    const statusText = document.querySelector(".profile-status");
    const statusImage = document.querySelector(".status-image");
    
    if (isOnline) {
        statusIndicator.classList.add("online");
        statusIndicator.classList.remove("offline");
        statusText.classList.add("online");
        statusText.classList.remove("offline");
        statusText.textContent = "Online";
        statusImage.src = "./images/online.png";
    } else {
        statusIndicator.classList.add("offline");
        statusIndicator.classList.remove("online");
        statusText.classList.add("offline");
        statusText.classList.remove("online");
        statusText.textContent = "Offline";
        statusImage.src = "./images/offline.png";
    }
}

function toggleAgentStatus() {
    const statusText = document.querySelector(".profile-status");
    const isCurrentlyOnline = statusText.textContent === "Online";
    setAgentStatus(!isCurrentlyOnline);
}

// Mesaj sesi çalma fonksiyonunu güncelle (daha güvenilir olması için)
function playMessageSound() {
    const sound = document.getElementById('messageSound');
    if (sound) {
        // Sesi başa sar (eğer önceden çalınmışsa)
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.log("Ses çalma hatası:", error);
        });
    }
}

// Chat listesini oluşturma fonksiyonunu güncelle
function createChatList() {
    const chatList = document.querySelector(".chat-list");
    chatList.innerHTML = '';
    
    // Rastgele bir kullanıcıyı otomatik mesaj kullanıcısı olarak seç
    const autoMessageUserIndex = Math.floor(Math.random() * 5);
    
    // İlk kullanıcı olarak aktif kullanıcıyı ekle
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item active';
    const lastMessage = ChatStorage.getLastMessage(activeUser.fullName);
    
    if (autoMessageUserIndex === 0) {
        sessionStorage.setItem('autoMessageUser', activeUser.fullName);
    }
    
    chatItem.innerHTML = `
        <div class="chat-item-avatar">${activeUser.initials}</div>
        <div class="chat-item-info">
            <div class="chat-item-name">${activeUser.fullName}</div>
            <div class="chat-item-preview">${lastMessage ? lastMessage.text.substring(0, 30) + 
                (lastMessage.text.length > 30 ? '...' : '') : 'Son mesaj yok'}</div>
        </div>
    `;
    addChatClickListener(chatItem, activeUser);
    chatList.appendChild(chatItem);
    
    // Diğer rastgele kullanıcılar için de aynı işlem
    for (let i = 0; i < 4; i++) {
        const user = generateRandomUser();
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        const lastMessage = ChatStorage.getLastMessage(user.fullName);
        
        if (i + 1 === autoMessageUserIndex) {
            sessionStorage.setItem('autoMessageUser', user.fullName);
        }
        
        chatItem.innerHTML = `
            <div class="chat-item-avatar">${user.initials}</div>
            <div class="chat-item-info">
                <div class="chat-item-name">${user.fullName}</div>
                <div class="chat-item-preview">${lastMessage ? lastMessage.text.substring(0, 30) + 
                    (lastMessage.text.length > 30 ? '...' : '') : 'Son mesaj yok'}</div>
            </div>
        `;
        
        addChatClickListener(chatItem, user);
        chatList.appendChild(chatItem);
    }
}

// Chat öğesine tıklama işlevini güncelle
function addChatClickListener(chatItem, user) {
    chatItem.addEventListener('click', () => {
        // Okunmamış durumunu kaldır
        chatItem.classList.remove('unread');
        chatItem.classList.remove('flash-animation');
        
        // Önceki aktif chat'in vurgusunu kaldır
        const previousActive = document.querySelector('.chat-item.active');
        if (previousActive) {
            previousActive.classList.remove('active');
        }
        
        // Yeni chat'i aktif yap
        chatItem.classList.add('active');
        
        // Kullanıcı arayüzünü güncelle
        updateUserInterface(user);
        
        // Senaryo başlığını güncelle
        const scenario = ScenarioManager.getOrCreateScenario(user.fullName);
        ScenarioManager.updateChatReason(user.fullName);
        
        // Önceki yazıyor göstergesini temizle
        ChatManager.hideTypingIndicator();
        
        // Chat'i başlat veya var olan mesajları göster
        ChatStorage.initializeChat(user.fullName);
        MessageManager.updateChatBox(user.fullName);
    });
}

// Modal gösterme fonksiyonu
function showModal(message, onConfirm) {
    UIManager.showModal(message, onConfirm);
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type) {
    UIManager.showNotification(message, type);
}

// Arşivleme fonksiyonunu güncelle
function archiveChat() {
    const currentUser = document.querySelector('.visitor-name').textContent;
    
    showModal(`${currentUser} ile olan sohbeti arşivlemek istediğinize emin misiniz?`, () => {
        ChatStorage.deleteChat(currentUser);
        ScenarioManager.resetUserScenario(currentUser);
        
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const nameElement = item.querySelector('.chat-item-name');
            if (nameElement && nameElement.textContent === currentUser) {
                item.remove();
            }
        });
        
        showNotification(`${currentUser} ile olan sohbet arşivlendi.`, 'archive');
        
        // Varsa başka bir chat'e geç, yoksa yeni chat oluştur
        const remainingChats = document.querySelectorAll('.chat-item');
        if (remainingChats.length > 0) {
            remainingChats[0].click();
        } else {
            const newUser = generateRandomUser();
            createChatList();
            updateUserInterface(newUser);
            ChatStorage.initializeChat(newUser.fullName);
        }
    });
}

// Silme fonksiyonunu güncelle
function endChat() {
    const currentUser = document.querySelector('.visitor-name').textContent;
    
    showModal(`${currentUser} ile olan sohbeti sonlandırmak istediğinize emin misiniz?`, () => {
        ChatStorage.deleteChat(currentUser);
        ScenarioManager.resetUserScenario(currentUser);
        
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const nameElement = item.querySelector('.chat-item-name');
            if (nameElement && nameElement.textContent === currentUser) {
                item.remove();
            }
        });
        
        showNotification(`${currentUser} ile olan sohbet sonlandırıldı.`, 'delete');
        
        // Varsa başka bir chat'e geç, yoksa yeni chat oluştur
        const remainingChats = document.querySelectorAll('.chat-item');
        if (remainingChats.length > 0) {
            remainingChats[0].click();
        } else {
            const newUser = generateRandomUser();
            createChatList();
            updateUserInterface(newUser);
            ChatStorage.initializeChat(newUser.fullName);
        }
    });
}

// Ziyaretçi bilgilerini güncelleme fonksiyonu
function updateVisitorInfo(name, status) {
    const visitorName = document.querySelector('.visitor-name');
    const visitorStatus = document.querySelector('.visitor-status');
    
    if (visitorName && visitorStatus) {
        visitorName.textContent = name;
        visitorStatus.textContent = status;
        console.log('Ziyaretçi bilgileri güncellendi:', { name, status });
    }
}

// Chat sebebini güncelleme fonksiyonu
function updateChatReason(reason) {
    const reasonText = document.querySelector('.reason-text');
    if (reasonText) {
        reasonText.textContent = reason;
        console.log('Chat sebebi güncellendi:', reason);
    }
}

// Chat aksiyonlarını yönetme
function initializeChatActions() {
    const archiveButton = document.querySelector('[data-action="archive"]');
    const endButton = document.querySelector('[data-action="end"]');

    if (archiveButton) {
        archiveButton.addEventListener('click', () => {
            console.log('Chat arşivleniyor...');
            // Arşivleme işlemi burada gerçekleştirilecek
        });
    }

    if (endButton) {
        endButton.addEventListener('click', () => {
            console.log('Chat sonlandırılıyor...');
            // Sonlandırma işlemi burada gerçekleştirilecek
        });
    }
}

// Chat header'ı başlatma
function initializeChatHeader() {
    try {
        updateVisitorInfo('Ziyaretçi', 'Çevrimiçi');
        updateChatReason('Teknik Destek');
        initializeChatActions();
        console.log('Chat header başarıyla başlatıldı');
    } catch (error) {
        console.error('Chat header başlatılırken hata oluştu:', error);
    }
}

// Sayfa yüklendiğinde chat header'ı başlat
document.addEventListener('DOMContentLoaded', initializeChatHeader);

// Enter tuşu ile gönderme
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            ChatManager.sendMessage();
        }
    });

    loginForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            login();
        }
    });

    // Input alanları için event listener'lar
    usernameInput.addEventListener('input', function() {
        loginForm.classList.remove('error', 'error-shake', 'error-bounce', 'error-pulse', 'error-rotate');
    });

    passwordInput.addEventListener('input', function() {
        loginForm.classList.remove('error', 'error-shake', 'error-bounce', 'error-pulse', 'error-rotate');
    });
});
 
