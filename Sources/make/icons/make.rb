require 'base64'

class To64Html
  def initialize(path)
    @path = path
  end
  def self.img64(path)
    File.open(path, 'rb') do |img|
      'data:image/png;base64,' + Base64.strict_encode64(img.read)
    end
  end
  def html(name='based64.html')
    File.open(@path, 'r') do |h|
      html = h.read.gsub(/src="(.*\.png)"/) do |g|
        "src='#{To64Html::img64($1)}'"
      end
      
      IO.write(name, html)
      
      p 'done'
    end
  end  
end

begin
	dir = Dir.pwd
	Dir.chdir("../../src/icons")
	flags = Dir["*.png"]
	names = []
	
	Dir.chdir(dir)
	file  = File.open("IconPack.js", "w+");

	for flag in flags
		names.push(flag.split(".")[0])
	end
	
	file.write("export default {\n")
	for name in names
		b64 = To64Html::img64("../../src/icons/#{name}.png")
		file.write("\t#{name}: {uri: \"#{b64}\"},\n")
	end

	file.write("}")
	file.close
	puts "Icons module created successfully."
	gets.chomp
rescue
	puts $!
	gets.chomp
end