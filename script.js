const CORRECT_PASSWORD = "123456";
const QUESTIONS = [
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
];

let currentQuestionIndex = 0;

// Soruları karıştırmak için yardımcı fonksiyon
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Karıştırılmış sorular için yeni bir dizi
let shuffledQuestions = [];

// Aktif kullanıcı bilgilerini tutacak nesne
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
    "@gmail.com", "@hotmail.com", "@windowslive.com", "@gmail.de", "@outlook.com"
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
    document.querySelector(".detail-value[data-field='email']").textContent = user.email;
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
        
        // Son mesajı preview olarak güncelle
        this.updatePreview(userId);
        
        // Eğer bot mesajıysa ses çal ve chat öğesini yanıp söndür
        if (message.type === 'bot') {
            playMessageSound();
            this.flashChatItem(userId);
        }
    },
    
    // Chat'i başlat veya sıfırla
    initializeChat(userId) {
        const chats = this.getAllChats();
        if (!chats[userId]) {
            chats[userId] = [];
            sessionStorage.setItem('chatMessages', JSON.stringify(chats));
        }
    },

    // Chat öğesini yanıp söndürme fonksiyonunu güncelle
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
    
    // Preview'ı güncelle
    updatePreview(userId) {
        const lastMessage = this.getLastMessage(userId);
        if (lastMessage) {
            const chatItems = document.querySelectorAll('.chat-item');
            chatItems.forEach(item => {
                const nameElement = item.querySelector('.chat-item-name');
                if (nameElement && nameElement.textContent === userId) {
                    const previewElement = item.querySelector('.chat-item-preview');
                    if (previewElement) {
                        previewElement.textContent = lastMessage.text.substring(0, 30) + 
                            (lastMessage.text.length > 30 ? '...' : '');
                    }
                }
            });
        }
    },
    
    // Chat'i sil
    deleteChat(userId) {
        const chats = this.getAllChats();
        delete chats[userId];
        sessionStorage.setItem('chatMessages', JSON.stringify(chats));
    }
};

// Chat kutusunu güncelleme fonksiyonu
function updateChatBox(userId) {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = ''; // Chat kutusunu temizle
    
    // Yazıyor göstergesini yeniden ekle
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typingIndicator';
    typingIndicator.className = 'typing-indicator hidden';
    typingIndicator.textContent = 'Yazıyor...';
    chatBox.appendChild(typingIndicator);
    
    // SessionStorage'dan mesajları getir ve göster
    const messages = ChatStorage.getChatMessages(userId);
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}-message`;
        messageDiv.textContent = msg.text;
        chatBox.appendChild(messageDiv);
    });
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Mesaj ekleme fonksiyonlarını güncelle
function addUserMessage(message) {
    const currentUser = document.querySelector('.visitor-name').textContent;
    ChatStorage.addMessage(currentUser, {
        type: 'user',
        text: message
    });
    updateChatBox(currentUser);
}

// Yazıyor göstergesi için global değişken yerine chat bazlı obje
let typingTimeouts = {};

// Yazıyor göstergesini kontrol eden fonksiyonlar
function showTypingIndicator(userId) {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.classList.remove('hidden');
        typingIndicator.dataset.userId = userId; // Hangi chat için yazıyor gösteriliyor
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.classList.add('hidden');
        typingIndicator.dataset.userId = '';
    }
}

// Mesaj gönderme fonksiyonunu güncelle
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    const currentUser = document.querySelector('.visitor-name').textContent;

    if (message) {
        // Kullanıcı mesajını göster ve input'u temizle
        addUserMessage(message);
        userInput.value = '';
        
        // Soruları kontrol et ve karıştır
        if (shuffledQuestions.length === 0) {
            shuffledQuestions = [...QUESTIONS];
            shuffleArray(shuffledQuestions);
        }
        const randomQuestion = shuffledQuestions.pop();
        
        // Önceki yazıyor göstergesini temizle
        if (typingTimeouts[currentUser]) {
            clearTimeout(typingTimeouts[currentUser].initial);
            clearTimeout(typingTimeouts[currentUser].typing);
            hideTypingIndicator();
        }

        // Bot yanıtı için zamanlayıcıları ayarla
        const initialDelay = Math.floor(Math.random() * 1000) + 2000;
        const typingDuration = Math.floor(Math.random() * 2000) + 3000;

        // Her chat için ayrı timeout'ları sakla
        typingTimeouts[currentUser] = {
            initial: setTimeout(() => {
                // Eğer hala aynı chat aktifse yazıyor göster
                const activeUser = document.querySelector('.visitor-name').textContent;
                if (activeUser === currentUser) {
                    showTypingIndicator(currentUser);
                }
                
                typingTimeouts[currentUser].typing = setTimeout(() => {
                    // Eğer hala aynı chat aktifse mesajı gönder
                    if (document.querySelector('.visitor-name').textContent === currentUser) {
                        hideTypingIndicator();
                        addBotMessage(randomQuestion, currentUser);
                    } else {
                        // Farklı chat aktifse, mesajı sessizce ekle
                        ChatStorage.addMessage(currentUser, {
                            type: 'bot',
                            text: randomQuestion
                        });
                    }
                    delete typingTimeouts[currentUser];
                }, typingDuration);
            }, initialDelay)
        };
    }
}

// Bot mesajı ekleme fonksiyonunu güncelle
function addBotMessage(message, userId) {
    ChatStorage.addMessage(userId, {
        type: 'bot',
        text: message
    });
    
    // Eğer mesaj aktif chat içinse, görüntüle
    const currentUser = document.querySelector('.visitor-name').textContent;
    if (currentUser === userId) {
        updateChatBox(userId);
    } else {
        // Aktif chat değilse yanıp sönme ve okunmamış işaretlemesi yap
        flashChatItem(userId);
    }
    
    // Son mesajı preview olarak güncelle
    updateChatPreview(userId, { text: message });
}

// Chat öğesine tıklama işlevini güncelle
function addChatClickListener(chatItem, user) {
    chatItem.addEventListener('click', () => {
        // Okunmamış durumunu kaldır
        chatItem.classList.remove('unread');
        // flash animation  kaldır
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
        
        // Önceki yazıyor göstergesini temizle
        hideTypingIndicator();
        
        // Chat'i başlat veya var olan mesajları göster
        ChatStorage.initializeChat(user.fullName);
        updateChatBox(user.fullName);
    });
}

// Preview mesajını güncelleme fonksiyonunu düzelt
function updateChatPreview(userId, lastMessage) {
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        const nameElement = item.querySelector('.chat-item-name');
        if (nameElement && nameElement.textContent === userId) {
            const previewElement = item.querySelector('.chat-item-preview');
            if (previewElement) {
                previewElement.textContent = lastMessage.text.substring(0, 30) + (lastMessage.text.length > 30 ? '...' : '');
            }
        }
    });
}

// Chat listesini oluşturma fonksiyonunu güncelle
function createChatList() {
    const chatList = document.querySelector(".chat-list");
    chatList.innerHTML = '';
    
    // İlk kullanıcı olarak aktif kullanıcıyı ekle
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item active';
    const lastMessage = ChatStorage.getLastMessage(activeUser.fullName);
    
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

// Login fonksiyonunu güncelle
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username) {
        alert("Kullanıcı adı boş bırakılamaz!");
        return;
    }

    if (password === CORRECT_PASSWORD) {
        // Agent profile'ı güncelle
        document.querySelector(".profile-name").textContent = username;
        
        // Status'u başlat
        initializeAgentStatus();
        
        // Ziyaretçi bilgilerini güncelle
        activeUser = generateRandomUser();
        updateUserInterface(activeUser);
        
        ChatStorage.initializeChat(activeUser.fullName);
        createChatList();
        
        // Login formunu gizle, chat arayüzünü göster
        document.getElementById("loginForm").classList.add("hidden");
        document.getElementById("chatInterface").classList.remove("hidden");
    } else {
        alert("Hatalı şifre!");
    }
}

// Agent status yönetimi için yeni fonksiyonlar
function initializeAgentStatus() {
    const statusWrapper = document.querySelector(".profile-status-wrapper");
    const statusIndicator = document.querySelector(".status-indicator");
    const statusText = document.querySelector(".profile-status");
    
    // Başlangıç durumu
    setAgentStatus(true);
    
    // Click event listener ekle
    statusWrapper.addEventListener("click", toggleAgentStatus);
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

// Sayfa yüklendiğinde sessionStorage'ı temizle ve kontrol et
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('chatInterface').classList.add('hidden');
    
    // SessionStorage'ı temizle ve yeniden başlat
    sessionStorage.clear();
    sessionStorage.setItem('chatMessages', JSON.stringify({}));
});

// Enter tuşu ile gönderme
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const loginForm = document.getElementById('loginForm');

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    loginForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            login();
        }
    });
});

// Modal gösterme fonksiyonu
function showModal(message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const modalMessage = document.getElementById('modalMessage');
    
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);

    // Modal butonlarına event listener'ları ekle
    const confirmButton = modal.querySelector('.confirm-button');
    const cancelButton = modal.querySelector('.cancel-button');
    const closeButton = modal.querySelector('.close-modal');

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 300);
        
        // Event listener'ları temizle
        confirmButton.removeEventListener('click', handleConfirm);
        cancelButton.removeEventListener('click', closeModal);
        closeButton.removeEventListener('click', closeModal);
    };

    const handleConfirm = () => {
        onConfirm();
        closeModal();
    };

    confirmButton.addEventListener('click', handleConfirm);
    cancelButton.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Arşivleme fonksiyonunu güncelle
function archiveChat() {
    const currentUser = document.querySelector('.visitor-name').textContent;
    
    showModal(`${currentUser} ile olan sohbeti arşivlemek istediğinize emin misiniz?`, () => {
        ChatStorage.deleteChat(currentUser);
        
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
 