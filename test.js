function run(argv) {
    const app = Application('Music'); // Music アプリをターゲットにする

    if (!app.running()) {
      console.log('Music is not running');
      return;
    }

    const tracks = app.selection(); // 選択されたトラックを取得

    const length = tracks.length; // 選択されたトラックの数

    if (!length) {
      console.log('no tracks are selected');
      return;
    }

    console.log('Selected track names:');

    tracks.forEach(track => {
      const name = track.name(); // トラック名を取得
      console.log(name); // トラック名を出力
    });

    console.log('done');
  }
