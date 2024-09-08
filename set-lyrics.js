function run(argv) {
  // iTunesアプリケーションに接続
  const app = Application('Music');

  // iTunesが起動しているか確認。起動していない場合はメッセージを表示して終了
  if (!app.running()) {
    console.log('iTunesが起動していません');
    return;
  }

  // 現在iTunesで選択されているトラックを取得
  const tracks = app.selection();

  // 選択されたトラックの数を取得
  const length = tracks.length;

  // トラックが選択されていない場合、メッセージを表示して終了
  if (!length) {
    console.log('トラックが選択されていません');
    return;
  }

  // 選択されたトラックの数を使って確認メッセージを作成
  const message = `選択された${length}曲に歌詞を設定してもよろしいですか？`;

  // 確認ダイアログを表示し、ユーザーがキャンセルした場合は処理を終了
  if (!confirm(message)) {
    console.log('キャンセルされました');
    return;
  }

  // 歌詞の設定を開始するメッセージを表示
  console.log('歌詞を設定中...');

  // 設定する歌詞のリストを取得
  const sentences = getSentences();

  // 各選択されたトラックに対して処理を行う
  tracks.forEach(track => {
    // トラック名を取得
    const name = track.name();

    // トラック名からIDを正規表現で抽出 (例: '001_Section1', '002_Section2' のようなパターン)
    const match = name.match(/^(\d{3})_Section\d+$/);

    // マッチしなかった場合は、そのトラックの処理をスキップ
    if (!match) return;

    // 抽出したIDを数値に変換
    const id = parseInt(match[1], 10);

    // IDに対応する歌詞をリストから検索
    const sentence = sentences.find(s => s.id === id);

    // 該当する歌詞が見つからない場合はスキップ
    if (!sentence) return;

    // トラックの歌詞プロパティに対応する歌詞テキストを設定
    track.lyrics = sentence.text;
  });

  // 歌詞の設定が完了した旨をログに表示
  console.log('完了しました');
}

// ユーザーに確認ダイアログを表示する関数
function confirm(message) {
  // 現在のアプリケーションを取得し、標準追加機能を有効にする (ダイアログ表示に必要)
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;

  // 指定されたメッセージでダイアログを表示し、確認されたらtrueを返す
  try {
    app.displayDialog(message);
    return true;
  } catch (e) {
    // ダイアログがキャンセルされた場合はfalseを返す
    return false;
  }
}

// 歌詞のリストを取得する関数
function getSentences() {
  // ERBテンプレートの中で JSON データを生成して返す
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
    "text": "Let go of your negative outlook on life. Always maintain a positive attitude.\n\n悲観的な人生観を捨てて、前向きな態度を常に持ち続けよう。"
  },
  {
    "id": 4,
    "text": "You should be fair to everyone regardless of national origin, gender, or creed.\n\n生まれた国、性別、信条に関係なく、誰に対しても公平でなくてはならない"
  },
  {
    "id": 5,
    "text": "Equality is guaranteed by the Constitution.\n\n平等は憲法で守られている。"
  },
  {
    "id": 6,
    "text": "He leaned against the pillar and gazed at the Statue of Liberty.\n\n彼は柱に寄りかかって、自由の女神像をじっとみつめた"
  },
  {
    "id": 7,
    "text": "A woman passed by me giving off a subtle scent of perfume. It reminded me of my ex-girlfriend.\n\n香水のほのかな香りを漂わせながら、一人の女性が僕の前を通り過ぎた。前の彼女のことを思い出してしまった。"
  },
  {
    "id": 8,
    "text": "\"Natto\" smells awful but tastes terrific.\n\n納豆は臭いはひどいけれど味は最高。"
  },
  {
    "id": 9,
    "text": "\"I'm soaked with sweat.\" \"Stand back! You stink. Take a shower.\"\n\n「汗でびしょぬれだよ。」「来ないで！臭いわ。シャワーを浴びて。」"
  },
  {
    "id": 10,
    "text": "Bob was so beside himself that he could scarcely tell fact from fiction.\n\nボブはひどく取り乱していて、現実と虚構の区別がほとんどできなかった。"
  },
  {
    "id": 11,
    "text": "His new novel, which combines prose with his gift for poetry, is going to be published.\n\nまもなく出版になる彼の小説は、散文に彼の詩の才能を融合させたものだ。"
  },
  {
    "id": 12,
    "text": "An up-to-date edition of the encyclopedia will come out next month.\n\n来月、その百科事典の最新版が出る。"
  },
  {
    "id": 13,
    "text": "Ms. Yamada translated the fascinating fairy tale into plain Japanese.\n\n山田さんがその心ひかれるおとぎ話をやさしい日本語に翻訳 した。"
  },
  {
    "id": 14,
    "text": "The following passage is quoted from a well-known fable.\n\n以下の一説は有名な寓話からの引用です。"
  },
  {
    "id": 15,
    "text": "\"Are you familiar with contemporary literature?\" \"I know next to nothing about it.\"\n\n「現代文学に詳しいですが？」 「ほとんど知りません。」"
  },
  {
    "id": 16,
    "text": "At times I confuse \"curve\" with \"carve.\"\n\n時々、\"curve\"と\"carve\"を混同してしまう"
  },
  {
    "id": 17,
    "text": "Don't be shy. Your pronunciation is more or less correct.\n\n恥ずかしがらないで。あなたの発音はだいたい合っています。"
  },
  {
    "id": 18,
    "text": "This article contains tips for those who are eager to increase their vocabulary.\n\nこの記事には語彙を本気で増やしたいと思う人々に役立つ情報が含まれています。"
  },
  {
    "id": 19,
    "text": "His latest works are on display at the city hall. They are fabulous beyond description.\n\n彼の最新の作品が市庁舎で展示されているの｡言葉にできないほど紫敵よ。"
  },
  {
    "id": 20,
    "text": "\"Could you move over a little?\" \"Oh, sorry. I didn't realize I was taking up so much space.\"\n\n「少し詰めていただけませんか？」「あ、ごめんなさい。こんなに 場所を取っていたなんて気付きませんでした｡」"
  },
  {
    "id": 21,
    "text": "\"What's this ugly object?\" \"This is a piece of abstract art!\"\n\n「この不格好な物体は何？」 「これは抽象芸術の作品だよ！」"
  },
  {
    "id": 22,
    "text": "I begged Richie to lend me a hundred bucks, but he shook his head, saying, \"I'm broke, too.\"\n\n100ドル貸してくれとリッチーに頼んだら、彼は「俺もお金がないんだよ！」と言って首を横に振った。"
  },
  {
    "id": 23,
    "text": "\"I'm apt to buy things on impulse whenever something is on sale.\" \"So am I.\"\n\n「安売りをしているといつも衝動買いしてしまうたちです。」 「私も。」"
  },
  {
    "id": 24,
    "text": "As it is, ordinary people cannot afford to purchase such luxuries.\n\n実際のところ、普通の人々にはそんな贅沢品を購入する余裕はない。"
  },
  {
    "id": 25,
    "text": "As we anticipated, the unemployment rate has risen three quarters in a row.\n\n予期していたとおり、失業率は3四半期連続で上昇した。"
  },
  {
    "id": 26,
    "text": "I have to cut down on my expenses, so from now on, I'm going to keep track of them on a daily basis.\n\n出費を切り詰めないと。だから、これからは使ったお金は一日単位で記録していくつもりだ。"
  },
  {
    "id": 27,
    "text": "In any case, the union has to compromise to a certain extent.\n\nいずれにせよ、組合側はある程度妥協しなければならない"
  },
  {
    "id": 28,
    "text": "Competent mechanics are in great demand, so they earn decent wages.\n\n有能な整備士は引っ張りだこだから、なかなかの賃金を稼げる。"
  },
  {
    "id": 29,
    "text": "The president announced a concrete plan to carry out welfare reform.\n\n大統領は福祉改革を実行するための具体的な計画を発表した。"
  },
  {
    "id": 30,
    "text": "His policy will no doubt lead to dismal consequences. It needs a thorough review.\n\n彼の政策はきっと暗い結果を招くだろう。徹底的な見直しが必要だ。"
  },
  {
    "id": 31,
    "text": "It goes without saying that the aging of society is inevitable.\n\n社会の高齢化が避けられないことは言うまでもない。"
  },
  {
    "id": 32,
    "text": "Please take a look at this chart. It indicates that juvenile delinquency is on the increase at an alarming rate.\n\nこの表をご覧になってください。少年非行が深刻な割合で増加していることを示しています。"
  },
  {
    "id": 33,
    "text": "In many business districts, there are a lot of vacant lots which have been for sale for years.\n\n多くの商業地区では、数年間売りに出されている空き地がたくさんある。"
  },
  {
    "id": 34,
    "text": "The population density in the metropolis is gradually decreasing.\n\n大都市の人口密度が徐々に低下している。"
  },
  {
    "id": 35,
    "text": "In all likelihood, the birthrate will continue to decline steadily for years to come.\n\nほぼ間違いなくこの先数年、出生率は減少の一途をたどるだろう。"
  },
  {
    "id": 36,
    "text": "The power plant supplies the remote county with electricity.\n\nその発電所は遠く離れた郡に電気を供給している。"
  },
  {
    "id": 37,
    "text": "You are not allowed to operate this device without permission.\n\n許可なくこの装置を操作することはできません。"
  },
  {
    "id": 38,
    "text": "In fact, the inhabitants have been exposed to radiation.\n\n実は、住民たちは放射能にさらさせてきた。"
  },
  {
    "id": 39,
    "text": "One cannot emphasize too much the potential danger of nuclear energy.\n\n核エネルギーの潜在的な危険性は､いくら強調してもし過ぎるということはない。"
  },
  {
    "id": 40,
    "text": "For years the press overlooked the problem. But now, if anything, they are making too much of it.\n\n過去数年間その問題を見過ごしていた報道機関が､今ではどちらかと言えばそのことを重視し過ぎている。"
  },
  {
    "id": 41,
    "text": "As well as cultivating grain, the farmer runs a grocery store.\n\n穀物を栽培するだけでなく、その農業経営者は食料雑貨店も経営している。"
  },
  {
    "id": 42,
    "text": "The research institute was established in the late 1960s.\n\nその研究所は1960年代後半に設立された。"
  },
  {
    "id": 43,
    "text": "Why don't you consult Starr in person? He's by far the most prominent attorney around here.\n\nスターさんに直接相談したらどうですか？ この辺りでは文句なしでいちばん有名な弁護士ですよ。"
  },
  {
    "id": 44,
    "text": "I'll write it down just in case, because I have a bad memory.\n\n念のためメモしておきます。記憶力が悪いから。"
  },
  {
    "id": 45,
    "text": "The lawyer recommended that his client take legal action against the insurance company.\n\n弁護士は依頼人に、保険会社に対して法的手段を取る事を勧めた。"
  },
  {
    "id": 46,
    "text": "They are entitled to be compensated for their injuries.\n\n彼らには、けがに対する補償を受ける権利がある。"
  },
  {
    "id": 47,
    "text": "So far, no less than 200 people have died of the flu epidemic.\n\nインフルエンザの流行で、現在までに200人もの人が亡くなっている。"
  },
  {
    "id": 48,
    "text": "The effect of those pills is intense but brief.\n\nそれらの錠剤の効果は強烈だが持続性はない。"
  },
  {
    "id": 49,
    "text": "He has a habit of biting his nails. It's absolutely disgusting.\n\n彼は爪を噛む癖がある。あれには本当にぞっとするよ。"
  },
  {
    "id": 50,
    "text": "My grandma strained her back when she bent down to hug my son.\n\nうちの息子を抱こうとしてかがんだときに、おばあちゃんは腰を痛めた。"
  },
  {
    "id": 51,
    "text": "If you have a stiff neck, try an herbal remedy.\n\n肩が凝るなら、薬草治療を試してごらんよ。"
  },
  {
    "id": 52,
    "text": "Medical breakthroughs have brought about great benefits for humanity as a whole.\n\n医学の飛躍的発展は人類全体に多大な恩恵をもたらしてきた。"
  },
  {
    "id": 53,
    "text": "We can't apply cloning techniques to cattle, let alone human beings. It's forbidden.\n\nクローン技術は人間にはもちろん､牛にも応用してはいけない。 絶対にしてはならないことだ。"
  },
  {
    "id": 54,
    "text": "Whales are classified as mammals.\n\n鯨は哺乳動物に分類される。"
  },
  {
    "id": 55,
    "text": "The theory of evolution is beyond the reach of my imagination.\n\n進化論は私の想像力の範囲を超えている。"
  },
  {
    "id": 56,
    "text": "The biologist is proud of his historic discovery and doesn't mind boasting about it.\n\nその生物学者は自分の歴史的発見に誇りをもっており、そのことを臆することなく口に出す。"
  },
  {
    "id": 57,
    "text": "On ethical grounds, they are opposed to so-called gene therapy.\n\n倫理的な理由から、彼らはいわゆる遺伝子治療に反対している。"
  },
  {
    "id": 58,
    "text": "The initial symptoms of the disease are fever and a sore throat.\n\nその病気の初期症状は高熱と喉の痛みです。"
  },
  {
    "id": 59,
    "text": "The structure of the brain is complex.\n\n脳の構造は複雑だ。"
  },
  {
    "id": 60,
    "text": "Owing to illness, some representatives were absent from the annual conference.\n\n病気のために年次会議を欠席した代表者もいた。"
  },
  {
    "id": 61,
    "text": "Little by little, my son-in-law is recovering from stomach cancer, and now he is in good spirits.\n\n私の娘婿は徐々に胃癌を克服しつつあり、今は明るく元気だ。"
  },
  {
    "id": 62,
    "text": "\"This is fake, isn't it?\" \"Hey, it's a genuine antique.\" \"No way!\"\n\n「これって偽物だろう？」 「何言ってるの。本物の骨蓮品よ。」 「まさか！」"
  },
  {
    "id": 63,
    "text": "\"Anything else?\" \"That's it.\" \"For here or to go?\" \"To go.\"\n\n「ほかにご注文は?」「こちらでお召し上がりですか？」「持ち帰ります。」"
  },
  {
    "id": 64,
    "text": "\"How much is this rug?\" \"$100 including tax.\" \"OK, I'll take it.\"\n\n「この敷物はおいくらですか?」「税込みで100ドルです」「じゃあ、これにします。」"
  },
  {
    "id": 65,
    "text": "I don't think those pants look good on you. Try these on. They're really in now!\n\nそのパンツはあなたには似合わないと思う。こっちをはいてみて。今すごく流行っているのよ。"
  },
  {
    "id": 66,
    "text": "He got out of the cab in haste, saying, \"Keep the change.\"\n\n彼は「おつりはいいです」と言って、急いでタクシーを降りた。"
  },
  {
    "id": 67,
    "text": "Delivery service is available to our customers for a slight extra charge.\n\n当店のお客様は､わずかな追加料金で配達サービスをご利用できます。"
  },
  {
    "id": 68,
    "text": "\"It's on me.\" \"No. You treat me every time we eat out.\" \"Well, okay. Let's split the check then.\"\n\n「これは僕のおごり。」 「だめよ。外食のときはいつもおごってもらっていいるし。」 「うーん、わかった。じゃあ割り勘にしよう。」"
  },
  {
    "id": 69,
    "text": "While I was hanging out at the mall, I ran into Ken.\n\nショッピングセンターをぶらぶらしていたら、偶然ケンに会った。"
  },
  {
    "id": 70,
    "text": "I was short of cash, so I withdrew the $100 that I had deposited in my bank account last week.\n\n現金が足りなかったので、先週口座に入れた1000ドルを引き出した。"
  },
  {
    "id": 71,
    "text": "On her way home she was robbed of her purse.\n\n彼女は帰宅途中にハンドバッグを盗まれた。"
  },
  {
    "id": 72,
    "text": "\"That's odd! Tell me how it happened.\" \"I'll explain it to you later.\"\n\n「それは変だわ。どうしてそんなことが起きたのか教えて。」 「後で説明するよ。」"
  },
  {
    "id": 73,
    "text": "My parents gave me a 6 pm curfew as a punishment because I broke my promise.\n\n私が約束を破ったので、罰として両親に門限を６時にされた。"
  },
  {
    "id": 74,
    "text": "As the proverb goes, \"The end justifies the means.\"\n\n諺にある通り、「嘘も方便 （目的が手段を正当化する）」。"
  },
  {
    "id": 75,
    "text": "Now that I've found that there's no one to turn to, I'll have to stand on my own two feet.\n\n誰も頼れる人がいないとわかったのだから、自分の力でやっていくしかない。"
  },
  {
    "id": 76,
    "text": "The chairman cut me off, saying, \"Time to wind things up. Let's take a vote.\"\n\n議長は私の話を遮って、「話し合いはここまでにして決を採りましょう。」と言った。"
  },
  {
    "id": 77,
    "text": "We exchanged frank opinions in the meeting, but consensus is yet to be reached regarding this matter.\n\n我々は会議で率直な意見を交わしたが、この件に関してはまだ全体の意見がまとまらない。"
  },
  {
    "id": 78,
    "text": "\"Do you agree or disagree with him?\" \"I'm on his side.\"\n\n「あなたは彼と同じ意見？ それとも違うの？」「彼のほうを支持するよ。」"
  },
  {
    "id": 79,
    "text": "Strictly speaking, his view differs somewhat from mine.\n\n厳密に言えば、彼の見解は私のものとはいくらか異なる。"
  },
  {
    "id": 80,
    "text": "Could you go over it again? I couldn't make out what you were getting at.\n\nもう一度詳しく説明していただけませんか？ お話の意図がわかりませんでした。"
  },
  {
    "id": 81,
    "text": "No one backed me up at first, but eventually I talked everyone into going along with my plan.\n\n僕の案を支持してくれる人は最初は誰もいなかったけれど、最後にはみんなを説得して賛同してもらうことができた。"
  },
  {
    "id": 82,
    "text": "\"I admire your perseverance, courage and wisdom.\" \"You flatter me!\"\n\n「君の不屈の努力、勇気、そして知恵には感心するよ。」「お世辞でもうれしいわ！」"
  },
  {
    "id": 83,
    "text": "In making a decision, I rely not on logic but on instinct.\n\nどうするかを決めるとき、僕は論理ではなく本能を当てにする。"
  },
  {
    "id": 84,
    "text": "He came up with an ingenious, sensible solution and immediately put it into practice.\n\n彼は独創的かつ賢明な解決策を考え出し、直ちにそれを実行に移した。"
  },
  {
    "id": 85,
    "text": "From an objective viewpoint, the former is inferior to the latter.\n\n客観的に見れば、前者は後者よりも劣っている。"
  },
  {
    "id": 86,
    "text": "Your idea sounds marvelous in theory, yet I don't think it will work in practice.\n\nあなたの考えは理論上はすばらしそうだけれども、実際には機能しないと思います。"
  },
  {
    "id": 87,
    "text": "We expected him to defeat his opponent, but he failed to live up to our expectations.\n\n私たちは彼が相手に勝つことを期待したが、彼はその期待に応えられなかった。"
  },
  {
    "id": 88,
    "text": "Ironically, despite their best endeavors, their mission resulted in complete failure.\n\n皮肉なことだが、彼らの最善の努力にもかかわらず、任務は完全な失敗に終わった。"
  },
  {
    "id": 89,
    "text": "Her genius makes up for her lack of firsthand experience.\n\n実地経験の不足は彼女の天賦の才能で補える。"
  },
  {
    "id": 90,
    "text": "She possesses a great capacity for overcoming any obstacle.\n\n彼女にはどんな障害をも克服できるすばらしい能力がある。"
  },
  {
    "id": 91,
    "text": "Without your solid support, the deal would have fallen through. I'm grateful to you.\n\nあなたの強固な支援がなかったら、その取引は成立しなかったでしょう。感謝しています。"
  },
  {
    "id": 92,
    "text": "Bringing flammable items into the cabin is prohibited.\n\n機内への可燃物の持ち込みは禁止されています。"
  },
  {
    "id": 93,
    "text": "Our flight to Vienna was delayed on account of a minor accident.\n\nちょっとした事故が原因で、私たちのウィーン行きの便に遅れが出た。"
  },
  {
    "id": 94,
    "text": "The plane blew up and plunged into the ocean, killing all the people on board.\n\n飛行機が爆発して海に墜落し、乗っていた全員が死亡した。"
  },
  {
    "id": 95,
    "text": "They are working around the clock looking into the cause of the crash.\n\n彼らは昼夜休むことなく、その墜落事故の原因を調査している。"
  },
  {
    "id": 96,
    "text": "Unfortunately, few passengers survived the catastrophe.\n\n不幸にも、その大惨事で生き残った乗客はほとんどいなかった。"
  },
  {
    "id": 97,
    "text": "The aviation expert analyzed the statistics in detail.\n\n航空評論家が統計を詳細に分析した。"
  },
  {
    "id": 98,
    "text": "On behalf of all the staff, I'd like to express our sympathy for the victims.\n\n全従業員を代表いたしまして、犠牲者の方々に対してお悔やみを申し上げたいと存じます。"
  },
  {
    "id": 99,
    "text": "In a sense, he is to blame for the disaster.\n\nある意味、その惨事の責任は彼にある。"
  },
  {
    "id": 100,
    "text": "The vehicles are inspected for defects every three months.\n\n車両は欠陥がないか3ケ月に1度検査される。"
  },
  {
    "id": 101,
    "text": "I was amazed to see that our utility bills came to so much!\n\nうちの光熱費がそんな額になっているのを知ってびっくりした。"
  },
  {
    "id": 102,
    "text": "\"Turn the faucet off!\" mom yelled in a rage.\n\n｢水道の栓を閉めなさい！｣とお母さんがかんかんになって叫んだ。"
  },
  {
    "id": 103,
    "text": "Tighten the lid so the food doesn't go bad.\n\n食べ物が腐らない様にふたをしっかり閉めなさい。"
  },
  {
    "id": 104,
    "text": "\"Can I borrow your scissors?\" \"Sure, here you are.\"\n\n｢ハサミを貸してもらえる？」「もちろん。はいどうぞ｡」"
  },
  {
    "id": 105,
    "text": "You can substitute some transparent glue for a needle and thread.\n\n針と糸の代わりに透明な接着剤を使っても結構です｡"
  },
  {
    "id": 106,
    "text": "I dyed this fabric and it shrank.\n\nこの織物を染めたら縮んでしまった。"
  },
  {
    "id": 107,
    "text": "I'm getting rid of this leather jacket because it's worn out at the elbows.\n\nこの革のジャケットは処分するよ。両肘の部分がすり減って穴があいているから。"
  },
  {
    "id": 108,
    "text": "Add some flour to the mixture and stir it until it becomes thick.\n\nその混ぜ合わせたものに小麦粉を加えて、とろみがつくまでかき混ぜましょう。"
  },
  {
    "id": 109,
    "text": "\"What should we do with the leftovers?\" \"Keep them in the fridge for now. I'll heat them in the microwave later.\"\n\n「残り物をどうしよう？」 「とりあえず冷蔵庫に入れておいて。 後で電子レンジで温め直すよ。」"
  },
  {
    "id": 110,
    "text": "I could have laid out all that money on a new PC, but on second thought I decided to put some aside for a rainy day.\n\n新しいパソコンに全額つぎ込むこともできたが、考え直して、まさかの時のために多少は残しておくことにした。"
  },
  {
    "id": 111,
    "text": "A cell phone has become something of a necessity, and I can't do without one.\n\n携帯電話はちょっとした必需品になったことだし、それなしではやっていけない。"
  },
  {
    "id": 112,
    "text": "No sooner had I sat back and relaxed than my wife asked me to do the chores.\n\nイスにゆったり座ってくつろいだ途端、妻に雑用を頼まれた。"
  },
  {
    "id": 113,
    "text": "She laid the baby down and lay down beside him.\n\n彼女は赤ちゃんを寝かせて自分も隣に横になった。"
  },
  {
    "id": 114,
    "text": "Put this stuff away! It's in the way.\n\nここにある物を片付けなさい。邪魔よ。"
  },
  {
    "id": 115,
    "text": "When the kids made believe they were dinosaurs, they were scolded by their mother.\n\n子供たちが恐竜ごっこをしていたら、お母さんに叱られた。"
  },
  {
    "id": 116,
    "text": "After he bumped into the shelf, the priceless china fell and shattered into fragments.\n\n彼が棚にぶつかり、とても高価な陶磁器が落ちて粉々に割れてしまった。"
  },
  {
    "id": 117,
    "text": "\"Can you keep an eye on my kids for a while? I need to pick up Ken.\" \"No problem.\"\n\n「うちの子たちをちょっと見ててもらえる？ケンを迎えに行かないといけないの｡」「いいよ｡」"
  },
  {
    "id": 118,
    "text": "Our neighbor told us off for making a mess in his yard.\n\n隣の家の人が庭をめちゃくちゃにされたと、私たちにがみがみ説教した。"
  },
  {
    "id": 119,
    "text": "Dolly resembles her big sister in every way. You can't tell them apart.\n\nドリーはあらゆる面でお姉さんにそっくりだ。二人を見分けることはできないよ。"
  },
  {
    "id": 120,
    "text": "As a rule, twins have a lot in common.\n\n慨して、双子には似たところが多い。"
  },
  {
    "id": 121,
    "text": "I'm tired of doing the dishes, doing the laundry, and so on!\n\n皿洗いとか洗濯とか、そういうことにはもううんざり！"
  },
  {
    "id": 122,
    "text": "My favorite pastime is strolling along the shore. It's pleasant.\n\n時間があいたときの一番の楽しみは浜辺の散歩です。気持ちいいですよ。"
  },
  {
    "id": 123,
    "text": "\"I'm exhausted! Let's take a break in the shade.\" \"Why not?\"\n\n「私、もうくたくた。日陰で休憩しましょう｡」「そうだね｡」"
  },
  {
    "id": 124,
    "text": "\"Bob, this vending machine is out of order.\" \"Oh no! I'm dying of thirst!\"\n\n「ボブ、この自動販売機、故障してるわ｡」「何だって！喉が乾いて死にそうだよ！」"
  },
  {
    "id": 125,
    "text": "He fainted with hunger and fatigue, but came to after a while.\n\n彼は空腹と疲労で気を失ったが、しばらくして意識を取り戻した。"
  },
  {
    "id": 126,
    "text": "The auditorium was empty except for a single piece of furniture.\n\nたった一つの家具を除けば、講堂はがらんどうだった。"
  },
  {
    "id": 127,
    "text": "Any apartment will do as long as the rent is low. I'm not particular about it.\n\n家賃が安ければ、どんなマンションでも構いません。こだわりはありませんから。"
  },
  {
    "id": 128,
    "text": "His sixty-year-old cousin inherited a piece of real estate by a lake.\n\n彼の60歳のいとこが湖畔の不動産を相続した。"
  },
  {
    "id": 129,
    "text": "So much for small talk. Let's get down to business.\n\n雑談はこの辺にして、本題に入りましょう。"
  },
  {
    "id": 130,
    "text": "Lucy resented the aggressive salesman trying to make her sign the contract.\n\nルーシーは、契約書にサインさせようとする強引な販売員に腹を立てた。"
  },
  {
    "id": 131,
    "text": "There are a number of factors discouraging us from investing in stocks.\n\n私たちの株式投資への意欲をそぐような要因がかなりある。"
  },
  {
    "id": 132,
    "text": "Japan imports various raw materials and exports manufactured goods.\n\n日本は様々な原料を輸入し、工業製品を輸出している。"
  },
  {
    "id": 133,
    "text": "In the course of its economic development, Japan has abandoned its traditional values.\n\n経済発展の過程で、日本はその伝統的価値観を捨ててきた。"
  },
  {
    "id": 134,
    "text": "The world is faced with an unprecedented crisis.\n\n世界はかつてない危機に直面している。"
  },
  {
    "id": 135,
    "text": "In short, the purpose of the regulations is to protect domestic industries.\n\n要するに、その規制の目的は国内産業の保護だ。"
  },
  {
    "id": 136,
    "text": "In order to keep up its competitiveness in the world, Japan must undertake sweeping deregulation in earnest.\n\n世界での競争力を維持するためには、日本は大幅な規制緩和に真剣に着手しなければならない。"
  },
  {
    "id": 137,
    "text": "We cannot turn our backs on desperate people who are at risk.\n\n危機にさらされ、わらにもすがる思いでいる人々を、私たちは放っておけない。"
  },
  {
    "id": 138,
    "text": "The parliament decided to provide developing countries with financial aid.\n\n議会は発展途上国に財政援助を行うことを決議した。"
  },
  {
    "id": 139,
    "text": "Some say the British monarchy should be abolished. What do you think?\"\n\n英国の君主制は廃止されるべきだと言う人もいるけど、あなたはどう思う？"
  },
  {
    "id": 140,
    "text": "They sought shelter from the attack but found no place to hide.\n\n彼らは攻撃を逃れる安全な場所を探したが、隠れる場所はどこにもなかった。"
  },
  {
    "id": 141,
    "text": "There's little prospect that the two countries will make significant progress in disarmament.\n\n軍縮において、両国が大きな進展を遂げる見込みはほとんどない。"
  },
  {
    "id": 142,
    "text": "The negotiations are under way. Before long, they will enter a crucial phase.\n\n交渉は進行中だ。そろそろ正念場を迎えるだろう。"
  },
  {
    "id": 143,
    "text": "The slaves were anxious to alter their destinies.\n\n奴隷たちは自分たちの運命を変えたいと切望していた。"
  },
  {
    "id": 144,
    "text": "The aristocrats abused their privileges to their hearts' content.\n\n貴族たちは思うがままに特権を乱用した。"
  },
  {
    "id": 145,
    "text": "The revolution in itself, bore no fruit, after all.\n\n結局、革命それ自体は何の成果ももたらさなかった。"
  },
  {
    "id": 146,
    "text": "Bob cut in on our conversation, saying, \"I'm against it!\" But everybody ignored him.\n\nボブが「それには反対だ！」と言って会話に割り込んできた。けれども、誰も耳を貸さなかった。"
  },
  {
    "id": 147,
    "text": "We skipped his turn on purpose.\n\n私たちは彼の順番をわざと飛ばした。"
  },
  {
    "id": 148,
    "text": "He saw someone being bullied, but he turned a blind eye.\n\n誰かがいじめられているのを見たのに、彼は見ないふりをした。"
  },
  {
    "id": 149,
    "text": "When Nick and I cheated on an exam, I was suspended from school. As for Nick, he got away with it.\n\nニックと僕がテストでカンニングしたとき、僕は停学処分。ニックの方はまんまと逃れた。"
  },
  {
    "id": 150,
    "text": "They are hostile to Richard because they are jealous of his wealth and status.\n\n彼らはリチャードの富と地位に対する嫉妬から、彼に敵意を抱いている。"
  },
  {
    "id": 151,
    "text": "I hate him! He behaves as if he were somebody.\n\n彼のことは大嫌い。まるで自分が大物であるかのように振る舞うのよ。"
  },
  {
    "id": 152,
    "text": "In spite of our compliments, he frowned and turned away. He was so rude!\n\n僕たちがほめ言葉をかけたのに、彼は顔をしかめてそっぽを向いた。失礼だ！"
  },
  {
    "id": 153,
    "text": "He claimed that the enormous property was at his disposal.\n\nその莫大な財産は自分が自由にできるものだ、と彼は主張した。"
  },
  {
    "id": 154,
    "text": "The more stubborn you are, the more isolated you become.\n\n頑固になればなるほど孤立するよ。"
  },
  {
    "id": 155,
    "text": "\"Don't beat around the bush! What am I supposed to do?\" \"Just wait and see. Time will tell.\"\n\n「遠回しな言い方はやめてくれ！僕にどうしろって言うんだ？」 「慌てずに待つしかありません。時が経てばわかります。」"
  },
  {
    "id": 156,
    "text": "Please hand in your assignment via e-mail no later than 5:00 PM on June 10.\n\n課題は電子メールで6月10日の午後5時までに提出して下さい。"
  },
  {
    "id": 157,
    "text": "Joe is anything but diligent. That's why he flunked math again.\n\nジョーが勤勉なんてとんでもない。だからまた数学を落としたんだ。"
  },
  {
    "id": 158,
    "text": "His thesis doesn't make sense. To begin with, its theme is obscure.\n\n彼の論文は意味不明。第一、主題が曖昧だ。"
  },
  {
    "id": 159,
    "text": "His essay was concise and to the point.\n\n彼の小論文は簡潔で要領を得ていた。"
  },
  {
    "id": 160,
    "text": "\"How are you going to deal with this complicated problem?\" \"Leave it to me! It's a piece of cake.\"\n\n「この複雑な問題をどう処理するつもり？｣ ｢任せとけって。朝飯前さ。」"
  },
  {
    "id": 161,
    "text": "\"Nick, I want you to look this over before I turn it in.\" \"Sorry, but I have my hands full right now.\"\n\n「ニック、これを提出する前にざっと目を通して欲しいの。」 「ごめん、今、手が離せないんだ。」"
  },
  {
    "id": 162,
    "text": "\"What if I don't meet the deadline?\" \"I bet he'll get mad at you!\"\n\n「締め切りに間に合わなかったらどうなる？」 「きっと彼に怒られるぞ！」"
  },
  {
    "id": 163,
    "text": "Your summary leaves nothing to be desired apart from the terrible handwriting.\n\n字が汚いことを別にすれば、君の要約は完壁だ。"
  },
  {
    "id": 164,
    "text": "You ought to think over whether the premise is valid or not.\n\nその前提が妥当かどうかよく考えるべきだ。"
  },
  {
    "id": 165,
    "text": "Above all, scientific terms call for precise definitions.\n\nとりわけ、科学用語には厳密な定義が要求される。"
  },
  {
    "id": 166,
    "text": "First of all, learn the formula by heart.\n\n何よりもまず、公式を暗記しなさい。"
  },
  {
    "id": 167,
    "text": "To calculate the volume, multiply the length by the width by the depth.\n\n体積を計算する場合は、縦と横と深さを掛けます。"
  },
  {
    "id": 168,
    "text": "Tiny cracks were found in the bottom of the barrel.\n\n樽の底にとても小さなひびがあるのを見つけた。"
  },
  {
    "id": 169,
    "text": "This chapter will focus on the concepts of geometry.\n\nこの章では幾何学の概念に焦点をあてます。"
  },
  {
    "id": 170,
    "text": "Phil is much more interested in academic subjects than in practical skills.\n\nフィルは実用的な技能よりも学問的なテーマのほうに興味がある。"
  },
  {
    "id": 171,
    "text": "\"Something's gone wrong with this microscope. I need to have it repaired.\" \"Let me see it. Maybe I can fix it.\"\n\n｢この顕微鏡、どこかおかしくなっちゃった。修理してもらわないと。」 「見せて。僕が直せるかも。」"
  },
  {
    "id": 172,
    "text": "\"What is 'an instrument?\" \"For instance, a gauge, such as a thermometer or a barometer.\"\n\n「インストゥルメントって何ですか？」「例えば、温度計や気圧計とかの計器がそうです。」"
  },
  {
    "id": 173,
    "text": "The minute particles are barely visible to the naked eye.\n\nその微粒子は肉眼でもかろうじて見える。"
  },
  {
    "id": 174,
    "text": "Muscle tissue consists of a vast number of cells.\n\n筋肉組織はおびただしい数の細胞から成っている。"
  },
  {
    "id": 175,
    "text": "This substance is mostly composed of hydrogen and oxygen.\n\nこの物質は主に水素と酸素でできている。"
  },
  {
    "id": 176,
    "text": "The exact temperature is 22.68 degrees Celsius.\n\n正確な気温はセ氏22.68度です。"
  },
  {
    "id": 177,
    "text": "\"Naomi likes to show off her perfect figure. I wish I were thin like her. I envy her.\" \"You could go on a diet.\"\n\n「ナオミは自分の完壁なスタイルをひけらかしたがる。私も彼女みたいに痩せていればなあ。彼女が羨ましいわ。｣ ｢ダイエットすれば。」"
  },
  {
    "id": 178,
    "text": "I fell in love with Naomi at first sight. Three months later, I took a chance and proposed to her, but she turned me down.\n\nナオミに一目惚れした。３ケ月後、思い切って彼女にプロポーズしてみたが振られてしまった。"
  },
  {
    "id": 179,
    "text": "I met the man by chance. He's gentle and smart. What's more, he's single!\n\n偶然その人に出会ったの。優しくて頭もいいの。おまけに独身！"
  },
  {
    "id": 180,
    "text": "His nephew was brought up to be modest and considerate.\n\n彼の甥は、謙虚で思いやりのある人になるように育てられた。"
  },
  {
    "id": 181,
    "text": "I introduced Bob to my folks, and they took to him at once.\n\n私の両親にボブを紹介したら、二人ともすぐに彼のことが好きになった。"
  },
  {
    "id": 182,
    "text": "People should be judged not so much by how they look as by who they are.\n\n人は外見ではなく、むしろ中身で判断されるべきだ。"
  },
  {
    "id": 183,
    "text": "\"It's not your title that counts. That's for sure!\" exclaimed Bob.\n\n「大切なのは肩書きなんかじゃない。絶対そうだ！」と、ボブは語気を強めて言った。"
  },
  {
    "id": 184,
    "text": "As a self-made man put it, \"A man of vision will make good in the end.\"\n\n自分の力で成功をつかんだ人が言ったように、「先見の明のある人は最後には成功する」。"
  },
  {
    "id": 185,
    "text": "Keep in mind that youth is not eternal.\n\n若さが永遠のものではないことを忘れてはいけない。"
  },
  {
    "id": 186,
    "text": "I can't figure out why on earth everybody feels so much contempt for Bob!\n\nいったいなぜみんながそれ程までにボブを軽蔑するのか、僕にはわからない。"
  },
  {
    "id": 187,
    "text": "I can't help laughing at him because he keeps on making stupid mistakes. He'd be the last person to learn his lesson.\n\n彼のことを笑わずにはいられない。ばかな間違いを繰り返すからね。きっと彼は懲りないんだろうな。"
  },
  {
    "id": 188,
    "text": "To make matters worse, he isn't even conscious of annoying us.\n\nさらに厄介なことに、彼は私たちに迷惑をかけていることさえわかっていない。"
  },
  {
    "id": 189,
    "text": "Since I was in a hurry, I put my gloves on inside out by mistake.\n\n慌てていたから、手袋を間違えて裏返しにはめてしまった。"
  },
  {
    "id": 190,
    "text": "Dave is fat and clumsy. When he leaped over the shallow stream, he stumbled and twisted his ankle.\n\nデイブはデブでドジ。浅い小川を飛び越えた時に、つまずいて足首を捻挫したんだ。"
  },
  {
    "id": 191,
    "text": "\"I'm scared of heights.\" \"You're a coward!\"\n\n「僕、高所恐怖症なんだ。」 「弱虫っ！」"
  },
  {
    "id": 192,
    "text": "The passive man seldom, if ever, expresses himself in public.\n\n消極的なその男性が、人前で自己表現をすることはまずない。"
  },
  {
    "id": 193,
    "text": "Nick convinced me that all superstitions are irrational.\n\n迷信はすべて根拠のないものだということが、ニックに言われてよくわかった。"
  },
  {
    "id": 194,
    "text": "I tremble with fear at the thought of an injection.\n\n注射のことを考えると、怖くて震えてしまう。"
  },
  {
    "id": 195,
    "text": "Since Bob is lazy at heart, he frequently neglects his duties.\n\nボブは根が怠け者だから、与えられた仕事をしばしば怠る。"
  },
  {
    "id": 196,
    "text": "While Bob was at work, Jennifer was at home absorbed in silly soap operas.\n\nボブが働いている間、ジェニファーは家でくだらないメロドラマに夢中になっていた。"
  },
  {
    "id": 197,
    "text": "Bob likes cartoons, but I don't think much of them. As a matter of fact, they're boring.\n\nボブはマンガ好きだけど、僕にはそれほどいいものとは思えない。実際、つまらないよ。"
  },
  {
    "id": 198,
    "text": "It occurred to me that he was holding something back, because he wouldn't look me in the eye.\n\n彼が私の目を見ようとしなかったので、何かを隠していると思った。"
  },
  {
    "id": 199,
    "text": "When her patience gave out, she grabbed his collar and swore at him.\n\n彼女は我慢しきれなくなり、襟首をつかんで彼をののしった。"
  },
  {
    "id": 200,
    "text": "I must admit we quarrel every now and then, but generally we're on good terms with each other.\n\n確かに、私たちは時々口げんかもしますが、普段は仲良くやっています。"
  },
  {
    "id": 201,
    "text": "\"Do you mind if I stop by your house?\" \"No, not at all. Be my guest!\"\n\n「君の家に寄ってもいいかい？」 「もちろんいいわよ。気兼ねなく！」"
  },
  {
    "id": 202,
    "text": "Hold on. I'll be right back. Don't hang up!\n\nちょっと待ってて。すぐ戻るから。切らないでよ！（電話で）"
  },
  {
    "id": 203,
    "text": "I can't put you up. For one thing, my dad drop in on me from time to time.\n\nうちには泊められないわ。一つには、時々お父さんがふらっとやって来るから。"
  },
  {
    "id": 204,
    "text": "While Jennifer was standing still, Bob was pacing back and forth along the sidewalk.\n\nジェニファーがじっと立っている間、ボブは歩道を行ったり来たりしていた。"
  },
  {
    "id": 205,
    "text": "\"Let's make up, Lisa.\" \"Stop taking me for granted! We're through for good this time. I mean it!\"\n\n「仲直りしようよ、リサ。」 「私がいて当然だなんて思わないで。私たち、今度は永遠に終わりよ。本気なんだから！」"
  },
  {
    "id": 206,
    "text": "Come on! Don't get so emotional, Lisa. I didn't mean to hurt you. Let's talk it over.\n\nおい！リサ、そう感情的になるなよ。君を傷つけるつもりじゃなかったんだ。じっくり話し合おう。"
  },
  {
    "id": 207,
    "text": "\"You betrayed me!\" \"Please forgive me. How can I make it up to you?\" \"I'll get even!\"\n\n「私を裏切ったわね！」 「許してくれよ。どうしたら埋め合わせができるかなあ？」 「仕返ししてやるっ！」"
  },
  {
    "id": 208,
    "text": "You should confess your sins rather than conceal them.\n\n自分の罪は隠しておかずに告白したほうがいい。"
  },
  {
    "id": 209,
    "text": "Keep your word; otherwise you'll end up losing face.\n\n約束は守りなさい。そうしないと評判を落としますよ。"
  },
  {
    "id": 210,
    "text": "Bob sticks to his moral principles and believes that honesty pays off in the long run.\n\nボブは自分の道徳的信条を曲げない男だ。正直でいれば最後には報われると信じている。"
  },
  {
    "id": 211,
    "text": "\"Cheer up! You couldn't help it.\" \"I did my best.\" \"I know. Don't dwell on the past. You can start over!\n\n「元気を出して。仕方ないわ。」 「やれるだけのことはやったんだ。」 「わかってる。過ぎたことにくよくよしないで。やり直せるわよ！」"
  },
  {
    "id": 212,
    "text": "\"Jane, please do me a favor and give me a ride to Times Square.\" \"I wish I could, but I'm tied up right now.\"\n\n「ジェーン、タイムズ・スクェアーまで乗せて行って欲しいんだけど。」 「そうしてあげたいのは山々だけど。今、全然時間がないの。」"
  },
  {
    "id": 213,
    "text": "As usual, Mike turned up on time. He's very punctual.\n\nいつものように、マイクは時間通りに現れた。本当に時間に正確な人だ。」"
  },
  {
    "id": 214,
    "text": "The other day I ran out of gas in the middle of a busy Interstate.\n\nこの前、混雑した幹線道路の真ん中でガス欠してしまった。"
  },
  {
    "id": 215,
    "text": "A truck driving ahead of me skidded, turned over, and scattered its load all over the road.\n\n私の前を走っていたトラックがスリップして横転し、積み荷を路面いっぱいに散乱させた。"
  },
  {
    "id": 216,
    "text": "He recalled that a collision had been avoided by sheer luck.\n\n衝突を避けられたのは運が良かっただけ、と彼は回想した。"
  },
  {
    "id": 217,
    "text": "In case of an emergency, get in touch with my agent right away.\n\n緊急の際には、すぐに私の代理人と連絡を取って下さい。"
  },
  {
    "id": 218,
    "text": "\"Jane, where are we heading?\" \"I think we're lost. We went in the wrong direction.\" \"Damn! Pull over!\"\n\n「ジェーン、俺たちはどこに向かってるんだ？」 「迷ったみたい。違う方向に来ちゃったわ。」 「何だよ。車を止めてくれ！」"
  },
  {
    "id": 219,
    "text": "My rusty Ford broke down, obstructing the intersection.\n\n僕のさびついたフォードが故障して、交差点をふさいでしまった。"
  },
  {
    "id": 220,
    "text": "There are so many fine scratches and dents on its surface, it's no use polishing it.\n\n表面に細かい傷やへこみがたくさんあるから、磨いても無駄だよ。"
  },
  {
    "id": 221,
    "text": "\"Hey, we're stuck in a traffic jam!\" \"Chill out, Joe. Let's take a shortcut! We'll get there in time.\"\n\n「おい、渋滞にはまっちゃったよ！」 「熱くならないで、ジョー。近道しましょう。時間までには着けるわ。」"
  },
  {
    "id": 222,
    "text": "\"I've got a flat tire. Can you give me a hand?\" \"I'd be glad to.\"\n\n「パンクしちゃったよ。手を貸してくれる？」 「喜んで。」"
  },
  {
    "id": 223,
    "text": "The ambulance went out of control and came close to running over a pedestrian.\n\nハンドルがきかなくなった救急車が、危うく歩行者をひきそうになった。"
  },
  {
    "id": 224,
    "text": "He contends that primitive life once existed on Mars.\n\n火星にはかつて原始的な生物が存在していたと彼は力説している。"
  },
  {
    "id": 225,
    "text": "The crew is busy preparing for the voyage into outer space.\n\n乗組員たちは宇宙への航海の準備に忙しい。"
  },
  {
    "id": 226,
    "text": "They conducted a series of experiments under zero gravity.\n\n彼らは無重力状態で一連の実験をおこなった。"
  },
  {
    "id": 227,
    "text": "Many astronomers assume that the universe will expand infinitely.\n\n多くの天文学者は、宇宙は無限に膨張を続けていくものと考えている。"
  },
  {
    "id": 228,
    "text": "The astronauts were greeted with spontaneous applause.\n\n宇宙飛行士たちは自然と沸き起こった拍手で迎えられた。"
  },
  {
    "id": 229,
    "text": "A fund was set up with a view to preserving our endangered planet.\n\n滅亡の危機に瀕した地球を守ろうと、ある基金が設立された。"
  },
  {
    "id": 230,
    "text": "The massive flood paralyzed the local transportation network.\n\n大洪水で現地の交通網が麻痺した。"
  },
  {
    "id": 231,
    "text": "The equator divides the globe into two hemispheres.\n\n赤道は地球を二つの半球に分ける。"
  },
  {
    "id": 232,
    "text": "I think it's cruel to trap animals for fur coats.\n\n毛皮のコートのために動物を罠で捕獲するのは残酷なことだ。"
  },
  {
    "id": 233,
    "text": "The organization plays a principal role in wildlife conservation.\n\nその団体は野生動物の保護において、最も重要な役割を果たしている。"
  },
  {
    "id": 234,
    "text": "Many fragile species are on the verge of extinction.\n\n多くの弱い生物種が絶滅の危機に瀕している。"
  },
  {
    "id": 235,
    "text": "The prolonged drought did severe damage to the crops.\n\n長引く干ばつが収穫に甚大な被害をもたらした。"
  },
  {
    "id": 236,
    "text": "Tropical rain forests are quickly disappearing on a global scale. In part, it's due to acid rain.\n\n熱帯雨林の消滅が地球規模で急速に進んでいます。その原因の一つは酸性雨です。"
  },
  {
    "id": 237,
    "text": "It is said that global warming is directly related to carbon dioxide emissions.\n\n地球温暖化は、二酸化炭素の排出と直接の関係があると言われている。"
  },
  {
    "id": 238,
    "text": "The destruction of the ozone layer affects the environment.\n\nオゾン層の破壊は環境に影響を及ぼす。"
  },
  {
    "id": 239,
    "text": "The committee called on all nations to work side by side to curb air pollution.\n\n委員会は、大気汚染を抑制するために互いに協力し合うよう各国に要請した。"
  },
  {
    "id": 240,
    "text": "A satellite was launched into orbit to monitor melting glaciers.\n\n溶け続ける氷河を監視するために、人工衛星が軌道に打ち上げられた。"
  },
  {
    "id": 241,
    "text": "The ecologist has warned us time and again that petroleum is not only a blessing but also a curse.\n\n石油は天の恵みであると同時に災いのもとであると、その生態学者は我々に繰り返し警告してきた。"
  },
  {
    "id": 242,
    "text": "The continent is abundant in fossil fuels.\n\nその大陸は化石燃料が豊富だ。"
  },
  {
    "id": 243,
    "text": "The region is relatively rich in mineral resources.\n\nその地域は鉱物資源が比較的豊かだ。"
  },
  {
    "id": 244,
    "text": "Wheat accounts for approximately two-thirds of agricultural production in the area.\n\n小麦はこの地域の農業生産高のおよそ3分の2を占めている。"
  },
  {
    "id": 245,
    "text": "Fertile soil is indispensable for a good harvest.\n\n良い収穫を得るためには、肥沃な土壌が不可欠だ。"
  },
  {
    "id": 246,
    "text": "A humid climate is characteristic of the peninsula.\n\n湿気の多い気候はその半島の特色です。"
  },
  {
    "id": 247,
    "text": "The active volcano erupts at regular intervals.\n\nその活火山は周期的に噴火する。"
  },
  {
    "id": 248,
    "text": "The Panama Canal connects the Atlantic with the Pacific.\n\nパナマ運河は大西洋と太平洋をつないでいる。"
  },
  {
    "id": 249,
    "text": "The geographical features here are similar to those of our prefecture.\n\nここの地理的特徴は、私たちの県のそれと似ている。"
  },
  {
    "id": 250,
    "text": "More often than not, famine is accompanied by plague.\n\nたいてい、飢饉になると疫病も発生する。"
  },
  {
    "id": 251,
    "text": "A devastating earthquake hit the state capital, leaving tens of thousands of residents homeless.\n\n壊滅的規模の地震が州都を襲い、数万人の住民が家を失った。"
  },
  {
    "id": 252,
    "text": "\"Watch out! The ceiling is giving way!\"\n\n「気をつけろっ！天井が崩れかけてるぞ！」"
  },
  {
    "id": 253,
    "text": "The weather forecast says the typhoon is likely to accelerate and approach the coast.\n\n台風は速度を上げて沿岸に接近しそうだと天気予報では言っている。"
  },
  {
    "id": 254,
    "text": "\"It's still up in the air whether the game will be called off or not.\" \"So what? It makes no difference to me.\"\n\n「試合が中止になるかどうか、まだ決まらないんだ。」 「それがどうしたの？私にとってはどうでもいいことだわ。」"
  },
  {
    "id": 255,
    "text": "\"It's foggy, isn't it?\" \"It sure is. But chances are it'll clear up later on.\"\n\n「霧が濃いね。」 「本当ね。でも、たぶんこのあとは晴れるわ。」"
  },
  {
    "id": 256,
    "text": "For the most part, modernization is identified with westernization.\n\nほとんどの場合、近代化は西欧化と同一のことと見なされる。"
  },
  {
    "id": 257,
    "text": "Urban culture appears to be attractive to many people, in particular, to younger people.\n\n都会の文化は多くの人々の目には魅力的に映る。とりわけ、若者にとっては。"
  },
  {
    "id": 258,
    "text": "\"AI\" stands for \"artificial intelligence.\"\n\nAIは人工知能の略です。"
  },
  {
    "id": 259,
    "text": "Household appliances are becoming more convenient day by day.\n\n家庭用の電化製品は日に日に便利になっている。"
  },
  {
    "id": 260,
    "text": "My income is not adequate to provide for my family of four, but we have to make the best of it.\n\n私の収入は四人家族を養うには十分でないけれども、それで何とかやっていくしかない。"
  },
  {
    "id": 261,
    "text": "The popularity of a website depends on its content.\n\nホームページの人気は内容次第。"
  },
  {
    "id": 262,
    "text": "You've got to keep up with it. Once you fall behind, it's hard to catch up.\n\n遅れずについていかなくちゃ。一度遅れをとったら追い付くのは大変だよ。"
  },
  {
    "id": 263,
    "text": "As technology rapidly advances, it's tough to keep pace with it.\n\n技術は急速に進歩するので、遅れを取らずについていくのは大変だ。"
  },
  {
    "id": 264,
    "text": "More and more people are rushing to make use of the interactive nature of the medium.\n\nますます多くの人々が、その媒体の双方向的な性質を利用しようと躍起になっている。"
  },
  {
    "id": 265,
    "text": "Innovation has something to do with the ability to notice unusual phenomena.\n\n革新的なものを生み出すこと、それは変わった現象を見逃さない能力と何らかの関係がある。"
  },
  {
    "id": 266,
    "text": "A bunch of other companies are imitating our excellent methods.\n\n多くの他社が我々の優れた方法を真似している。"
  },
  {
    "id": 267,
    "text": "The once desolate valley was transformed into a thriving hub of hi-tech business.\n\nかつての荒涼とした盆地が、繁栄を謳歌するハイテクビジネスの中心地に変ぼうした。"
  },
  {
    "id": 268,
    "text": "Although there's still plenty of room for improvement, his invention is superior to conventional equipment in every respect.\n\nまだ改善の余地はたくさんあるけれども、彼の発明品はあらゆる点で従来の機器よりも優れている。"
  },
  {
    "id": 269,
    "text": "The strength of the firm is attributed to its unique and future-oriented strategies.\n\nその会社の強さは、他社にない未来志向の戦略によって生み出されている。"
  },
  {
    "id": 270,
    "text": "SONY has integrated a wide range of functions into this cool gadget. It's catching on from coast to coast.\n\nソニーはこのスゴイ機器に多岐にわたる機能を統合させた。全米で評判になり始めている商品だ。"
  },
  {
    "id": 271,
    "text": "This tool comes in handy, so I always keep it close at hand.\n\nこの道具は何かと便利だから、いつも手元に置いています。"
  },
  {
    "id": 272,
    "text": "\"In general, consumers prefer quantity to quality.\" \"It's the other way around today.\"\n\n「一般的に、消費者は質よりも量を選びます。」 「今は全く逆です。」"
  },
  {
    "id": 273,
    "text": "Obviously, the advertisement is aimed at teenagers.\n\n明らかにその広告は10代の若者層をターゲットにしている。"
  },
  {
    "id": 274,
    "text": "The factory now under construction will assemble 1,000 VCR units per day.\n\n現在建設中のその工場は、一日当たり1000台のビデオデッキを組立てることになる。"
  },
  {
    "id": 275,
    "text": "Efficient machinery replaced manual labor.\n\n効率的な機械が、肉体労働に取って代わった。"
  },
  {
    "id": 276,
    "text": "In those days, the gigantic corporation had a virtual monopoly over internal commerce.\n\n当時、その巨大企業が国内の商業を事実上独占していた。"
  },
  {
    "id": 277,
    "text": "With restrictions removed, thousands of new enterprises have come into being.\n\n制限が解除され、数千の新しい企業が誕生した。"
  },
  {
    "id": 278,
    "text": "As a result of his ridiculous venture, he is in danger of going bankrupt.\n\nばかげた新事業の結果、彼は破産の危機に瀕している。"
  },
  {
    "id": 279,
    "text": "Compared to the previous year, business is looking up in terms of sales. However, we haven't made any profit yet.\n\n昨年と比べて、売上の数字だけを見れば事業は上向いている。しかしながら、利益はまだ全く出ていない。"
  },
  {
    "id": 280,
    "text": "\"I'm going to be transferred to an overseas branch.\" \"Oh, I'll miss you. Please drop me a line.\"\n\n「海外の支店に転勤することになったよ。」 「えっ。寂しくなるわ。手紙でも下さいね。」"
  },
  {
    "id": 281,
    "text": "While he was away on business, his wife gave birth to a baby boy.\n\n彼が出張中に、奥さんが男の子の赤ちゃんを出産した。"
  },
  {
    "id": 282,
    "text": "Apparently, Nick wasn't willing to take on the task because it would just add to his burdens.\n\nどうやらニックは、自分の負担が増えるからその仕事を引き受けたがらなかったようだ。"
  },
  {
    "id": 283,
    "text": "Bob had intended to take her out tonight, but he had to work overtime.\n\nボブは今夜、彼女とデートするつもりだったが、残業になってしまった。"
  },
  {
    "id": 284,
    "text": "\"Please estimate the losses by Friday at the latest.\" \"I'll manage it somehow.\"\n\n「遅くとも金曜日までには損失の見積りを出して下さい。」 「何とかやってみましょう。」"
  },
  {
    "id": 285,
    "text": "\"Nick, I'm counting on you.\" \"OK, I'll see to it.\" \"Thanks, I appreciate it.\" \"Don't mention it.\"\n\n「頼りにしてるわ、ニック。」 「大丈夫、きちんとやっておきます。」 「ありがとう。感謝するわ。」 「いいんですよ。」"
  },
  {
    "id": 286,
    "text": "He pretends to be enthusiastic when his boss is around.\n\n彼は上司がそばにいる時は熱心なふりをする。"
  },
  {
    "id": 287,
    "text": "He got promoted at the expense of his colleagues. He should be ashamed of himself.\n\n彼は同僚を踏み台にして出世した。恥を知るべきだ。"
  },
  {
    "id": 288,
    "text": "As the recession set in, temporary employees were laid off one after another.\n\n景気の後退が始まると、短期契約社員たちは次々に一時解雇を言い渡された。"
  },
  {
    "id": 289,
    "text": "Nowadays, many people are out of work against their will. Who is responsible for that?\n\n最近では、多くの人々が職に就きたくても就けないでいる。誰の責任だろう？"
  },
  {
    "id": 290,
    "text": "I've gotten pessimistic, and I'm worried about something I would never have been concerned about before.\n\n私も悲観的になってきて、以前は決して気にならなかったことに不安を感じている。"
  },
  {
    "id": 291,
    "text": "Today, even white-collar workers are confronted with great hardships.\n\n今日では、サラリーマンでさえ大変な苦難に直面している。"
  },
  {
    "id": 292,
    "text": "The authorities are striving in vain to stabilize the currency.\n\n当局は通貨を安定させようと懸命だが、どうにもならない。"
  },
  {
    "id": 293,
    "text": "We've come to the conclusion that nothing is more urgent than reducing Japan's huge deficit.\n\n日本の膨大な赤字を削減することが何よりも緊急を要することだ、という結論に我々は達した。"
  },
  {
    "id": 294,
    "text": "The questionnaires were distributed at random.\n\nアンケート用紙が無作為に配布された。"
  },
  {
    "id": 295,
    "text": "All you have to do is fill in the blanks below. (Please print in black or blue ink.)\n\n以下の空欄部分にご記入いただくだけで結構です。（黒または青インクではっきりと書いて下さい）"
  },
  {
    "id": 296,
    "text": "In addition to a 10% discount, you can pick out an optional excursion for free.\n\n10%の割引に加えて、無料のオプションツアーを一つ選択できます。"
  },
  {
    "id": 297,
    "text": "Round-trip fares to each destination are as follows.\n\n各目的地までの往復料金は下記の通りです。"
  },
  {
    "id": 298,
    "text": "\"Don't forget to confirm your reservation in advance.\" \"I won't.\"\n\n「事前に予約の確認をするのを忘れないでね。」 「ええ。」"
  },
  {
    "id": 299,
    "text": "Be sure to check in at least 45 minutes prior to departure time.\n\n遅くとも出発時刻の45分前には搭乗手続きを必ず完了させて下さい。"
  },
  {
    "id": 300,
    "text": "I attached my name tag to my baggage, but it soon came off.\n\n自分の荷物に名札を付けたけれども、すぐに取れてしまった。"
  },
  {
    "id": 301,
    "text": "On average, these packages weigh two pounds.\n\nこれらの小包の重さは平均すると2ポンドです。"
  },
  {
    "id": 302,
    "text": "This plastic garbage bag is free of hazardous chemicals.\n\nこのビニール製のゴミ袋は有害な化学物質を含んでいません。"
  },
  {
    "id": 303,
    "text": "This flashlight is getting dim. It needs new batteries.\n\nこの懐中電灯は明かりが弱くなってきた。電池を入れ替えないと。"
  },
  {
    "id": 304,
    "text": "Excuse me. How often do the shuttle buses run to downtown New York?\n\nすみません。ニューヨーク市街に行くシャトルバスはどの位の間隔で走ってますか？"
  },
  {
    "id": 305,
    "text": "The motel can accommodate as many as 400 guests.\n\nそのモーテルは400人もの宿泊客を泊められる。"
  },
  {
    "id": 306,
    "text": "This suite is three times larger than my condominium.\n\nこのスイートルームは、私の持っているマンションの3倍の広さだ。"
  },
  {
    "id": 307,
    "text": "Littering in this facility is subject to a maximum fine of $500.\n\nこの施設内でのゴミの投げ捨てには、最高500ドルの罰金が科せられることがあります。"
  },
  {
    "id": 308,
    "text": "That restaurant is always packed. We'd better make a reservation beforehand.\n\nあのレストランはいつでも混んでいるから、事前に予約をした方がいい。"
  },
  {
    "id": 309,
    "text": "\"Sorry to interrupt your meal but I'd like a word with you in private.\" \"Can I get back to you later?\"\n\n「食事の邪魔をして悪いんだけど、ちょっと内密に話がしたいの。」 「後で君のところに行くよ。」"
  },
  {
    "id": 310,
    "text": "The cook was astonished at his incredible appetite.\n\n料理人は彼の信じられないほどの食欲にとても驚いた。"
  },
  {
    "id": 311,
    "text": "\"What's going on down there? I'm curious.\" \"I have no idea.\"\n\n「下で何が起こっているの？ すごく気になるわ。」 「さあ、何だろう。」"
  },
  {
    "id": 312,
    "text": "Excited fans were hanging around the rear exit hoping to catch a glimpse of Michael.\n\n興奮したファンたちが、マイケルを一目見ようと裏口に群がっていた。"
  },
  {
    "id": 313,
    "text": "On encountering the celebrity, they asked for his autograph.\n\n彼らは有名人と出くわすなり、サインをねだった。"
  },
  {
    "id": 314,
    "text": "Whenever I go abroad, I suffer from jet lag and diarrhea.\n\n海外に行くと必ず、時差ボケと下痢に悩まされる。"
  },
  {
    "id": 315,
    "text": "\"I feel sort of dizzy and I feel like throwing up.\" \"You look pale!\"\n\n「何だか目まいと吐き気がするよ。」 「顔が真っ青よ。」"
  },
  {
    "id": 316,
    "text": "Take some aspirin. It will cure you of your headache in no time.\n\n鎮痛剤を飲めば、すぐに頭痛は治まります。"
  },
  {
    "id": 317,
    "text": "\"I'm afraid I'm coming down with something.\" \"You should take a day off.\"\n\n「何だか体調が悪いなあ。」 「一日休みを取った方がいいわよ。」"
  },
  {
    "id": 318,
    "text": "Some of the ingredients in this beverage are harmful, especially if you are pregnant.\n\nこの飲料に含まれている成分には有害なものもある。とりわけ、妊娠中の人にとっては。"
  },
  {
    "id": 319,
    "text": "Good nutrition is vital for an infant's growth.\n\n十分な栄養摂取は幼児の発育にとって極めて重要です。"
  },
  {
    "id": 320,
    "text": "Moderate exercise stimulates the circulation of the blood.\n\n適度な運動は血行をよくする。"
  },
  {
    "id": 321,
    "text": "My physician advised me to refrain from alcohol for the time being.\n\n当分の間は酒を控えるようにと、医者に忠告された。"
  },
  {
    "id": 322,
    "text": "I do want to get into shape and lose some weight, so I go swimming every morning.\n\n本当に体調を良くしたいし、減量もしたいから、毎朝泳ぎに行っています。"
  },
  {
    "id": 323,
    "text": "He caught a nasty cold because he stayed up late last night.\n\n昨日の夜更かしがたたって、彼はひどい風邪をひいた。"
  },
  {
    "id": 324,
    "text": "The surgeon persuaded him to undergo an organ transplant.\n\n外科医に説得されて、彼は臓器移植手術を受けることにした。"
  },
  {
    "id": 325,
    "text": "Since our father is bedridden, we take turns looking after him.\n\n父が寝たきりなので私たちが交代で面倒を見ています。"
  },
  {
    "id": 326,
    "text": "Our hypothesis is that eating excessive amounts of junk food contributes to early mortality.\n\nジャンクフードの過剰な摂取は早死にの一因になる、というのが我々の仮説だ。"
  },
  {
    "id": 327,
    "text": "The government did not take appropriate measures to prevent the infection from spreading.\n\n政府は感染の拡大を未然に防ぐための適切な措置を取らなかった。"
  },
  {
    "id": 328,
    "text": "The minister was obliged to resign from the Cabinet.\n\nその大臣は内閣からの辞任を余儀なくされた。"
  },
  {
    "id": 329,
    "text": "Many people regard the current compulsory education system as being obsolete.\n\n多くの人々は、現行の義務教育制度が時代遅れであると考えている。"
  },
  {
    "id": 330,
    "text": "Many people encouraged me to fulfill my ambitions.\n\n大きな目標を実現するようにと、たくさんの人が私を励ましてくれた。"
  },
  {
    "id": 331,
    "text": "To make his dreams come true, he dropped out of school and made his way to Tokyo.\n\n自分の夢を実現させるために、彼は学校を中退して東京を目指した。"
  },
  {
    "id": 332,
    "text": "\"What do you do?\" \"I'm a college student, a freshman at Harvard.\" \"What's your major?\" \"Philosophy.\"\n\n「普段は何をなさっているんですか？」 「大学生です。ハーバードの1年です。」 「専攻は？」 「哲学です。」"
  },
  {
    "id": 333,
    "text": "Tuition will be raised by nearly ten percent as of April 1, 2001.\n\n2001年4月1日から授業料が10%近く値上げになります。"
  },
  {
    "id": 334,
    "text": "\"I'm of two minds whether to apply for the scholarship or not.\" \"Give it a try!\"\n\n「奨学金を申し込もうかどうか悩んでいるの。」 「やるだけやってみなよ！」"
  },
  {
    "id": 335,
    "text": "As soon as he graduated from Keio University, he took over his family's business.\n\n彼は慶応大学を卒業するとすぐに家業を継いだ。"
  },
  {
    "id": 336,
    "text": "You aren't cut out for the military because of its rigid discipline.\n\n軍の規律は厳格だから、あなたはそっちの世界に向かないわ。"
  },
  {
    "id": 337,
    "text": "I am determined to make a living as a playwright at all costs.\n\n私はどんな犠牲を払ってでも、脚本家で食べていくと心に決めている。"
  },
  {
    "id": 338,
    "text": "As he grew up, he learned to put things in perspective.\n\n彼も大人になって、物事を総合的な視野で見られるようになった。"
  },
  {
    "id": 339,
    "text": "Conformity is an essential element of our homogeneous community.\n\n同じような人々からなる私たちの地域社会では、体制に従おうとする意識は不可欠な要素である。"
  },
  {
    "id": 340,
    "text": "I'd rather go my own way than toil away for a company. Trying to fit into a mold gets me nowhere! 会社のためにあくせく働くよりは、我が道を行くほうがいい。型にはまろうとしたって何の得にもならないよ！"
  },
  {
    "id": 341,
    "text": "Tom takes after his uncle in personality. I mean, he is obstinate by nature. He never gives in.\n\nトムは性格が彼のおじに似ている。つまりその、生まれつきの頑固者。彼は絶対に折れない。"
  },
  {
    "id": 342,
    "text": "When the time is ripe, be bold and go for it! I'll stand by you.\n\n機が熟したら、大胆に突き進むんだ！僕がいつもそばにいる。"
  },
  {
    "id": 343,
    "text": "I'll stand up for what I believe in and won't yield to any threats.\n\n自分の信念を守るためには立ち上がるし、いかなる脅威にも屈しないつもりだ。"
  },
  {
    "id": 344,
    "text": "\"If only I could conquer my weaknesses!\" \"It's up to you.\"\n\n「自分の弱点を克服できさえすればなあ。」 「あなた次第よ。」"
  },
  {
    "id": 345,
    "text": "You should make the most of this rare opportunity to demonstrate your talent.\n\n自分の才能を示すために、めったにないこの機会を最大限に利用するべきだ。"
  },
  {
    "id": 346,
    "text": "You won't let me down. I have great faith in you. You can make it!\n\n僕をがっかりさせないよね。信頼しているよ。君ならうまくやれるさ！"
  },
  {
    "id": 347,
    "text": "The spectators were moved by her graceful performance.\n\n観客たちは彼女の優雅な演技に感動した。"
  },
  {
    "id": 348,
    "text": "In 1995, Ando received architecture's most prestigious award.\n\n1995年、安藤氏は建築における最も権威ある賞を受賞した。"
  },
  {
    "id": 349,
    "text": "In the face of adversity, Mike accomplished an extraordinary feat. He deserves praise.\n\n逆境をものともせず、マイクはすばらしい偉業を成し遂げた。称賛を受けるのは当然だ。"
  },
  {
    "id": 350,
    "text": "The audience was impressed by his eloquent lecture.\n\n聴衆は彼の説得力のある講義に感銘を受けた。"
  },
  {
    "id": 351,
    "text": "From a humble background, John achieved worldwide fame.\n\n庶民の身から、ジョンは世界的な名声を勝ち取った。"
  },
  {
    "id": 352,
    "text": "He accumulated a tremendous fortune during the postwar era.\n\n彼は戦後に莫大な財産を築いた。"
  },
  {
    "id": 353,
    "text": "He used to be well off and generous, but now he lives from hand to mouth.\n\n彼は以前は裕福で気前もよかったけれど、今ではその日暮らしだ。"
  },
  {
    "id": 354,
    "text": "Nick is by no means satisfied with the reward. He is selfish and greedy.\n\nニックはその報酬に満足していない。彼は自己中心的で欲が深い。"
  },
  {
    "id": 355,
    "text": "\"You owe me $200 altogether, Bob. When are you going to pay me back?\" \"I'm sorry. I'm hard up.\" \"There you go again!\"\n\n「全部で200ドル貸してるの、ボブ。いつ返すつもりなの？」 「ごめん、金欠なんだ。」 「またなの？」"
  },
  {
    "id": 356,
    "text": "To Brian's surprise, his debt amounted to a considerable sum.\n\nブライアンが驚いたことに、借金はかなりの額になっていた。"
  },
  {
    "id": 357,
    "text": "Stop clinging to your glory days, or you'll be left behind.\n\n過去の栄光にしがみつくのはやめないと、取り残されるわよ。"
  },
  {
    "id": 358,
    "text": "You cannot escape from today's harsh realities, so you must adapt to them.\n\n今日の厳しい現実からは逃れられない以上、それに順応しなければならない。"
  },
  {
    "id": 359,
    "text": "Prosperity does not last forever. In other words, it will come to an end one of these days.\n\n繁栄は永遠に続くものではない。つまり、いつかは終わりを迎えるものだ。"
  },
  {
    "id": 360,
    "text": "Proper qualifications are required for the position; computer literacy is a must.\n\nその職種には相応の資格や能力が必要で、コンピューターが使えることは絶対条件である。"
  },
  {
    "id": 361,
    "text": "Enclose your resume in this envelope and submit it to the personnel department.\n\nこの封筒に履歴書も入れて人事部に提出して下さい。"
  },
  {
    "id": 362,
    "text": "It's optimistic of you to believe that things will work out. At best there's a fifty-fifty chance.\n\n物事がうまく行くと信じるなんて君も楽観的だね。可能性はせいぜい50%だよ。"
  },
  {
    "id": 363,
    "text": "Registration forms can be obtained free of charge.\n\n登録用紙は無料で入手できます。"
  },
  {
    "id": 364,
    "text": "Please give us a call now if you want to participate in the workshop!\n\nこの講習会に参加をご希望の方は、今すぐお電話下さい。"
  },
  {
    "id": 365,
    "text": "For further inquiries, please feel free to contact us toll-free at 1-800-555-1212.\n\nさらにご質問がありましたら、どうぞご遠慮なくフリーダイヤル1-800-555-1212までお電話ください。"
  },
  {
    "id": 366,
    "text": "\"How's it going, Bob?\" \"Couldn't be better! I did well in my job interview!\" \"Good for you!\"\n\n「ボブ、最近どう？」 「最高だよ！就職面接がうまくいったんだ。」 「やったじゃない！」"
  },
  {
    "id": 367,
    "text": "He gave instructions to the trainees, but they couldn't make heads or tails of them.\n\n研修生たちは、彼から与えられた指示がさっぱりわからなかった。"
  },
  {
    "id": 368,
    "text": "You can't do two things at one time! It's out of the question. Do them one by one.\n\n一度に二つのことはできないよ。無理に決まってる。一つずつやりなよ。"
  },
  {
    "id": 369,
    "text": "\"Bob, don't disturb her. Mind your own business,\" he whispered.\n\n「ボブ、彼女の邪魔をしちゃだめだぞ。ちょっかいを出すなよ。」と彼は小声で言った。"
  },
  {
    "id": 370,
    "text": "If you persist in bothering her like that, she'll lose her temper.\n\nそうやってしつこく彼女を困らせると、彼女も怒り出すぞ。"
  },
  {
    "id": 371,
    "text": "He was so childish that he couldn't resist temptation.\n\n彼はあまりに子供だから誘惑に勝てなかった。"
  },
  {
    "id": 372,
    "text": "\"Stop making a fuss. It really gets on my nerves!\" she shouted.\n\n「ぎゃあぎゃあ言うのはやめて。本当にいらいらするわ。」と彼女は叫んだ。"
  },
  {
    "id": 373,
    "text": "There's no point in talking back to Nick. He is a \"dictator,\" so to speak.\n\nニックに口答えしたって無駄だよ。言ってみりゃ彼は独裁者さ。"
  },
  {
    "id": 374,
    "text": "They are very polite in his presence, but actually, they always talk about him behind his back.\n\n彼女たちは彼の前ではとても礼儀正しいが、実際には、いつも陰口を叩いている。"
  },
  {
    "id": 375,
    "text": "\"You despise Nick, don't you?\" \"On the contrary! I look up to him.\"\n\n「ニックを軽蔑しているんだろう？」 「とんでもない！尊敬しているわ。」"
  },
  {
    "id": 376,
    "text": "His constant insults aroused her anger.\n\n彼の絶え間ない侮辱が、彼女の怒りをかき立てた。"
  },
  {
    "id": 377,
    "text": "I'm fed up with just shuffling papers and pouring coffee. I've made up my mind to quit!\n\n書類の整理とかお茶くみには、ほとほとうんざり。会社を辞めることにしたわ！"
  },
  {
    "id": 378,
    "text": "In reality, many people have difficulty making ends meet. How can you get by on 100,000 yen a month?\n\n実際、多くの人々が家計のやりくりに苦労している。月々10万円でどうしたらやっていけるだろう？"
  },
  {
    "id": 379,
    "text": "Female clerks may well complain about their routines, which are not challenging at all.\n\n女性職員が自分たちの日常業務に不満を言うのももっともだ。全くやりがいの無い仕事だから。"
  },
  {
    "id": 380,
    "text": "Thanks to a fundamental restructuring, our surplus has swelled threefold.\n\n抜本的に事業の再構築をおこなったおかげで、当社の黒字は3倍に膨らんだ。"
  },
  {
    "id": 381,
    "text": "Many people today think of loyalty to a company as an absurd notion.\n\n現在の多くの人が、会社に対する忠誠はばかげた考えだと思っている。"
  },
  {
    "id": 382,
    "text": "I have to commute all the way from a distant suburb. I'm sick of it!\n\n僕は遠い郊外からわざわざ通勤しなければならない。もううんざりだ！"
  },
  {
    "id": 383,
    "text": "I want to spend the rest of my life pursuing my ideals.\n\n余生は自分の理想の追求に費やしたい。"
  },
  {
    "id": 384,
    "text": "After retirement, Teresa devoted herself to caring for orphans.\n\n現役を引退した後、テレサは孤児の世話に一身を捧げた。"
  },
  {
    "id": 385,
    "text": "For the sake of children in need, we cooperated to collect donations.\n\n困っている子どもたちのために、私たちは募金活動に協力した。"
  },
  {
    "id": 386,
    "text": "The charity is named after a man who gave away some two billion yen.\n\nその慈善団体には、およそ20億円の寄付をした人物の名前が付けられている。"
  },
  {
    "id": 387,
    "text": "His autobiography was released today and was sold out by noon.\n\n彼の自叙伝が今日発売され、午前中に完売した。"
  },
  {
    "id": 388,
    "text": "Ted, who is often referred to as a man of integrity, is going to run for mayor.\n\n高潔な人物だと度々称されるテッドが、市長に立候補する。"
  },
  {
    "id": 389,
    "text": "The candidate was disappointed by the outcome of the election.\n\nその候補者は選挙結果に落胆した。"
  },
  {
    "id": 390,
    "text": "The municipal council should concentrate more on specific issues.\n\n市議会は具体的な問題にもっと焦点を当てるべきだ。"
  },
  {
    "id": 391,
    "text": "It is the case that those who live on a pension are forced to lead a hard life.\n\n年金生活者が厳しい生活を強いられているというのは事実です。"
  },
  {
    "id": 392,
    "text": "We should leave out this data. It's far from accurate.\n\nこのデータは除外した方がいい。正確と言うにはほど遠いものだ。"
  },
  {
    "id": 393,
    "text": "We tend to associate politicians with hypocrisy.\n\n私たちは政治家というと偽善を連想しがちだ。"
  },
  {
    "id": 394,
    "text": "They are primarily concerned with exploiting us, not with enhancing our living standards.\n\n彼らの一番の関心事は、私たちの生活水準を高めることではなく、私たちから搾取することだ。"
  },
  {
    "id": 395,
    "text": "The man once exerted a dominant influence on the conservative party, but now his power is diminishing.\n\nその男はかつて保守政党に対して支配的影響力を及ぼしていたが、今では彼の力も弱まっている。"
  },
  {
    "id": 396,
    "text": "The spokesperson refused to make any comment, saying, \"It's under investigation.\"\n\n報道担当者は「調査中です」と言って一切のコメントを拒否した。"
  },
  {
    "id": 397,
    "text": "The police say there's someone pulling strings behind the scenes.\n\n背後で糸を引いている人物がいると警察は言っている。"
  },
  {
    "id": 398,
    "text": "The executives entertained the bureaucrats at ryotei, or exclusive Japanese restaurants, hoping for something in return.\n\n役員たちは何らかの見返りを期待して、官僚たちを料亭、すなわち、高級な日本料理店で接待した。"
  },
  {
    "id": 399,
    "text": "His secretary flatly denied leaking any confidential information.\n\n彼の秘書は機密情報をいっさい漏らしていないと明言した。"
  },
  {
    "id": 400,
    "text": "No one dares to contradict his/her employer for fear of being fired.\n\nクビになるのが怖いから、雇用主にあえて逆らおうとする人は誰一人としていない。"
  },
  {
    "id": 401,
    "text": "He sacrificed his promising career to retain his dignity.\n\n彼は自分の尊厳を守るために、将来有望な経歴を犠牲にした。"
  },
  {
    "id": 402,
    "text": "I might as well kill myself as reconcile myself to my fate.\n\n自分の運命に甘んじるぐらいなら自殺した方がましだ。"
  },
  {
    "id": 403,
    "text": "He was about to commit suicide by swallowing poison when he thought better of it.\n\n毒物を飲んで自殺しようとした直前に彼は思いとどまった。"
  },
  {
    "id": 404,
    "text": "The vague rumor proved to be false. Nevertheless, some skepticism lingers on.\n\nその曖昧な噂は嘘だとわかった。だがそれでも、多少の疑いはまだ残る。"
  },
  {
    "id": 405,
    "text": "A senior official is suspected of accepting bribes from a company, but there isn't sufficient evidence to arrest him.\n\nある政府高官が企業から賄賂を受け取った容疑をかけられている。しかし、逮捕するには証拠が不十分だ。"
  },
  {
    "id": 406,
    "text": "Jason, who was in charge of the project, was dismissed for corruption.\n\nそのプロジェクトの責任者であったジェイソンが、汚職に手を染めた理由で解任された。"
  },
  {
    "id": 407,
    "text": "To my knowledge, he has not been involved in the fraud scheme.\n\n私の知る限り、彼はその詐欺の企みには関与していません。"
  },
  {
    "id": 408,
    "text": "They found out the truth while examining a pile of relevant documents.\n\n関連書類の山を調べていくうちに、彼らは真実をつかんだ。"
  },
  {
    "id": 409,
    "text": "During the trial it came to light that they had been covering up illegal transactions for decades.\n\n彼らが数十年にわたって違法取引を隠蔽していたことが、公判中に明らかになった。"
  },
  {
    "id": 410,
    "text": "The detective took down his testimony on the spot, word for word.\n\n刑事はその場で、彼の証言を一言一句正確に書き取った。"
  },
  {
    "id": 411,
    "text": "For the first time in my life, I felt a pang of conscience, but there was no other way out.\n\n生まれて初めて良心の呵責を感じましたが、そうする以外にその場をしのぐ方法はありませんでした。"
  },
  {
    "id": 412,
    "text": "I'm still haunted by a vivid nightmare I had last night.\n\n昨日の夜に見た生々しい悪夢がまだ頭から離れない。"
  },
  {
    "id": 413,
    "text": "By and large, reporters don't hesitate to intrude on one's privacy.\n\n概して、記者というものは個人のプライバシーを侵害することにためらいを感じない。"
  },
  {
    "id": 414,
    "text": "The author revised his manuscript over and over again.\n\n著者は何度も何度も現稿を手直しした。"
  },
  {
    "id": 415,
    "text": "He is second to none when it comes to finding fault with others.\n\n他人の過ちを指摘することにかけては、彼の右に出るものはいない。"
  },
  {
    "id": 416,
    "text": "On the whole, the elite are not sensitive to criticism.\n\n概して、エリートたちは批判に対して鈍感だ。"
  },
  {
    "id": 417,
    "text": "When a tabloid revealed that he was a drug addict, his reputation was all but ruined.\n\nある大衆紙に彼は麻薬常用者だと暴露され、彼の評判はほとんど地に落ちた。"
  },
  {
    "id": 418,
    "text": "They considered every aspect of the defense program and pointed out numerous flaws.\n\n彼らはその防衛計画をあらゆる面から検討し、多数の問題箇所を指摘した。"
  },
  {
    "id": 419,
    "text": "We will not tolerate anyone who engages in terrorism.\n\n我々は、誰であろうとテロ活動に携わる者に寛容でいるつもりはない。"
  },
  {
    "id": 420,
    "text": "The notorious rebel was ultimately captured and confined to jail.\n\n悪名高い反乱兵はついに捕らえられ、拘置所に身柄を拘束された。"
  },
  {
    "id": 421,
    "text": "Troops were swiftly called in to put down the riot.\n\n暴動を鎮圧するために、直ちに軍隊が派遣された。"
  },
  {
    "id": 422,
    "text": "We should appeal to reason instead of resorting to violence.\n\n私たちは暴力に頼るのではなく、理性に訴えるべきだ。"
  },
  {
    "id": 423,
    "text": "I suggest we adopt flexible tactics for the moment.\n\n当分の間は柔軟な戦術をとってみてはどうでしょう。"
  },
  {
    "id": 424,
    "text": "The armed forces succeeded in occupying the entire territory.\n\n軍は全領土を占領することに成功した。"
  },
  {
    "id": 425,
    "text": "under the circumstances, the enemy has no choice but to surrender. They can't hold out any longer.\n\nこのような状況では、敵は降伏せざるを得ない。彼らがこれ以上持ちこたえることは不可能だ。"
  },
  {
    "id": 426,
    "text": "Sooner or later, the hostages will be set free.\n\n遅かれ早かれ、人質たちは解放されるだろう。"
  },
  {
    "id": 427,
    "text": "Under the reign of tyranny, innocent people were deprived of their citizenship.\n\n専制政治による支配のもとで、罪のない人々が市民権を剥奪された。"
  },
  {
    "id": 428,
    "text": "Some soldiers were reluctant to obey the commands.\n\nその命令にいやいや従う兵士もいた。"
  },
  {
    "id": 429,
    "text": "His regime is bound to collapse.\n\n彼の政権はきっと崩壊する。"
  },
  {
    "id": 430,
    "text": "The allies condemned the invasion as a violation of UN resolutions.\n\n同盟諸国はその侵略行為が国連決議に違反するものとして、厳しく非難した。"
  },
  {
    "id": 431,
    "text": "We cannot rule out the possibility that civil war will break out in that country.\n\nその国で内乱が勃発する可能性がないとは断言できない。"
  },
  {
    "id": 432,
    "text": "The colony declared independence and became a republic.\n\nその植民地は独立を宣言し、共和国となった。"
  },
  {
    "id": 433,
    "text": "An immense monument was erected in honor of the noble patriot.\n\nその高潔な愛国者に敬意を表して、巨大な記念碑が建てられた。"
  },
  {
    "id": 434,
    "text": "He got down on his knees and prayed for the souls of the deceased.\n\n彼はひざまずいて故人の霊に祈りを捧げた。"
  },
  {
    "id": 435,
    "text": "The Supreme Court is located near the Imperial Palace.\n\n最高裁判所は皇居の近くにある。"
  },
  {
    "id": 436,
    "text": "The pro-choice group protested against a ban on abortion.\n\n中絶合法賛成派グループが中絶の禁止に対して抗議した。"
  },
  {
    "id": 437,
    "text": "Senator Ford remained neutral in the bitter controversy.\n\nフォード上院議員はその激しい論争において、中立の立場を守った。"
  },
  {
    "id": 438,
    "text": "Ford has been in a difficult situation all week long. He is no longer capable of coping with it.\n\nフォード氏はここ一週間ずっと困難な立場に置かれている。もはや、彼にはどうすることもできない。"
  },
  {
    "id": 439,
    "text": "The summit talks are to be broadcast simultaneously throughout the world.\n\n首脳会談は世界中で同時に放送される予定だ。"
  },
  {
    "id": 440,
    "text": "Diplomatic dialogue helped put an end to the conflict.\n\n外交的対話のおかげでその紛争に終止符を打つことができた。"
  },
  {
    "id": 441,
    "text": "Johnson was appointed as a goodwill ambassador to foster mutual understanding between the two nations.\n\n両国の相互理解を深めるために、ジョンソンさんが親善大使に任命された。"
  },
  {
    "id": 442,
    "text": "The specialist predicts international tension will build up.\n\nその専門家は国際的な緊張が高まっていくと予測している。"
  },
  {
    "id": 443,
    "text": "In my opinion, permanent peace is nothing but an illusion.\n\n私の考えでは、恒久的な平和など幻想に過ぎない。"
  },
  {
    "id": 444,
    "text": "Ethnic minorities struggle against prejudice, poverty, and oppression.\n\n民族的少数派は偏見、貧困、抑圧と戦っている。"
  },
  {
    "id": 445,
    "text": "We must make every effort to do away with all discrimination.\n\nすべての差別をなくすために、私たちはあらゆる努力をしなければならない。"
  },
  {
    "id": 446,
    "text": "The immigrants have endured physical and mental pain.\n\n移民たちは肉体的、精神的苦痛に耐えてきた。"
  },
  {
    "id": 447,
    "text": "The amendment was rejected because it didn't take racial diversity into account.\n\nその改正案は、人種の多様性を考慮していないとの理由で却下された。"
  },
  {
    "id": 448,
    "text": "Needless to say, the refugees were longing for freedom.\n\n言うまでもなく、難民たちは自由を強く求めていた。"
  },
  {
    "id": 449,
    "text": "According to a survey, three in five people today are indifferent to foreign affairs.\n\nある調査によると、今日では5人中3人が外交問題には無関心だそうだ。"
  },
  {
    "id": 450,
    "text": "What will become of Japan-U.S. relations if the security treaty expires?\n\n安全保障条約が期限切れになったら、日米関係はどうなるだろう？"
  },
  {
    "id": 451,
    "text": "Unless Japan eliminates its unfair tariffs, the U.S. will impose sanctions.\n\n日本が不公平な関税を撤廃しなければ、米国は制裁措置を取るだろう。"
  },
  {
    "id": 452,
    "text": "Trade friction might arise between the two nations at any moment.\n\n両国の間では貿易摩擦がいつ生じてもおかしくない。"
  },
  {
    "id": 453,
    "text": "Our top priority is to settle this dispute once and for all, so we are ready to meet them halfway.\n\n我々の最優先事項はこの論争にきっぱりと決着を付けることだ。そのためには相手側との妥協も覚悟している。"
  },
  {
    "id": 454,
    "text": "The federal budget was narrowly approved by Congress.\n\n連邦予算はかろうじて議会の承認を得た。"
  },
  {
    "id": 455,
    "text": "He argues that the administration must look for alternative sources of revenue.\n\n政府は別の歳入源を探さなければいけない、と彼は主張している。"
  },
  {
    "id": 456,
    "text": "A poll shows that an overwhelming majority is in favor of the legislation.\n\n世論調査の結果から、圧倒的多数の人がその法律を支持していることがわかる。"
  },
  {
    "id": 457,
    "text": "The cops are searching for clues to the brutal murder.\n\n警察はその残虐な殺人事件の手がかりを捜している。"
  },
  {
    "id": 458,
    "text": "The man must be insane. He can't distinguish vice from virtue.\n\nその男は頭がおかしいに違いない。善悪の区別がつけられないんだ。"
  },
  {
    "id": 459,
    "text": "The fingerprints left on the weapon correspond with the suspect's.\n\n凶器に残された指紋は容疑者のものと一致する。"
  },
  {
    "id": 460,
    "text": "It took us all by surprise when the noted psychologist was accused of kidnapping.\n\nその著名な心理学者が誘拐罪で訴えられたことに、私たちはみな驚いた。"
  },
  {
    "id": 461,
    "text": "The jury's guilty verdict gave rise to widespread debate.\n\n陪審団による有罪評決が大論争の引き金となった。"
  },
  {
    "id": 462,
    "text": "The man pleaded for mercy, but he was sentenced to twenty years in prison for his crime.\n\n男は情報酌量を求めたが、犯した罪に対して20年の懲役刑が言い渡された。"
  },
  {
    "id": 463,
    "text": "The officer on duty perceived an elderly man coming up behind him.\n\n勤務中の警官は、一人のお年寄りが自分の背後に近づいてくるのに気付いた。"
  },
  {
    "id": 464,
    "text": "He caught sight of a thief attempting to break into the house.\n\n彼はその家に押入ろうとしている泥棒を目にした。"
  },
  {
    "id": 465,
    "text": "The day before yesterday he witnessed a weird incident in the wilderness.\n\nおととい、彼はその原野で奇妙な出来事を目撃した。"
  },
  {
    "id": 466,
    "text": "I became aware of someone staring at me from across the aisle, so I turned around. But there was no one in sight.\n\n通路の向こうから、誰かが私をじっと見ているのに気付いたので振り向いた。しかし、誰の姿も見えなかった。"
  },
  {
    "id": 467,
    "text": "She screamed with horror as someone took hold of her arm.\n\n何者かに腕をつかまれ、彼女は怖くて悲鳴を上げた。"
  },
  {
    "id": 468,
    "text": "Informed of her safety, he breathed a sigh of relief.\n\n彼女の無事を知らされて、彼は安堵のため息をついた。"
  },
  {
    "id": 469,
    "text": "The bullet penetrated his chest, leaving him in critical condition.\n\n銃弾が胸を貫通し、彼は危篤状態に陥った。"
  },
  {
    "id": 470,
    "text": "At present, it's still uncertain whether it was done deliberately or by accident.\n\nそうなったのが故意なのか過失なのか、現在のところまだはっきりしない。"
  },
  {
    "id": 471,
    "text": "A deli caught fire and burned down, leaving a heap of ashes.\n\nデリカエッセンから火災が発生し、灰の山を残して全焼した。"
  },
  {
    "id": 472,
    "text": "All of a sudden the fireworks warehouse exploded, and it took two days to put out the blaze.\n\n花火の貯蔵庫が突然爆発し、激しい炎を鎮めるまでに2日間を要した。"
  },
  {
    "id": 473,
    "text": "A bomb went off in a thirty-story building, and more than fifty people were seriously wounded.\n\n30階建てのビルで爆弾が爆発し、50人以上が重傷を負った。"
  },
  {
    "id": 474,
    "text": "A cargo vessel, bound for Athens, sank in the Mediterranean without a trace.\n\nアテネへ向かう一隻の貨物船が、何の痕跡も残さずに地中海で沈没した。"
  },
  {
    "id": 475,
    "text": "The reckless men froze to death during their expedition to the Antarctic.\n\n無謀な男たちが南極探検中に凍死した。"
  },
  {
    "id": 476,
    "text": "The tragedy must be remembered so as not to be repeated.\n\n同じことが繰り返されないように、その悲劇を忘れてはならない。"
  },
  {
    "id": 477,
    "text": "The exhibition offers profound insights into ancient civilization.\n\nその展覧会に行くと古代文明に対する深い理解が得られる。"
  },
  {
    "id": 478,
    "text": "Giotto is credited with sowing the seeds of the Italian Renaissance.\n\nイタリアンルネッサンスを開花させるきっかけを作ったのはジョットの功績だ。"
  },
  {
    "id": 479,
    "text": "Bob mounted the portrait in a fancy frame, but it was upside down.\n\nボブは装飾された額にその肖像画を収めたけれど、上下逆さまだった。"
  },
  {
    "id": 480,
    "text": "This magnificent cathedral dates back to the Middle Ages.\n\nこの荘厳な大聖堂の建立は中世にまでさかのぼる。"
  },
  {
    "id": 481,
    "text": "Asian religions inspired him to create splendid sculptures.\n\nアジアの宗教から閃きを得て、彼は複数のすばらしい彫刻作品を生み出した。"
  },
  {
    "id": 482,
    "text": "They explored the desert in search of buried treasure.\n\n彼らは埋蔵された宝物を求めて砂漠を探検した。"
  },
  {
    "id": 483,
    "text": "The millionaire insisted on acquiring the masterpiece no matter how much it cost.\n\nたとえいくらかかろうともその傑作を手に入れると、その大富豪は言い張った。"
  },
  {
    "id": 484,
    "text": "Myths and legends should be handed down from generation to generation.\n\n神話や伝説は代々語り継がれていくべきだ。"
  },
  {
    "id": 485,
    "text": "The linguist is fluent in several Chinese dialects.\n\nその言語学者はいくつかの中国語の方言を流暢に話す。"
  },
  {
    "id": 486,
    "text": "The tribe worships its ancestors and speaks its own language, which is not familiar to us.\n\nその部族は祖先を崇拝し、私たちにはなじみのない独自の言語を話す。"
  },
  {
    "id": 487,
    "text": "The anthropologist says old customs still prevail in the province.\n\nその州ではいまだに古い慣習が根強い、とその文化人類学者は言っている。"
  },
  {
    "id": 488,
    "text": "The wicked witch cast an evil spell on the man and turned him into a bug.\n\n意地の悪い魔女が男にとんでもない魔法をかけて、虫に変えてしまった。"
  },
  {
    "id": 489,
    "text": "They proceeded along the steep path, which was the sole access to the border.\n\nその険しい小道に沿って彼らは前進した。それは国境へたどり着く唯一の方法だった。"
  },
  {
    "id": 490,
    "text": "When a big ape emerged from the cave, they got frightened and ran away.\n\n洞窟から大きな猿が現れると、彼らはびっくりして逃げて行った。"
  },
  {
    "id": 491,
    "text": "\"Believe it or not, I saw an alien and then it vanished!\" \"Give me a break!\"\n\n「信じてくれないかもしれないけど、宇宙人を見たの。で、消えちゃったのよ！」 「冗談はよせよ。」"
  },
  {
    "id": 492,
    "text": "Quite a few people have been invited to celebrate the couple's anniversary.\n\nかなりの数の人々が、その夫婦の結婚記念のお祝いに招待されている。"
  },
  {
    "id": 493,
    "text": "It won't be long before everything is ready. In the meantime, help yourself to some snacks.\n\nもうすぐ準備完了です。その間、軽食をご自由につまんでください。"
  },
  {
    "id": 494,
    "text": "Dressed in a loud and peculiar outfit, she stood out in the crowd.\n\nけばけばしい奇妙な服を着ていた彼女は、人混みの中でもひときわ目立った。"
  },
  {
    "id": 495,
    "text": "All the guests were touched by her hospitality.\n\n招かれた人は皆、彼女のもてなしに心を打たれた。"
  },
  {
    "id": 496,
    "text": "Her shabby clothes were not suitable for the occasion.\n\n彼女のよれよれの服は、その場にはふさわしくなかった。"
  },
  {
    "id": 497,
    "text": "That topic is too intimate to share with casual acquaintances.\n\nたまたま知り合った人たちと話すには、その話題は立ち入り過ぎている。"
  },
  {
    "id": 498,
    "text": "When Tom gets drunk, he gets crude and offensive. Stay away from him.\n\nトムは酔っぱらうと下品になって、人に不快な思いをさせるから、近づいちゃだめだよ。"
  },
  {
    "id": 499,
    "text": "He could hardly comprehend what she was implying.\n\n彼女がほのめかしていることを彼はほとんど理解できなかった。"
  },
  {
    "id": 500,
    "text": "Bob felt embarrassed when he was teased in front of some girls.\n\n女の子の前でからかわれて、ボブは恥ずかしかった。"
  },
  {
    "id": 501,
    "text": "His ambiguous reply made her all the more irritated.\n\n彼の曖昧な返事はなおさら彼女をいらいらさせた。"
  },
  {
    "id": 502,
    "text": "Bob is very timid and blushes when chatting with girls.\n\nボブはとても臆病で女の子とおしゃべりすると赤面してしまう。"
  },
  {
    "id": 503,
    "text": "Nick looks down on anyone who comes from a rural area.\n\nニックは地方出身者なら誰であろうと見下している。"
  },
  {
    "id": 504,
    "text": "\"What's the matter, Bob? You look so miserable.\" \"Leave me alone. It's none of your business.\"\n\n「どうしたの、ボブ？そんなに暗い顔をして。」「ほっといてくれよ。君には関係ないことだ。」"
  },
  {
    "id": 505,
    "text": "Although Bob was in disguise, I recognized him at a glance.\n\nボブは変装していたけれども、一目で彼だとわかった。"
  },
  {
    "id": 506,
    "text": "\"What are you chuckling about?\" \"Bob, you have your sweatshirt on backwards!\" \"Oops!\"\n\n「何をくすくす笑ってるんだ？」「ボブ、トレーナーが後ろ前だよ。」「あっ！」"
  },
  {
    "id": 507,
    "text": "He is not good at making friends and always keeps to himself.\n\n彼は友達作りが苦手で、いつもひとりぼっちでいる。"
  },
  {
    "id": 508,
    "text": "Having found no place he felt he belonged, he was extremely uneasy and lonely.\n\n自分が受け入れられる場所を見つけられず、彼は極度の不安と孤独に陥っていた。"
  },
  {
    "id": 509,
    "text": "I found it pretty hard to adjust to my new surroundings.\n\n新しい環境に順応するのはかなり大変なことだとわかった。"
  },
  {
    "id": 510,
    "text": "I felt utterly out of place among those sophisticated people.\n\nああいう洗練された人たちの中で、自分はまったく場違いな気がした。"
  },
  {
    "id": 511,
    "text": "To tell the truth, I don't like classical music. On the other hand, Molly is really into it.\n\n正直言って、私はクラシック音楽は好きじゃない。かたや、モリーのほうは完全にはまっている。"
  },
  {
    "id": 512,
    "text": "Bob derives pleasure from observing insects.\n\nボブは昆虫の観察に楽しみを感じている。"
  },
  {
    "id": 513,
    "text": "\"How about playing cards or something for a change?\" \"Sorry, I'm not up for it.\"\n\n「気分転換にトランプか何かしない？」「わるいけど、そういう気分じゃないよ。」"
  },
  {
    "id": 514,
    "text": "\"After you.\" \"No please, you go ahead.\" \"Thanks.\" \"You're welcome.\"\n\n「お先にどうぞ。」「いや、あなたの方こそお先にどうぞ。」「すみません。」「どういたしまして。」"
  },
  {
    "id": 515,
    "text": "His niece is sociable and mature for her age. She could pass for twenty-something.\n\n彼の姪は年の割には社交的で大人だ。二十代と言っても通用する。"
  },
  {
    "id": 516,
    "text": "\"Take care of yourself and say hi to your family for me.\" \"I will. See you later.\n\n「じゃあね。家族のみんなによろしく。」「ああ。またね。」"
  },
  {
    "id": 517,
    "text": "I'm looking forward to hearing from you. Sincerely,\n\nお返事頂けるのを楽しみにしております。敬具"
  },
  {
    "id": 518,
    "text": "Can you spare a minute? I'd like to discuss something of importance to both of us.\n\nちょっと時間を割いてくれませんか？二人にとって大事なことを話し合いたいんです。"
  },
  {
    "id": 519,
    "text": "It may seem trivial to you but for me it's worth paying attention to.\n\nあなたには些細なことに思えるかもしれませんが、私にとってそれは注意すべきことなんです。"
  },
  {
    "id": 520,
    "text": "As far as Bob is concerned, anything goes. By contrast, Jane is very cautious.\n\nボブについて言えば、彼はどんなことでも受け入れるタイプだが、対照的にジェーンはとても慎重派だ。"
  },
  {
    "id": 521,
    "text": "After an awkward pause, Bill took her by the hand and dragged her upstairs.\n\n気まずい沈黙の後、ビルは彼女の手を取って上の階に引っ張って行った。"
  },
  {
    "id": 522,
    "text": "Bill just wanted to comfort Monica, but she interpreted it as romantic interest.\n\nビルはただモニカを慰めたかっただけなのに、彼女は彼が自分に気があるのだと解釈した。"
  },
  {
    "id": 523,
    "text": "After making sure she was sound asleep, he crept out of the room and set off.\n\n彼女が熟睡しているのを確かめて、彼はこっそり部屋を抜け出して旅立った。"
  },
  {
    "id": 524,
    "text": "Between you and me, Lisa, I came across Nick passionately embracing a woman.\n\nここだけの話だけど、リサ、女の人を熱く抱擁してるニックを見ちゃったんだ。"
  },
  {
    "id": 525,
    "text": "Such a remark is open to misunderstanding.\n\nそういう発言は誤解を招きやすい。"
  },
  {
    "id": 526,
    "text": "\"I can't stand it anymore!\" \"Calm down. I'll come over as soon as possible.\"\n\n「もう我慢できないっ！」「落ち着けよ。すぐそこに行くから。」"
  },
  {
    "id": 527,
    "text": "Don't take it literally. He is inclined to exaggerate.\n\nそんなこと真に受けちゃだめだよ。彼は大げさに言う傾向があるから。"
  },
  {
    "id": 528,
    "text": "\"You should apologize to Lisa for making fun of her. You went too far this time.\" \"Yeah .. I will, sometime when she's in a better mood.\"\n\n「リサを馬鹿にしたことを謝るべきだわ。今回はやりすぎよ。」「ああ、そうするよ。その内彼女の機嫌が直ったらね。」"
  },
  {
    "id": 529,
    "text": "\"Lisa, are you getting along with Nick?\" \"Once in a while, I think of divorcing him.\" \"You must be kidding!\"\n\n「リサ、ニックとうまくやってる？」「時々、離婚を考えることがあるわ。」「冗談だろ！」"
  },
  {
    "id": 530,
    "text": "In tears, she tore up his letter and threw it away.\n\n彼女は泣きながら、彼からの手紙をめちゃくちゃに引き裂いて捨てた。"
  },
  {
    "id": 531,
    "text": "\"Jennifer deceived me!\" \"You should have known better than to trust her.\"\n\n「ジェニファーにだまされた！」「彼女を信じないくらいの分別があっても良かったのに。」"
  },
  {
    "id": 532,
    "text": "Tom regretted having wasted a great deal of his life.\n\nトムは自分の人生の多くを無駄にしてきたことを後悔した。"
  },
  {
    "id": 533,
    "text": "I cannot look back on my adolescence without feeling depressed.\n\n自分の思春期を振り返ると、いつも憂鬱な気分になる。"
  },
  {
    "id": 534,
    "text": "\"Jennifer left me for another guy.\" \"Oh, you must be upset.\" \"Not really. I'm used to it.\"\n\n「ジェニファーが俺をふって他の男のところにいったよ。」「えっ、それは辛いわね。」「そうでもないよ。慣れてるよ。」"
  },
  {
    "id": 535,
    "text": "\"No wonder she didn't show up to see him off.\" \"How come?\" \"They broke up.\" \"Oh, what a pity!\"\n\n「彼女が見送りに来なかったのも当然だよ。」「どうして？」「二人は別れたんだ。」「えっ、かわいそうに！」"
  },
  {
    "id": 536,
    "text": "\"Living here all by myself is torture!\" he sobbed.\n\n「ここで自分一人だけ生きていくなんて拷問だ」と彼はすすり泣きして言った。"
  },
  {
    "id": 537,
    "text": "\"To be honest, I'm crazy about Ken because he's brave, self-confident, and never afraid of taking risks.\" \"If I were you, I'd ask him out!\"\n\n「正直言うと私、ケンに夢中なの。だって、勇敢で自分に自信を持っていて、それに危険を冒すことを決して恐れないでしょ。」「私ならデートに誘うわ。」"
  },
  {
    "id": 538,
    "text": "\"I've been going with Jennifer on and off for ages.\" \"You're as indecisive as ever. Isn't it about time you settled down?\"\n\n「ずいぶん長い間、ジェニファーとは付き合ったり別れたりの繰り返しだよ。」「相変わらず優柔不断ね。そろそろ落ち着いたらどう？」"
  },
  {
    "id": 539,
    "text": "\"It dawned on me that I had been taken in by Jennifer all along.\" \"How naive! Didn't you see through her?\"\n\n「ジェニファーにずっとだまされていたのが分かってきたよ。」「何てうぶなの。彼女の本性が見抜けなかったの？」"
  },
  {
    "id": 540,
    "text": "Even though she is seeing someone else, I won't give her up.\n\n実際、彼女は誰かと付き合っているけれども、僕は彼女を諦めない。"
  },
  {
    "id": 541,
    "text": "\"Hi, Jane. What's up?\" \"Not much. How about you?\" \"I got married to Jennifer.\" \"Wow! Congratulations!\"\n\n「やあ、ジェーン。最近どう？」「別に。あなたは？」「ジェニファーと結婚したんだ。」「ええっ、おめでとう！」"
  },
  {
    "id": 542,
    "text": "Whenever you're in trouble or feeling down, I'll be there for you.\n\n大変なことがあったり、落ち込んだりしたときはいつでも、私があなたのそばにいるわ。"
  },
  {
    "id": 543,
    "text": "\"Delight\" is the opposite of \"sorrow.\"\n\n「喜び」は「悲しみ」の反対です。"
  },
  {
    "id": 544,
    "text": "\"Jennifer went so far as to call me an idiot and she wouldn't take it back.\" \"Serves you right! You provoked her, didn't you?\"\n\n「ジェニファーは僕をばか呼ばわりまでして、しかもそれを撤回しないんだ。」「自業自得よ！あなたからけしかけたんでしょう？」"
  },
  {
    "id": 545,
    "text": "\"Why do you put up with her arrogance? She's just taking advantage of you.\" \"Shut up!\"\n\n「彼女の傲慢さにどうして我慢しているの？利用されているだけよ。」「うるさい！」"
  },
  {
    "id": 546,
    "text": "Take your time. I know you need a couple of days to reflect on it.\n\n慌てなくていいですよ。そのことをじっくり考えるには、2、3日必要でしょうから。"
  },
  {
    "id": 547,
    "text": "Bob has to get through this ordeal on his own.\n\nボブは自分の力でこの厳しい試練を乗り切らなければいけない。"
  },
  {
    "id": 548,
    "text": "Flies and mosquitoes interfered with his meditation.\n\nハエと蚊が彼の瞑想の邪魔をした。"
  },
  {
    "id": 549,
    "text": "The sacred ritual took place after being postponed twice.\n\n2度の延期の後、その神聖な儀式は執り行われた。"
  },
  {
    "id": 550,
    "text": "All at once, the Buddhist priest burst into laughter, spoiling the solemn atmosphere.\n\nお坊さんが突然大声で笑い出し、厳粛な雰囲気を台無しにした。"
  },
  {
    "id": 551,
    "text": "Cover your mouth when you cough, sneeze, or yawn.\n\n咳、くしゃみ、あくびをするときは口を手で隠しなさい。"
  },
  {
    "id": 552,
    "text": "\"One of her relatives passed away three days ago.\" \"Oh, that's too bad. I'm so sorry.\"\n\n「彼女の親戚が3日前に亡くなったんだ。」「えっ、それは大変ね。お気の毒だわ。」"
  },
  {
    "id": 553,
    "text": "Besides attending the funeral, she needs to make all the arrangements.\n\n彼女は葬儀に参列するだけでなく、すべての段取りをつけなければならない。"
  },
  {
    "id": 554,
    "text": "\"I feel for you, Jane. Grief doesn't fade away quickly.\" \"I'm OK. I'll get over it.\"\n\n「ジェーン、気持ちは分かるよ。悲しみはすぐに消えるものじゃない。」「大丈夫。乗り越えてみせるわ。"
  },
  {
    "id": 555,
    "text": "She cherishes the precious memories of her childhood.\n\n彼女は子供の頃のかけがえのない思い出を大切にしている。"
  },
  {
    "id": 556,
    "text": "\"Speaking of Jennifer, she got engaged to a businessman.\" \"I'm at a loss for words! I hope she won't break it off.\"\n\n「ジェニファーと言えば、彼女、実業家と婚約したんだよ。」「あきれてものが言えないわ。破談にならなきゃいいけどね。」"
  },
  {
    "id": 557,
    "text": "These days, the motives for marriage are not necessarily pure. Take Jennifer for example.\n\n近頃では、結婚の動機は必ずしも純粋とは限らない。例えば、ジェニファーを見てごらんよ。"
  },
  {
    "id": 558,
    "text": "Go easy on Bob. You know, he's been going through a rough period recently.\n\nボブにはやさしく接してあげてくれよ。ほら、彼は最近ずっと辛いこと続きなんだ。"
  },
  {
    "id": 559,
    "text": "\"By the way, do you have the time?\" \"Let's see .. it's a quarter to eight.\"\n\n「ところで、今何時？」「えーっと、8時15分前だよ。」"
  },
  {
    "id": 560,
    "text": "\"Let's call it a day, Bob. I'm starved.\" \"Yep. I'll buy you dinner.\"\n\n「ボブ、今日はこの辺までにしましょう。お腹がぺこぺこ。」「ああ。晩飯は僕がおごるよ。」"
  }
]
  );
}
