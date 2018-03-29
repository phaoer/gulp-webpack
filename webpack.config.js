const webpack = require('webpack');

module.exports = {
  	entry:  {
  		main:__dirname + "/src/main.js"
  	  },
  	output: {
	    filename: "my.js"
	  },
	module: {
	        rules: [
		            {
		                test: /\.css$/,
		                use: [
		                    {
		                        loader: "style-loader"
		                    }, {
		                        loader: "css-loader"
		                    }
		                ]
		            }
	        ],
	        loaders: [
	      {
	        test: /\.html$/,
	        loader: "html-loader"
	      }
	    ]
    }
}