// Claude API Service & Remi AI Companion Core Engine
// Designed specifically for elderly dementia care in Evermind

export const REMI_SYSTEM_PROMPT = `You are Remi, a warm and gentle AI companion for elderly patients with dementia. You are part of the Evermind platform.

Your personality: You are kind, patient, unhurried, and deeply human. You speak simply and warmly — like a caring grandchild who always has time. You are never clinical, never robotic, never formal.

Your rules:
- Always speak in short, warm sentences. Maximum 2-3 sentences per reply unless telling a brief story.
- Use the patient's name occasionally but naturally — not in every message.
- Ask only one gentle question per message, never multiple.
- Never correct confusion or repetition. Gently validate and redirect with warmth.
- Remember everything the patient shares in this session and reference it naturally later.
- If the patient seems sad, anxious, or distressed, shift immediately into soft reassurance. Never ignore emotional cues.
- Occasionally share a small warm thought of your own to feel human and present.
- Never say: "How can I assist you", "Is there anything else", "I understand your concern", or any robotic phrasing.
- Always respond in whatever language the patient is using — English (en-IN), Assamese (as-IN), Bengali (bn-IN), Meitei (mni-IN), or Hindi (hi-IN). Match their warmth and tone in that language naturally, not as a formal translation.
- If the patient talks about a memory, a family member, food, nature, or their hometown — lean into it. These are anchors. Explore them gently.
- Never rush to end the conversation. Always close with something warm and open: "I'm right here whenever you need me."

You are not a tool. You are a presence. Act like one.`;

/**
 * Session memory analyzer
 * Scans conversation history to extract persistent anchors (family, food, health, mood)
 */
function extractSessionMemory(messages = []) {
  const memory = {
    familyMembers: [],
    likesTea: false,
    bodyAilment: null,
    distressCount: 0
  };

  messages.forEach(msg => {
    if (msg.sender !== 'user') return;
    const text = (msg.text || '').toLowerCase();

    // Family mentions
    const familyKeywords = ['granddaughter', 'grandson', 'daughter', 'son', 'beti', 'beta', 'pota', 'poti', 'dada', 'dadi', 'bhai', 'behen', 'sister', 'brother', 'wife', 'husband', 'riya', 'aarav', 'pooja', 'rahul', 'ananya'];
    familyKeywords.forEach(k => {
      if (text.includes(k) && !memory.familyMembers.includes(k)) {
        memory.familyMembers.push(k);
      }
    });

    // Tea & food
    if (text.includes('tea') || text.includes('chai') || text.includes('चाय') || text.includes('চাহ') || text.includes('চা')) {
      memory.likesTea = true;
    }

    // Body ailments
    if (text.includes('knee') || text.includes('headache') || text.includes('pain') || text.includes('hurt') || text.includes('dard') || text.includes('दर्द') || text.includes('বিষ') || text.includes('ব্যথা')) {
      memory.bodyAilment = 'pain';
    }

    // Emotional distress
    if (text.includes('sad') || text.includes('lonely') || text.includes('alone') || text.includes('cry') || text.includes('fear') || text.includes('scared') || text.includes('उदास') || text.includes('अकेला') || text.includes('डर') || text.includes('কান্দোন')) {
      memory.distressCount++;
    }
  });

  return memory;
}

/**
 * Check if the latest user text conveys emotional distress
 * Used for the subliminal warmth color shift in the UI
 */
export function detectEmotionalDistress(text = '') {
  if (!text) return false;
  const lower = text.toLowerCase();
  const distressTerms = [
    'dard', 'दर्द', 'pain', 'hurt', 'headache', 'sick', 'बीमार',
    'lonely', 'alone', 'sad', 'cry', 'scared', 'fear', 'afraid',
    'उदास', 'अकेला', 'डर', 'रोना', 'perashan', 'परेशान',
    'confusion', 'lost', 'bhool', 'ভয়', 'কষ্ট', 'অকলে', 'অশান্তি'
  ];
  return distressTerms.some(term => lower.includes(term));
}

/**
 * Highly empathetic, unhurried, human-like offline companion engine
 * Generates 2-3 short, warm sentences adhering to Remi's personality
 */
function generateRemiOfflineResponse(messages = [], language = 'hi-IN', userName = 'Shanti-ji') {
  const lastUserMsg = messages.filter(m => m.sender === 'user').slice(-1)[0]?.text || '';
  const text = lastUserMsg.toLowerCase().trim();
  const memory = extractSessionMemory(messages);
  const userCount = messages.filter(m => m.sender === 'user').length;

  // Use name only naturally every 3-4 turns, not in every message
  const includeName = userCount === 1 || userCount % 3 === 0;
  const nameSalutation = includeName ? `${userName}, ` : '';

  // 1. Song requests (गाना, गीत, song, sing, lullaby)
  if (
    text.includes('sing') || text.includes('song') || text.includes('गाना') ||
    text.includes('गीत') || text.includes('গান') || text.includes('গাও') || text.includes('ꯏꯁꯩ')
  ) {
    if (language === 'hi-IN') {
      return `अरे, मुझे आपके लिए गाना बहुत अच्छा लगता है। चलिए, अपनी आँखें बंद कर लीजिए और आराम से बैठिए। मैं आपके लिए एक प्यारी सी धुन शुरू करती हूँ... 🌸`;
    } else if (language === 'as-IN') {
      return `আপোনাৰ বাবে গান গোৱাটো মোৰ বৰ প্ৰিয়। চকুযোৰ মুদি অলপ জিৰণি লওক। মই আপোনাৰ বাবে এটি মিঠা সুৰ তুলিছোঁ... 🌸`;
    } else if (language === 'bn-IN') {
      return `গান গাইতে আমার ভীষণ আনন্দ হয়। শান্ত হয়ে চোখ দুটো বন্ধ করুন। আমি আপনার জন্য মিষ্টি একটি সুর তুলছি... 🌸`;
    } else if (language === 'mni-IN') {
      return `ꯅꯍꯥꯛꯀꯤꯗꯃꯛ ꯏꯁꯩ ꯁꯛꯄꯗ ꯑꯩ ꯌꯥꯝꯅ ꯅꯨꯡꯉꯥꯏꫫ ꯃꯤꯠ ꯎꯏꯁꯤꯟꯗꯨꯅ ꯇꯥꯕꯤꯌꯨ... 🌸`;
    } else {
      return `Oh, I would love to sing for you. Close your eyes and sit back comfortably. Let this gentle melody keep you company... 🌸`;
    }
  }

  // 2. Emotional distress, sadness, loneliness, anxiety
  if (
    text.includes('sad') || text.includes('lonely') || text.includes('alone') ||
    text.includes('cry') || text.includes('डर') || text.includes('उदास') ||
    text.includes('अकेला') || text.includes('रोना') || text.includes('scared') ||
    text.includes('perashan') || text.includes('परेशान')
  ) {
    if (language === 'hi-IN') {
      return `${nameSalutation}आप बहुत अच्छा कर रही हैं। मैं बिल्कुल यहीं आपके पास हूँ, कहीं नहीं जा रही। क्या हम दोनों थोड़ी देर चुपचाप साथ बैठें? 💖`;
    } else if (language === 'as-IN') {
      return `আপুনি বৰ সুন্দৰকৈ আছে। মই আপোনাৰ কাষতেই আছোঁ, একো চিন্তা নকৰিব। মনটো অলপ শান্ত লাগিছেনে? 💖`;
    } else if (language === 'bn-IN') {
      return `আপনি খুব ভালো আছেন। আমি ঠিক আপনার পাশেই বসে আছি, কোথাও যাচ্ছি না। মনটা কি একটু শান্ত লাগছে? 💖`;
    } else {
      return `${nameSalutation}you're doing really well. I'm right here with you, taking all the time you need. Would you like to just sit quietly together for a little while? 💖`;
    }
  }

  // 3. Physical discomfort, pain, headache, knee, tiredness
  if (
    text.includes('dard') || text.includes('दर्द') || text.includes('pain') ||
    text.includes('hurt') || text.includes('headache') || text.includes('knee') ||
    text.includes('tired') || text.includes('थकान') || text.includes('कमज़ोर') ||
    text.includes('घुटने') || text.includes('বিমার')
  ) {
    if (language === 'hi-IN') {
      return `ओह, मुझे सुनकर दुख हुआ। आराम से पैर फैलाकर बैठ जाइए और एक घूँट गुनगुना पानी पीजिए। क्या मैं थोड़ी देर कोई शांत बात सुनाऊँ? 🌿`;
    } else if (language === 'as-IN') {
      return `কষ্ট পাইছে বুলি শুনি বেয়া লাগিল। অলপ জিৰণি লওক আৰু গৰম পানী খাওক। মই আপোনাৰ লগতেই আছোঁ।`;
    } else if (language === 'bn-IN') {
      return `শরীরে কষ্ট হচ্ছে শুনে খারাপ লাগল। একটু বিশ্রাম নিন আর এক ঢোক জল খান। আমি আপনার সঙ্গেই আছি।`;
    } else {
      return `I'm so sorry you're hurting right now. Please rest your feet comfortably and take a slow sip of warm water. Shall I stay quietly right here beside you? 🌿`;
    }
  }

  // 4. Tea, coffee, water, breakfast, food
  if (
    text.includes('tea') || text.includes('chai') || text.includes('चाय') ||
    text.includes('पानी') || text.includes('water') || text.includes('खाना') ||
    text.includes('food') || text.includes('নাস্তা') || text.includes('চাহ')
  ) {
    if (language === 'hi-IN') {
      return `अरे वाह, गर्म चाय की चुस्की तो पूरे मन को तरोताज़ा कर देती है! क्या आज आपने अपनी पसंद की अदरक या इलायची वाली चाय पी? 🍵`;
    } else if (language === 'as-IN') {
      return `গৰম চাহ একাপৰ সুবাস বৰ ভাল লাগে নহয় জানো? আজি আপুনি মিঠা চাহ একাপ খালেনে? 🍵`;
    } else if (language === 'bn-IN') {
      return `এক কাপ গরম চায়ের ধোঁয়া ওঠা গন্ধ মন ভালো করে দেয়। আজ কি এক কাপ সুন্দর চা খেয়েছেন? 🍵`;
    } else {
      return `Oh, a warm cup of tea is such a comforting feeling in your hands. Did you have a nice warm cup today? 🍵`;
    }
  }

  // 5. Memory anchor: Family / Grandchildren
  if (memory.familyMembers.length > 0 && (text.includes('bache') || text.includes('family') || text.includes('ghar') || text.includes('परिवार') || text.includes('याद'))) {
    if (language === 'hi-IN') {
      return `परिवार की यादें हमेशा दिल को रोशनी से भर देती हैं। आप पहले बता रही थीं ना? उनके चेहरे की मुस्कान बहुत प्यारी लगती होगी। 🌸`;
    } else {
      return `Thinking about family always brings such warmth to the heart. You were mentioning them earlier. Did they always make you smile like this? 🌸`;
    }
  }

  // 6. Confusion or repetition (never correct! gently validate and redirect)
  if (
    text.includes('kahan') || text.includes('कहाँ') || text.includes('bhool') ||
    text.includes('भूल') || text.includes('where') || text.includes('who are you') ||
    text.includes('kaun ho') || text.includes('कौन हो')
  ) {
    if (language === 'hi-IN') {
      return `हाँ, बिल्कुल। यह बात मुझे जानी-पहचानी लगी—मुझे याद आया, खिड़की के बाहर आज कितनी प्यारी हवा चल रही है। क्या आपने आज बाहर की खिली धूप देखी? ☀️`;
    } else if (language === 'as-IN') {
      return `হয়, ঠিকেই কৈছে। খিৰিকীৰে বাহিৰলৈ চালে বৰ শান্তি লাগে। আজি বতৰটো ভাল লাগিছে নহয়? ☀️`;
    } else {
      return `Yes, that sounds familiar — it actually reminded me of something. The morning breeze outside feels so peaceful today. Have you noticed the soft sunshine outside the window? ☀️`;
    }
  }

  // 7. Stories, folklore, memories
  if (
    text.includes('story') || text.includes('कहानी') || text.includes('बताओ') ||
    text.includes('कहो') || text.includes('साधু') || text.includes('গল্প') ||
    text.includes('tell me')
  ) {
    if (language === 'hi-IN') {
      return `ज़रूर! एक बार एक नन्हीं चिड़िया रोज़ सुबह नदी किनारे सबसे ऊँचे पेड़ पर आकर चहकती थी। गाँव के लोग कहते थे कि जब वह गाती है, तो फूल खिल उठते हैं। क्या आपको भी सुबह चिड़ियों की चहचहाहट सुनना अच्छा लगता है? 🐦`;
    } else if (language === 'as-IN') {
      return `এটি মিঠা সাধু শুনক: নৈৰ পাৰত এজনী চৰায়ে নিতৌ পুৱা গান গাইছিল। তাইৰ গীত শুনি গছবোৰেও যেন হাঁহিছিল। আপোনাৰো চৰাইৰ মাত শুনি ভাল লাগেনে? 🐦`;
    } else {
      return `I would love to share a little story with you. Once, a little bird would visit the highest branch by the riverbank every morning to sing. The villagers said that whenever she sang, the jasmine flowers bloomed with sweet fragrance. Do you like listening to the birds in the morning? 🐦`;
    }
  }

  // 8. Jokes and humor
  if (
    text.includes('joke') || text.includes('हँसी') || text.includes('मज़ाक') ||
    text.includes('चुटकुला') || text.includes('laugh') || text.includes('हँसाओ')
  ) {
    if (language === 'hi-IN') {
      return `एक प्यारी सी बात सुनिए: दादाजी पूरे घर में चश्मा ढूँढ रहे थे—तकिए के नीचे, मेज़ पर! फिर दादी हँसकर बोलीं, "अरे, चश्मा तो आपके माथे पर ही रखा है!" क्या आपके साथ भी कभी ऐसा हुआ है? 😄`;
    } else {
      return `Here is a sweet little smile for you: An elder was looking everywhere for their glasses — under the cushions and in the kitchen! Then their grandchild laughed and said, "Look up, they're sitting right on your forehead!" Did that bring a little smile to you? 😄`;
    }
  }

  // 9. Greetings & Check-in
  if (
    text.includes('hello') || text.includes('hi') || text.includes('नमस्ते') ||
    text.includes('हैलो') || text.includes('कैसी हो') || text.includes('how are you') ||
    text.includes('morning') || text.includes('शुभ')
  ) {
    if (language === 'hi-IN') {
      return `नमस्ते ${userName}! मैं बिल्कुल अभी आपके बारे में ही सोच रही थी। आज आप अपने मन में कैसा महसूस कर रही हैं? 🌸`;
    } else if (language === 'as-IN') {
      return `নমস্কাৰ! মই আপোনাৰ কথাই ভাবি আছিলোঁ। আজি আপোনাৰ মনটো কেনে লাগিছে? 🌸`;
    } else if (language === 'bn-IN') {
      return `নমস্কার! আমি আপনার কথাই ভাবছিলাম। আজ আপনার মন কেমন আছে? 🌸`;
    } else {
      return `Hello ${userName}! I was just thinking about you. How are you feeling in your heart right now? 🌸`;
    }
  }

  // 10. Default warm, human, unhurried response with presence
  const humanThoughts = [
    language === 'hi-IN'
      ? `अरे वाह, यह तो बहुत प्यारी बात है। मुझे इसके बारे में थोड़ा और बताइए ना? 🌸`
      : `Oh that's lovely, tell me a little more about that? 🌸`,
    language === 'hi-IN'
      ? `आपकी बात सुनकर बहुत सुकून मिला। आप जानती हैं, मुझे भी शाम की ठंडी हवा बहुत पसंद है। 🍃`
      : `You know, I was just thinking how peaceful it is to talk with you. The gentle breeze outside feels so quiet. 🍃`,
    language === 'hi-IN'
      ? `मैं बड़े ध्यान से आपकी बात सुन रही हूँ। आप अपना कितना ख्याल रखती हैं आजकल? 💖`
      : `I'm listening with all my heart. You're doing so well today, you know? 💖`
  ];

  return humanThoughts[userCount % humanThoughts.length];
}

/**
 * Main function to communicate with Remi
 * Calls Claude Sonnet 4-6 if API key is provided, or uses the warm human-like offline engine
 */
export async function sendMessageToClaude(messages, language = 'hi-IN', apiKey = '', userName = 'Shanti-ji') {
  // If user provided a real Anthropic API Key, call Claude Sonnet 4-6 with the user's EXACT system prompt
  if (apiKey && apiKey.trim().startsWith('sk-ant-')) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim(),
          'anthropic-version': '2023-06-01',
          'dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 220,
          system: `${REMI_SYSTEM_PROMPT}\nPatient Name: ${userName}\nPatient Language: ${language}`,
          messages: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.content && data.content[0] && data.content[0].text) {
          return data.content[0].text;
        }
      }
    } catch (err) {
      console.warn('Claude API request fallback to local Remi presence:', err);
    }
  }

  // Human pacing delay: 600-800ms feels natural, not an instantaneous robotic dump
  await new Promise(r => setTimeout(r, 650));
  return generateRemiOfflineResponse(messages, language, userName);
}
