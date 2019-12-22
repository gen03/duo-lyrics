require 'erb'
require 'json'

task :default => :build

task :build do
  sentences = File.readlines('sentences.txt').map do |line|
    match = /\A(\d+)\.\s+(.*)\z/.match(line.chomp)
    { id: match[1].to_i, text: match[2].sub(/\t/, "\n\n") }
  end

  content = ERB.new(File.read('set-lyrics.js.erb')).result(binding)

  File.write('set-lyrics.js', content)
end
