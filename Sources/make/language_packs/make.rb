require 'zlib';
name = "admin";

begin
    raw_data = File.open("../../src/i18n/ES_MX/"+name+".json", "rb").read();

    File.open(name+".mlp", "wb"){|wf|
        Marshal.dump(Zlib::Deflate.deflate(raw_data), wf);
    }

    puts "Language pack created successfully."
    gets.chomp;
rescue
	puts $!
	gets.chomp
end