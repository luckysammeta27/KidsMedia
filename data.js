// KidsMedia - Fictional Initial Sample Data & Demo Presets
// Strict adherence: No real children's personal information, faces, or videos.
// Demo-ready for Student AI Hackathon presentation.

const INITIAL_CATEGORIES = [
  {
    id: "singing",
    name: "Singing",
    shortName: "Singing",
    icon: "mic",
    emoji: "🎤",
    color: "from-teal-400 to-cyan-500",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
    accentColor: "teal",
    tagline: "Express yourself with melodies and rhymes",
    description: "Sing your favorite songs, joyful tunes, and rhymes to brighten everyone's day.",
    promptExample: "Try singing your favorite nursery rhyme or animal song!"
  },
  {
    id: "dancing",
    name: "Dancing",
    shortName: "Dancing",
    icon: "activity",
    emoji: "💃",
    color: "from-pink-400 to-rose-500",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
    accentColor: "coral",
    tagline: "Move to the rhythm and joyful beats",
    description: "Show off your cool dance moves, rhythm routines, and creative freestyle steps.",
    promptExample: "Practice a 30-second robot dance or jump routine!"
  },
  {
    id: "acting",
    name: "Acting",
    shortName: "Acting",
    icon: "smile",
    emoji: "🎭",
    color: "from-purple-400 to-indigo-500",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    accentColor: "lavender",
    tagline: "Bring fun characters to life",
    description: "Roleplay friendly characters, perform funny mini skits, or try puppet shows.",
    promptExample: "Act out a friendly dragon having tea with a squirrel!"
  },
  {
    id: "speaking",
    name: "Public Speaking",
    shortName: "Public Speaking",
    icon: "volume-2",
    emoji: "🗣️",
    color: "from-sky-400 to-blue-500",
    badgeColor: "bg-sky-50 text-sky-800 border-sky-200",
    accentColor: "sky",
    tagline: "Speak with courage and confidence",
    description: "Share inspiring ideas, show-and-tell stories, and brave morning talks.",
    promptExample: "Tell us about your favorite book or superhero superpower!"
  },
  {
    id: "teaching",
    name: "Teaching",
    shortName: "Teaching",
    icon: "book-open",
    emoji: "📚",
    color: "from-amber-400 to-emerald-400",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    accentColor: "yellow",
    tagline: "Explain cool facts and teach friends",
    description: "Show how a science puzzle works, explain a fun math trick, or teach a DIY craft.",
    promptExample: "Explain why the sky turns orange at sunset!"
  },
  {
    id: "art",
    name: "Art & Creativity",
    shortName: "Art & Creativity",
    icon: "palette",
    emoji: "🎨",
    color: "from-amber-400 to-rose-400",
    badgeColor: "bg-orange-50 text-orange-800 border-orange-200",
    accentColor: "coral",
    tagline: "Color your world with imagination",
    description: "Share colorful drawings, paper origami, recycled inventions, and painting styles.",
    promptExample: "Paint an imaginary planet with floating candy islands!"
  }
];

// Sample Approved Showcase Items across the 6 talent categories (Only approved demo items appear in Discover)
const INITIAL_APPROVED_CREATIONS = [
  {
    id: "proj-101",
    title: "The Friendly Dinosaur Who Loved Apples",
    category: "singing",
    childName: "Aarav",
    childAge: 7,
    avatar: "🦖",
    avatarBg: "bg-emerald-100 text-emerald-700",
    thumbnailBg: "bg-gradient-to-br from-teal-400 via-cyan-400 to-sky-500",
    illustrationEmoji: "🦕 🎵 🍎",
    description: "I wrote a cheerful 4-line rhyme about a friendly T-Rex who preferred crispy red apples over roaring at friends! My big sister strummed the toy ukulele while I sang.",
    learningTakeaway: "Practicing pitch rhythm, positive rhyming words, and vocal joy.",
    materials: "Voice, wooden ukulele, colorful lyric poster",
    encouragementCount: 42,
    latestEncouragement: "Celebrate Creativity! 🌟",
    status: "approved",
    submittedAt: "2 days ago",
    duration: "1m 15s"
  },
  {
    id: "proj-102",
    title: "Cosmic Nebula with Watercolor & Sea Salt",
    category: "art",
    childName: "Maya (You)",
    childAge: 8,
    avatar: "🎨",
    avatarBg: "bg-purple-100 text-purple-700",
    thumbnailBg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
    illustrationEmoji: "🌌 🎨 ✨",
    description: "I painted an outer-space galaxy using blue, purple, and magenta watercolors. When the paint was still wet, I sprinkled kitchen salt to create sparkling starry textures!",
    learningTakeaway: "Wet-on-wet watercolor blending and salt crystal absorption physics.",
    materials: "Watercolor paper, round brushes, kitchen salt, water cup",
    encouragementCount: 56,
    latestEncouragement: "Celebrate Creativity! 🌟",
    status: "approved",
    submittedAt: "3 days ago",
    duration: "2m 00s"
  },
  {
    id: "proj-103",
    title: "Robot Dance: Glide, Freeze, and Spin!",
    category: "dancing",
    childName: "Leo",
    childAge: 8,
    avatar: "🤖",
    avatarBg: "bg-pink-100 text-pink-700",
    thumbnailBg: "bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500",
    illustrationEmoji: "🤖 ⚡ 🕺",
    description: "A fun hip-hop routine combining mechanical robot arm locks, smooth glide footwork, and funny freeze poses. Try freezing on count 4 without blinking!",
    learningTakeaway: "Balance control, rhythm synchronization, and energetic movement.",
    materials: "Comfy sneakers and an upbeat electronic rhythm",
    encouragementCount: 39,
    latestEncouragement: "Celebrate Creativity! 🌟",
    status: "approved",
    submittedAt: "4 days ago",
    duration: "1m 30s"
  },
  {
    id: "proj-104",
    title: "One-Person Skit: The Detective and the Cookie Thief",
    category: "acting",
    childName: "Siddharth",
    childAge: 9,
    avatar: "🕵️",
    avatarBg: "bg-amber-100 text-amber-800",
    thumbnailBg: "bg-gradient-to-br from-violet-500 via-purple-500 to-amber-400",
    illustrationEmoji: "🕵️ 🍪 🎭",
    description: "I act out both the serious detective inspecting cookie crumbs with a magnifying glass AND the guilty golden retriever puppy giving big innocent puppy eyes!",
    learningTakeaway: "Voice modulation, expressive facial gestures, and comedic timing.",
    materials: "Cardboard magnifying glass, funny hat, dog ear headband",
    encouragementCount: 48,
    latestEncouragement: "Celebrate Creativity! 🌟",
    status: "approved",
    submittedAt: "5 days ago",
    duration: "1m 50s"
  },
  {
    id: "proj-105",
    title: "3 Superhero Secrets to Speak Before the Whole Class",
    category: "speaking",
    childName: "Zainab",
    childAge: 10,
    avatar: "🗣️",
    avatarBg: "bg-sky-100 text-sky-800",
    thumbnailBg: "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500",
    illustrationEmoji: "🎙️ ⭐ 🦁",
    description: "I used to be super nervous speaking in morning assembly! Here are my 3 secrets: Take a deep lion breath, find 2 smiling friends in the audience, and stand tall like a superhero.",
    learningTakeaway: "Courage building, diaphragmatic breathing, and audience eye-contact techniques.",
    materials: "Handmade superhero confidence reminder card",
    encouragementCount: 51,
    latestEncouragement: "Celebrate Creativity! 🌟",
    status: "approved",
    submittedAt: "6 days ago",
    duration: "1m 40s"
  },
  {
    id: "proj-106",
    title: "How Rain Clouds Fill Up (Jar & Shaving Cream)",
    category: "teaching",
    childName: "Mateo",
    childAge: 8,
    avatar: "🧪",
    avatarBg: "bg-cyan-100 text-cyan-800",
    thumbnailBg: "bg-gradient-to-br from-amber-400 via-teal-400 to-emerald-500",
    illustrationEmoji: "☁️ 💧 🔬",
    description: "I used water in a glass jar, shaving cream for the fluffy cloud, and food coloring drops. When the cloud gets too saturated, colorful rain droplets fall into the water!",
    learningTakeaway: "Demonstrates cloud density, moisture saturation, and precipitation cycles.",
    materials: "Glass jar, water, shaving foam, food color pipette",
    encouragementCount: 63,
    latestEncouragement: "Celebrate Creativity! 🌟",
    status: "approved",
    submittedAt: "1 week ago",
    duration: "2m 10s"
  }
];

// Sample Pending Submissions in Parent Review Queue (Hidden from Discover until approved)
const INITIAL_PENDING_SUBMISSIONS = [
  {
    id: "proj-pending-1",
    title: "Cardboard Castle with Working Drawbridge",
    category: "art",
    childName: "Maya (You)",
    childAge: 8,
    avatar: "🏰",
    avatarBg: "bg-purple-100 text-purple-700",
    thumbnailBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    illustrationEmoji: "🏰 📦 🧵",
    description: "I built a miniature fortress out of empty cereal boxes! The drawbridge raises and lowers using thread pulleys and empty sewing spools.",
    learningTakeaway: "Simple machines (pulleys), structural cardboard building, and recycling.",
    materials: "Cereal boxes, cotton string, wooden skewers, craft glue",
    submittedAt: "Today, 10:15 AM",
    status: "pending",
    safetyFlags: {
      childFriendly: true,
      noPersonalData: true,
      educationalValue: true
    },
    parentNote: ""
  },
  {
    id: "proj-pending-2",
    title: "The Clean Green Machine Recycling Rap",
    category: "singing",
    childName: "Leo",
    childAge: 8,
    avatar: "🌱",
    avatarBg: "bg-teal-100 text-teal-700",
    thumbnailBg: "bg-gradient-to-br from-teal-400 to-emerald-500",
    illustrationEmoji: "♻️ 🎤 🌍",
    description: "A fast energetic rhyme teaching kids how to sort paper, cans, and plastics with snappy beatbox kitchen rhythms.",
    learningTakeaway: "Eco-awareness, environmental stewardship, and rhythmic vocal cadence.",
    materials: "Voice and kitchen percussion (wooden spoons on pots)",
    submittedAt: "Today, 11:40 AM",
    status: "pending",
    safetyFlags: {
      childFriendly: true,
      noPersonalData: true,
      educationalValue: true
    },
    parentNote: ""
  }
];

// Badges tailored around Creativity, Practice, Learning, and Kindness
// Crucial: No ranking children against one another! Purely personal milestones.
const INITIAL_BADGES = [
  // 1. Creativity
  {
    id: "badge-creat-1",
    pillar: "Creativity",
    name: "Creative Spark",
    icon: "🎨",
    color: "from-amber-400 to-rose-400",
    badgeBg: "bg-amber-50 border-amber-200 text-amber-900",
    description: "Started and shared your first original imaginative creation.",
    earned: true,
    earnedDate: "Oct 2, 2026",
    progressNote: "Earned! 🌟"
  },
  {
    id: "badge-creat-2",
    pillar: "Creativity",
    name: "Artistic Dreamer",
    icon: "✨",
    color: "from-purple-400 to-pink-400",
    badgeBg: "bg-purple-50 border-purple-200 text-purple-900",
    description: "Explored 2 distinct artistic mediums like watercolors and crafts.",
    earned: true,
    earnedDate: "Oct 6, 2026",
    progressNote: "Earned! 🌟"
  },

  // 2. Practice
  {
    id: "badge-prac-1",
    pillar: "Practice",
    name: "Practice Star",
    icon: "🎵",
    color: "from-teal-400 to-cyan-500",
    badgeBg: "bg-teal-50 border-teal-200 text-teal-900",
    description: "Rehearsed and recorded a complete talent showcase from start to finish.",
    earned: true,
    earnedDate: "Oct 8, 2026",
    progressNote: "Earned! 🌟"
  },
  {
    id: "badge-prac-2",
    pillar: "Practice",
    name: "Rhythm & Dedication",
    icon: "⏱️",
    color: "from-sky-400 to-indigo-500",
    badgeBg: "bg-sky-50 border-sky-200 text-sky-900",
    description: "Spent thoughtful time refining a craft or performance step-by-step.",
    earned: false,
    earnedDate: null,
    progressNote: "1 of 2 projects completed"
  },

  // 3. Learning
  {
    id: "badge-learn-1",
    pillar: "Learning",
    name: "Curious Learner",
    icon: "📚",
    color: "from-emerald-400 to-teal-500",
    badgeBg: "bg-emerald-50 border-emerald-200 text-emerald-900",
    description: "Explained a learning takeaway for others to try at home.",
    earned: true,
    earnedDate: "Oct 9, 2026",
    progressNote: "Earned! 🌟"
  },
  {
    id: "badge-learn-2",
    pillar: "Learning",
    name: "Knowledge Explorer",
    icon: "🔬",
    color: "from-blue-400 to-cyan-500",
    badgeBg: "bg-blue-50 border-blue-200 text-blue-900",
    description: "Discovered and learned from creations in 3 different talent categories.",
    earned: false,
    earnedDate: null,
    progressNote: "2 of 3 categories explored"
  },

  // 4. Kindness
  {
    id: "badge-kind-1",
    pillar: "Kindness",
    name: "Kind Cheerleader",
    icon: "💖",
    color: "from-rose-400 to-pink-500",
    badgeBg: "bg-rose-50 border-rose-200 text-rose-900",
    description: "Sent uplifting preset encouragements to friends across the community.",
    earned: true,
    earnedDate: "Oct 9, 2026",
    progressNote: "Earned! 🌟"
  },
  {
    id: "badge-kind-2",
    pillar: "Kindness",
    name: "Supportive Friend",
    icon: "🤝",
    color: "from-amber-400 to-yellow-400",
    badgeBg: "bg-yellow-50 border-yellow-200 text-yellow-900",
    description: "Celebrated other children's creative bravery with warm affirmation stickers.",
    earned: false,
    earnedDate: null,
    progressNote: "3 of 5 cheers shared"
  }
];

// Preset Uplifting Encouragements (Zero popularity rankings or competition)
const PRESET_ENCOURAGEMENTS = [
  { id: "enc-1", text: "Celebrate Creativity!", emoji: "🌟", label: "Celebrate Creativity! 🌟" },
  { id: "enc-2", text: "Love your effort!", emoji: "💖", label: "Love your effort! 💖" },
  { id: "enc-3", text: "So inspiring!", emoji: "🚀", label: "So inspiring! 🚀" },
  { id: "enc-4", text: "Super curious!", emoji: "💡", label: "Super curious! 💡" },
  { id: "enc-5", text: "Keep shining!", emoji: "✨", label: "Keep shining! ✨" }
];

// Sample Encouragements Received by Maya for Growth Screen
const INITIAL_GROWTH_CHEERS = [
  { from: "Chloe (Age 9)", text: "Celebrate Creativity! 🌟", emoji: "🌟", project: "Cosmic Nebula with Watercolor", time: "Yesterday" },
  { from: "Mateo (Age 8)", text: "Love your effort! 💖", emoji: "💖", project: "Cosmic Nebula with Watercolor", time: "2 days ago" },
  { from: "Zainab (Age 10)", text: "So inspiring! 🚀", emoji: "🚀", project: "Cosmic Nebula with Watercolor", time: "3 days ago" },
  { from: "Aarav (Age 7)", text: "Super curious! 💡", emoji: "💡", project: "Cardboard Castle Pulley", time: "4 days ago" }
];
