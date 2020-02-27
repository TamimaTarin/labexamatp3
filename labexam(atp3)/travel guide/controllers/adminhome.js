var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var app=express();



router.get('/', function(req, res){
	console.log(req.session.uname);
	userModel.getByUname(req.session.uname, function(result){
		res.render('adminhome/index', {us: result});
	});
});

router.get('/addusers', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('adminhome/addusers');
			}else{
				res.redirect('/adminhome');
			}
		});
});

router.post('/addusers',function(req,res){
	var us={
	
		uname		: req.body.uname,
		contno		: req.body.contno,
		password	: req.body.password,
		type		: req.body.type,
	}
	console.log(us);
	userModel.insert(us,function(status){
		if(status){
			console.log(status);
			req.session.uname = req.body.uname;
			res.redirect('/adminhome');
		}
		else{
			res.redirect('/adminhome/addusers');				
		}
			
	});
});
router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('adminhome/view_users', {uslist: results});
			}else{
				res.redirect('/adminhome');
			}
		});
});
router.get('/information', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('adminhome/information', {placeinfolist: results});
			}else{
				res.redirect('/adminhome');
			}
		});
});

router.get('/delete/:id', function(req, res){
	
	var us = {
			id: req.params.id,
			uname: req.body.uname,
			contno: req.body.ename,
			type: req.body.type,
			
		};

		userModel.delete(us, function(status){
			if(status){
				res.redirect('/adminhome/view_users');
			}else{
				res.redirect('/adminhome/delete/'+req.params.id);
			}
		});
});



module.exports = router;