# 実行方法:
# 1. このコードが記載されたRakefileと、'sentences.txt' (文を含むファイル) と 'set-lyrics.js.erb' (テンプレートファイル) を同じディレクトリに配置します。
# 2. ターミナルで `rake` コマンドを実行します。
# 3. `set-lyrics.js` に生成されたJavaScriptファイルが出力されます。

require 'erb'  # ERBテンプレートエンジンを読み込む
require 'json' # (使用されていないが) JSONライブラリを読み込む

# デフォルトのタスクとして :build を設定
task :default => :build

# :build タスクの定義
task :build do
  # 'sentences.txt' ファイルを読み込み、各行を処理
  sentences = File.readlines('sentences.txt').map do |line|
    # 正規表現を使って各行の文のIDと内容を抽出
    # 行は "1. 文" のような形式を想定
    match = /\A(\d+)\.\s+(.*)\z/.match(line.chomp)
    # IDを数値に変換し、文中のタブ文字（\t）を改行に置換してハッシュを作成
    { id: match[1].to_i, text: match[2].sub(/\t/, "\n\n") }
  end

  # 'set-lyrics.js.erb' テンプレートファイルを読み込み、現在のスコープの変数を埋め込んで結果を生成
  content = ERB.new(File.read('set-lyrics.js.erb')).result(binding)

  # 生成された内容を 'set-lyrics.js' というファイルに書き出す
  File.write('set-lyrics.js', content)
end
