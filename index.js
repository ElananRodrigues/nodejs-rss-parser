'use strict'

var http = require('http')
var Request = require('request')
var url = require('url')
var RSS = require('rss-parser')
var parser = new RSS()

var port = process.env.PORT || 3000


http.createServer(function(req,res) {
	
	res.setTimeout(25000)
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Accept-Encoding', 'gzip, deflate')

	var parse = url.parse(req.url, true)
	var query = parse.query.q

	try {
		if((typeof query != undefined) && (query != "")){
			parser.parseURL(query, function(err, parsed) {
				if(err){
					res.end(JSON.stringify({ "error": err }))
				}else{
					res.end(JSON.stringify({ "feed": { "entries": [parsed] } }))
				}
			})
		}else{
		  	res.end(JSON.stringify({ "feed": { "entries": [] } }))
		}
	}
	catch(e){
		res.end(JSON.stringify({ 
			'Parser': {
				'Google': 'http://localhost:3000/load?q=https://news.google.com/news/rss/?ned=pt-BR_br&gl=BR&hl=pt-BR',
				'Reddit': 'http://localhost:3000/load?q=https://www.reddit.com/.rss',
				'msn': 'http://localhost:3000/load?q=https://rss.msn.com/pt-br/',
				'Yahoo': 'http://localhost:3000/load?q=http://rss.news.yahoo.com/rss/entertainment'
			}
			
		}))
	}

}).listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000 or http://localhost:3000')
})

