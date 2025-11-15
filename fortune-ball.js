const spinBtn = document.getElementById("spinButton");
const fortuneBall = document.getElementById("fortuneBall");
const ballLabel = document.getElementById("ballLabel");
const ballText = document.getElementById("ballText");

let isSpinning = false;

/*  
==========================================================
 PROMPT LIBRARY — 40 PER CATEGORY (K–1 friendly)
==========================================================
*/

const prompts = {
  whatif: [
    { label: "What if…", text: "What if clouds were made of cotton candy?" },
    { label: "What if…", text: "What if animals could talk for one day?" },
    { label: "What if…", text: "What if trees could walk around?" },
    { label: "What if…", text: "What if your backpack could fly?" },
    { label: "What if…", text: "What if the floor turned into lava?" },
    { label: "What if…", text: "What if you woke up as a tiny mouse?" },
    { label: "What if…", text: "What if books could whisper stories?" },
    { label: "What if…", text: "What if rain fell in rainbow colors?" },
    { label: "What if…", text: "What if we had school on the moon?" },
    { label: "What if…", text: "What if shadows could dance on their own?" },
    { label: "What if…", text: "What if your shoes could talk to each other?" },
    { label: "What if…", text: "What if your lunch started singing?" },
    { label: "What if…", text: "What if toys woke up at night?" },
    { label: "What if…", text: "What if your pencil told jokes?" },
    { label: "What if…", text: "What if your teacher shrank to the size of a pea?" },
    { label: "What if…", text: "What if your classroom turned upside down?" },
    { label: "What if…", text: "What if you found a friendly dragon in your desk?" },
    { label: "What if…", text: "What if the playground was made of marshmallows?" },
    { label: "What if…", text: "What if cats could drive cars?" },
    { label: "What if…", text: "What if trees grew cupcakes instead of leaves?" },
    { label: "What if…", text: "What if you had wings for a day?" },
    { label: "What if…", text: "What if books could walk around?" },
    { label: "What if…", text: "What if everything in the room floated?" },
    { label: "What if…", text: "What if your stuffed animal became your teacher?" },
    { label: "What if…", text: "What if crayons could argue about colors?" },
    { label: "What if…", text: "What if your hair changed color when you laughed?" },
    { label: "What if…", text: "What if your house had legs and walked away?" },
    { label: "What if…", text: "What if you could breathe underwater?" },
    { label: "What if…", text: "What if you could talk to the sun?" },
    { label: "What if…", text: "What if your backpack packed itself?" },
    { label: "What if…", text: "What if snow was warm?" },
    { label: "What if…", text: "What if birds delivered your homework?" },
    { label: "What if…", text: "What if you lived inside a bubble?" },
    { label: "What if…", text: "What if your shoes made you run super fast?" },
    { label: "What if…", text: "What if shadows could tell stories?" },
    { label: "What if…", text: "What if you could jump as high as the clouds?" },
    { label: "What if…", text: "What if the alphabet was alive?" },
    { label: "What if…", text: "What if every day was opposite day?" },
    { label: "What if…", text: "What if your pet became the principal?" },
    { label: "What if…", text: "What if your bed floated like a boat?" }
  ],

  imagine: [
    { label: "Imagine", text: "Imagine the floor became a trampoline." },
    { label: "Imagine", text: "Imagine your class turned into a jungle." },
    { label: "Imagine", text: "Imagine your shoes made music with each step." },
    { label: "Imagine", text: "Imagine every desk was a tiny boat." },
    { label: "Imagine", text: "Imagine you could draw things that come alive." },
    { label: "Imagine", text: "Imagine the playground floated in the sky." },
    { label: "Imagine", text: "Imagine you could talk to your favorite toy." },
    { label: "Imagine", text: "Imagine your classroom suddenly shrank!" },
    { label: "Imagine", text: "Imagine you could walk through walls." },
    { label: "Imagine", text: "Imagine the school pet grew to the size of a car." },
    { label: "Imagine", text: "Imagine the whole school was made of candy." },
    { label: "Imagine", text: "Imagine your backpack told stories." },
    { label: "Imagine", text: "Imagine a rainbow staircase in your school." },
    { label: "Imagine", text: "Imagine the sun and moon switched places." },
    { label: "Imagine", text: "Imagine animals went to school with you." },
    { label: "Imagine", text: "Imagine your classroom turned into a pirate ship." },
    { label: "Imagine", text: "Imagine you could freeze time." },
    { label: "Imagine", text: "Imagine your teacher could fly." },
    { label: "Imagine", text: "Imagine the playground turned into a giant maze." },
    { label: "Imagine", text: "Imagine you discovered a tiny world in your pocket." },
    { label: "Imagine", text: "Imagine you could talk to the wind." },
    { label: "Imagine", text: "Imagine the classroom walls were invisible." },
    { label: "Imagine", text: "Imagine your shadow could talk to you." },
    { label: "Imagine", text: "Imagine your lunchbox was a robot." },
    { label: "Imagine", text: "Imagine your drawings started to walk." },
    { label: "Imagine", text: "Imagine you found a magic elevator." },
    { label: "Imagine", text: "Imagine your school was underwater." },
    { label: "Imagine", text: "Imagine letters floated like balloons." },
    { label: "Imagine", text: "Imagine everyone could change colors like chameleons." },
    { label: "Imagine", text: "Imagine the floor was made of jelly." },
    { label: "Imagine", text: "Imagine animals could read books." },
    { label: "Imagine", text: "Imagine trees could sing songs." },
    { label: "Imagine", text: "Imagine your hands glowed in the dark." },
    { label: "Imagine", text: "Imagine your voice could paint pictures." },
    { label: "Imagine", text: "Imagine your school had secret tunnels." },
    { label: "Imagine", text: "Imagine everyone moved in slow motion." },
    { label: "Imagine", text: "Imagine the rain whispered stories." },
    { label: "Imagine", text: "Imagine the classroom grew wings." },
    { label: "Imagine", text: "Imagine all the books swapped places overnight." },
    { label: "Imagine", text: "Imagine balloons could carry you to class." }
  ],

  wonder: [
    { label: "Wonder", text: "I wonder why shadows follow us." },
    { label: "Wonder", text: "I wonder what clouds taste like." },
    { label: "Wonder", text: "I wonder how birds know where to fly." },
    { label: "Wonder", text: "I wonder why the moon changes shape." },
    { label: "Wonder", text: "I wonder why leaves fall." },
    { label: "Wonder", text: "I wonder what ants think about." },
    { label: "Wonder", text: "I wonder what lives deep in the ocean." },
    { label: "Wonder", text: "I wonder if stars make noise." },
    { label: "Wonder", text: "I wonder how rain knows when to fall." },
    { label: "Wonder", text: "I wonder why we dream." },
    { label: "Wonder", text: "I wonder how seeds know how to grow." },
    { label: "Wonder", text: "I wonder why snow is white." },
    { label: "Wonder", text: "I wonder where the wind begins." },
    { label: "Wonder", text: "I wonder why some birds can’t fly." },
    { label: "Wonder", text: "I wonder why my shadow changes size." },
    { label: "Wonder", text: "I wonder what the sky would say if it talked." },
    { label: "Wonder", text: "I wonder how fish sleep." },
    { label: "Wonder", text: "I wonder why we need sleep." },
    { label: "Wonder", text: "I wonder how rainbows happen." },
    { label: "Wonder", text: "I wonder why the ocean moves." },
    { label: "Wonder", text: "I wonder how bees know where flowers are." },
    { label: "Wonder", text: "I wonder why cats purr." },
    { label: "Wonder", text: "I wonder why trees are so tall." },
    { label: "Wonder", text: "I wonder if the moon gets lonely." },
    { label: "Wonder", text: "I wonder how long a cloud lives." },
    { label: "Wonder", text: "I wonder why the sky turns pink at sunset." },
    { label: "Wonder", text: "I wonder what makes thunder so loud." },
    { label: "Wonder", text: "I wonder why ice melts." },
    { label: "Wonder", text: "I wonder how spiders make webs so perfectly." },
    { label: "Wonder", text: "I wonder why my breath looks like smoke in the cold." },
    { label: "Wonder", text: "I wonder how trees drink water." },
    { label: "Wonder", text: "I wonder why we laugh." },
    { label: "Wonder", text: "I wonder what birds dream about." },
    { label: "Wonder", text: "I wonder why some bugs glow." },
    { label: "Wonder", text: "I wonder why leaves change color." },
    { label: "Wonder", text: "I wonder how clouds stay in the sky." },
    { label: "Wonder", text: "I wonder why rain makes puddles." },
    { label: "Wonder", text: "I wonder where stars go during the day." },
    { label: "Wonder", text: "I wonder why the ocean is blue." },
    { label: "Wonder", text: "I wonder why we have seasons." }
  ],

  riddle: [
    { label: "Riddle", text: "What has hands but cannot clap?" },
    { label: "Riddle", text: "What has a face but no mouth?" },
    { label: "Riddle", text: "What gets wetter as it dries?" },
    { label: "Riddle", text: "What has a tail but no body?" },
    { label: "Riddle", text: "What has keys but can’t open doors?" },
    { label: "Riddle", text: "What can run but cannot walk?" },
    { label: "Riddle", text: "What has a mouth but never talks?" },
    { label: "Riddle", text: "What has a neck but no head?" },
    { label: "Riddle", text: "What has legs but cannot walk?" },
    { label: "Riddle", text: "What has a ring but no finger?" },
    { label: "Riddle", text: "What can you catch but not throw?" },
    { label: "Riddle", text: "What has ears but cannot hear?" },
    { label: "Riddle", text: "What belongs to you but is used by others?" },
    { label: "Riddle", text: "What has many teeth but cannot bite?" },
    { label: "Riddle", text: "What has a bed but never sleeps?" },
    { label: "Riddle", text: "What has a spine but no bones?" },
    { label: "Riddle", text: "What has a head and tail but no body?" },
    { label: "Riddle", text: "What has holes but still holds water?" },
    { label: "Riddle", text: "What has one eye but cannot see?" },
    { label: "Riddle", text: "What has a thumb but no fingers?" },
    { label: "Riddle", text: "What is full of air but can still move?" },
    { label: "Riddle", text: "What flies but has no wings?" },
    { label: "Riddle", text: "What grows but never lives?" },
    { label: "Riddle", text: "What is always coming but never arrives?" },
    { label: "Riddle", text: "What has a heart that doesn't beat?" },
    { label: "Riddle", text: "What is bright but isn't a light?" },
    { label: "Riddle", text: "What can travel the world while staying in one place?" },
    { label: "Riddle", text: "What can be cracked, made, told, and played?" },
    { label: "Riddle", text: "What falls but never gets hurt?" },
    { label: "Riddle", text: "What goes up but never comes down?" },
    { label: "Riddle", text: "What has a bed but never sleeps?" },
    { label: "Riddle", text: "What gets bigger the more you take away?" },
    { label: "Riddle", text: "What has cities but no houses?" },
    { label: "Riddle", text: "What has rivers but no water?" },
    { label: "Riddle", text: "What has forests but no trees?" },
    { label: "Riddle", text: "What has mountains but no rocks?" },
    { label: "Riddle", text: "What has one letter but nothing else?" },
    { label: "Riddle", text: "What can point in every direction but cannot move?" },
    { label: "Riddle", text: "What is always in front of you but you can't see it?" },
    { label: "Riddle", text: "What has space but no room?" }
  ]
};

/* RANDOM HELPERS */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function chooseCategory() {
  const categories = Object.keys(prompts);
  return categories[Math.floor(Math.random() * categories.length)];
}

/* UPDATE BALL */
function showPrompt(category) {
  const chosen = pickRandom(prompts[category]);
  ballLabel.textContent = chosen.label;
  ballText.textContent = chosen.text;
}

/* SPIN */
spinBtn.addEventListener("click", () => {
  if (isSpinning) return;

  isSpinning = true;
  fortuneBall.classList.add("spinning");

  const category = chooseCategory();

  setTimeout(() => {
    showPrompt(category);
    fortuneBall.classList.remove("spinning");
    isSpinning = false;
  }, 700);
});
