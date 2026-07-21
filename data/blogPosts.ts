import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'how-i-built-a-telegram-bot',
    iconName: 'Bot',
    tag: 'Automation',
    tagColor: '#3b82f6',
    date: 'May 2026',
    isoDate: '2026-05-15',
    title: 'How I built a Telegram bot that saves me 3 hours a day',
    excerpt: 'The exact Python code and architecture behind my media-forwarding Telegram bot — including how to handle rate limits, media groups, and errors gracefully.',
    readTime: '6 min read',
    coming: false,
    author: {
      name: 'Ashwani Vishwakarma',
      role: 'Software Developer & Automation Specialist',
      url: 'https://ashwani.online',
    },
    content: `
      <h2>The Problem: Manual Media Curation is a Time Sink</h2>
      <p>As developers, we build automation so we don't have to do repetitive tasks. For months, I was manually downloading alerts, logs, and screenshots from various server monitoring dashboards, converting them, and posting them into specific Telegram channels for my clients and team. It took 2-3 hours of fragmented attention daily.</p>
      <p>I decided to automate this with a central Python-based forwarding daemon that integrates with the Telegram Bot API.</p>

      <h2>The Architecture: Queue-Based Forwarding</h2>
      <p>To avoid hitting Telegram's strict API rate limits (max 30 messages per second, and 20 messages per minute in groups), I built a small asynchronous worker queue using Python's <code>asyncio</code> and <code>python-telegram-bot</code>.</p>
      
      <pre><code>import asyncio
from telegram import Bot
from telegram.error import RetryAfter

class TelegramQueue:
    def __init__(self, token):
        self.bot = Bot(token=token)
        self.queue = asyncio.Queue()

    async def add_message(self, chat_id, text, media=None):
        await self.queue.put((chat_id, text, media))

    async def worker(self):
        while True:
            chat_id, text, media = await self.queue.get()
            try:
                if media:
                    await self.bot.send_photo(chat_id=chat_id, photo=media, caption=text)
                else:
                    await self.bot.send_message(chat_id=chat_id, text=text)
                await asyncio.sleep(0.1) # Safe spacing
            except RetryAfter as e:
                # Handle flood limits gracefully
                await asyncio.sleep(e.retry_after)
                await self.queue.put((chat_id, text, media))
            finally:
                self.queue.task_done()</code></pre>

      <h2>Handling Media Groups (Albums)</h2>
      <p>One major challenge was grouping multiple screenshots together. If you send images one-by-one, Telegram rings notification bells multiple times. The solution is to batch messages dynamically by listening for a short 0.5s window of silence, then sending them as an <code>input_media_group</code>.</p>

      <h2>The Results</h2>
      <p>Now, my monitoring servers simply hit a local FastAPI webhook, which puts the log file and screenshot in the queue. The bot handles the rest. Total daily maintenance time: <b>0 minutes</b>. I reclaimed 3 hours every day to focus on building new code features.</p>
    `
  },
  {
    id: 2,
    slug: 'qr-file-transfer-no-cables',
    iconName: 'QrCode',
    tag: 'Utility',
    tagColor: '#06b6d4',
    date: 'April 2026',
    isoDate: '2026-04-20',
    title: 'QR File Transfer: No cables, no accounts, just scan',
    excerpt: 'I built a local-network file transfer tool using QR codes. Here\'s how it works, why it\'s actually useful, and what I learned about WebSockets.',
    readTime: '4 min read',
    coming: false,
    author: {
      name: 'Ashwani Vishwakarma',
      role: 'Software Developer & Automation Specialist',
      url: 'https://ashwani.online',
    },
    content: `
      <h2>Why another file sharing tool?</h2>
      <p>I got tired of sending files to myself via email, Telegram, or Google Drive just to copy a script or APK from my desktop to my phone. AirDrop only works on Apple devices. I needed a zero-configuration, cross-platform solution that worked over the local network.</p>

      <h2>How it Works</h2>
      <p>The system utilizes three core steps:</p>
      <ol>
        <li>Start a local HTTP server on the computer.</li>
        <li>Auto-detect the computer's local network IP address (e.g., <code>192.168.1.15</code>).</li>
        <li>Generate a QR code in the terminal containing the server's URL.</li>
      </ol>
      <p>You scan the QR code with your phone, and it opens a simple, responsive web application where you can upload or download files instantly at local Wi-Fi speeds.</p>

      <h2>Auto-Detecting the Local IP in Node.js</h2>
      <p>Here is how the tool gets the active local interface IP address dynamically:</p>

      <pre><code>const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();
console.log(\`Server running at: http://\${localIP}:8080\`);</code></pre>

      <h2>Adding WebSockets for Real-Time Progress</h2>
      <p>To show progress bars on both the sender and receiver screen, I integrated a basic WebSocket server. When a phone starts uploading a 100MB file, the Node.js server streams the chunks to disk and updates the desktop display in real time. It is secure, operates 100% offline, and is incredibly fast.</p>
    `
  },
  {
    id: 3,
    slug: 'building-vitta-nipun-typescript',
    iconName: 'Coins',
    tag: 'Project',
    tagColor: '#22c55e',
    date: 'May 2026',
    isoDate: '2026-05-02',
    title: 'Building Vitta Nipun: My first TypeScript project',
    excerpt: 'Why I switched from JavaScript to TypeScript mid-project, what broke, what got better, and whether I\'d do it again (yes).',
    readTime: '7 min read',
    coming: false,
    author: {
      name: 'Ashwani Vishwakarma',
      role: 'Software Developer & Automation Specialist',
      url: 'https://ashwani.online',
    },
    content: `
      <h2>The Genesis of Vitta Nipun</h2>
      <p>Vitta Nipun is a personal finance management app. It aggregates monthly transactions, categories budget limits, and forecasts savings. Initially, I started writing this in plain React and JavaScript. As the state object grew (tracking complex recurring invoices, currencies, and budgets), debugging became a nightmare. One minor typo in a key name would break the graph calculation silently.</p>

      <h2>The Switch to TypeScript</h2>
      <p>I paused development for two days to migrate the codebase to TypeScript. Here is the transaction interface that saved the project's stability:</p>

      <pre><code>export type TransactionCategory = 'Food' | 'Utilities' | 'Rent' | 'Salary' | 'Investments';

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: TransactionCategory;
  date: string;
  description?: string;
  isRecurring: boolean;
}

export interface Budget {
  category: TransactionCategory;
  limit: number;
  spent: number;
}</code></pre>

      <h2>What Broke During Migration</h2>
      <p>Almost everything! I had to clean up dozens of implicit <code>any</code> types, especially in my custom hooks handling localStorage caches and charting data. But as soon as the compiler built with zero warnings, the app ran flawlessly. The IDE autocomplete meant I didn't have to look up the database structure ever again.</p>

      <h2>The Verdict</h2>
      <p>If you're building anything more complex than a static landing page, starting with TypeScript pays off in safety, efficiency, and confidence. I will never write complex state systems in vanilla JavaScript again.</p>
    `
  },
  {
    id: 4,
    slug: 'python-tricks-wizard',
    iconName: 'Code',
    tag: 'Tips',
    tagColor: '#a855f7',
    date: 'Coming soon',
    isoDate: '2026-06-01',
    title: 'Python tricks that make you look like a wizard',
    excerpt: 'List comprehensions, generators, context managers, decorators — the Python features that made me fall in love with the language.',
    readTime: '5 min read',
    coming: true,
    author: {
      name: 'Ashwani Vishwakarma',
      role: 'Software Developer & Automation Specialist',
      url: 'https://ashwani.online',
    },
    content: ''
  },
  {
    id: 5,
    slug: 'bca-grad-shipping-code',
    iconName: 'GraduationCap',
    tag: 'Life',
    tagColor: '#f59e0b',
    date: 'Coming soon',
    isoDate: '2026-06-15',
    title: 'Being a BCA grad who ships more than the curriculum ever taught',
    excerpt: 'The gap between what college teaches and what you actually need to build things — and how to close it without burning out.',
    readTime: '8 min read',
    coming: true,
    author: {
      name: 'Ashwani Vishwakarma',
      role: 'Software Developer & Automation Specialist',
      url: 'https://ashwani.online',
    },
    content: ''
  },
  {
    id: 6,
    slug: 'django-rest-framework-review',
    iconName: 'Server',
    tag: 'Django',
    tagColor: '#10b981',
    date: 'Coming soon',
    isoDate: '2026-07-01',
    title: 'Django REST Framework: A beginner\'s honest review',
    excerpt: 'I\'m learning DRF right now. Here\'s what confuses me, what clicks, and how I\'m structuring my learning to actually retain it.',
    readTime: '6 min read',
    coming: true,
    author: {
      name: 'Ashwani Vishwakarma',
      role: 'Software Developer & Automation Specialist',
      url: 'https://ashwani.online',
    },
    content: ''
  }
];
