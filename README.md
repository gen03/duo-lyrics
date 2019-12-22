# duo-lyrics

## これは何?

分割した[DUO 3.0 CD/復習用](https://www.amazon.co.jp/dp/4900790079)の音声トラックに例文を歌詞として設定します。

## 動作環境

  - macOSのiTunes

## 使い方

1. [duo\_splitter](https://github.com/healthypackrat/duo_splitter)か[duo-3.0-splitter](https://github.com/healthypackrat/duo-3.0-splitter)を使ってiTunesに分割した音声を追加してください
2. iTunesを起動して追加したトラックをすべて選択してください
3. ターミナルを起動して以下のコマンドを実行してください
```
$ osascript -l JavaScript set-lyrics.js
```

## TODO

  - 日本語訳の追加
