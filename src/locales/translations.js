// Complete Multilingual Localization Dictionary for EverMind
// Supports: English (en-IN), Hindi (hi-IN), Assamese (as-IN), Bengali (bn-IN), Meitei (mni-IN)

export const LANGUAGES = {
  'en-IN': {
    code: 'en-IN',
    label: 'English',
    native: 'English',
    region: 'India / Global',
    speechTag: 'en-IN'
  },
  'hi-IN': {
    code: 'hi-IN',
    label: 'Hindi',
    native: 'हिन्दी',
    region: 'India',
    speechTag: 'hi-IN'
  },
  'as-IN': {
    code: 'as-IN',
    label: 'Assamese',
    native: 'অসমীয়া',
    region: 'Assam',
    speechTag: 'as-IN'
  },
  'bn-IN': {
    code: 'bn-IN',
    label: 'Bengali',
    native: 'বাংলা',
    region: 'Assam / Bengal',
    speechTag: 'bn-IN'
  },
  'mni-IN': {
    code: 'mni-IN',
    label: 'Meitei',
    native: 'ꯃꯤꯇꯩꯂꯣꯟ',
    region: 'Manipur',
    speechTag: 'mni-IN'
  }
};

export const REMI_SONGS = {
  'en-IN': [
    {
      id: 'sunshine',
      title: 'You Are My Sunshine ☀️',
      lyrics: 'You are my sunshine, my only sunshine... You make me happy when skies are gray. You\'ll never know dear, how much I love you. Please don\'t take my sunshine away!'
    },
    {
      id: 'twinkle',
      title: 'Twinkle Twinkle Gentle Star ✨',
      lyrics: 'Twinkle, twinkle, little star, how I wonder what you are! Up above the world so high, like a diamond in the sky. Rest your gentle mind tonight.'
    }
  ],
  'hi-IN': [
    {
      id: 'chanda',
      title: 'चंदा है तू, मेरा सूरज है तू 🌙',
      lyrics: 'चंदा है तू, मेरा सूरज है तू... ओ मेरी आँखों का तारा है तू। जीती हूँ मैं बस तुझे देखकर, इस ज़िंदगी का सहारा है तू... सो जा मेरे प्यारे, सो जा मीठी नींद।'
    },
    {
      id: 'lakdi',
      title: 'लकड़ी की काठी, काठी पे घोड़ा 🎠',
      lyrics: 'लकड़ी की काठी, काठी पे घोड़ा, घोड़े की दुम पे जो मारा हथौड़ा... दौड़ा दौड़ा दौड़ा घोड़ा दुम उठा के दौड़ा! मन खुश रहे, यादें ताज़ा रहें।'
    },
    {
      id: 'soothing',
      title: 'धीरे से आजा री अंखियन में 🌸',
      lyrics: 'धीरे से आजा री अंखियन में निंदिया आजा री आजा... मीठी मीठी नींदिया में प्यारे सपने सजा जा। शांत मन, सुखद पल।'
    }
  ],
  'as-IN': [
    {
      id: 'omur',
      title: 'অ’ মোৰ আপোনাৰ দেশ 🌾',
      lyrics: 'অ’ মোৰ আপোনাৰ দেশ, অ’ মোৰ চিকুণী দেশ... এনেখন শুৱলা, এনেখন সুফলা, এনেখন মৰমৰ দেশ! মন জুৰোৱা শান্তি হওক।'
    },
    {
      id: 'bihugeet',
      title: 'বিহুৰ মিঠা সুৰ 💃',
      lyrics: 'ব’হাগৰ বিহুটি আহিল ঐ লাহৰী, কুলিৰে মিঠা মাত শুনি... মন জুৰাই যায়, হিয়া ভৰি যায়, আনন্দত নাচে মনখনি।'
    }
  ],
  'bn-IN': [
    {
      id: 'phule',
      title: 'ফুলে ফুলে ঢলে ঢলে 🌸',
      lyrics: 'ফুলে ফুলে ঢলে ঢলে বহে কিবা মৃদু বায়... তটিনী হিল্লোল তুলে কল্লোলে চলিয়া যায়। মনে আসুক অপার শান্তি।'
    },
    {
      id: 'chad',
      title: 'চাঁদ উঠেছে ফুল ফুটেছে 🌙',
      lyrics: 'চাঁদ উঠেছে ফুল ফুটেছে কদম তলায় কে... শান্ত বাতাসে ঘুম নেমে আসুক চোখে। আপনার দিনটি আনন্দময় হোক।'
    }
  ],
  'mni-IN': [
    {
      id: 'thatha',
      title: 'ꯊꯥ ꯊꯥ ꯊꯥꯕꯨꯡꯇꯣꯟ (Manipuri Lullaby) 🌙',
      lyrics: 'ꯊꯥ ꯊꯥ ꯊꯥꯕꯨꯡꯇꯣꯟ, ꯅꯥꯆꯣꯝ ꯇꯦꯡꯒꯣꯠ ꯄꯤꯔꯛꯑꯣ... ꯋꯥꯈꯜ ꯅꯨꯡꯉꯥꯏꯅ ꯂꯩꯕꯤꯌꯨ, ꯑꯩ ꯅꯍꯥꯛꯀꯤ ꯃꯔꯨꯞꯅꯤꫫ'
    }
  ]
};

export const translations = {
  'en-IN': {
    appName: 'Evermind',
    appTagline: 'Always with you.',
    appSubtitle: 'Cognitive Care & Memory Companion',
    rolePatient: 'Patient / Elder',
    roleCaregiver: 'Family Caregiver',
    welcomeGreeting: 'Warm greetings! Let us take care of your mind today.',
    selectRole: 'Who is using this today?',
    patientNameLabel: 'Your Good Name',
    caregiverNameLabel: 'Caregiver Name',
    ageLabel: 'Age',
    preferredLanguage: 'Choose Your Preferred Language',
    enterApp: 'Start Cognitive Session',
    logout: 'Switch Profile',
    emergencyOverride: 'Emergency Language Override',
    emergencyOverrideDesc: 'Instant global language switch for disorientation',
    langSwitched: 'Language switched instantly to',
    voicePaused: 'Voice paused — reconnecting…',
    retryingVoice: 'Retrying speech connection silently',
    
    // Navigation & Drawer
    menuTitle: 'Menu',
    navGames: 'Cognitive Games',
    navCompanion: 'Remi Companion',
    navSchedule: 'Today’s Schedule',
    navMemories: 'My Memories',
    navBreathing: 'Calm Breath & Stretch',
    navReminders: 'Daily Reminders',
    navDashboard: 'Caregiver Hub',
    textSizeLabel: 'Text Size',
    textSizeNormal: 'Normal (A)',
    textSizeLarge: 'Large (AA)',
    textSizeXLarge: 'Extra Large (AAA)',
    themeLabel: 'Color Theme',
    calmModeBtn: 'Enter Calm Sanctuary 🌿',
    emergencyContactTitle: 'Emergency Contact',
    logoutBtn: 'Log Out',
    
    // Mini-Games
    gamesTitle: 'Cognitive Exercises',
    gamesSubtitle: 'Gentle brain games rooted in cultural traditions',
    gameMemoryTitle: 'Memory Match',
    gameMemoryDesc: 'Flip & match beloved symbols of Assam and Manipur',
    gameDailyTitle: 'Daily Routine Recall',
    gameDailyDesc: 'Arrange your peaceful morning habits in order',
    gameNumberTitle: 'Number Retention',
    gameNumberDesc: 'Remember digits and gently tap them back',
    gameFacesTitle: 'Faces & Family',
    gameFacesDesc: 'Recognize your loving children and caregivers',
    gameStoryTitle: 'Story Recall (Synchronized)',
    gameStoryDesc: 'Listen to folklore with real-time word highlighting',
    
    // Game Common
    tapToPlay: 'Play Now',
    score: 'Score',
    level: 'Level',
    moves: 'Moves',
    matched: 'Matched',
    wellDone: 'Wonderful job!',
    tryAgain: 'Take your time, let us try again',
    playAgain: 'Play Again',
    backToGames: 'Back to Games',
    
    // Daily Mood Check-in
    moodGreeting: 'Good morning',
    moodTitle: 'How does your heart feel today?',
    moodSubtitle: 'Tap the face that feels closest to you right now:',
    moodBannerPrompt: 'How are you feeling today? Tap to share with Remi 🌸',
    mood1: 'Tired or Sad',
    mood2: 'A Little Low',
    mood3: 'Peaceful & Okay',
    mood4: 'Good & Calm',
    mood5: 'Joyful & Bright',
    askLater: 'Ask me later',
    
    // Schedule
    scheduleTitle: 'Today’s Gentle Schedule',
    scheduleSubtitle: 'One gentle step at a time. No rush, everything at your own peaceful pace.',
    scheduleProgressLabel: 'Progress Today:',
    scheduleReadAloud: 'Remi Read Schedule',
    scheduleMarkDone: '○ Mark Done',
    scheduleCompleted: '✓ Done',
    
    // Memories
    memoriesTitle: 'My Family Memories',
    memoriesSubtitle: 'Look at cherished photos and listen as Remi reads each story aloud.',
    addMemoryBtn: '➕ Add a Memory',
    memoriesReadAloud: '🎙️ Remi Read Aloud',
    prevMemory: '⬅️ Previous Memory',
    nextMemory: 'Next Memory ➡️',
    
    // Breathing & Calm
    breathingTitle: 'Calm Breath & Relaxation',
    breathingSubtitle: 'Gentle breathing rhythms and hand stretches to bring comfort.',
    remiVoiceGuide: '🎙️ Remi Voice Guide',
    startRhythm: '▶️ Start Calming Rhythm',
    pauseRhythm: '⏸️ Pause',
    exitCalmMode: '🌸 Exit Calm Mode',
    
    // Confusion Help
    confusionBtn: 'I’m Confused 💙',
    confusionTitle: 'You are safe',
    confusionSafe: 'Take a slow, gentle breath. There is no rush at all.',
    goHome: '🏠 Go to Home Screen',
    stayHere: 'Stay Right Here 🌸',
    
    // SOS Emergency
    sosButton: 'EMERGENCY SOS',
    sosQuestion: 'Do you need help right now?',
    sosYes: '🚨 YES, CALL FOR HELP',
    sosCancel: 'No, I am okay 🌸',
    
    // Reminders
    remindersTitle: 'Daily Routine & Medicines',
    remindersSubtitle: 'Big, clear reminders for a calm and healthy day',
    markDone: 'Mark as Done',
    completed: 'Done for Today',
    dueAt: 'Scheduled for',
    statusPending: 'Upcoming',
    statusDone: 'Completed',
    statusOverdue: 'Attention Needed',
    
    // Escalations
    tier1GentleTitle: 'Gentle Nudge 🌸',
    tier1GentleMsg: 'Time for your daily care. Please tap done when you are comfortable.',
    tier2EscalatedTitle: 'Friendly Reminder ⏰',
    tier2EscalatedMsg: 'You have not taken your medicine yet. Please tap done when ready 🙏',
    tier3CaregiverBadge: 'Overdue Alert',
    tier3CaregiverModalTitle: '⚠️ Caregiver Escalation Alert',
    tier3CaregiverAcknowledge: 'I have checked on the patient',
    simulateEscalation: 'Simulate Alert Escalation (Demo)',
    
    // Companion
    companionTitle: 'Remi — Your Loving Companion',
    companionSubtitle: 'Warm conversation, melodious songs, and gentle reassurance',
    typePlaceholder: 'Speak or type to Remi (try: "Sing me a song")...',
    send: 'Send',
    speak: 'Speak',
    singSong: 'Sing a Song 🎵',
    listening: 'Listening to your voice...',
    readAloud: 'Read Aloud',
    apiKeyPrompt: 'Claude API Key (Optional — Remi offline companion active)',
    saveKey: 'Save Key',
    voiceSpeed: 'Voice Speed',
    speedSlow: '0.75x (Gentle / Soothing)',
    speedNormal: '1.0x (Normal)',
    
    // Caregiver Hub
    caregiverTitle: 'Caregiver Monitoring Center',
    caregiverSubtitle: 'Real-time patient cognitive well-being, adherence, and safety',
    patientOverview: 'Patient Clinical Overview',
    gameProgress: 'Cognitive Scores & Memory Trends',
    weeklyAdherence: 'Weekly Routine Completion',
    activeAlerts: 'Active Safety Alerts',
    noAlerts: 'Everything is peaceful and on track.',
    doctorInfo: 'Attending Physician',
    emergencyContact: 'Emergency Kin Contact',
    prescribedMedicines: 'Current Prescriptions'
  },

  'hi-IN': {
    appName: 'Evermind',
    appTagline: 'हमेशा आपके साथ।',
    appSubtitle: 'संज्ञानात्मक देखभाल और स्मृति साथी',
    rolePatient: 'वरिष्ठ सदस्य / रोगी',
    roleCaregiver: 'परिवार का देखभालकर्ता',
    welcomeGreeting: 'नमस्ते! आइए आज आपके मन को शांत और स्मृति को सक्रिय रखें।',
    selectRole: 'आज ऐप का उपयोग कौन कर रहा है?',
    patientNameLabel: 'आपका शुभ नाम',
    caregiverNameLabel: 'देखभालकर्ता का नाम',
    ageLabel: 'उम्र',
    preferredLanguage: 'अपनी पसंदीदा भाषा चुनें',
    enterApp: 'सत्र शुरू करें',
    logout: 'प्रोफ़ाइल बदलें',
    emergencyOverride: 'आपातकालीन भाषा बदलाव (Override)',
    emergencyOverrideDesc: 'भ्रम की स्थिति में तुरंत पूरे ऐप की भाषा बदलें',
    langSwitched: 'भाषा तुरंत बदल दी गई है:',
    voicePaused: 'आवाज़ रुकी — पुनः जुड़ रही है…',
    retryingVoice: 'सुरक्षित स्वतः प्रयास जारी है',
    
    // Navigation & Drawer
    menuTitle: 'मेन्यू',
    navGames: 'दिमागी खेल',
    navCompanion: 'रेमी साथी (Remi)',
    navSchedule: 'आज की दिनचर्या',
    navMemories: 'मेरी यादें',
    navBreathing: 'शांत श्वास व विश्राम',
    navReminders: 'दैनिक दिनचर्या',
    navDashboard: 'देखभाल केंद्र',
    textSizeLabel: 'अक्षर का आकार',
    textSizeNormal: 'सामान्य (A)',
    textSizeLarge: 'बड़ा (AA)',
    textSizeXLarge: 'बहुत बड़ा (AAA)',
    themeLabel: 'रंग थीम',
    calmModeBtn: 'शांत वातावरण में प्रवेश करें 🌿',
    emergencyContactTitle: 'आपातकालीन संपर्क',
    logoutBtn: 'लॉग आउट',
    
    // Mini-Games
    gamesTitle: 'संज्ञानात्मक अभ्यास',
    gamesSubtitle: 'सुखद यादों और संस्कृति से जुड़े दिमागी खेल',
    gameMemoryTitle: 'स्मृति मिलान (Memory Match)',
    gameMemoryDesc: 'काजीरंगा, बिहू और पारंपरिक चित्रों को पहचानें और मिलाएं',
    gameDailyTitle: 'सुबह की दिनचर्या (Daily Recall)',
    gameDailyDesc: 'सुबह की अच्छी आदतों को सही क्रम में लगाएं',
    gameNumberTitle: 'संख्या याद रखें (Number Retention)',
    gameNumberDesc: 'संख्या देखकर याद रखें और बड़े कीपैड पर दबाएं',
    gameFacesTitle: 'अपने और परिवार (Faces & Family)',
    gameFacesDesc: 'परिवार के सदस्यों और प्रियजनों को पहचानें',
    gameStoryTitle: 'कहानी और यादें (Synchronized Story)',
    gameStoryDesc: 'शब्दों के चमकने के साथ शांत लोककथा सुनें',
    
    // Game Common
    tapToPlay: 'खेलें',
    score: 'अंक',
    level: 'स्तर',
    moves: 'प्रयास',
    matched: 'मिलाया',
    wellDone: 'बहुत ही सुंदर!',
    tryAgain: 'कोई जल्दी नहीं, फिर से कोशिश करें',
    playAgain: 'दोबारा खेलें',
    backToGames: 'खेल सूची पर जाएं',
    
    // Daily Mood Check-in
    moodGreeting: 'सुप्रभात',
    moodTitle: 'आज आपका मन कैसा है?',
    moodSubtitle: 'वह चेहरा चुनें जो आपके दिल के सबसे करीब महसूस हो रहा हो:',
    moodBannerPrompt: 'आज आपका मन कैसा है? रेमी से साझा करें 🌸',
    mood1: 'थका या उदास',
    mood2: 'थोड़ा सुस्त',
    mood3: 'शांत व सामान्य',
    mood4: 'अच्छा व प्रसन्न',
    mood5: 'बहुत खुश व प्रफुल्लित',
    askLater: 'बाद में पूछें',
    
    // Schedule
    scheduleTitle: 'आज की शांत दिनचर्या',
    scheduleSubtitle: 'धीरे-धीरे एक-एक कदम। कोई जल्दी नहीं, सब कुछ आपकी अपनी गति से।',
    scheduleProgressLabel: 'आज की प्रगति:',
    scheduleReadAloud: 'रेमी से दिनचर्या सुनें',
    scheduleMarkDone: '○ संपन्न करें',
    scheduleCompleted: '✓ संपन्न',
    
    // Memories
    memoriesTitle: 'मेरी पारिवारिक यादें',
    memoriesSubtitle: 'प्रिय तस्वीरों को देखें और रेमी के साथ हर प्यारी याद को सुनें।',
    addMemoryBtn: '➕ नई याद जोड़ें',
    memoriesReadAloud: '🎙️ रेमी से सुनें',
    prevMemory: '⬅️ पिछली याद',
    nextMemory: 'अगली याद ➡️',
    
    // Breathing & Calm
    breathingTitle: 'शांत श्वास व विश्राम',
    breathingSubtitle: 'मन और शरीर को सुखद शांति देने के लिए कोमल श्वास अभ्यास।',
    remiVoiceGuide: '🎙️ रेमी की आवाज़ में सुनें',
    startRhythm: '▶️ अभ्यास शुरू करें',
    pauseRhythm: '⏸️ रोकें',
    exitCalmMode: '🌸 शांत वातावरण से बाहर आएं',
    
    // Confusion Help
    confusionBtn: 'मदद चाहिए 💙',
    confusionTitle: 'आप बिल्कुल सुरक्षित हैं',
    confusionSafe: 'एक गहरी और शांत सांस लें। कोई जल्दबाज़ी नहीं है।',
    goHome: '🏠 मुख्य स्क्रीन पर जाएं',
    stayHere: 'यहीं रहें 🌸',
    
    // SOS Emergency
    sosButton: 'आपातकालीन SOS',
    sosQuestion: 'क्या आपको अभी सहायता चाहिए?',
    sosYes: '🚨 हाँ, सहायता के लिए फोन करें',
    sosCancel: 'नहीं, मैं ठीक हूँ 🌸',
    
    // Reminders
    remindersTitle: 'दवाइयां और दैनिक दिनचर्या',
    remindersSubtitle: 'समय पर दवा और देखभाल के लिए बड़े अक्षरों में अनुस्मारक',
    markDone: 'पूरा हो गया दबाएं',
    completed: 'आज के लिए संपन्न',
    dueAt: 'निर्धारित समय:',
    statusPending: 'आगामी',
    statusDone: 'संपन्न',
    statusOverdue: 'ध्यान दें',
    
    // Escalations
    tier1GentleTitle: 'प्यारा सा अनुस्मारक 🌸',
    tier1GentleMsg: 'आपकी दवा और देखभाल का समय हो गया है। लेने के बाद बटन दबाएं।',
    tier2EscalatedTitle: 'विशेष ध्यान दें ⏰',
    tier2EscalatedMsg: 'आपने अभी तक दवा नहीं ली है। कृपया आराम से दवा ले लें 🙏',
    tier3CaregiverBadge: 'अति-महत्वपूर्ण अलर्ट',
    tier3CaregiverModalTitle: '⚠️ देखभालकर्ता के लिए आपातकालीन सूचना',
    tier3CaregiverAcknowledge: 'मैंने रोगी की जांच कर ली है',
    simulateEscalation: 'अलर्ट गति परीक्षण (Demo)',
    
    // Companion
    companionTitle: 'रेमी (Remi) — आपकी स्नेही साथी',
    companionSubtitle: 'प्यारी बातें, मधुर गीत और मन को सुकून देने वाले किस्से',
    typePlaceholder: 'मुझसे कुछ कहें या गाना गाने को कहें...',
    send: 'भेजें',
    speak: 'बोलें',
    singSong: 'गाना सुनाओ 🎵',
    listening: 'आपकी आवाज़ सुन रही हूँ...',
    readAloud: 'सुनें',
    apiKeyPrompt: 'Claude API Key (वैकल्पिक — ऑफ़लाइन भी रेमी सक्रिय है)',
    saveKey: 'सुरक्षित करें',
    voiceSpeed: 'आवाज़ गति',
    speedSlow: '0.75x (धीमी/मधुर)',
    speedNormal: '1.0x (सामान्य)',
    
    // Caregiver Hub
    caregiverTitle: 'देखभालकर्ता डैशबोर्ड',
    caregiverSubtitle: 'वरिष्ठ सदस्य का स्वास्थ्य, खेल प्रगति और सुरक्षा',
    patientOverview: 'रोगी का विवरण',
    gameProgress: 'स्मृति खेल का स्कोर',
    weeklyAdherence: 'साप्ताहिक दिनचर्या पालन',
    activeAlerts: 'सक्रिय चेतावनियां',
    noAlerts: 'सब कुछ शांत और सुरक्षित है।',
    doctorInfo: 'डॉक्टर का विवरण',
    emergencyContact: 'आपातकालीन संपर्क',
    prescribedMedicines: 'दैनिक दवाओं की सूची'
  },

  'as-IN': {
    appName: 'Evermind (এভাৰমাইণ্ড)',
    appTagline: 'সদায় আপোনাৰ লগত।',
    appSubtitle: 'উত্তৰ-পূবৰ প্ৰবীণসকলৰ বাবে স্মৃতি সংগী',
    rolePatient: 'মই প্ৰবীণ সদস্য',
    roleCaregiver: 'পৰিয়ালৰ পৰিচর্যাকাৰী',
    welcomeGreeting: 'নমস্কাৰ! আজি আপোনাৰ মন আৰু স্মৃতিৰ যতন লওঁ আহক।',
    selectRole: 'আজি এইটো কোনে ব্যৱহাৰ কৰিছে?',
    patientNameLabel: 'আপোনাৰ শুভ নাম',
    caregiverNameLabel: 'পৰিচর্যাকাৰীৰ নাম',
    ageLabel: 'বয়স',
    preferredLanguage: 'আপোনাৰ ভাষা বাছনি কৰক',
    enterApp: 'সেশন আৰম্ভ কৰক',
    logout: 'প্ৰফাইল সলনি কৰক',
    emergencyOverride: 'জৰুৰীকালীন ভাষা সলনি (Override)',
    emergencyOverrideDesc: 'বিভ্ৰান্তি হ’লে তৎক্ষণাত গোটেই এপটোৰ ভাষা সলনি কৰক',
    langSwitched: 'ভাষা তৎক্ষণাত সলনি কৰা হ’লঃ',
    voicePaused: 'কণ্ঠস্বৰ ক্ষন্তেক ৰৈছে — পুনৰ সংযোগ হৈছে…',
    retryingVoice: 'স্বয়ংক্রিয়ভাৱে পুনৰ চেষ্টা কৰা হৈছে',
    
    // Navigation & Drawer
    menuTitle: 'মেনু',
    navGames: 'স্মৃতি খেলসমূহ',
    navCompanion: 'ৰেমি সংগী (Remi)',
    navSchedule: 'আজিৰ দিনলিপি',
    navMemories: 'মোৰ পুৰণি স্মৃতি',
    navBreathing: 'শান্ত উশাহ-নিশাহ',
    navReminders: 'দৈনিক সোঁৱৰণী',
    navDashboard: 'পৰিচর্যাকাৰী কেন্দ্ৰ',
    textSizeLabel: 'আখৰৰ আকাৰ',
    textSizeNormal: 'সাধাৰণ (A)',
    textSizeLarge: 'ডাঙৰ (AA)',
    textSizeXLarge: 'অতি ডাঙৰ (AAA)',
    themeLabel: 'ৰং বাছনি',
    calmModeBtn: 'শান্ত পৰিৱেশলৈ যাওক 🌿',
    emergencyContactTitle: 'জৰুৰীকালীন যোগাযোগ',
    logoutBtn: 'লগ আউট',
    
    // Mini-Games
    gamesTitle: 'মগজুৰ আনন্দদায়ক খেল',
    gamesSubtitle: 'অসম আৰু উত্তৰ-পূবৰ পৰম্পৰাগত স্মৃতি খেল',
    gameMemoryTitle: 'স্মৃতি মিলাওঁ আহক',
    gameMemoryDesc: 'বিহু, কাজিৰঙাৰ গঁড় আৰু চাহ বাগিচাৰ ছবি মিলাওক',
    gameDailyTitle: 'ৰাতিপুৱাৰ দৈনন্দিন নিয়ম',
    gameDailyDesc: 'পুৱাৰ নিয়মবোৰ শুদ্ধ ক্ৰমত সজাওক',
    gameNumberTitle: 'সংখ্যা মনত ৰখা',
    gameNumberDesc: 'সংখ্যাটো মনত ৰাখি ডাঙৰ বুটামত টিপক',
    gameFacesTitle: 'আপোন মানুহ আৰু পৰিয়াল',
    gameFacesDesc: 'আপোনাৰ মৰমৰ পৰিয়ালৰ মুখ চিনি পাওক',
    gameStoryTitle: 'সাধুকথা আৰু সোঁৱৰণ (Synchronized)',
    gameStoryDesc: 'শব্দবোৰ উজ্জ্বল হোৱাৰ লগে লগে সাধু শুনক',
    
    // Game Common
    tapToPlay: 'খেল আৰম্ভ কৰক',
    score: 'নম্বৰ',
    level: 'স্তৰ',
    moves: 'প্ৰচেষ্টা',
    matched: 'মিলালে',
    wellDone: 'খুব ধুনীয়া হৈছে!',
    tryAgain: 'একো চিন্তা নকৰিব, আকৌ চেষ্টা কৰোঁ আহক',
    playAgain: 'আকৌ খেলক',
    backToGames: 'খেলৰ তালিকালৈ যাওক',
    
    // Daily Mood Check-in
    moodGreeting: 'শুভ প্ৰভাত',
    moodTitle: 'আজি আপোনাৰ মনটো কেনে লাগিছে?',
    moodSubtitle: 'আপোনাৰ মনৰ অনুভৱৰ লগত মিলা ছবিখন বাছক:',
    moodBannerPrompt: 'আজি মনটো কেনে লাগিছে? ৰেমিৰ লগত ভাগ কৰক 🌸',
    mood1: 'ভাগৰুৱা বা মন মৰা',
    mood2: 'অলপ বেয়া',
    mood3: 'শান্ত আৰু ঠিকে আছোঁ',
    mood4: 'ভাল আৰু শান্ত',
    mood5: 'বৰ আনন্দিত',
    askLater: 'পাছত সুধিব',
    
    // Schedule
    scheduleTitle: 'আজিৰ শান্ত দিনলিপি',
    scheduleSubtitle: 'লাহে লাহে এটা এটাকৈ কাম। কোনো খৰখেদা নাই, আপোনাৰ নিজৰ গতিৰে।',
    scheduleProgressLabel: 'আজিৰ অগ্ৰগতি:',
    scheduleReadAloud: 'ৰেমিৰ মুখত দিনলিপি শুনক',
    scheduleMarkDone: '○ সম্পূৰ্ণ কৰক',
    scheduleCompleted: '✓ হৈ গ’ল',
    
    // Memories
    memoriesTitle: 'মোৰ পৰিয়ালৰ স্মৃতি',
    memoriesSubtitle: 'মৰমৰ ছবিবোৰ চাওক আৰু ৰেমিৰ পৰা কাহিনী শুনক।',
    addMemoryBtn: '➕ নতুন স্মৃতি যোগ কৰক',
    memoriesReadAloud: '🎙️ ৰেমিৰ মুখত শুনক',
    prevMemory: '⬅️ পূৰ্বৰ স্মৃতি',
    nextMemory: 'পৰৱৰ্তী স্মৃতি ➡️',
    
    // Breathing & Calm
    breathingTitle: 'শান্ত উশাহ-নিশাহ আৰু আৰাম',
    breathingSubtitle: 'মন আৰু শৰীৰ জুৰোৱা উশাহ-নিশাহৰ কোমল অভ্যাস।',
    remiVoiceGuide: '🎙️ ৰেমিৰ কণ্ঠত শুনক',
    startRhythm: '▶️ আৰম্ভ কৰক',
    pauseRhythm: '⏸️ ৰখাওক',
    exitCalmMode: '🌸 শান্ত পৰিৱেশৰ পৰা ওলাই আহক',
    
    // Confusion Help
    confusionBtn: 'মই বিচলিত 💙',
    confusionTitle: 'আপুনি সম্পূৰ্ণ সুৰক্ষিত',
    confusionSafe: 'দীঘলকৈ শান্তভাৱে উশাহ লওক। কোনো চিন্তা নকৰিব।',
    goHome: '🏠 প্ৰধান পৃষ্ঠালৈ যাওক',
    stayHere: 'ইয়াতেই থাকোঁ 🌸',
    
    // SOS Emergency
    sosButton: 'জৰুৰীকালীন SOS',
    sosQuestion: 'আপোনাক এতিয়াই সহায়ৰ প্ৰয়োজন নেকি?',
    sosYes: '🚨 হয়, সহায়ৰ বাবে ফোন কৰক',
    sosCancel: 'নহয়, মই ঠিকে আছোঁ 🌸',
    
    // Reminders
    remindersTitle: 'ঔষধ আৰু দিনচৰ্যাৰ সোঁৱৰণী',
    remindersSubtitle: 'সময়মতে ঔষধ আৰু পানী খাবলৈ ডাঙৰ আখৰৰ সোঁৱৰণী',
    markDone: 'সম্পূৰ্ণ হ’ল বুলি টিপক',
    completed: 'আজিৰ বাবে সম্পূৰ্ণ হ’ল',
    dueAt: 'নিৰ্ধাৰিত সময়ঃ',
    statusPending: 'বাকী আছে',
    statusDone: 'সম্পূৰ্ণ',
    statusOverdue: 'সময় পাৰ হৈছে',
    
    // Escalations
    tier1GentleTitle: 'মৰমৰ সোঁৱৰণী 🌸',
    tier1GentleMsg: 'আপোনাৰ ঔষধ খোৱাৰ সময় হ’ল। অনুগ্ৰহ কৰি খোৱাৰ পাছত বুটামত টিপক।',
    tier2EscalatedTitle: 'বিশেষ সোঁৱৰণী ⏰',
    tier2EscalatedMsg: 'আপুনি এতিয়াও ঔষধ খোৱা নাই। অনুগ্ৰহ কৰি এতিয়াই ঔষধ খাই লওক 🙏',
    tier3CaregiverBadge: 'জৰুৰী সতৰ্কতা',
    tier3CaregiverModalTitle: '⚠️ পৰিচর্যাকাৰীৰ বাবে সতৰ্কবাৰ্তা',
    tier3CaregiverAcknowledge: 'মই ৰোগীক পৰীক্ষা কৰিলোঁ',
    simulateEscalation: 'সতৰ্কতা পৰীক্ষা কৰক (Demo)',
    
    // Companion
    companionTitle: 'ৰেমি (Remi) — আপোনাৰ মৰমৰ সংগী',
    companionSubtitle: 'শান্ত বাৰ্তালাপ, মিঠা গান আৰু পুৰণি সাধু',
    typePlaceholder: 'ৰেমিৰ লগত কথা পাতক বা গান গাবলৈ কওক...',
    send: 'পঠিয়াওক',
    speak: 'কওক',
    singSong: 'গান গোৱা 🎵',
    listening: 'আপোনাৰ কথা শুনি থকা হৈছে...',
    readAloud: 'পঢ়ি শুনাওক',
    apiKeyPrompt: 'Claude API Key (ঐচ্ছিক — অফলাইনত সহায়ক সক্ৰিয়)',
    saveKey: 'সংৰক্ষণ কৰক',
    voiceSpeed: 'কণ্ঠৰ গতি',
    speedSlow: '0.75x (কোমল/শান্ত)',
    speedNormal: '1.0x (স্বাভাৱিক)',
    
    // Caregiver Hub
    caregiverTitle: 'পৰিচর্যাকাৰী ডেচব’ৰ্ড',
    caregiverSubtitle: 'প্ৰবীণজনৰ স্বাস্থ্য, খেলৰ অগ্ৰগতি আৰু সতৰ্কতা',
    patientOverview: 'ৰোগীৰ তথ্য',
    gameProgress: 'স্মৃতি খেলৰ অগ্ৰগতি',
    weeklyAdherence: 'সাপ্তাহিক নিয়ম পালন',
    activeAlerts: 'সক্ৰিয় সতৰ্কতা',
    noAlerts: 'সকলো শান্তিপূৰ্ণভাৱে চলি আছে।',
    doctorInfo: 'চিকিৎসকৰ তথ্য',
    emergencyContact: 'জৰুৰীকালীন যোগাযোগ',
    prescribedMedicines: 'দৈনিক ঔষধৰ তালিকা'
  },

  'bn-IN': {
    appName: 'Evermind (এভারমাইন্ড)',
    appTagline: 'সর্বদা আপনার সাথে।',
    appSubtitle: 'স্মৃতি ও স্বাস্থ্য যত্ন সঙ্গী',
    rolePatient: 'আমি প্রবীণ সদস্য',
    roleCaregiver: 'পরিবারের যত্নশীল সদস্য',
    welcomeGreeting: 'নমস্কার! আসুন আজ আপনার মন ও স্মৃতিকে সতেজ রাখি।',
    selectRole: 'আজ এটি কে ব্যবহার করছেন?',
    patientNameLabel: 'আপনার ভালো নাম',
    caregiverNameLabel: 'যত্নদাতার নাম',
    ageLabel: 'বয়স',
    preferredLanguage: 'পছন্দের ভাষা বেছে নিন',
    enterApp: 'সেশন শুরু করুন',
    logout: 'প্রোফাইল পরিবর্তন',
    emergencyOverride: 'জরুরীকালীন ভাষা বদল (Override)',
    emergencyOverrideDesc: 'বিভ্রান্তি হলে এক ক্লিকে পুরো অ্যাপের ভাষা বদলে ফেলুন',
    langSwitched: 'ভাষা তৎক্ষণাৎ পরিবর্তন করা হয়েছেঃ',
    voicePaused: 'ভয়েস সংযোগ স্থগিত — পুনরায় যুক্ত হচ্ছে…',
    retryingVoice: 'স্বয়ংক্রিয়ভাবে পুনরায় চেষ্টা করা হচ্ছে',
    
    // Navigation & Drawer
    menuTitle: 'মেনু',
    navGames: 'স্মৃতি খেলাসমূহ',
    navCompanion: 'রেমি সঙ্গী (Remi)',
    navSchedule: 'আজকের রুটিন',
    navMemories: 'আমার পারিবারিক স্মৃতি',
    navBreathing: 'শান্ত শ্বাস-প্রশ্বাস',
    navReminders: 'দৈনিক তাগিদ',
    navDashboard: 'যত্নকারী ড্যাশবোর্ড',
    textSizeLabel: 'অক্ষরের মাপ',
    textSizeNormal: 'স্বাভাবিক (A)',
    textSizeLarge: 'বড় (AA)',
    textSizeXLarge: 'অনেক বড় (AAA)',
    themeLabel: 'রঙের থিম',
    calmModeBtn: 'শান্ত পরিবেশে প্রবেশ করুন 🌿',
    emergencyContactTitle: 'জরুরী যোগাযোগ',
    logoutBtn: 'লগ আউট',
    
    // Mini-Games
    gamesTitle: 'মস্তিষ্কের সুন্দর খেলা',
    gamesSubtitle: 'শান্তিময় ও মন ভালো করা ঐতিহ্যবাহী খেলা',
    gameMemoryTitle: 'স্মৃতি মেলানো',
    gameMemoryDesc: 'বিহু, কাজিরাঙ্গার গণ্ডার ও চা বাগানের ছবি মেলান',
    gameDailyTitle: 'সকালের দৈনন্দিন অভ্যাস',
    gameDailyDesc: 'সকালের সুন্দর নিয়মগুলো সঠিক ক্রমে সাজান',
    gameNumberTitle: 'সংখ্যা মনে রাখা',
    gameNumberDesc: 'সংখ্যা দেখে মনে রাখুন এবং বড় বোতামে চাপুন',
    gameFacesTitle: 'আপনজন ও পরিবার',
    gameFacesDesc: 'আপনার পরিবারের স্নেহময় মুখ চিনে নিন',
    gameStoryTitle: 'গল্প ও স্মৃতি রোমন্থন (Synchronized)',
    gameStoryDesc: 'প্রতিটি শব্দ উজ্জ্বল হওয়ার সাথে সাথে গল্প শুনুন',
    
    // Game Common
    tapToPlay: 'খেলা শুরু করুন',
    score: 'স্কোর',
    level: 'ধাপ',
    moves: 'চেষ্টা',
    matched: 'মিলেছে',
    wellDone: 'চমৎকার হয়েছে!',
    tryAgain: 'কোনো তাড়াহুড়ো নেই, আবার চেষ্টা করি',
    playAgain: 'আবার খেলুন',
    backToGames: 'খেলার তালিকায় ফিরুন',
    
    // Daily Mood Check-in
    moodGreeting: 'সুপ্রভাত',
    moodTitle: 'আজ আপনার মন কেমন আছে?',
    moodSubtitle: 'আপনার অনুভূতির সাথে মেলানো মুখটি বেছে নিন:',
    moodBannerPrompt: 'আজ মন কেমন লাগছে? রেমির সাথে বলুন 🌸',
    mood1: 'ক্লান্ত বা বিষণ্ণ',
    mood2: 'একটু মনমরা',
    mood3: 'শান্ত ও ঠিকঠাক',
    mood4: 'ভালো ও শান্ত',
    mood5: 'খুব আনন্দিত',
    askLater: 'পরে জানাব',
    
    // Schedule
    scheduleTitle: 'আজকের শান্ত রুটিন',
    scheduleSubtitle: 'ধীরে ধীরে একটা একটা করে কাজ। কোনো তাড়া নেই, নিজের গতিতে চলুন।',
    scheduleProgressLabel: 'আজকের অগ্রগতি:',
    scheduleReadAloud: 'রেমির মুখে রুটিন শুনুন',
    scheduleMarkDone: '○ সম্পন্ন করুন',
    scheduleCompleted: '✓ সম্পন্ন',
    
    // Memories
    memoriesTitle: 'আমার পারিবারিক স্মৃতি',
    memoriesSubtitle: 'প্রিয় ছবিগুলো দেখুন এবং রেমির মিষ্টি কণ্ঠে গল্প শুনুন।',
    addMemoryBtn: '➕ নতুন স্মৃতি যোগ করুন',
    memoriesReadAloud: '🎙️ রেমির গলায় শুনুন',
    prevMemory: '⬅️ পূর্বের স্মৃতি',
    nextMemory: 'পরের স্মৃতি ➡️',
    
    // Breathing & Calm
    breathingTitle: 'শান্ত শ্বাস-প্রশ্বাস ও বিশ্রাম',
    breathingSubtitle: 'মন ও শরীর শান্ত করার সুন্দর শ্বাস-প্রশ্বাসের ছন্দ।',
    remiVoiceGuide: '🎙️ রেমির কণ্ঠে নির্দেশ শুনুন',
    startRhythm: '▶️ শুরু করুন',
    pauseRhythm: '⏸️ বিরতি',
    exitCalmMode: '🌸 শান্ত পরিবেশ থেকে প্রস্থান',
    
    // Confusion Help
    confusionBtn: 'সাহায্য চাই 💙',
    confusionTitle: 'আপনি সম্পূর্ণ নিরাপদ',
    confusionSafe: 'ধীরে ধীরে শান্তভাবে শ্বাস নিন। কোনো তাড়াহুড়ো নেই।',
    goHome: '🏠 মূল পাতায় যান',
    stayHere: 'এখানেই থাকুন 🌸',
    
    // SOS Emergency
    sosButton: 'জরুরী SOS',
    sosQuestion: 'আপনার কি এখনই সাহায্যের প্রয়োজন?',
    sosYes: '🚨 হ্যাঁ, সাহায্যের জন্য ফোন করুন',
    sosCancel: 'না, আমি ঠিক আছি 🌸',
    
    // Reminders
    remindersTitle: 'ওষুধ ও দৈনন্দিন রুটিন',
    remindersSubtitle: 'সুস্থ থাকার জন্য বড় অক্ষরের পরিষ্কার তাগিদ',
    markDone: 'সম্পন্ন হয়েছে চাপুন',
    completed: 'আজকের মতো শেষ হয়েছে',
    dueAt: 'নির্ধারিত সময়ঃ',
    statusPending: 'আসছে',
    statusDone: 'সম্পন্ন',
    statusOverdue: 'জরুরী নজর দিন',
    
    // Escalations
    tier1GentleTitle: 'স্নেহভরা তাগিদ 🌸',
    tier1GentleMsg: 'আপনার ওষুধ খাওয়ার সময় হয়েছে। খাওয়া হলে বোতামে চাপ দিন।',
    tier2EscalatedTitle: 'বিশেষ তাগিদ ⏰',
    tier2EscalatedMsg: 'আপনি এখনও ওষুধ খাননি। অনুগ্রহ করে এখনই খেয়ে নিন 🙏',
    tier3CaregiverBadge: 'জরুরী সতর্কতা',
    tier3CaregiverModalTitle: '⚠️ যত্নদাতার জন্য জরুরী অ্যালার্ট',
    tier3CaregiverAcknowledge: 'আমি রোগীর কাছে গিয়ে দেখেছি',
    simulateEscalation: 'অ্যালার্ট পরীক্ষা করুন (Demo)',
    
    // Companion
    companionTitle: 'রেমি (Remi) — আপনার স্নেহের সাথী',
    companionSubtitle: 'মধুর গান, শান্ত আলাপচারিতা ও ভালোবাসার দিকনির্দেশনা',
    typePlaceholder: 'রেমিকে মনের কথা বলুন বা গান গাইতে বলুন...',
    send: 'পাঠান',
    speak: 'বলুন',
    singSong: 'গান শোনাও 🎵',
    listening: 'আপনার কথা শুনছি...',
    readAloud: 'পড়ে শোনান',
    apiKeyPrompt: 'Claude API Key (ঐচ্ছিক — অফলাইনেও বুদ্ধিমত্তা সক্রিয়)',
    saveKey: 'সংরক্ষণ করুন',
    voiceSpeed: 'কণ্ঠের গতি',
    speedSlow: '0.75x (ধীর/শান্ত)',
    speedNormal: '1.0x (স্বাভাবিক)',
    
    // Caregiver Hub
    caregiverTitle: 'যত্নকারী ড্যাশবোর্ড',
    caregiverSubtitle: 'প্রবীণ সদস্যের দৈনিক অগ্রগতি, ওষুধ ও নিরাপত্তা',
    patientOverview: 'রোগীর বিবরণ',
    gameProgress: 'স্মৃতি খেলার স্কোর',
    weeklyAdherence: 'সাপ্তাহিক রুটিন পালন',
    activeAlerts: 'সক্রিয় সতর্কতা',
    noAlerts: 'সবকিছু খুব সুন্দর ও স্বাভাবিক আছে।',
    doctorInfo: 'চিকিৎসকের বিবরণ',
    emergencyContact: 'জরুরী যোগাযোগ',
    prescribedMedicines: 'দৈনিক ওষুধের তালিকা'
  },

  'mni-IN': {
    appName: 'Evermind',
    appTagline: 'ꯃꯇꯝ ꯄꯨꯝꯅꯃꯛꯇ ꯅꯍꯥꯛꯀ ꯂꯣꯏꯅꯅꫫ',
    appSubtitle: 'ꯋꯥꯈꯜ ꯅꯨꯡꯉꯥꯏꯅꯕ ꯑꯃꯁꯨꯡ ꯅꯤꯡꯁꯤꯡꯕ ꯃꯔꯨꯞ',
    rolePatient: 'ꯑꯩ ꯑꯍꯜ ꯑꯣꯏꯔꯕ ꯃꯤꯑꯣꯏꯅꯤ',
    roleCaregiver: 'ꯏꯃꯨꯡꯒꯤ ꯌꯦꯡꯁꯤꯅꯕꯤꯕ (Caregiver)',
    welcomeGreeting: 'ꯈꯨꯔꯨꯝꯖꯔꯤ! ꯉꯁꯤ ꯅꯍꯥꯛꯀꯤ ꯋꯥꯈꯜ ꯄꯨꯛꯅꯤꯡ ꯅꯨꯡꯉꯥꯏꯍꯟꯁꯤꫫ',
    selectRole: 'ꯉꯁꯤ ꯀꯅꯥꯅ ꯁꯤꯖꯤꯟꯅꯕꯤꯒꯅꯤ?',
    patientNameLabel: 'ꯅꯍꯥꯛꯀꯤ ꯃꯃꯤꯡ',
    caregiverNameLabel: 'ꯌꯦꯡꯁꯤꯅꯕꯤꯕꯒꯤ ꯃꯃꯤꯡ',
    ageLabel: 'ꯆꯍꯤ',
    preferredLanguage: 'ꯂꯣꯟ ꯈꯟꯕꯤꯌꯨ (Language)',
    enterApp: 'ꯁꯦꯁꯟ ꯍꯧꯔꯁꯤ',
    logout: 'ꯄ꯭ꯔꯣꯐꯥꯏꯜ ꯍꯣꯡꯕ',
    emergencyOverride: 'ꯈꯨꯗꯛꯇ ꯂꯣꯟ ꯍꯣꯡꯕ (Emergency Override)',
    emergencyOverrideDesc: 'ꯋꯥꯈꯜ ꯇꯥꯗꯕ ꯃꯇꯝꯗ ꯑꯦꯞ ꯑꯁꯤꯒꯤ ꯂꯣꯟ ꯈꯨꯗꯛꯇ ꯍꯣꯡꯕꯤꯌꯨ',
    langSwitched: 'ꯂꯣꯟ ꯈꯨꯗꯛꯇ ꯍꯣꯡꯈ꯭ꯔꯦঃ',
    voicePaused: 'ꯈꯣꯟꯊꯣꯛ ꯈꯔ ꯂꯦꯞꯈ꯭ꯔꯦ — ꯑꯃꯨꯛ ꯁꯝꯅꯔꯤ…',
    retryingVoice: 'ꯃꯁꯥꯃꯊꯟꯇ ꯍꯣꯠꯅꯔꯤ',
    
    // Navigation & Drawer
    menuTitle: 'ꯃꯦꯅꯨ',
    navGames: 'ꯋꯥꯈꯜꯒꯤ ꯁꯥꯟꯅꯄꯣꯠ',
    navCompanion: 'ꯔꯦꯃꯤ ꯃꯔꯨꯞ (Remi)',
    navSchedule: 'ꯉꯁꯤꯒꯤ ꯊꯕꯛ ꯄꯔꯤꯡ',
    navMemories: 'ꯑꯩꯒꯤ ꯅꯤꯡꯁꯤꯡꯕ',
    navBreathing: 'ꯋꯥꯈꯜ ꯏꯡꯊꯅꯕ ꯁ꯭ꯕꯥꯁ',
    navReminders: 'ꯅꯨꯃꯤꯠꯈꯨꯗꯤꯡꯒꯤ ꯅꯤꯡꯁꯤꯡꯕ',
    navDashboard: 'ꯌꯦꯡꯁꯤꯟꯕꯤꯕꯒꯤ ꯗꯦꯁꯕꯣꯔꯗ',
    textSizeLabel: 'ꯃꯌꯦꯛꯀꯤ ꯑꯆꯧꯕ',
    textSizeNormal: 'ꯃꯌꯥꯏ (A)',
    textSizeLarge: 'ꯑꯆꯧꯕ (AA)',
    textSizeXLarge: 'ꯌꯥꯝꯅ ꯑꯆꯧꯕ (AAA)',
    themeLabel: 'ꯃꯆꯨ',
    calmModeBtn: 'ꯋꯥꯈꯜ ꯏꯡꯊꯍꯟꯕ ꯃꯐꯝ 🌿',
    emergencyContactTitle: 'ꯈꯨꯗꯛꯀꯤ ꯃꯔꯤ-ꯃꯇꯥ',
    logoutBtn: 'ꯊꯣꯛꯄ (Log Out)',
    
    // Mini-Games
    gamesTitle: 'ꯋꯥꯈꯜ ꯄꯨꯛꯅꯤꯡ ꯅꯨꯡꯉꯥꯏꯕ ꯁꯥꯟꯅꯄꯣꯠ',
    gamesSubtitle: 'ꯃꯅꯤꯄꯨꯔꯒꯤ ꯂꯣꯛꯇꯥꯛ, ꯁꯉꯥꯏ ꯑꯃꯁꯨꯡ ꯆꯠꯅꯕꯤꯒ ꯃꯔꯤ ꯂꯩꯅꯕ',
    gameMemoryTitle: 'ꯅꯤꯡꯁꯤꯡ ꯃꯥꯟꯅꯕ ꯊꯤꯕ',
    gameMemoryDesc: 'ꯁꯉꯥꯏ ꯁꯥ, ꯐꯨꯝꯗꯤ ꯑꯃꯁꯨꯡ ꯈꯨꯠꯁꯥ ꯍꯩꯕꯒꯤ ꯃꯁꯛ ꯃꯥꯟꯅꯕ ꯊꯤꯌꯨ',
    gameDailyTitle: 'ꯑꯌꯨꯛꯀꯤ ꯆꯠꯅꯕꯤ ꯅꯤꯡꯁꯤꯡꯕ',
    gameDailyDesc: 'ꯑꯌꯨꯛ ꯍꯧꯒꯠꯄꯗꯒꯤ ꯍꯧꯔꯒ ꯇꯧꯒꯗꯕꯁꯤꯡ ꯃꯊꯪ-ꯃꯅꯥꯎ ꯁꯦꯝꯃꯨ',
    gameNumberTitle: 'ꯃꯁꯤꯡ ꯅꯤꯡꯁꯤꯡꯕ',
    gameNumberDesc: 'ꯃꯁꯤꯡ ꯌꯦꯡꯗꯨꯅ ꯅꯤꯡꯁꯤꯡꯕꯤꯌꯨ ꯑꯃꯁꯨꯡ ꯑꯆꯧꯕ ꯕꯇꯟꯗ ꯅꯝꯕꯤꯌꯨ',
    gameFacesTitle: 'ꯏꯃꯨꯡ-ꯃꯅꯨꯡꯒꯤ ꯃꯁꯛ ꯈꯪꯕ',
    gameFacesDesc: 'ꯅꯨꯡꯁꯤꯔꯕ ꯏꯆꯥ-ꯏꯁꯨ ꯑꯃꯁꯨꯡ ꯃꯔꯨꯞꯁꯤꯡꯕꯨ ꯈꯪꯗꯣꯛꯎ',
    gameStoryTitle: 'ꯋꯥꯔꯤ ꯑꯃꯁꯨꯡ ꯅꯤꯡꯁꯤꯡꯕ (Synchronized)',
    gameStoryDesc: 'ꯋꯥꯍꯩꯁꯤꯡ ꯃꯉꯥꯜ ꯊꯣꯛꯂꯛꯄꯒ ꯂꯣꯏꯅꯅ ꯋꯥꯔꯤ ꯇꯥꯕꯤꯌꯨ',
    
    // Game Common
    tapToPlay: 'ꯁꯥꯟꯅꯕ ꯍꯧꯔꯁꯤ',
    score: 'ꯁ꯭ꯀꯣꯔ',
    level: 'ꯊꯥꯛ',
    moves: 'ꯍꯣꯠꯅꯈꯤꯕ',
    matched: 'ꯃꯥꯟꯅꯔꯦ',
    wellDone: 'ꯌꯥꯝꯅ ꯐꯔꯦ!',
    tryAgain: 'ꯇꯞꯅ ꯇꯧꯕꯤꯌꯨ, ꯑꯃꯨꯛ ꯍꯟꯅ ꯍꯣꯠꯅꯁꯤ',
    playAgain: 'ꯑꯃꯨꯛ ꯁꯥꯟꯅꯁꯤ',
    backToGames: 'ꯁꯥꯟꯅꯄꯣꯠ ꯄꯔꯤꯡꯗ ꯍꯟꯖꯤꯜꯂꯨ',
    
    // Daily Mood Check-in
    moodGreeting: 'ꯈꯨꯔꯨꯝꯖꯔꯤ',
    moodTitle: 'ꯉꯁꯤ ꯅꯍꯥꯛꯀꯤ ꯋꯥꯈꯜ ꯀꯔꯝꯅ ꯇꯧꯔꯤ?',
    moodSubtitle: 'ꯅꯍꯥꯛꯀꯤ ꯋꯥꯈꯜꯒ ꯃꯥꯟꯅꯕ ꯃꯁꯛ ꯑꯗꯨ ꯈꯟꯕꯤꯌꯨ:',
    moodBannerPrompt: 'ꯉꯁꯤ ꯋꯥꯈꯜ ꯀꯔꯝꯅ ꯇꯧꯔꯤ? ꯔꯦꯃꯤꯗ ꯍꯥꯏꯕꯤꯌꯨ 🌸',
    mood1: 'ꯊꯧꯅ ꯂꯩꯇꯕ',
    mood2: 'ꯈꯔ ꯋꯥꯕ',
    mood3: 'ꯏꯡꯅ ꯆꯤꯛꯅ',
    mood4: 'ꯌꯥꯝꯅ ꯐꯩ',
    mood5: 'ꯅꯨꯡꯉꯥꯏꯔꯦ',
    askLater: 'ꯃꯇꯨꯡꯗ ꯍꯪꯕꯤꯌꯨ',
    
    // Schedule
    scheduleTitle: 'ꯉꯁꯤꯒꯤ ꯊꯕꯛ ꯄꯔꯤꯡ',
    scheduleSubtitle: 'ꯇꯞꯅ ꯇꯞꯅ ꯊꯕꯛ ꯇꯧꯁꯤ, ꯌꯥꯡꯅ ꯇꯧꯔꯣꯏꯗꯕꯅꯤꫫ',
    scheduleProgressLabel: 'ꯉꯁꯤ ꯂꯣꯏꯔꯕ ꯊꯕꯛ:',
    scheduleReadAloud: 'ꯔꯦꯃꯤꯅ ꯄꯥꯗꯨꯅ ꯇꯥꯍꯟꯕꯤꯌꯨ',
    scheduleMarkDone: '○ ꯂꯣꯏꯔꯦ ꯍꯥꯏꯅ ꯅꯝꯃꯨ',
    scheduleCompleted: '✓ ꯂꯣꯏꯔꯦ',
    
    // Memories
    memoriesTitle: 'ꯑꯩꯒꯤ ꯏꯃꯨꯡꯒꯤ ꯅꯤꯡꯁꯤꯡꯕ',
    memoriesSubtitle: 'ꯅꯨꯡꯁꯤꯔꯕ ꯐꯣꯇꯣ ꯌꯦꯡꯕꯤꯌꯨ ꯑꯃꯁꯨꯡ ꯋꯥꯔꯤ ꯇꯥꯕꯤꯌꯨꫫ',
    addMemoryBtn: '➕ ꯑꯅꯧꯕ ꯅꯤꯡꯁꯤꯡꯕ ꯍꯥꯞꯆꯤꯟꯕ',
    memoriesReadAloud: '🎙️ ꯔꯦꯃꯤꯅ ꯄꯥꯗꯨꯅ ꯇꯥꯍꯟꯕꯤꯌꯨ',
    prevMemory: '⬅️ ꯃꯃꯥꯡꯒꯤ ꯅꯤꯡꯁꯤꯡꯕ',
    nextMemory: 'ꯃꯊꯪꯒꯤ ꯅꯤꯡꯁꯤꯡꯕ ➡️',
    
    // Breathing & Calm
    breathingTitle: 'ꯋꯥꯈꯜ ꯏꯡꯊꯅꯕ ꯁ꯭ꯕꯥꯁ',
    breathingSubtitle: 'ꯍꯛꯆꯥꯡ ꯑꯃꯁꯨꯡ ꯋꯥꯈꯜ ꯅꯨꯡꯉꯥꯏꯍꯟꯕ ꯁ꯭ꯕꯥꯁꫫ',
    remiVoiceGuide: '🎙️ ꯔꯦꯃꯤꯒꯤ ꯈꯣꯟꯊꯣꯛ',
    startRhythm: '▶️ ꯍꯧꯔꯁꯤ',
    pauseRhythm: '⏸️ ꯂꯦꯞꯄ',
    exitCalmMode: '🌸 ꯃꯐꯝꯁꯤꯗꯒꯤ ꯊꯣꯛꯄ',
    
    // Confusion Help
    confusionBtn: 'ꯑꯩ ꯋꯥꯈꯜ ꯇꯥꯗ꯭ꯔꯦ 💙',
    confusionTitle: 'ꯅꯍꯥꯛ ꯆꯦꯛꯁꯤꯟꯅ ꯂꯩꯔꯤ',
    confusionSafe: 'ꯇꯞꯅ ꯁ꯭ꯕꯥꯁ ꯂꯧꯕꯤꯌꯨꫫ ꯋꯥꯈꯜ ꯆꯥꯎꯈꯠꯄ ꯇꯧꯔꯣꯏꯗꯕꯅꯤꫫ',
    goHome: '🏠 ꯃꯔꯨꯑꯣꯏꯕ ꯃꯐꯝꯗ ꯍꯟꯖꯤꯜꯂꯨ',
    stayHere: 'ꯃꯐꯝꯁꯤꯗ ꯂꯩꯔꯁꯤ 🌸',
    
    // SOS Emergency
    sosButton: 'ꯈꯨꯗꯛꯀꯤ SOS',
    sosQuestion: 'ꯅꯍꯥꯛ ꯍꯧꯖꯤꯛ ꯃꯇꯦꯡ ꯃꯊꯧ ꯇꯥꯕ꯭ꯔꯥ?',
    sosYes: '🚨 ꯍꯣꯏ, ꯃꯇꯦꯡ ꯀꯧꯕꯤꯌꯨ',
    sosCancel: 'ꯅꯠꯇꯦ, ꯑꯩ ꯐꯅ ꯂꯩꯔꯤ 🌸',
    
    // Reminders
    remindersTitle: 'ꯍꯤꯗꯥꯛ ꯑꯃꯁꯨꯡ ꯅꯨꯃꯤꯠꯈꯨꯗꯤꯡꯒꯤ ꯊꯕꯛ',
    remindersSubtitle: 'ꯍꯛꯆꯥꯡ ꯐꯅ ꯂꯩꯅꯕ ꯃꯇꯝ ꯆꯥꯅ ꯅꯤꯡꯁꯤꯡꯍꯟꯕ',
    markDone: 'ꯂꯣꯏꯔꯦ ꯍꯥꯏꯅ ꯅꯝꯃꯨ',
    completed: 'ꯉꯁꯤꯒꯤ ꯂꯣꯏꯔꯦ',
    dueAt: 'ꯆꯥꯒꯗꯕ ꯃꯇꯝঃ',
    statusPending: 'ꯉꯥꯏꯔꯤ',
    statusDone: 'ꯂꯣꯏꯔꯦ',
    statusOverdue: 'ꯃꯇꯝ ꯍꯦꯟꯈ꯭ꯔꯦ',
    
    // Escalations
    tier1GentleTitle: 'ꯅꯨꯡꯁꯤꯔꯕ ꯅꯤꯡꯁꯤꯡꯕ 🌸',
    tier1GentleMsg: 'ꯍꯤꯗꯥꯛ ꯆꯥꯕꯒꯤ ꯃꯇꯝ ꯑꯣꯏꯔꯦꫫ ꯆꯥꯔꯕ ꯃꯇꯨꯡꯗ ꯕꯇꯟꯗ ꯅꯝꯕꯤꯌꯨꫫ',
    tier2EscalatedTitle: 'ꯑꯈꯟꯅꯕ ꯅꯤꯡꯁꯤꯡꯕ ⏰',
    tier2EscalatedMsg: 'ꯍꯤꯗꯥꯛ ꯍꯧꯖꯤꯛ ꯐꯥꯎꯕ ꯆꯥꯗ꯭ꯔꯤꫫ ꯆꯥꯅꯕꯤꯗꯨꯅ ꯈꯨꯗꯛꯇ ꯆꯥꯕꯤꯌꯨ 🙏',
    tier3CaregiverBadge: 'ꯈꯨꯗꯛꯀꯤ ꯑꯦꯂꯥꯔꯠ',
    tier3CaregiverModalTitle: '⚠️ ꯌꯦꯡꯁꯤꯅꯕꯤꯕꯒꯤ ꯑꯈꯟꯅꯕ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    tier3CaregiverAcknowledge: 'ꯑꯩꯅ ꯑꯍꯜ ꯑꯗꯨ ꯌꯦꯡꯈ꯭ꯔꯦ',
    simulateEscalation: 'ꯑꯦꯂꯥꯔꯠ ꯆꯥꯡꯌꯦꯡ ꯇꯧꯕ (Demo)',
    
    // Companion
    companionTitle: 'ꯔꯦꯃꯤ (Remi) — ꯅꯍꯥꯛꯀꯤ ꯃꯔꯨꯞ',
    companionSubtitle: 'ꯏꯁꯩ ꯁꯛꯄ, ꯄꯨꯛꯅꯤꯡ ꯅꯨꯡꯉꯥꯏꯕ ꯋꯥꯔꯤ ꯑꯃꯁꯨꯡ ꯄꯥꯎꯇꯥꯛ',
    typePlaceholder: 'ꯔꯦꯃꯤꯗ ꯋꯥ ꯉꯥꯡꯕꯤꯌꯨ ꯅꯠꯇ꯭ꯔꯒ ꯏꯁꯩ ꯁꯛꯅꯕ ꯍꯥꯏꯕꯤꯌꯨ...',
    send: 'ꯊꯥꯕ',
    speak: 'ꯉꯥꯡꯕꯤꯌꯨ',
    singSong: 'ꯏꯁꯩ ꯁꯛꯎ 🎵',
    listening: 'ꯅꯍꯥꯛꯀꯤ ꯈꯣꯟꯊꯣꯛ ꯇꯥꯔꯤ...',
    readAloud: 'ꯄꯥꯗꯨꯅ ꯇꯥꯍꯟꯕꯤꯌꯨ',
    apiKeyPrompt: 'Claude API Key (Optional — ꯑꯣꯐꯂꯥꯏꯟꯗꯁꯨ ꯃꯔꯨꯞ ꯂꯩꯔꯤ)',
    saveKey: 'ꯁꯦꯚ ꯇꯧꯕ',
    voiceSpeed: 'ꯈꯣꯟꯊꯣꯛꯀꯤ ꯌꯥꯡꯕ',
    speedSlow: '0.75x (ꯇꯞꯅ/ꯏꯡꯊꯅ)',
    speedNormal: '1.0x (ꯃꯌꯥꯏ ꯑꯣꯏꯕ)',
    
    // Caregiver Hub
    caregiverTitle: 'ꯌꯦꯡꯁꯤꯟꯕꯤꯕꯒꯤ ꯃꯐꯝ',
    caregiverSubtitle: 'ꯑꯍꯜ ꯃꯤꯑꯣꯏꯒꯤ ꯍꯛꯆꯥꯡ, ꯁꯥꯟꯅꯕꯒꯤ ꯐꯤꯚꯝ ꯑꯃꯁꯨꯡ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    patientOverview: 'ꯑꯅꯥꯕꯒꯤ ꯋꯥꯔꯣꯜ',
    gameProgress: 'ꯁꯥꯟꯅꯕꯒꯤ ꯃꯁꯤꯡ',
    weeklyAdherence: 'ꯅꯨꯃꯤꯠ ꯷ ꯒꯤ ꯊꯕꯛ ꯂꯣꯏꯁꯤꯟꯕ',
    activeAlerts: 'ꯍꯧꯖꯤꯛ ꯂꯩꯔꯤꯕ ꯑꯦꯂꯥꯔꯠꯁꯤꯡ',
    noAlerts: 'ꯄꯨꯝꯅꯃꯛ ꯅꯨꯡꯉꯥꯏꯅ ꯆꯠꯊꯔꯤꫫ',
    doctorInfo: 'ꯗꯣꯛꯇꯔꯒꯤ ꯋꯥꯔꯣꯜ',
    emergencyContact: 'ꯈꯨꯗꯛꯇ ꯄꯥꯎ ꯄꯤꯅꯕ ꯃꯔꯤ-ꯃꯇꯥ',
    prescribedMedicines: 'ꯅꯨꯃꯤꯠꯈꯨꯗꯤꯡꯒꯤ ꯆꯥꯒꯗꯕ ꯍꯤꯗꯥꯛꯁꯤꯡ'
  }
};
