function run(argv) {
  const app = Application('iTunes');

  if (!app.running()) {
    console.log('iTunes is not running');
    return;
  }

  const tracks = app.selection();

  const length = tracks.length;

  if (!length) {
    console.log('no tracks are selected');
    return;
  }

  const message = `Are you sure to set lyrics for ${length} tracks?`;

  if (!confirm(message)) {
    console.log('cancelled');
    return;
  }

  console.log('setting lyrics...');

  const sentences = getSentences();

  tracks.forEach(track => {
    const name = track.name();
    const match = name.match(/^(?:\d{2}-)?(\d{3})$/);
    if (!match) return;
    const id = parseInt(match[1], 10);
    const sentence = sentences.find(s => s.id === id);
    if (!sentence) return;
    track.lyrics = sentence.text;
  });

  console.log('done');
}

function confirm(message) {
  const app = Application.currentApplication();
  app.includeStandardAdditions = true
  try {
    app.displayDialog(message);
    return true;
  } catch (e) {
    return false;
  }
}

function getSentences() {
  return (
[
  {
    "id": 1,
    "text": "We must respect the will of the individual.\n\n個人の意思は尊重しなければいけない。"
  },
  {
    "id": 2,
    "text": "Take it easy. I can assure you that everything will turn out fine.\n\n気楽にいけよ。大丈夫、すべてうまくいくさ。"
  },
  {
    "id": 3,
    "text": "Let go of your negative outlook on life. Always maintain a positive attitude."
  },
  {
    "id": 4,
    "text": "You should be fair to everyone regardless of national origin, gender, or creed."
  },
  {
    "id": 5,
    "text": "Equality is guaranteed by the Constitution."
  },
  {
    "id": 6,
    "text": "He leaned against the pillar and gazed at the Statue of Liberty."
  },
  {
    "id": 7,
    "text": "A woman passed by me giving off a subtle scent of perfume. It reminded me of my ex-girlfriend."
  },
  {
    "id": 8,
    "text": "\"Natto\" smells awful but tastes terrific."
  },
  {
    "id": 9,
    "text": "\"I'm soaked with sweat.\" \"Stand back! You stink. Take a shower.\""
  },
  {
    "id": 10,
    "text": "Bob was so beside himself that he could scarcely tell fact from fiction."
  },
  {
    "id": 11,
    "text": "His new novel, which combines prose with his gift for poetry, is going to be published."
  },
  {
    "id": 12,
    "text": "An up-to-date edition of the encyclopedia will come out next month."
  },
  {
    "id": 13,
    "text": "Ms. Yamada translated the fascinating fairy tale into plain Japanese."
  },
  {
    "id": 14,
    "text": "The following passage is quoted from a well-known fable."
  },
  {
    "id": 15,
    "text": "\"Are you familiar with contemporary literature?\" \"I know next to nothing about it.\""
  },
  {
    "id": 16,
    "text": "At times I confuse \"curve\" with \"carve.\""
  },
  {
    "id": 17,
    "text": "Don't be shy. Your pronunciation is more or less correct."
  },
  {
    "id": 18,
    "text": "This article contains tips for those who are eager to increase their vocabulary."
  },
  {
    "id": 19,
    "text": "His latest works are on display at the city hall. They are fabulous beyond description."
  },
  {
    "id": 20,
    "text": "\"Could you move over a little?\" \"Oh, sorry. I didn't realize I was taking up so much space.\""
  },
  {
    "id": 21,
    "text": "\"What's this ugly object?\" \"This is a piece of abstract art!\""
  },
  {
    "id": 22,
    "text": "I begged Richie to lend me a hundred bucks, but he shook his head, saying, \"I'm broke, too.\""
  },
  {
    "id": 23,
    "text": "\"I'm apt to buy things on impulse whenever something is on sale.\" \"So am I.\""
  },
  {
    "id": 24,
    "text": "As it is, ordinary people cannot afford to purchase such luxuries."
  },
  {
    "id": 25,
    "text": "As we anticipated, the unemployment rate has risen three quarters in a row."
  },
  {
    "id": 26,
    "text": "I have to cut down on my expenses, so from now on, I'm going to keep track of them on a daily basis."
  },
  {
    "id": 27,
    "text": "In any case, the union has to compromise to a certain extent."
  },
  {
    "id": 28,
    "text": "Competent mechanics are in great demand, so they earn decent wages."
  },
  {
    "id": 29,
    "text": "The president announced a concrete plan to carry out welfare reform."
  },
  {
    "id": 30,
    "text": "His policy will no doubt lead to dismal consequences. It needs a thorough review."
  },
  {
    "id": 31,
    "text": "It goes without saying that the aging of society is inevitable."
  },
  {
    "id": 32,
    "text": "Please take a look at this chart. It indicates that juvenile delinquency is on the increase at an alarming rate."
  },
  {
    "id": 33,
    "text": "In many business districts, there are a lot of vacant lots which have been for sale for years."
  },
  {
    "id": 34,
    "text": "The population density in the metropolis is gradually decreasing."
  },
  {
    "id": 35,
    "text": "In all likelihood, the birthrate will continue to decline steadily for years to come."
  },
  {
    "id": 36,
    "text": "The power plant supplies the remote county with electricity."
  },
  {
    "id": 37,
    "text": "You are not allowed to operate this device without permission."
  },
  {
    "id": 38,
    "text": "In fact, the inhabitants have been exposed to radiation."
  },
  {
    "id": 39,
    "text": "One cannot emphasize too much the potential danger of nuclear energy."
  },
  {
    "id": 40,
    "text": "For years the press overlooked the problem. But now, if anything, they are making too much of it."
  },
  {
    "id": 41,
    "text": "As well as cultivating grain, the farmer runs a grocery store."
  },
  {
    "id": 42,
    "text": "The research institute was established in the late 1960s."
  },
  {
    "id": 43,
    "text": "Why don't you consult Starr in person? He's by far the most prominent attorney around here."
  },
  {
    "id": 44,
    "text": "I'll write it down just in case, because I have a bad memory."
  },
  {
    "id": 45,
    "text": "The lawyer recommended that his client take legal action against the insurance company."
  },
  {
    "id": 46,
    "text": "They are entitled to be compensated for their injuries."
  },
  {
    "id": 47,
    "text": "So far, no less than 200 people have died of the flu epidemic."
  },
  {
    "id": 48,
    "text": "The effect of those pills is intense but brief."
  },
  {
    "id": 49,
    "text": "He has a habit of biting his nails. It's absolutely disgusting."
  },
  {
    "id": 50,
    "text": "My grandma strained her back when she bent down to hug my son."
  },
  {
    "id": 51,
    "text": "If you have a stiff neck, try an herbal remedy."
  },
  {
    "id": 52,
    "text": "Medical breakthroughs have brought about great benefits for humanity as a whole."
  },
  {
    "id": 53,
    "text": "We can't apply cloning techniques to cattle, let alone human beings. It's forbidden."
  },
  {
    "id": 54,
    "text": "Whales are classified as mammals."
  },
  {
    "id": 55,
    "text": "The theory of evolution is beyond the reach of my imagination."
  },
  {
    "id": 56,
    "text": "The biologist is proud of his historic discovery and doesn't mind boasting about it."
  },
  {
    "id": 57,
    "text": "On ethical grounds, they are opposed to so-called gene therapy."
  },
  {
    "id": 58,
    "text": "The initial symptoms of the disease are fever and a sore throat."
  },
  {
    "id": 59,
    "text": "The structure of the brain is complex."
  },
  {
    "id": 60,
    "text": "Owing to illness, some representatives were absent from the annual conference."
  },
  {
    "id": 61,
    "text": "Little by little, my son-in-law is recovering from stomach cancer, and now he is in good spirits."
  },
  {
    "id": 62,
    "text": "\"This is fake, isn't it?\" \"Hey, it's a genuine antique.\" \"No way!\""
  },
  {
    "id": 63,
    "text": "\"Anything else?\" \"That's it.\" \"For here or to go?\" \"To go.\""
  },
  {
    "id": 64,
    "text": "\"How much is this rug?\" \"$100 including tax.\" \"OK, I'll take it.\""
  },
  {
    "id": 65,
    "text": "I don't think those pants look good on you. Try these on. They're really in now!"
  },
  {
    "id": 66,
    "text": "He got out of the cab in haste, saying, \"Keep the change.\""
  },
  {
    "id": 67,
    "text": "Delivery service is available to our customers for a slight extra charge."
  },
  {
    "id": 68,
    "text": "\"It's on me.\" \"No. You treat me every time we eat out.\" \"Well, okay. Let's split the check then.\""
  },
  {
    "id": 69,
    "text": "While I was hanging out at the mall, I ran into Ken."
  },
  {
    "id": 70,
    "text": "I was short of cash, so I withdrew the $100 that I had deposited in my bank account last week."
  },
  {
    "id": 71,
    "text": "On her way home she was robbed of her purse."
  },
  {
    "id": 72,
    "text": "\"That's odd! Tell me how it happened.\" \"I'll explain it to you later.\""
  },
  {
    "id": 73,
    "text": "My parents gave me a 6 pm curfew as a punishment because I broke my promise."
  },
  {
    "id": 74,
    "text": "As the proverb goes, \"The end justifies the means.\""
  },
  {
    "id": 75,
    "text": "Now that I've found that there's no one to turn to, I'll have to stand on my own two feet."
  },
  {
    "id": 76,
    "text": "The chairman cut me off, saying, \"Time to wind things up. Let's take a vote.\""
  },
  {
    "id": 77,
    "text": "We exchanged frank opinions in the meeting, but consensus is yet to be reached regarding this matter."
  },
  {
    "id": 78,
    "text": "\"Do you agree or disagree with him?\" \"I'm on his side.\""
  },
  {
    "id": 79,
    "text": "Strictly speaking, his view differs somewhat from mine."
  },
  {
    "id": 80,
    "text": "Could you go over it again? I couldn't make out what you were getting at."
  },
  {
    "id": 81,
    "text": "No one backed me up at first, but eventually I talked everyone into going along with my plan."
  },
  {
    "id": 82,
    "text": "\"I admire your perseverance, courage and wisdom.\" \"You flatter me!\""
  },
  {
    "id": 83,
    "text": "In making a decision, I rely not on logic but on instinct."
  },
  {
    "id": 84,
    "text": "He came up with an ingenious, sensible solution and immediately put it into practice."
  },
  {
    "id": 85,
    "text": "From an objective viewpoint, the former is inferior to the latter."
  },
  {
    "id": 86,
    "text": "Your idea sounds marvelous in theory, yet I don't think it will work in practice."
  },
  {
    "id": 87,
    "text": "We expected him to defeat his opponent, but he failed to live up to our expectations."
  },
  {
    "id": 88,
    "text": "Ironically, despite their best endeavors, their mission resulted in complete failure."
  },
  {
    "id": 89,
    "text": "Her genius makes up for her lack of firsthand experience."
  },
  {
    "id": 90,
    "text": "She possesses a great capacity for overcoming any obstacle."
  },
  {
    "id": 91,
    "text": "Without your solid support, the deal would have fallen through. I'm grateful to you."
  },
  {
    "id": 92,
    "text": "Bringing flammable items into the cabin is prohibited."
  },
  {
    "id": 93,
    "text": "Our flight to Vienna was delayed on account of a minor accident."
  },
  {
    "id": 94,
    "text": "The plane blew up and plunged into the ocean, killing all the people on board."
  },
  {
    "id": 95,
    "text": "They are working around the clock looking into the cause of the crash."
  },
  {
    "id": 96,
    "text": "Unfortunately, few passengers survived the catastrophe."
  },
  {
    "id": 97,
    "text": "The aviation expert analyzed the statistics in detail."
  },
  {
    "id": 98,
    "text": "On behalf of all the staff, I'd like to express our sympathy for the victims."
  },
  {
    "id": 99,
    "text": "In a sense, he is to blame for the disaster."
  },
  {
    "id": 100,
    "text": "The vehicles are inspected for defects every three months."
  },
  {
    "id": 101,
    "text": "I was amazed to see that our utility bills came to so much!"
  },
  {
    "id": 102,
    "text": "\"Turn the faucet off!\" mom yelled in a rage."
  },
  {
    "id": 103,
    "text": "Tighten the lid so the food doesn't go bad."
  },
  {
    "id": 104,
    "text": "\"Can I borrow your scissors?\" \"Sure, here you are.\""
  },
  {
    "id": 105,
    "text": "You can substitute some transparent glue for a needle and thread."
  },
  {
    "id": 106,
    "text": "I dyed this fabric and it shrank."
  },
  {
    "id": 107,
    "text": "I'm getting rid of this leather jacket because it's worn out at the elbows."
  },
  {
    "id": 108,
    "text": "Add some flour to the mixture and stir it until it becomes thick."
  },
  {
    "id": 109,
    "text": "\"What should we do with the leftovers?\" \"Keep them in the fridge for now. I'll heat them in the microwave later.\""
  },
  {
    "id": 110,
    "text": "I could have laid out all that money on a new PC, but on second thought I decided to put some aside for a rainy day."
  },
  {
    "id": 111,
    "text": "A cell phone has become something of a necessity, and I can't do without one."
  },
  {
    "id": 112,
    "text": "No sooner had I sat back and relaxed than my wife asked me to do the chores."
  },
  {
    "id": 113,
    "text": "She laid the baby down and lay down beside him."
  },
  {
    "id": 114,
    "text": "Put this stuff away! It's in the way."
  },
  {
    "id": 115,
    "text": "When the kids made believe they were dinosaurs, they were scolded by their mother."
  },
  {
    "id": 116,
    "text": "After he bumped into the shelf, the priceless china fell and shattered into fragments."
  },
  {
    "id": 117,
    "text": "\"Can you keep an eye on my kids for a while? I need to pick up Ken.\" \"No problem.\""
  },
  {
    "id": 118,
    "text": "Our neighbor told us off for making a mess in his yard."
  },
  {
    "id": 119,
    "text": "Dolly resembles her big sister in every way. You can't tell them apart."
  },
  {
    "id": 120,
    "text": "As a rule, twins have a lot in common."
  },
  {
    "id": 121,
    "text": "I'm tired of doing the dishes, doing the laundry, and so on!"
  },
  {
    "id": 122,
    "text": "My favorite pastime is strolling along the shore. It's pleasant."
  },
  {
    "id": 123,
    "text": "\"I'm exhausted! Let's take a break in the shade.\" \"Why not?\""
  },
  {
    "id": 124,
    "text": "\"Bob, this vending machine is out of order.\" \"Oh no! I'm dying of thirst!\""
  },
  {
    "id": 125,
    "text": "He fainted with hunger and fatigue, but came to after a while."
  },
  {
    "id": 126,
    "text": "The auditorium was empty except for a single piece of furniture."
  },
  {
    "id": 127,
    "text": "Any apartment will do as long as the rent is low. I'm not particular about it."
  },
  {
    "id": 128,
    "text": "His sixty-year-old cousin inherited a piece of real estate by a lake."
  },
  {
    "id": 129,
    "text": "So much for small talk. Let's get down to business."
  },
  {
    "id": 130,
    "text": "Lucy resented the aggressive salesman trying to make her sign the contract."
  },
  {
    "id": 131,
    "text": "There are a number of factors discouraging us from investing in stocks."
  },
  {
    "id": 132,
    "text": "Japan imports various raw materials and exports manufactured goods."
  },
  {
    "id": 133,
    "text": "In the course of its economic development, Japan has abandoned its traditional values."
  },
  {
    "id": 134,
    "text": "The world is faced with an unprecedented crisis."
  },
  {
    "id": 135,
    "text": "In short, the purpose of the regulations is to protect domestic industries."
  },
  {
    "id": 136,
    "text": "In order to keep up its competitiveness in the world, Japan must undertake sweeping deregulation in earnest."
  },
  {
    "id": 137,
    "text": "We cannot turn our backs on desperate people who are at risk."
  },
  {
    "id": 138,
    "text": "The parliament decided to provide developing countries with financial aid."
  },
  {
    "id": 139,
    "text": "Some say the British monarchy should be abolished. What do you think?"
  },
  {
    "id": 140,
    "text": "They sought shelter from the attack but found no place to hide."
  },
  {
    "id": 141,
    "text": "There's little prospect that the two countries will make significant progress in disarmament."
  },
  {
    "id": 142,
    "text": "The negotiations are under way. Before long, they will enter a crucial phase."
  },
  {
    "id": 143,
    "text": "The slaves were anxious to alter their destinies."
  },
  {
    "id": 144,
    "text": "The aristocrats abused their privileges to their heart's content."
  },
  {
    "id": 145,
    "text": "The revolution in itself, bore no fruit, after all."
  },
  {
    "id": 146,
    "text": "Bob cut in on our conversation, saying, \"I'm against it!\" But everybody ignored him."
  },
  {
    "id": 147,
    "text": "We skipped his turn on purpose."
  },
  {
    "id": 148,
    "text": "He saw someone being bullied, but he turned a blind eye."
  },
  {
    "id": 149,
    "text": "When Nick and I cheated on an exam, I was suspended from school. As for Nick, he got away with it."
  },
  {
    "id": 150,
    "text": "They are hostile to Richard because they are jealous of his wealth and status."
  },
  {
    "id": 151,
    "text": "I hate him! He behaves as if he were somebody."
  },
  {
    "id": 152,
    "text": "In spite of our compliments, he frowned and turned away. He was so rude!"
  },
  {
    "id": 153,
    "text": "He claimed that the enormous property was at his disposal."
  },
  {
    "id": 154,
    "text": "The more stubborn you are, the more isolated you become."
  },
  {
    "id": 155,
    "text": "\"Don't beat around the bush! What am I supposed to do?\" \"Just wait and see. Time will tell.\""
  },
  {
    "id": 156,
    "text": "Please hand in your assignment via e-mail no later than 5:00 PM on June 10."
  },
  {
    "id": 157,
    "text": "Joe is anything but diligent. That's why he flunked math again."
  },
  {
    "id": 158,
    "text": "His thesis doesn't make sense. To begin with, its theme is obscure."
  },
  {
    "id": 159,
    "text": "His essay was concise and to the point."
  },
  {
    "id": 160,
    "text": "\"How are you going to deal with this complicated problem?\" \"Leave it to me! It's a piece of cake.\""
  },
  {
    "id": 161,
    "text": "\"Nick, I want you to look this over before I turn it in.\" \"Sorry, but I have my hands full right now.\""
  },
  {
    "id": 162,
    "text": "\"What if I don't meet the deadline?\" \"I bet he'll get mad at you!\""
  },
  {
    "id": 163,
    "text": "Your summary leaves nothing to be desired apart from the terrible handwriting."
  },
  {
    "id": 164,
    "text": "You ought to think over whether the premise is valid or not."
  },
  {
    "id": 165,
    "text": "Above all, scientific terms call for precise definitions."
  },
  {
    "id": 166,
    "text": "First of all, learn the formula by heart."
  },
  {
    "id": 167,
    "text": "To calculate the volume, multiply the length by the width by the depth."
  },
  {
    "id": 168,
    "text": "Tiny cracks were found in the bottom of the barrel."
  },
  {
    "id": 169,
    "text": "This chapter will focus on the concepts of geometry."
  },
  {
    "id": 170,
    "text": "Phil is much more interested in academic subjects than in practical skills."
  },
  {
    "id": 171,
    "text": "\"Something's gone wrong with this microscope. I need to have it repaired.\" \"Let me see it. Maybe I can fix it.\""
  },
  {
    "id": 172,
    "text": "\"What is 'an instrument'?\" \"For instance, a gauge, such as a thermometer or a barometer.\""
  },
  {
    "id": 173,
    "text": "The minute particles are barely visible to the naked eye."
  },
  {
    "id": 174,
    "text": "Muscle tissue consists of a vast number of cells."
  },
  {
    "id": 175,
    "text": "This substance is mostly composed of hydrogen and oxygen."
  },
  {
    "id": 176,
    "text": "The exact temperature is 22.68 degrees Celsius."
  },
  {
    "id": 177,
    "text": "\"Naomi likes to show off her perfect figure. I wish I were thin like her. I envy her.\" \"You could go on a diet.\""
  },
  {
    "id": 178,
    "text": "I fell in love with Naomi at first sight. Three months later, I took a chance and proposed to her, but she turned me down."
  },
  {
    "id": 179,
    "text": "I met the man by chance. He's gentle and smart. What's more, he's single!"
  },
  {
    "id": 180,
    "text": "His nephew was brought up to be modest and considerate."
  },
  {
    "id": 181,
    "text": "I introduced Bob to my folks, and they took to him at once."
  },
  {
    "id": 182,
    "text": "People should be judged not so much by how they look as by who they are."
  },
  {
    "id": 183,
    "text": "\"It's not your title that counts. That's for sure!\" exclaimed Bob."
  },
  {
    "id": 184,
    "text": "As a self-made man put it, \"A man of vision will make good in the end.\""
  },
  {
    "id": 185,
    "text": "Keep in mind that youth is not eternal."
  },
  {
    "id": 186,
    "text": "I can't figure out why on earth everybody feels so much contempt for Bob!"
  },
  {
    "id": 187,
    "text": "I can't help laughing at him because he keeps on making stupid mistakes. He'd be the last person to learn his lesson."
  },
  {
    "id": 188,
    "text": "To make matters worse, he isn't even conscious of annoying us."
  },
  {
    "id": 189,
    "text": "Since I was in a hurry, I put my gloves on inside out by mistake."
  },
  {
    "id": 190,
    "text": "Dave is fat and clumsy. When he leaped over the shallow stream, he stumbled and twisted his ankle."
  },
  {
    "id": 191,
    "text": "\"I'm scared of heights.\" \"You're a coward!\""
  },
  {
    "id": 192,
    "text": "The passive man seldom, if ever, expresses himself in public."
  },
  {
    "id": 193,
    "text": "Nick convinced me that all superstitions are irrational."
  },
  {
    "id": 194,
    "text": "I tremble with fear at the thought of an injection."
  },
  {
    "id": 195,
    "text": "Since Bob is lazy at heart, he frequently neglects his duties."
  },
  {
    "id": 196,
    "text": "While Bob was at work, Jennifer was at home absorbed in silly soap operas."
  },
  {
    "id": 197,
    "text": "Bob likes cartoons, but I don't think much of them. As a matter of fact, they're boring."
  },
  {
    "id": 198,
    "text": "It occurred to me that he was holding something back, because he wouldn't look me in the eye."
  },
  {
    "id": 199,
    "text": "When her patience gave out, she grabbed his collar and swore at him."
  },
  {
    "id": 200,
    "text": "I must admit we quarrel every now and then, but generally we're on good terms with each other."
  },
  {
    "id": 201,
    "text": "\"Do you mind if I stop by your house?\" \"No, not at all. Be my guest!\""
  },
  {
    "id": 202,
    "text": "Hold on. I'll be right back. Don't hang up!"
  },
  {
    "id": 203,
    "text": "I can't put you up. For one thing, my dad drops in on me from time to time."
  },
  {
    "id": 204,
    "text": "While Jennifer was standing still, Bob was pacing back and forth along the sidewalk."
  },
  {
    "id": 205,
    "text": "\"Let's make up, Lisa.\" \"Stop taking me for granted! We're through for good this time. I mean it!\""
  },
  {
    "id": 206,
    "text": "Come on! Don't get so emotional, Lisa. I didn't mean to hurt you. Let's talk it over."
  },
  {
    "id": 207,
    "text": "\"You betrayed me!\" \"Please forgive me. How can I make it up to you?\" \"I'll get even!\""
  },
  {
    "id": 208,
    "text": "You should confess your sins rather than conceal them."
  },
  {
    "id": 209,
    "text": "Keep your word; otherwise you'll end up losing face."
  },
  {
    "id": 210,
    "text": "Bob sticks to his moral principles and believes that honesty pays off in the long run."
  },
  {
    "id": 211,
    "text": "\"Cheer up! You couldn't help it.\" \"I did my best.\" \"I know. Don't dwell on the past. You can start over!\""
  },
  {
    "id": 212,
    "text": "\"Jane, please do me a favor and give me a ride to Times Square.\" \"I wish I could, but I'm tied up right now.\""
  },
  {
    "id": 213,
    "text": "As usual, Mike turned up on time. He's very punctual."
  },
  {
    "id": 214,
    "text": "The other day I ran out of gas in the middle of a busy Interstate."
  },
  {
    "id": 215,
    "text": "A truck driving ahead of me skidded, turned over, and scattered its load all over the road."
  },
  {
    "id": 216,
    "text": "He recalled that a collision had been avoided by sheer luck."
  },
  {
    "id": 217,
    "text": "In case of an emergency, get in touch with my agent right away."
  },
  {
    "id": 218,
    "text": "\"Jane, where are we heading?\" \"I think we're lost. We went in the wrong direction.\" \"Damn! Pull over!\""
  },
  {
    "id": 219,
    "text": "My rusty Ford broke down, obstructing the intersection."
  },
  {
    "id": 220,
    "text": "There are so many fine scratches and dents on its surface, it's no use polishing it."
  },
  {
    "id": 221,
    "text": "\"Hey, we're stuck in a traffic jam!\" \"Chill out, Joe. Let's take a shortcut! We'll get there in time.\""
  },
  {
    "id": 222,
    "text": "\"I've got a flat tire. Can you give me a hand?\" \"I'd be glad to.\""
  },
  {
    "id": 223,
    "text": "The ambulance went out of control and came close to running over a pedestrian."
  },
  {
    "id": 224,
    "text": "He contends that primitive life once existed on Mars."
  },
  {
    "id": 225,
    "text": "The crew is busy preparing for the voyage into outer space."
  },
  {
    "id": 226,
    "text": "They conducted a series of experiments under zero gravity."
  },
  {
    "id": 227,
    "text": "Many astronomers assume that the universe will expand infinitely."
  },
  {
    "id": 228,
    "text": "The astronauts were greeted with spontaneous applause."
  },
  {
    "id": 229,
    "text": "A fund was set up with a view to preserving our endangered planet."
  },
  {
    "id": 230,
    "text": "The massive flood paralyzed the local transportation network."
  },
  {
    "id": 231,
    "text": "The equator divides the globe into two hemispheres."
  },
  {
    "id": 232,
    "text": "I think it's cruel to trap animals for fur coats."
  },
  {
    "id": 233,
    "text": "The organization plays a principal role in wildlife conservation."
  },
  {
    "id": 234,
    "text": "Many fragile species are on the verge of extinction."
  },
  {
    "id": 235,
    "text": "The prolonged drought did severe damage to the crops."
  },
  {
    "id": 236,
    "text": "Tropical rain forests are quickly disappearing on a global scale. In part, it's due to acid rain."
  },
  {
    "id": 237,
    "text": "It is said that global warming is directly related to carbon dioxide emissions."
  },
  {
    "id": 238,
    "text": "The destruction of the ozone layer affects the environment."
  },
  {
    "id": 239,
    "text": "The committee called on all nations to work side by side to curb air pollution."
  },
  {
    "id": 240,
    "text": "A satellite was launched into orbit to monitor melting glaciers."
  },
  {
    "id": 241,
    "text": "The ecologist has warned us time and again that petroleum is not only a blessing but also a curse."
  },
  {
    "id": 242,
    "text": "The continent is abundant in fossil fuels."
  },
  {
    "id": 243,
    "text": "The region is relatively rich in mineral resources."
  },
  {
    "id": 244,
    "text": "Wheat accounts for approximately two-thirds of agricultural production in the area."
  },
  {
    "id": 245,
    "text": "Fertile soil is indispensable for a good harvest."
  },
  {
    "id": 246,
    "text": "A humid climate is characteristic of the peninsula."
  },
  {
    "id": 247,
    "text": "The active volcano erupts at regular intervals."
  },
  {
    "id": 248,
    "text": "The Panama Canal connects the Atlantic with the Pacific."
  },
  {
    "id": 249,
    "text": "The geographical features here are similar to those of our prefecture."
  },
  {
    "id": 250,
    "text": "More often than not, famine is accompanied by plague."
  },
  {
    "id": 251,
    "text": "A devastating earthquake hit the state capital, leaving tens of thousands of residents homeless."
  },
  {
    "id": 252,
    "text": "\"Watch out! The ceiling is giving way!\""
  },
  {
    "id": 253,
    "text": "The weather forecast says the typhoon is likely to accelerate and approach the coast."
  },
  {
    "id": 254,
    "text": "\"It's still up in the air whether the game will be called off or not.\" \"So what? It makes no difference to me.\""
  },
  {
    "id": 255,
    "text": "\"It's foggy, isn't it?\" \"It sure is. But chances are it'll clear up later on.\""
  },
  {
    "id": 256,
    "text": "For the most part, modernization is identified with westernization."
  },
  {
    "id": 257,
    "text": "Urban culture appears to be attractive to many people, in particular, to younger people."
  },
  {
    "id": 258,
    "text": "\"AI\" stands for \"artificial intelligence.\""
  },
  {
    "id": 259,
    "text": "Household appliances are becoming more convenient day by day."
  },
  {
    "id": 260,
    "text": "My income is not adequate to provide for my family of four, but we have to make the best of it."
  },
  {
    "id": 261,
    "text": "The popularity of a website depends on its content."
  },
  {
    "id": 262,
    "text": "You've got to keep up with it. Once you fall behind, it's hard to catch up."
  },
  {
    "id": 263,
    "text": "As technology rapidly advances, it's tough to keep pace with it."
  },
  {
    "id": 264,
    "text": "More and more people are rushing to make use of the interactive nature of the medium."
  },
  {
    "id": 265,
    "text": "Innovation has something to do with the ability to notice unusual phenomena."
  },
  {
    "id": 266,
    "text": "A bunch of other companies are imitating our excellent methods."
  },
  {
    "id": 267,
    "text": "The once desolate valley was transformed into a thriving hub of hi-tech business."
  },
  {
    "id": 268,
    "text": "Although there's still plenty of room for improvement, his invention is superior to conventional equipment in every respect."
  },
  {
    "id": 269,
    "text": "The strength of the firm is attributed to its unique and future-oriented strategies."
  },
  {
    "id": 270,
    "text": "SONY has integrated a wide range of functions into this cool gadget. It's catching on from coast to coast."
  },
  {
    "id": 271,
    "text": "This tool comes in handy, so I always keep it close at hand."
  },
  {
    "id": 272,
    "text": "\"In general, consumers prefer quantity to quality.\" \"It's the other way around today.\""
  },
  {
    "id": 273,
    "text": "Obviously, the advertisement is aimed at teenagers."
  },
  {
    "id": 274,
    "text": "The factory now under construction will assemble 1,000 VCR units per day."
  },
  {
    "id": 275,
    "text": "Efficient machinery replaced manual labor."
  },
  {
    "id": 276,
    "text": "In those days, the gigantic corporation had a virtual monopoly over internal commerce."
  },
  {
    "id": 277,
    "text": "With restrictions removed, thousands of new enterprises have come into being."
  },
  {
    "id": 278,
    "text": "As a result of his ridiculous venture, he is in danger of going bankrupt."
  },
  {
    "id": 279,
    "text": "Compared to the previous year, business is looking up in terms of sales. However, we haven't made any profit yet."
  },
  {
    "id": 280,
    "text": "\"I'm going to be transferred to an overseas branch.\" \"Oh, I'll miss you. Please drop me a line.\""
  },
  {
    "id": 281,
    "text": "While he was away on business, his wife gave birth to a baby boy."
  },
  {
    "id": 282,
    "text": "Apparently, Nick wasn't willing to take on the task because it would just add to his burdens."
  },
  {
    "id": 283,
    "text": "Bob had intended to take her out tonight, but he had to work overtime."
  },
  {
    "id": 284,
    "text": "\"Please estimate the losses by Friday at the latest.\" \"I'll manage it somehow.\""
  },
  {
    "id": 285,
    "text": "\"Nick, I'm counting on you.\" \"OK, I'll see to it.\" \"Thanks, I appreciate it.\" \"Don't mention it.\""
  },
  {
    "id": 286,
    "text": "He pretends to be enthusiastic when his boss is around."
  },
  {
    "id": 287,
    "text": "He got promoted at the expense of his colleagues. He should be ashamed of himself."
  },
  {
    "id": 288,
    "text": "As the recession set in, temporary employees were laid off one after another."
  },
  {
    "id": 289,
    "text": "Nowadays, many people are out of work against their will. Who is responsible for that?"
  },
  {
    "id": 290,
    "text": "I've gotten pessimistic, and I'm worried about something I would never have been concerned about before."
  },
  {
    "id": 291,
    "text": "Today, even white-collar workers are confronted with great hardships."
  },
  {
    "id": 292,
    "text": "The authorities are striving in vain to stabilize the currency."
  },
  {
    "id": 293,
    "text": "We've come to the conclusion that nothing is more urgent than reducing Japan's huge deficit."
  },
  {
    "id": 294,
    "text": "The questionnaires were distributed at random."
  },
  {
    "id": 295,
    "text": "All you have to do is fill in the blanks below. (Please print in black or blue ink.)"
  },
  {
    "id": 296,
    "text": "In addition to a 10% discount, you can pick out an optional excursion for free."
  },
  {
    "id": 297,
    "text": "Round-trip fares to each destination are as follows."
  },
  {
    "id": 298,
    "text": "\"Don't forget to confirm your reservation in advance.\" \"I won't.\""
  },
  {
    "id": 299,
    "text": "Be sure to check in at least 45 minutes prior to departure time."
  },
  {
    "id": 300,
    "text": "I attached my name tag to my baggage, but it soon came off."
  },
  {
    "id": 301,
    "text": "On average, these packages weigh two pounds."
  },
  {
    "id": 302,
    "text": "This plastic garbage bag is free of hazardous chemicals."
  },
  {
    "id": 303,
    "text": "This flashlight is getting dim. It needs new batteries."
  },
  {
    "id": 304,
    "text": "Excuse me. How often do the shuttle buses run to downtown New York?"
  },
  {
    "id": 305,
    "text": "The motel can accommodate as many as 400 guests."
  },
  {
    "id": 306,
    "text": "This suite is three times larger than my condominium."
  },
  {
    "id": 307,
    "text": "Littering in this facility is subject to a maximum fine of $500."
  },
  {
    "id": 308,
    "text": "That restaurant is always packed. We'd better make a reservation beforehand."
  },
  {
    "id": 309,
    "text": "\"Sorry to interrupt your meal but I'd like a word with you in private.\" \"Can I get back to you later?\""
  },
  {
    "id": 310,
    "text": "The cook was astonished at his incredible appetite."
  },
  {
    "id": 311,
    "text": "\"What's going on down there? I'm curious.\" \"I have no idea.\""
  },
  {
    "id": 312,
    "text": "Excited fans were hanging around the rear exit hoping to catch a glimpse of Michael."
  },
  {
    "id": 313,
    "text": "On encountering the celebrity, they asked for his autograph."
  },
  {
    "id": 314,
    "text": "Whenever I go abroad, I suffer from jet lag and diarrhea."
  },
  {
    "id": 315,
    "text": "\"I feel sort of dizzy and I feel like throwing up.\" \"You look pale!\""
  },
  {
    "id": 316,
    "text": "Take some aspirin. It will cure you of your headache in no time."
  },
  {
    "id": 317,
    "text": "\"I'm afraid I'm coming down with something.\" \"You should take a day off.\""
  },
  {
    "id": 318,
    "text": "Some of the ingredients in this beverage are harmful, especially if you are pregnant."
  },
  {
    "id": 319,
    "text": "Good nutrition is vital for an infant's growth."
  },
  {
    "id": 320,
    "text": "Moderate exercise stimulates the circulation of the blood."
  },
  {
    "id": 321,
    "text": "My physician advised me to refrain from alcohol for the time being."
  },
  {
    "id": 322,
    "text": "I do want to get into shape and lose some weight, so I go swimming every morning."
  },
  {
    "id": 323,
    "text": "He caught a nasty cold because he stayed up late last night."
  },
  {
    "id": 324,
    "text": "The surgeon persuaded him to undergo an organ transplant."
  },
  {
    "id": 325,
    "text": "Since our father is bedridden, we take turns looking after him."
  },
  {
    "id": 326,
    "text": "Our hypothesis is that eating excessive amounts of junk food contributes to early mortality."
  },
  {
    "id": 327,
    "text": "The government did not take appropriate measures to prevent the infection from spreading."
  },
  {
    "id": 328,
    "text": "The minister was obliged to resign from the Cabinet."
  },
  {
    "id": 329,
    "text": "Many people regard the current compulsory education system as being obsolete."
  },
  {
    "id": 330,
    "text": "Many people encouraged me to fulfill my ambitions."
  },
  {
    "id": 331,
    "text": "To make his dreams come true, he dropped out of school and made his way to Tokyo."
  },
  {
    "id": 332,
    "text": "\"What do you do?\" \"I'm a college student, a freshman at Harvard.\" \"What's your major?\" \"Philosophy.\""
  },
  {
    "id": 333,
    "text": "Tuition will be raised by nearly ten percent as of April 1, 2001."
  },
  {
    "id": 334,
    "text": "\"I'm of two minds whether to apply for the scholarship or not.\" \"Give it a try!\""
  },
  {
    "id": 335,
    "text": "As soon as he graduated from Keio University, he took over his family's business."
  },
  {
    "id": 336,
    "text": "You aren't cut out for the military because of its rigid discipline."
  },
  {
    "id": 337,
    "text": "I am determined to make a living as a playwright at all costs."
  },
  {
    "id": 338,
    "text": "As he grew up, he learned to put things in perspective."
  },
  {
    "id": 339,
    "text": "Conformity is an essential element of our homogeneous community."
  },
  {
    "id": 340,
    "text": "I'd rather go my own way than toil away for a company. Trying to fit into a mold gets me nowhere!"
  },
  {
    "id": 341,
    "text": "Tom takes after his uncle in personality. I mean, he is obstinate by nature. He never gives in."
  },
  {
    "id": 342,
    "text": "When the time is ripe, be bold and go for it! I'll stand by you."
  },
  {
    "id": 343,
    "text": "I'll stand up for what I believe in and won't yield to any threats."
  },
  {
    "id": 344,
    "text": "\"If only I could conquer my weaknesses!\" \"It's up to you.\""
  },
  {
    "id": 345,
    "text": "You should make the most of this rare opportunity to demonstrate your talent."
  },
  {
    "id": 346,
    "text": "You won't let me down. I have great faith in you. You can make it!"
  },
  {
    "id": 347,
    "text": "The spectators were moved by her graceful performance."
  },
  {
    "id": 348,
    "text": "In 1995, Ando received architecture's most prestigious award."
  },
  {
    "id": 349,
    "text": "In the face of adversity, Mike accomplished an extraordinary feat. He deserves praise."
  },
  {
    "id": 350,
    "text": "The audience was impressed by his eloquent lecture."
  },
  {
    "id": 351,
    "text": "From a humble background, John achieved worldwide fame."
  },
  {
    "id": 352,
    "text": "He accumulated a tremendous fortune during the postwar era."
  },
  {
    "id": 353,
    "text": "He used to be well off and generous, but now he lives from hand to mouth."
  },
  {
    "id": 354,
    "text": "Nick is by no means satisfied with the reward. He is selfish and greedy."
  },
  {
    "id": 355,
    "text": "\"You owe me $200 altogether, Bob. When are you going to pay me back?\" \"I'm sorry. I'm hard up.\" \"There you go again!\""
  },
  {
    "id": 356,
    "text": "To Brian's surprise, his debt amounted to a considerable sum."
  },
  {
    "id": 357,
    "text": "Stop clinging to your glory days, or you'll be left behind."
  },
  {
    "id": 358,
    "text": "You cannot escape from today's harsh realities, so you must adapt to them."
  },
  {
    "id": 359,
    "text": "Prosperity does not last forever. In other words, it will come to an end one of these days."
  },
  {
    "id": 360,
    "text": "Proper qualifications are required for the position; computer literacy is a must."
  },
  {
    "id": 361,
    "text": "Enclose your resume in this envelope and submit it to the personnel department."
  },
  {
    "id": 362,
    "text": "It's optimistic of you to believe that things will work out. At best there's a fifty-fifty chance."
  },
  {
    "id": 363,
    "text": "Registration forms can be obtained free of charge."
  },
  {
    "id": 364,
    "text": "Please give us a call now if you want to participate in the workshop!"
  },
  {
    "id": 365,
    "text": "For further inquiries, please feel free to contact us toll-free at 1-800-555-1212."
  },
  {
    "id": 366,
    "text": "\"How's it going, Bob?\" \"Couldn't be better! I did well in my job interview!\" \"Good for you!\""
  },
  {
    "id": 367,
    "text": "He gave instructions to the trainees, but they couldn't make heads or tails of them."
  },
  {
    "id": 368,
    "text": "You can't do two things at one time! It's out of the question. Do them one by one."
  },
  {
    "id": 369,
    "text": "\"Bob, don't disturb her. Mind your own business,\" he whispered."
  },
  {
    "id": 370,
    "text": "If you persist in bothering her like that, she'll lose her temper."
  },
  {
    "id": 371,
    "text": "He was so childish that he couldn't resist temptation."
  },
  {
    "id": 372,
    "text": "\"Stop making a fuss. It really gets on my nerves!\" she shouted."
  },
  {
    "id": 373,
    "text": "There's no point in talking back to Nick. He is a \"dictator,\" so to speak."
  },
  {
    "id": 374,
    "text": "They are very polite in his presence, but actually, they always talk about him behind his back."
  },
  {
    "id": 375,
    "text": "\"You despise Nick, don't you?\" \"On the contrary! I look up to him.\""
  },
  {
    "id": 376,
    "text": "His constant insults aroused her anger."
  },
  {
    "id": 377,
    "text": "I'm fed up with just shuffling papers and pouring coffee. I've made up my mind to quit!"
  },
  {
    "id": 378,
    "text": "In reality, many people have difficulty making ends meet. How can you get by on 100,000 yen a month?"
  },
  {
    "id": 379,
    "text": "Female clerks may well complain about their routines, which are not challenging at all."
  },
  {
    "id": 380,
    "text": "Thanks to a fundamental restructuring, our surplus has swelled threefold."
  },
  {
    "id": 381,
    "text": "Many people today think of loyalty to a company as an absurd notion."
  },
  {
    "id": 382,
    "text": "I have to commute all the way from a distant suburb. I'm sick of it!"
  },
  {
    "id": 383,
    "text": "I want to spend the rest of my life pursuing my ideals."
  },
  {
    "id": 384,
    "text": "After retirement, Teresa devoted herself to caring for orphans."
  },
  {
    "id": 385,
    "text": "For the sake of children in need, we cooperated to collect donations."
  },
  {
    "id": 386,
    "text": "The charity is named after a man who gave away some two billion yen."
  },
  {
    "id": 387,
    "text": "His autobiography was released today and was sold out by noon."
  },
  {
    "id": 388,
    "text": "Ted, who is often referred to as a man of integrity, is going to run for mayor."
  },
  {
    "id": 389,
    "text": "The candidate was disappointed by the outcome of the election."
  },
  {
    "id": 390,
    "text": "The municipal council should concentrate more on specific issues."
  },
  {
    "id": 391,
    "text": "It is the case that those who live on a pension are forced to lead a hard life."
  },
  {
    "id": 392,
    "text": "We should leave out this data. It's far from accurate."
  },
  {
    "id": 393,
    "text": "We tend to associate politicians with hypocrisy."
  },
  {
    "id": 394,
    "text": "They are primarily concerned with exploiting us, not with enhancing our living standards."
  },
  {
    "id": 395,
    "text": "The man once exerted a dominant influence on the conservative party, but now his power is diminishing."
  },
  {
    "id": 396,
    "text": "The spokesperson refused to make any comment, saying, \"It's under investigation.\""
  },
  {
    "id": 397,
    "text": "The police say there's someone pulling strings behind the scenes."
  },
  {
    "id": 398,
    "text": "The executives entertained the bureaucrats at ryotei, or exclusive Japanese restaurants, hoping for something in return."
  },
  {
    "id": 399,
    "text": "His secretary flatly denied leaking any confidential information."
  },
  {
    "id": 400,
    "text": "No one dares to contradict his/her employer for fear of being fired."
  },
  {
    "id": 401,
    "text": "He sacrificed his promising career to retain his dignity."
  },
  {
    "id": 402,
    "text": "I might as well kill myself as reconcile myself to my fate."
  },
  {
    "id": 403,
    "text": "He was about to commit suicide by swallowing poison when he thought better of it."
  },
  {
    "id": 404,
    "text": "The vague rumor proved to be false. Nevertheless, some skepticism lingers on."
  },
  {
    "id": 405,
    "text": "A senior official is suspected of accepting bribes from a company, but there isn't sufficient evidence to arrest him."
  },
  {
    "id": 406,
    "text": "Jason, who was in charge of the project, was dismissed for corruption."
  },
  {
    "id": 407,
    "text": "To my knowledge, he has not been involved in the fraud scheme."
  },
  {
    "id": 408,
    "text": "They found out the truth while examining a pile of relevant documents."
  },
  {
    "id": 409,
    "text": "During the trial it came to light that they had been covering up illegal transactions for decades."
  },
  {
    "id": 410,
    "text": "The detective took down his testimony on the spot, word for word."
  },
  {
    "id": 411,
    "text": "For the first time in my life, I felt a pang of conscience, but there was no other way out."
  },
  {
    "id": 412,
    "text": "I'm still haunted by a vivid nightmare I had last night."
  },
  {
    "id": 413,
    "text": "By and large, reporters don't hesitate to intrude on one's privacy."
  },
  {
    "id": 414,
    "text": "The author revised his manuscript over and over again."
  },
  {
    "id": 415,
    "text": "He is second to none when it comes to finding fault with others."
  },
  {
    "id": 416,
    "text": "On the whole, the elite are not sensitive to criticism."
  },
  {
    "id": 417,
    "text": "When a tabloid revealed that he was a drug addict, his reputation was all but ruined."
  },
  {
    "id": 418,
    "text": "They considered every aspect of the defense program and pointed out numerous flaws."
  },
  {
    "id": 419,
    "text": "We will not tolerate anyone who engages in terrorism."
  },
  {
    "id": 420,
    "text": "The notorious rebel was ultimately captured and confined to jail."
  },
  {
    "id": 421,
    "text": "Troops were swiftly called in to put down the riot."
  },
  {
    "id": 422,
    "text": "We should appeal to reason instead of resorting to violence."
  },
  {
    "id": 423,
    "text": "I suggest we adopt flexible tactics for the moment."
  },
  {
    "id": 424,
    "text": "The armed forces succeeded in occupying the entire territory."
  },
  {
    "id": 425,
    "text": "Under the circumstances, the enemy has no choice but to surrender. They can't hold out any longer."
  },
  {
    "id": 426,
    "text": "Sooner or later, the hostages will be set free."
  },
  {
    "id": 427,
    "text": "Under the reign of tyranny, innocent people were deprived of their citizenship."
  },
  {
    "id": 428,
    "text": "Some soldiers were reluctant to obey the commands."
  },
  {
    "id": 429,
    "text": "His regime is bound to collapse."
  },
  {
    "id": 430,
    "text": "The allies condemned the invasion as a violation of UN resolutions."
  },
  {
    "id": 431,
    "text": "We cannot rule out the possibility that civil war will break out in that country."
  },
  {
    "id": 432,
    "text": "The colony declared independence and became a republic."
  },
  {
    "id": 433,
    "text": "An immense monument was erected in honor of the noble patriot."
  },
  {
    "id": 434,
    "text": "He got down on his knees and prayed for the souls of the deceased."
  },
  {
    "id": 435,
    "text": "The Supreme Court is located near the Imperial Palace."
  },
  {
    "id": 436,
    "text": "The pro-choice group protested against a ban on abortion."
  },
  {
    "id": 437,
    "text": "Senator Ford remained neutral in the bitter controversy."
  },
  {
    "id": 438,
    "text": "Ford has been in a difficult situation all week long. He is no longer capable of coping with it."
  },
  {
    "id": 439,
    "text": "The summit talks are to be broadcast simultaneously throughout the world."
  },
  {
    "id": 440,
    "text": "Diplomatic dialogue helped put an end to the conflict."
  },
  {
    "id": 441,
    "text": "Johnson was appointed as a goodwill ambassador to foster mutual understanding between the two nations."
  },
  {
    "id": 442,
    "text": "The specialist predicts international tension will build up."
  },
  {
    "id": 443,
    "text": "In my opinion, permanent peace is nothing but an illusion."
  },
  {
    "id": 444,
    "text": "Ethnic minorities struggle against prejudice, poverty, and oppression."
  },
  {
    "id": 445,
    "text": "We must make every effort to do away with all discrimination."
  },
  {
    "id": 446,
    "text": "The immigrants have endured physical and mental pain."
  },
  {
    "id": 447,
    "text": "The amendment was rejected because it didn't take racial diversity into account."
  },
  {
    "id": 448,
    "text": "Needless to say, the refugees were longing for freedom."
  },
  {
    "id": 449,
    "text": "According to a survey, three in five people today are indifferent to foreign affairs."
  },
  {
    "id": 450,
    "text": "What will become of Japan-U.S. relations if the security treaty expires?"
  },
  {
    "id": 451,
    "text": "Unless Japan eliminates its unfair tariffs, the U.S. will impose sanctions."
  },
  {
    "id": 452,
    "text": "Trade friction might arise between the two nations at any moment."
  },
  {
    "id": 453,
    "text": "Our top priority is to settle this dispute once and for all, so we are ready to meet them halfway."
  },
  {
    "id": 454,
    "text": "The federal budget was narrowly approved by Congress."
  },
  {
    "id": 455,
    "text": "He argues that the administration must look for alternative sources of revenue."
  },
  {
    "id": 456,
    "text": "A poll shows that an overwhelming majority is in favor of the legislation."
  },
  {
    "id": 457,
    "text": "The cops are searching for clues to the brutal murder."
  },
  {
    "id": 458,
    "text": "The man must be insane. He can't distinguish vice from virtue."
  },
  {
    "id": 459,
    "text": "The fingerprints left on the weapon correspond with the suspect's."
  },
  {
    "id": 460,
    "text": "It took us all by surprise when the noted psychologist was accused of kidnapping."
  },
  {
    "id": 461,
    "text": "The jury's guilty verdict gave rise to widespread debate."
  },
  {
    "id": 462,
    "text": "The man pleaded for mercy, but he was sentenced to twenty years in prison for his crime."
  },
  {
    "id": 463,
    "text": "The officer on duty perceived an elderly man coming up behind him."
  },
  {
    "id": 464,
    "text": "He caught sight of a thief attempting to break into the house."
  },
  {
    "id": 465,
    "text": "The day before yesterday he witnessed a weird incident in the wilderness."
  },
  {
    "id": 466,
    "text": "I became aware of someone staring at me from across the aisle, so I turned around. But there was no one in sight."
  },
  {
    "id": 467,
    "text": "She screamed with horror as someone took hold of her arm."
  },
  {
    "id": 468,
    "text": "Informed of her safety, he breathed a sigh of relief."
  },
  {
    "id": 469,
    "text": "The bullet penetrated his chest, leaving him in critical condition."
  },
  {
    "id": 470,
    "text": "At present, it's still uncertain whether it was done deliberately or by accident."
  },
  {
    "id": 471,
    "text": "A deli caught fire and burned down, leaving a heap of ashes."
  },
  {
    "id": 472,
    "text": "All of a sudden the fireworks warehouse exploded, and it took two days to put out the blaze."
  },
  {
    "id": 473,
    "text": "A bomb went off in a thirty-story building, and more than fifty people were seriously wounded."
  },
  {
    "id": 474,
    "text": "A cargo vessel, bound for Athens, sank in the Mediterranean without a trace."
  },
  {
    "id": 475,
    "text": "The reckless men froze to death during their expedition to the Antarctic."
  },
  {
    "id": 476,
    "text": "The tragedy must be remembered so as not to be repeated."
  },
  {
    "id": 477,
    "text": "The exhibition offers profound insights into ancient civilization."
  },
  {
    "id": 478,
    "text": "Giotto is credited with sowing the seeds of the Italian Renaissance."
  },
  {
    "id": 479,
    "text": "Bob mounted the portrait in a fancy frame, but it was upside down."
  },
  {
    "id": 480,
    "text": "This magnificent cathedral dates back to the Middle Ages."
  },
  {
    "id": 481,
    "text": "Asian religions inspired him to create splendid sculptures."
  },
  {
    "id": 482,
    "text": "They explored the desert in search of buried treasure."
  },
  {
    "id": 483,
    "text": "The millionaire insisted on acquiring the masterpiece no matter how much it cost."
  },
  {
    "id": 484,
    "text": "Myths and legends should be handed down from generation to generation."
  },
  {
    "id": 485,
    "text": "The linguist is fluent in several Chinese dialects."
  },
  {
    "id": 486,
    "text": "The tribe worships its ancestors and speaks its own language, which is not familiar to us."
  },
  {
    "id": 487,
    "text": "The anthropologist says old customs still prevail in the province."
  },
  {
    "id": 488,
    "text": "The wicked witch cast an evil spell on the man and turned him into a bug."
  },
  {
    "id": 489,
    "text": "They proceeded along the steep path, which was the sole access to the border."
  },
  {
    "id": 490,
    "text": "When a big ape emerged from the cave, they got frightened and ran away."
  },
  {
    "id": 491,
    "text": "\"Believe it or not, I saw an alien and then it vanished!\" \"Give me a break!\""
  },
  {
    "id": 492,
    "text": "Quite a few people have been invited to celebrate the couple's anniversary."
  },
  {
    "id": 493,
    "text": "It won't be long before everything is ready. In the meantime, help yourself to some snacks."
  },
  {
    "id": 494,
    "text": "Dressed in a loud and peculiar outfit, she stood out in the crowd."
  },
  {
    "id": 495,
    "text": "All the guests were touched by her hospitality."
  },
  {
    "id": 496,
    "text": "Her shabby clothes were not suitable for the occasion."
  },
  {
    "id": 497,
    "text": "That topic is too intimate to share with casual acquaintances."
  },
  {
    "id": 498,
    "text": "When Tom gets drunk, he gets crude and offensive. Stay away from him."
  },
  {
    "id": 499,
    "text": "He could hardly comprehend what she was implying."
  },
  {
    "id": 500,
    "text": "Bob felt embarrassed when he was teased in front of some girls."
  },
  {
    "id": 501,
    "text": "His ambiguous reply made her all the more irritated."
  },
  {
    "id": 502,
    "text": "Bob is very timid and blushes when chatting with girls."
  },
  {
    "id": 503,
    "text": "Nick looks down on anyone who comes from a rural area."
  },
  {
    "id": 504,
    "text": "\"What's the matter, Bob? You look so miserable.\" \"Leave me alone. It's none of your business.\""
  },
  {
    "id": 505,
    "text": "Although Bob was in disguise, I recognized him at a glance."
  },
  {
    "id": 506,
    "text": "\"What are you chuckling about?\" \"Bob, you have your sweatshirt on backwards!\" \"Oops!\""
  },
  {
    "id": 507,
    "text": "He is not good at making friends and always keeps to himself."
  },
  {
    "id": 508,
    "text": "Having found no place he felt he belonged, he was extremely uneasy and lonely."
  },
  {
    "id": 509,
    "text": "I found it pretty hard to adjust to my new surroundings."
  },
  {
    "id": 510,
    "text": "I felt utterly out of place among those sophisticated people."
  },
  {
    "id": 511,
    "text": "To tell the truth, I don't like classical music. On the other hand, Molly is really into it."
  },
  {
    "id": 512,
    "text": "Bob derives pleasure from observing insects."
  },
  {
    "id": 513,
    "text": "\"How about playing cards or something for a change?\" \"Sorry, I'm not up for it.\""
  },
  {
    "id": 514,
    "text": "\"After you.\" \"No please, you go ahead.\" \"Thanks.\" \"You're welcome.\""
  },
  {
    "id": 515,
    "text": "His niece is sociable and mature for her age. She could pass for twenty-something."
  },
  {
    "id": 516,
    "text": "\"Take care of yourself and say hi to your family for me.\" \"I will. See you later.\""
  },
  {
    "id": 517,
    "text": "I'm looking forward to hearing from you. Sincerely,"
  },
  {
    "id": 518,
    "text": "Can you spare a minute? I'd like to discuss something of importance to both of us."
  },
  {
    "id": 519,
    "text": "It may seem trivial to you but for me it's worth paying attention to."
  },
  {
    "id": 520,
    "text": "As far as Bob is concerned, anything goes. By contrast, Jane is very cautious."
  },
  {
    "id": 521,
    "text": "After an awkward pause, Bill took her by the hand and dragged her upstairs."
  },
  {
    "id": 522,
    "text": "Bill just wanted to comfort Monica, but she interpreted it as romantic interest."
  },
  {
    "id": 523,
    "text": "After making sure she was sound asleep, he crept out of the room and set off."
  },
  {
    "id": 524,
    "text": "Between you and me, Lisa, I came across Nick passionately embracing a woman."
  },
  {
    "id": 525,
    "text": "Such a remark is open to misunderstanding."
  },
  {
    "id": 526,
    "text": "\"I can't stand it anymore!\" \"Calm down. I'll come over as soon as possible.\""
  },
  {
    "id": 527,
    "text": "Don't take it literally. He is inclined to exaggerate."
  },
  {
    "id": 528,
    "text": "\"You should apologize to Lisa for making fun of her. You went too far this time.\" \"Yeah ... I will, sometime when she's in a better mood.\""
  },
  {
    "id": 529,
    "text": "\"Lisa, are you getting along with Nick?\" \"Once in a while, I think of divorcing him.\" \"You must be kidding!\""
  },
  {
    "id": 530,
    "text": "In tears, she tore up his letter and threw it away."
  },
  {
    "id": 531,
    "text": "\"Jennifer deceived me!\" \"You should have known better than to trust her.\""
  },
  {
    "id": 532,
    "text": "Tom regretted having wasted a great deal of his life."
  },
  {
    "id": 533,
    "text": "I cannot look back on my adolescence without feeling depressed."
  },
  {
    "id": 534,
    "text": "\"Jennifer left me for another guy.\" \"Oh, you must be upset.\" \"Not really. I'm used to it.\""
  },
  {
    "id": 535,
    "text": "\"No wonder she didn't show up to see him off.\" \"How come?\" \"They broke up.\" \"Oh, what a pity!\""
  },
  {
    "id": 536,
    "text": "\"Living here all by myself is torture!\" he sobbed."
  },
  {
    "id": 537,
    "text": "\"To be honest, I'm crazy about Ken because he's brave, self-confident, and never afraid of taking risks.\" \"If I were you, I'd ask him out!\""
  },
  {
    "id": 538,
    "text": "\"I've been going with Jennifer on and off for ages.\" \"You're as indecisive as ever. Isn't it about time you settled down?\""
  },
  {
    "id": 539,
    "text": "\"It dawned on me that I had been taken in by Jennifer all along.\" \"How naive! Didn't you see through her?\""
  },
  {
    "id": 540,
    "text": "Even though she is seeing someone else, I won't give her up."
  },
  {
    "id": 541,
    "text": "\"Hi, Jane. What's up?\" \"Not much. How about you?\" \"I got married to Jennifer.\" \"Wow! Congratulations!\""
  },
  {
    "id": 542,
    "text": "Whenever you're in trouble or feeling down, I'll be there for you."
  },
  {
    "id": 543,
    "text": "\"Delight\" is the opposite of \"sorrow.\""
  },
  {
    "id": 544,
    "text": "\"Jennifer went so far as to call me an idiot and she wouldn't take it back.\" \"Serves you right! You provoked her, didn't you?\""
  },
  {
    "id": 545,
    "text": "\"Why do you put up with her arrogance? She's just taking advantage of you.\" \"Shut up!\""
  },
  {
    "id": 546,
    "text": "Take your time. I know you need a couple of days to reflect on it."
  },
  {
    "id": 547,
    "text": "Bob has to get through this ordeal on his own."
  },
  {
    "id": 548,
    "text": "Flies and mosquitoes interfered with his meditation."
  },
  {
    "id": 549,
    "text": "The sacred ritual took place after being postponed twice."
  },
  {
    "id": 550,
    "text": "All at once, the Buddhist priest burst into laughter, spoiling the solemn atmosphere."
  },
  {
    "id": 551,
    "text": "Cover your mouth when you cough, sneeze, or yawn."
  },
  {
    "id": 552,
    "text": "\"One of her relatives passed away three days ago.\" \"Oh, that's too bad. I'm so sorry.\""
  },
  {
    "id": 553,
    "text": "Besides attending the funeral, she needs to make all the arrangements."
  },
  {
    "id": 554,
    "text": "\"I feel for you, Jane. Grief doesn't fade away quickly.\" \"I'm OK. I'll get over it.\""
  },
  {
    "id": 555,
    "text": "She cherishes the precious memories of her childhood."
  },
  {
    "id": 556,
    "text": "\"Speaking of Jennifer, she got engaged to a businessman.\" \"I'm at a loss for words! I hope she won't break it off.\""
  },
  {
    "id": 557,
    "text": "These days, the motives for marriage are not necessarily pure. Take Jennifer for example."
  },
  {
    "id": 558,
    "text": "Go easy on Bob. You know, he's been going through a rough period recently."
  },
  {
    "id": 559,
    "text": "\"By the way, do you have the time?\" \"Let's see ... it's a quarter to eight.\""
  },
  {
    "id": 560,
    "text": "\"Let's call it a day, Bob. I'm starved.\" \"Yep. I'll buy you dinner.\""
  }
]
  );
}
