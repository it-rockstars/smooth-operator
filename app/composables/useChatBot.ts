export type MessageRole = 'bot' | 'user'

export interface ChatMessage {
  id: string
  role: MessageRole
  text: string
  isEscalation?: boolean
}

export interface FaqEntry {
  keywords: string[]
  answer: string
}

const FAQ_SEED: FaqEntry[] = [
  {
    keywords: ['preis', 'preise', 'kosten', 'credit', 'credits', 'geld', 'eur', 'euro', 'teuer'],
    answer: 'Unsere Credits starten bei ca. €299 für 1 Credit. Je schneller die Reaktionszeit, desto höher der Preis: 4h Standard, 1h Express (+50%), 30min Priority (+100%), 15min Emergency (+200%).'
  },
  {
    keywords: ['reaktionszeit', 'schnell', '30 min', '15 min', '1h', '4h', 'garantie'],
    answer: 'Wir bieten vier Reaktionszeit-Stufen: Standard (4h), Express (1h), Priority (30min) und Emergency (15min). Die Garantie gilt nach Credit-Kauf und verfügbarer Kapazität.'
  },
  {
    keywords: ['service', 'services', 'helft', 'helfen', 'was macht ihr', 'angebot'],
    answer: 'Wir helfen bei Kubernetes, AWS, Azure, CI/CD, Monitoring, Auth, Debugging und mehr. Unsere Archetypen: Bugfinder, Bugfixer, Kickstarter, Enabler und Health Check.'
  },
  {
    keywords: ['operator', 'wer', 'fahad', 'flo', 'rainer', 'erfahrung'],
    answer: 'Unsere Operatoren sind junge, AI-augmented Talente aus der IT-Rockstars-Akademie. Fahad deckt K8s/AWS/Debug ab, Flo ist QA/Automation-Spezialist und Rainer ist letzte Eskalation.'
  },
  {
    keywords: ['telegram', 'bot', '@smoothoperator_bot', 'chat', 'schreiben'],
    answer: 'Unser Telegram-Bot @smoothoperator_bot ist der Kanal für Bestellungen, Status-Updates und Datei-Uploads während einer Mission.'
  },
  {
    keywords: ['nda', 'datenschutz', 'daten', 'sicherheit', 'china', 'drittstaat', 'vertraulich'],
    answer: 'Wir nehmen Datensicherheit ernst: Vor einem individuellen Case akzeptierst du eine kurze NDA. Alle Kundendaten bleiben in der EU in unserer ITR-Infrastruktur — bei AI-Einsatz ausschließlich Bedrock, kein Export in Drittstaaten.'
  },
  {
    keywords: ['health check', 'audit', 'check', 'überprüfung'],
    answer: 'Ein Health Check ist ein Einmal-Audit deiner Infrastruktur. Du bekommst eine Priorisierung der Risiken und konkrete Handlungsempfehlungen.'
  },
  {
    keywords: ['bugfinder', 'bugfixer', 'kickstarter', 'enabler'],
    answer: 'Bugfinder = Diagnose, Bugfixer = Fix + Test, Kickstarter = Aufsetzen von K8s/CI/CD/Monitoring, Enabler = Coaching für dein Team.'
  },
  {
    keywords: ['kontakt', 'email', 'operator kontaktieren', 'anrufen', 'erreichen'],
    answer: 'Am schnellsten geht es über den Telegram-Bot @smoothoperator_bot oder die Kontakt-Sektion auf der Startseite. Für größere Anfragen nutze operator@smooth-operator.io.'
  }
]

const ESCALATION_KEYWORDS = [
  'log', 'logs', 'logging',
  'password', 'passwort', 'credential', 'credentials', 'secret', 'secrets', 'token', 'tokens',
  'api key', 'apikey', 'api-key', 'private key', 'ssh key',
  'prod', 'produktion', 'production', 'live', 'live-system', 'kunde', 'customer', 'kundendaten',
  'down', 'ausgefallen', 'crash', 'crashed', 'fehler', 'error', 'bug', 'issue',
  'daten', 'data', 'datenbank', 'database', 'db',
  'infrastruktur', 'infrastructure', 'server', 'cluster', 'kubernetes', 'k8s',
  'aws', 'azure', 'gcp', 'cloud',
  'ip', 'ip-adresse', 'domain', 'subdomain', 'url',
  '.env', '.pem', '.key', '.log', '.json', '.yaml', '.yml', '.tf', '.tfstate'
]

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
const URL_REGEX = /https?:\/\/[^\s]+|www\.[^\s]+/i

export function useChatBot() {
  const messages = useState<ChatMessage[]>('chat-messages', () => [{
    id: 'welcome',
    role: 'bot',
    text: 'Hi. Ich bin der Smooth-Operator-Assistent. Frag mich zu Preisen, Services, Datenschutz oder Reaktionszeiten. Für individuelle Fälle mit Logs oder Credentials leite ich dich in den geschützten Bereich weiter.'
  }])

  const isTyping = useState('chat-typing', () => false)

  const normalize = (text: string) => text.toLowerCase().trim()

  const detectEscalation = (text: string): boolean => {
    const lower = normalize(text)
    const hasEscalationKeyword = ESCALATION_KEYWORDS.some(k => lower.includes(k))
    const hasEmail = EMAIL_REGEX.test(text)
    const hasUrl = URL_REGEX.test(text)
    return hasEscalationKeyword || hasEmail || hasUrl
  }

  const findFaqAnswer = (text: string): string | null => {
    const lower = normalize(text)
    let bestMatch: FaqEntry | null = null
    let bestScore = 0

    for (const entry of FAQ_SEED) {
      const score = entry.keywords.reduce((acc, keyword) => {
        return lower.includes(keyword.toLowerCase()) ? acc + 1 : acc
      }, 0)
      if (score > bestScore) {
        bestScore = score
        bestMatch = entry
      }
    }

    return bestMatch && bestScore > 0 ? bestMatch.answer : null
  }

  const addMessage = (role: MessageRole, text: string, isEscalation = false) => {
    messages.value.push({
      id: Math.random().toString(36).slice(2),
      role,
      text,
      isEscalation
    })
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    addMessage('user', text)
    isTyping.value = true

    // Simulate network/typing delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 600))

    const shouldEscalate = detectEscalation(text)

    if (shouldEscalate) {
      addMessage('bot', 'Das klingt nach einem individuellen Fall mit sensiblen Details. Für Logs, Credentials oder produktive Systeme brauchen wir einen geschützten Account mit NDA.', true)
      addMessage('bot', 'Hier geht es zum sicheren Onboarding: Account anlegen → AGB → kurze NDA → Datensicherheit bestätigen. Danach kannst du deinen Case erstellen.', true)
    } else {
      const answer = findFaqAnswer(text)
      addMessage('bot', answer ?? 'Darauf habe ich leider keine standardisierte Antwort. Beschreibe dein Problem gerne konkreter, oder starte den geschützten Onboarding-Flow für individuelle Hilfe.')
    }

    isTyping.value = false
  }

  const resetChat = () => {
    messages.value = [{
      id: 'welcome',
      role: 'bot',
      text: 'Hi. Ich bin der Smooth-Operator-Assistent. Frag mich zu Preisen, Services, Datenschutz oder Reaktionszeiten. Für individuelle Fälle mit Logs oder Credentials leite ich dich in den geschützten Bereich weiter.'
    }]
  }

  return {
    messages: readonly(messages),
    isTyping: readonly(isTyping),
    sendMessage,
    resetChat,
    detectEscalation,
    findFaqAnswer
  }
}
