module.exports = function(grunt){
var path = require('path');
	'use strict';

	  //参数配置
    //var open = grunt.option('open') || false;
    	var open = true;

	//配置文件
	var cfg = grunt.file.readJSON('config.json'),
	serverConf = cfg.server[cfg.server.selected];

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		pkg : pkg,
		jshint: {
      		files: '/public/*/*',
      		options: {
        		globals: {
          			jQuery: true
        		}
      		}
    	},
		//本机运行一个web server
		         //本机运行一个web server
      //    connect: {
      //        server: {
      //            options: {
      //                port: serverConf.port,
      //                hostname: serverConf.host,
      //                base: serverConf.src,
      //                open: open,
      //                middleware: [
      //     				function myMiddleware(req, res, next) {
      //       			res.end('Hello, world!');
      //     			 }],
      //     			 keepalive: true,
      //                livereload:serverConf.livereload
      //            },
      //            dist: {
      //   			options: {
      //     			open: true,
      //     			base: './app.js',
      //   			}
      // 			}
    		// },
         // },
		// connect: {
  //           options: {
  //               port: 3000,
  //               // change this to '0.0.0.0' to access the server from outside
  //               hostname: 'localhost',
  //               base: '.'
  //           },
        //     livereload: {
        //         options: {
        //             middleware: function (connect, options) {
        //                 return [
        //                     require('connect-livereload')({
								// port:35737
					   //   	}),
        //                     // Serve static files.
        //                     connect.static(options.base),
        //                     // Make empty directories browsable.
        //                     connect.directory(options.base)
        //                 ];
        //             }
        //         }
        //     },
        // },
		//监听文件变动
		// watch:{
		// 	livereload:{
		// 		options:{
		// 			livereload: true	
		// 		},
		// 		files: './public/*/*',					
		// 	},
		// },
		// watch: {  
  //       	allfiles: {  
  //           	files: './public/*/*',  
  //           	tasks: ['console'],  
  //           	options:{  
  //               	livereload: 35737  
  //           	}  
  //       	}  
  //   	}, 
  	express:{
  		dev:{
        server: path.resolve(__dirname, 'app.js'),
        bases: path.resolve(__dirname, 'public','views'),
  		  livereload: true,
        serverreload: true,
  		},
  	},

	watch: {
        options : {
            livereload : 8000,
        },
        express: {
            files: './public/javascripts/*.js',
            tasks: 'express:dev',
            options:{
            	spawn: false,
            	// debounceDelay: 10000 // in milliseconds
            }
        },
    },

    // parallel:{
    // 	dev:{
    // 		options:{
    // 			stream: true
    // 		},
    // 		tasks:[{
    // 			grunt: true,
    // 			args: ['express:dev']
    // 		},{
    // 			grunt: true,
    // 			args: ['watch'],
    // 		}]
    // 	},
    // }


	})

	
	//加载任务
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	// grunt.loadNpmTasks('grunt-parallel');

	//注册任务
	grunt.registerTask('console', 'a little trick',function(){
		console.log('something changed!');
	});

	grunt.registerTask('server', 'create the web server and start the file watching',function(){
		grunt.task.run['express:dev','watch'];
	});	
}