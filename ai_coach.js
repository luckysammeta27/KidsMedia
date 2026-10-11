// KidsMedia - AI Creativity Coach Module
// Positive, child-safe creative mentorship with Live Gemini API support & Curated Demo Engine fallback.

const DEMO_COACH_KNOWLEDGE = {
  singing: {
    goals: [
      "Breath control & stamina",
      "Singing clear high notes",
      "Overcoming shy singing",
      "Rhythm and tempo"
    ],
    defaultGoal: "Breath control & stamina",
    activities: [
      {
        title: "The Gentle Feather Breath 🪶",
        step: "Imagine holding a feather in front of your mouth. Inhale deeply through your nose like smelling a rose, then exhale a soft 'ssss' sound for 10 seconds without blowing the feather away.",
        tip: "Keep your shoulders relaxed and let your tummy expand like a gentle balloon."
      },
      {
        title: "The Friendly Bumblebee Hum 🐝",
        step: "Gently close your lips and hum a smooth 'mmmm' sound from low to high and back down, feeling the soft tickle on your lips.",
        tip: "Humming warms up your vocal cords safely without any straining!"
      },
      {
        title: "The Squeaky Door & Lion Voice 🦁",
        step: "Make a high gentle squeak like a playful mouse, then a deep warm hum like a sleepy lion. Notice how different parts of your chest and head resonate.",
        tip: "Keep the sound light and playful. Never shout or push hard."
      }
    ],
    achievableGoal: "Sing one 30-second chorus smoothly on a single comfortable breath cycle.",
    encouragingMessage: "Your voice is completely unique in the whole world! Like a butterfly learning to fly, every gentle hum makes your vocal wings stronger.",
    projectIdeas: [
      {
        title: "The Backyard Animal Lullaby",
        explanation: "Write and sing a soothing 4-line bedtime song about how birds, squirrels, and ladybugs go to sleep at dusk.",
        firstStep: "Hum three gentle notes while tapping your knee to find your relaxing bedtime tempo."
      },
      {
        title: "The Weather Song Rhyme",
        explanation: "A playful song where your voice imitates wind chimes on breezy days, raindrops on rooftops, and warm sunshine.",
        firstStep: "Make three funny weather sound effects with your mouth before adding words."
      },
      {
        title: "Kindness Echo Song",
        explanation: "A call-and-response rhyme where one verse says something kind, and the chorus echoes it back with melody.",
        firstStep: "Pick two uplifting words (like 'Sunshine' and 'Brave') and sing them to a simple 3-note tune."
      }
    ]
  },

  dancing: {
    goals: [
      "Smooth balance & spins",
      "Remembering choreography",
      "Dancing with energy & joy",
      "Freezing on the beat"
    ],
    defaultGoal: "Smooth balance & spins",
    activities: [
      {
        title: "The Flamingo Stand 🦩",
        step: "Stand tall on one foot, bend your other knee, and spread your arms like gentle wings. Count slowly to 8, then switch feet.",
        tip: "Focus your eyes on a still object in front of you to keep your balance steady."
      },
      {
        title: "Statue Freeze Dance 🧊",
        step: "Play your favorite rhythm track. Groove freely, then pause and freeze into a superhero or silly animal pose immediately when count 4 arrives.",
        tip: "See if you can hold your freeze without wiggling your toes!"
      },
      {
        title: "The Robot to Ocean Wave Transition 🌊",
        step: "Do 4 counts of mechanical, crisp robot arm angles, then immediately melt into 4 counts of fluid, smooth ocean waves with your arms and torso.",
        tip: "This teaches body control and the difference between sharp and flowing movement."
      }
    ],
    achievableGoal: "Perform an 8-count routine combining 2 crisp moves, 1 turn, and 1 freeze pose.",
    encouragingMessage: "Dance is simply joyful energy moving through your body! It doesn't need to be perfect—it just needs to feel happy.",
    projectIdeas: [
      {
        title: "The Recycled Robot Groove",
        explanation: "A fun hip-hop routine inspired by an imaginary friendly robot cleaning up fallen leaves in the park.",
        firstStep: "Practice three robot arm angles in front of a mirror while counting 1-2-3-4."
      },
      {
        title: "Four Seasons Dance Story",
        explanation: "A movement story where you flutter like autumn leaves, freeze like winter ice, blossom like spring flowers, and leap like summer sunshine.",
        firstStep: "Create one signature movement for your favorite season."
      },
      {
        title: "The Kitchen Spoon Tap Dance",
        explanation: "A rhythm routine dancing in sneakers on a tile floor while keeping time with steady foot taps and claps.",
        firstStep: "Count out a simple 'step-step-clap' pattern four times in a row."
      }
    ]
  },

  acting: {
    goals: [
      "Character voices & accents",
      "Expressive facial expressions",
      "Overcoming stage fright",
      "Physical comedy & funny reactions"
    ],
    defaultGoal: "Character voices & accents",
    activities: [
      {
        title: "The Emotional Weather Report ⛅",
        step: "Read a simple sentence like 'It is raining outside' in three different moods: super excited, mysteriously whispering, and playfully surprised.",
        tip: "Notice how your eyebrows and posture change with each emotion."
      },
      {
        title: "The Magic Invisible Object 🪄",
        step: "Pantomime holding an invisible object: first a tiny fragile baby chick, then a giant heavy bowling ball, then a hot slippery potato.",
        tip: "Your hands and facial strain show the audience what the object is without saying a single word."
      },
      {
        title: "Animal Character Walk 🐾",
        step: "Walk across the room as three different creatures: a cautious wise owl, an energetic bouncy puppy, and a dignified royal penguin.",
        tip: "Think about which part of your body leads the walk (head, chest, or belly)."
      }
    ],
    achievableGoal: "Perform a 60-second skit where you clearly portray two distinct characters interacting.",
    encouragingMessage: "Acting is using your imagination to walk in someone else's shoes. Every great actor starts by being wonderfully playful!",
    projectIdeas: [
      {
        title: "The Detective and the Missing Sock",
        explanation: "A funny mini-drama where a very serious detective interrogates a washing machine about where all the missing socks go.",
        firstStep: "Draw a paper magnifying glass and practice a serious detective voice."
      },
      {
        title: "The Friendly Dragon's Tea Party",
        explanation: "A whimsical monologue where a dragon tries to host a gentle tea party without accidentally sneezing sparks onto the teacups.",
        firstStep: "Practice taking gentle tea sips while speaking in a rumbling, polite dragon voice."
      },
      {
        title: "Two-Hand Puppet Debate",
        explanation: "A puppet dialogue where your left hand plays an excited explorer and your right hand plays a cautious astronaut deciding where to travel next.",
        firstStep: "Draw simple funny faces on two paper cups or socks."
      }
    ]
  },

  speaking: {
    goals: [
      "Speaking loud & clear",
      "Eye contact with audience",
      "Show-and-tell storytelling",
      "Calming nervous energy"
    ],
    defaultGoal: "Speaking loud & clear",
    activities: [
      {
        title: "The Superhero Power Pose 🦸",
        step: "Before speaking, stand tall with your feet shoulder-width apart, hands on hips, chin up, and take two deep lion breaths for 10 seconds.",
        tip: "This naturally expands your chest and sends confidence to your brain!"
      },
      {
        title: "The 3 Friendly Faces Technique 👀",
        step: "Practice your talk by picking three toys or objects in different corners of your room. Look at the left toy for one sentence, the center toy for the next, and the right toy for the third.",
        tip: "This makes everyone in the audience feel like you are speaking directly to them."
      },
      {
        title: "Tongue Twister Warmup 👅",
        step: "Slowly say: 'Red lorry, yellow lorry' three times, then 'Unique New York' three times, focusing on crisp consonants.",
        tip: "Clear speech comes from active lips and tongue, not from shouting loudly."
      }
    ],
    achievableGoal: "Deliver a 1-minute talk about your favorite topic with clear pauses and eye contact.",
    encouragingMessage: "Your thoughts and stories have real value. When you speak with courage and kindness, friends love listening to you!",
    projectIdeas: [
      {
        title: "My Favorite Planet in 60 Seconds",
        explanation: "An energetic presentation sharing two mind-blowing facts about Saturn or Mars, explaining why space is wonderful.",
        firstStep: "Write down the two most surprising facts on a small index card."
      },
      {
        title: "How to Build a Pillow Fort: An Expert Guide",
        explanation: "A cheerful how-to speech teaching friends the engineering secrets of strong cushions, blanket roofs, and secret entrances.",
        firstStep: "List the 3 essential supplies in order (Base, Walls, Roof)."
      },
      {
        title: "Why Kindness is My Superpower",
        explanation: "An inspiring 90-second speech sharing one small act of kindness you saw or did, and how it made everyone's day brighter.",
        firstStep: "Think of one moment that made a friend smile and start with: 'Imagine a world where...'"
      }
    ]
  },

  teaching: {
    goals: [
      "Explaining science simply",
      "Making math tricks fun",
      "Clear step-by-step DIY instructions",
      "Keeping friends engaged"
    ],
    defaultGoal: "Explaining science simply",
    activities: [
      {
        title: "The 3-Step Rule (What, Why, How) 💡",
        step: "Pick any simple concept (like why bread has holes). Practice explaining it in exactly 3 sentences: What happens, Why it happens, and How you can see it.",
        tip: "Keeping it to three parts helps friends remember the idea clearly."
      },
      {
        title: "The Kitchen Metaphor Game 🍎",
        step: "Explain a big concept using everyday kitchen items. For example, explain gravity using an apple, or explain blood cells using red jelly beans.",
        tip: "When friends can picture everyday objects, complicated science becomes easy and fun!"
      },
      {
        title: "The 'Try This at Home' Hook 🧲",
        step: "End your explanation with a fun question or challenge for your friends, like: 'Next time you wash your hands, see if pepper floats or sinks!'",
        tip: "Inviting friends to test it themselves turns them into fellow scientists."
      }
    ],
    achievableGoal: "Create a 90-second mini-lesson explaining one cool everyday phenomenon with a household demonstration.",
    encouragingMessage: "When you teach what you love, you learn it twice as deeply! You are a brilliant little teacher.",
    projectIdeas: [
      {
        title: "Why Do Leaves Change Color in Autumn?",
        explanation: "Explain how hidden yellow and orange pigments emerge when green chlorophyll takes a winter nap.",
        firstStep: "Collect three different colored leaves from outside to show side-by-side."
      },
      {
        title: "The Secret 9-Times Table Finger Trick",
        explanation: "Teach friends the magic math trick where your 10 fingers can instantly reveal the answer to any 9-times multiplication problem.",
        firstStep: "Hold up both hands and practice bending finger #3 to show 9 x 3 = 27."
      },
      {
        title: "How Static Electricity Bends Water",
        explanation: "Demonstrate how rubbing a plastic comb on a wool sweater makes a thin stream of tap water magically bend toward it.",
        firstStep: "Test the comb on tap water at the bathroom sink to watch it curve."
      }
    ]
  },

  art: {
    goals: [
      "Blending watercolors smoothly",
      "Crisp origami folds",
      "Inventing imaginary creatures",
      "Using recycled materials creatively"
    ],
    defaultGoal: "Blending watercolors smoothly",
    activities: [
      {
        title: "The Sunset Gradient Blend 🌅",
        step: "Paint a stripe of yellow at the top of your paper, rinse your brush, then paint orange right below it, touching the wet edges to let the colors gently kiss and melt together.",
        tip: "Keep your brush damp, not soaking wet, so the colors blend without creating puddles."
      },
      {
        title: "Texture Hunt with Kitchen Tools 🍴",
        step: "Take a piece of scrap paper and test painting textures with a kitchen fork (for grass), bubble wrap (for beehives), and a crumpled paper towel (for clouds).",
        tip: "You don't need expensive brushes—everyday items make the coolest textures!"
      },
      {
        title: "The 'Turn a Scribble into a Creature' Game 👾",
        step: "Close your eyes, draw a random 3-second scribble with a pencil, open your eyes, and turn that shape into a friendly monster by adding eyes, paws, and wings.",
        tip: "There are no mistakes in art—every unexpected line is an invitation to invent!"
      }
    ],
    achievableGoal: "Complete a finished artwork or craft project using at least two different colors or materials.",
    encouragingMessage: "Art is making the invisible visible! Whatever you create came from your unique imagination, and that makes it priceless.",
    projectIdeas: [
      {
        title: "Floating Jellyfish from Egg Cartons",
        explanation: "Create translucent glowing jellyfish using cardboard egg cup domes and colorful yarn or ribbon tentacles.",
        firstStep: "Cut out one cup from an empty egg carton and poke a small hole in the top."
      },
      {
        title: "The Golden Constellation Painting",
        explanation: "Paint a dark indigo night sky, then use a white gel pen or toothpick with yellow paint to connect imaginary star constellations.",
        firstStep: "Paint a deep blue wash across a square sheet of paper and let it dry."
      },
      {
        title: "Jumping Origami Frog Tournament",
        explanation: "Fold an energetic paper frog that can leap over pencils, and decorate its back with spotted watercolor patterns.",
        firstStep: "Cut an 8x8 inch square of colorful paper with crisp even edges."
      }
    ]
  }
};

class AICreativityCoach {
  constructor() {
    this.apiKey = localStorage.getItem('km_gemini_api_key') || '';
    this.currentCategory = 'singing';
    this.currentGoal = '';
    this.isLoading = false;
    this.lastResult = null;
    this.lastMode = 'demo'; // 'live' or 'demo'
  }

  hasApiKey() {
    return Boolean(this.apiKey && this.apiKey.trim().length > 10);
  }

  setApiKey(key) {
    this.apiKey = (key || '').trim();
    if (this.apiKey) {
      localStorage.setItem('km_gemini_api_key', this.apiKey);
    } else {
      localStorage.removeItem('km_gemini_api_key');
    }
  }

  // Get Suggestions: Uses Live Gemini AI if key exists, otherwise uses Curated Demo Engine
  async generateCoaching(category, goal, customQuestion = '') {
    this.currentCategory = category;
    this.currentGoal = goal;

    // Check if live API key is configured
    if (this.hasApiKey()) {
      try {
        this.isLoading = true;
        const liveResult = await this.callGeminiAPI(category, goal, customQuestion);
        this.isLoading = false;
        this.lastMode = 'live';
        this.lastResult = liveResult;
        return {
          mode: 'live',
          source: 'Google Gemini AI (Live Model)',
          data: liveResult
        };
      } catch (err) {
        console.warn('Gemini API call failed, falling back to Curated Demo Engine:', err);
        this.isLoading = false;
        const fallback = this.getCuratedPreset(category, goal, customQuestion);
        this.lastMode = 'fallback';
        this.lastResult = fallback;
        return {
          mode: 'fallback',
          source: 'Curated Demo Engine (API Error Fallback)',
          errorNotice: err.message || 'API request failed. Displaying curated practice suggestions.',
          data: fallback
        };
      }
    }

    // No API key: Return curated demo engine instantly (no fake delays)
    this.isLoading = false;
    const demoData = this.getCuratedPreset(category, goal, customQuestion);
    this.lastMode = 'demo';
    this.lastResult = demoData;
    return {
      mode: 'demo',
      source: 'Curated Demo Engine (Child-Friendly Presets)',
      data: demoData
    };
  }

  // Curated Preset Retriever
  getCuratedPreset(category, goal, customQuestion) {
    const catData = DEMO_COACH_KNOWLEDGE[category] || DEMO_COACH_KNOWLEDGE.singing;
    return {
      category: category,
      goal: goal || catData.defaultGoal,
      customQuestion: customQuestion || '',
      achievableGoal: catData.achievableGoal,
      encouragingMessage: catData.encouragingMessage,
      activities: catData.activities,
      projectIdeas: catData.projectIdeas
    };
  }

  // Live Gemini API Call (Strictly child-safe, no PII)
  async callGeminiAPI(category, goal, customQuestion) {
    const prompt = `You are the KidsMedia AI Creativity Coach, a warm, supportive, child-friendly mentor helping elementary school children (ages 6-12) develop their creative talents.
Talent Category: ${category}
Goal to improve: ${goal}
Child's specific question (if any): ${customQuestion || 'None'}

SAFETY GUIDELINES:
- Keep all language simple, inspiring, positive, and educational.
- Do NOT ask for or mention personal information (names, ages, locations, schools).
- Encourage creativity, effort, and exploration rather than competition or public popularity.

Return a valid JSON object strictly matching this schema:
{
  "achievableGoal": "One simple, achievable milestone for a beginner",
  "encouragingMessage": "A warm, uplifting message of encouragement",
  "activities": [
    { "title": "Activity 1 Title", "step": "Simple step-by-step beginner practice instructions", "tip": "A fun, practical helpful tip" },
    { "title": "Activity 2 Title", "step": "Simple step-by-step beginner practice instructions", "tip": "A fun, practical helpful tip" },
    { "title": "Activity 3 Title", "step": "Simple step-by-step beginner practice instructions", "tip": "A fun, practical helpful tip" }
  ],
  "projectIdeas": [
    { "title": "Project Idea 1 Title", "explanation": "Short friendly explanation of the creative project", "firstStep": "One easy first step to begin today" },
    { "title": "Project Idea 2 Title", "explanation": "Short friendly explanation of the creative project", "firstStep": "One easy first step to begin today" },
    { "title": "Project Idea 3 Title", "explanation": "Short friendly explanation of the creative project", "firstStep": "One easy first step to begin today" }
  ]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(this.apiKey)}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Gemini API error (Status ${response.status}): ${errBody.slice(0, 150)}`);
    }

    const json = await response.json();
    const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('Gemini returned an empty response.');
    }

    const parsed = JSON.parse(candidateText);
    return {
      category: category,
      goal: goal,
      customQuestion: customQuestion,
      achievableGoal: parsed.achievableGoal || "Practice with joy and curiosity today!",
      encouragingMessage: parsed.encouragingMessage || "Keep shining bright! Every creative practice makes you stronger.",
      activities: parsed.activities || [],
      projectIdeas: parsed.projectIdeas || []
    };
  }
}

const aiCoach = new AICreativityCoach();
