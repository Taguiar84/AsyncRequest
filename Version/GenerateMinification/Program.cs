using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yahoo.Yui.Compressor;

namespace generateMinification
{
    class Program
    {
        static void Main(string[] args)
        {
            foreach (var arg in args)
                Console.WriteLine(arg);

            List<string> cssFiles = new List<string>();
            List<string> jsFiles = new List<string>();

            foreach (var file in args)
            {
                if (file.EndsWith(".css"))
                    cssFiles.Add(file);
                else if (file.EndsWith(".js"))
                    jsFiles.Add(file);
            }

            var cssCompressor = new CssCompressor();
            var jsCompressor = new JavaScriptCompressor();

            foreach(var jsFile in jsFiles){
                var compress = jsCompressor.Compress(File.ReadAllText(jsFile));
                var newPath = jsFile.Replace(".js", "") + ".min.js";
                using (StreamWriter swr = new StreamWriter(newPath,false))
                {
                    swr.Write(compress);
                    swr.Close();
                }
            }

            foreach (var cssFile in cssFiles)
            {
                var compress = cssCompressor.Compress(File.ReadAllText(cssFile));
                var newPath = cssFile.Replace(".css", "") + ".min.css";
                using (StreamWriter swr = new StreamWriter(newPath, false))
                {
                    swr.Write(compress);
                    swr.Close();
                }
            }
        }
    }
}
