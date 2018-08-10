/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _expressSession = __webpack_require__(/*! express-session */ \"express-session\");\n\nvar _expressSession2 = _interopRequireDefault(_expressSession);\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _formidable = __webpack_require__(/*! formidable */ \"formidable\");\n\nvar _formidable2 = _interopRequireDefault(_formidable);\n\nvar _ejsMate = __webpack_require__(/*! ejs-mate */ \"ejs-mate\");\n\nvar _ejsMate2 = _interopRequireDefault(_ejsMate);\n\nvar _nodeSassMiddleware = __webpack_require__(/*! node-sass-middleware */ \"node-sass-middleware\");\n\nvar _nodeSassMiddleware2 = _interopRequireDefault(_nodeSassMiddleware);\n\nvar _router = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n\nvar _router2 = _interopRequireDefault(_router);\n\nvar _models = __webpack_require__(/*! ./models */ \"./src/models/index.js\");\n\nvar _models2 = _interopRequireDefault(_models);\n\nvar _passport3 = __webpack_require__(/*! ./config/passport */ \"./src/config/passport.js\");\n\nvar _passport4 = _interopRequireDefault(_passport3);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = (0, _express2.default)();\n\n__webpack_require__(/*! babel-register */ \"babel-register\")({ presets: ['env'] });\n\napp.use((0, _expressSession2.default)({\n    secret: 'keyboard cat',\n    resave: true,\n    saveUninitialized: true\n}));\napp.use(_passport2.default.initialize());\napp.use(_passport2.default.session());\napp.use(_express2.default.static('./dist'));\n\n// express-formidable is really trash so this is the fix\napp.use(function (req, res, next) {\n    var form = new _formidable2.default.IncomingForm({\n        maxFileSize: 10 * 1024 * 1024\n    });\n    form.once('error', console.log); // TODO: do better\n    form.parse(req, function (err, fields, files) {\n        Object.assign(req, { fields: fields, files: files });\n\n        // formidable -> body parser\n        req.body = req.fields;\n        next();\n    });\n});\n\napp.engine('ejs', _ejsMate2.default);\napp.set('view engine', 'ejs');\napp.set('views', 'src/client/views');\n\n(0, _passport4.default)(_passport2.default, _models2.default.User);\n\napp.use((0, _nodeSassMiddleware2.default)({\n    src: 'src/client/assets',\n    dest: 'dist/assets',\n    indentedSyntax: true,\n    debug: true\n}));\napp.use(_express2.default.static('dist/assets'));\napp.use('/', _router2.default);\n\napp.listen(8000, function () {\n    console.log('listening on 8000');\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/config/passport.js":
/*!********************************!*\
  !*** ./src/config/passport.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n\nvar _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);\n\nvar _passportLocal = __webpack_require__(/*! passport-local */ \"passport-local\");\n\nvar _mail = __webpack_require__(/*! @sendgrid/mail */ \"@sendgrid/mail\");\n\nvar _mail2 = _interopRequireDefault(_mail);\n\nvar _verify = __webpack_require__(/*! ../emails/verify */ \"./src/emails/verify.js\");\n\nvar _verify2 = _interopRequireDefault(_verify);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (passport, User) {\n\n    if (process.env.SENDGRID_APIKEY) {\n        _mail2.default.setApiKey(process.env.SENDGRID_APIKEY);\n    } else {\n        console.error('ERROR: Must define SENDGRID_APIKEY');\n        return;\n    }\n\n    passport.serializeUser(function (user, done) {\n        done(null, user.id);\n    });\n\n    passport.deserializeUser(function (id, done) {\n        User.findOne({\n            where: { id: id }\n        }).then(function (user) {\n            if (user) {\n                done(null, user.get());\n            } else {\n                done(user.errors, null);\n            }\n        });\n    });\n\n    var genUUID = function genUUID() {\n        var chars = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890';\n        var result = '';\n        for (var i = 0; i < 10; i++) {\n            result = result + chars[Math.floor(Math.random() * 26)];\n        }\n        return result;\n    };\n\n    var generateHash = function generateHash(pass) {\n        return _bcryptNodejs2.default.hashSync(pass, _bcryptNodejs2.default.genSaltSync(8), null);\n    };\n\n    passport.use('local-signup', new _passportLocal.Strategy({\n        usernameField: 'email',\n        passwordField: 'password',\n        passReqToCallback: true\n    }, function (req, email, password, done) {\n        User.findOne({\n            where: { email: email }\n        }).then(function (user) {\n            if (user) {\n                return done(null, false, {\n                    message: 'That email is already taken'\n                });\n            }\n\n            var pass = generateHash(password);\n            var verifyCode = genUUID();\n            var data = {\n                email: email,\n                password: pass,\n                firstname: req.body.firstname,\n                lastname: req.body.lastname,\n                emailCode: verifyCode,\n                emailValidated: false,\n                role: 'hacker'\n            };\n\n            _mail2.default.send({\n                to: email,\n                from: 'team@calhacks.io',\n                subject: 'Verify your email with Cal Hacks',\n                html: (0, _verify2.default)(req.body.firstname + ' ' + req.body.lastname, verifyCode)\n            });\n\n            User.create(data).then(function (newUser, created) {\n                if (!newUser) {\n                    return done(null, false);\n                } else {\n                    return done(null, newUser);\n                }\n            }).catch(function (err) {\n                return console.log(err);\n            });\n        });\n    }));\n\n    passport.use('local-signin', new _passportLocal.Strategy({\n        usernameField: 'email',\n        passwordField: 'password',\n        passReqToCallback: true\n    }, function (req, email, password, done) {\n        var isValidPassword = function isValidPassword(userPass, pass) {\n            return _bcryptNodejs2.default.compareSync(pass, userPass);\n        };\n\n        User.findOne({\n            where: { email: email }\n        }).then(function (user) {\n            if (!user || !isValidPassword(user.password, password)) {\n                return done(null, false, {\n                    message: 'Incorrect username/password'\n                });\n            }\n            var userInfo = user.get();\n            return done(null, userInfo);\n        }).catch(function (err) {\n            console.log('Something went wrong:');\n            console.log(err);\n\n            done(null, false, {\n                message: 'Something went wrong'\n            });\n        });\n    }));\n};\n\n//# sourceURL=webpack:///./src/config/passport.js?");

/***/ }),

/***/ "./src/config/sequelize.js":
/*!*********************************!*\
  !*** ./src/config/sequelize.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = {\n    development: {\n        username: process.env.DB_USER,\n        password: process.env.DB_PASSWD,\n        database: process.env.DB_NAME,\n        host: process.env.DB_HOST,\n        dialect: 'mysql'\n    }\n};\n\n//# sourceURL=webpack:///./src/config/sequelize.js?");

/***/ }),

/***/ "./src/controllers/application.js":
/*!****************************************!*\
  !*** ./src/controllers/application.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _fsExtra2 = _interopRequireDefault(_fsExtra);\n\nvar _models = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = {\n    submitApp: function submitApp(req, res, next) {\n        // TODO: Add field validation\n\n        var saveFile = function saveFile() {\n            var resume = req.files.resume;\n            if (resume.size !== 0) {\n                var lst = resume.name.split('.');\n                var newFilename = void 0;\n                if (lst.length > 1) {\n                    newFilename = req.user.id + '.' + lst[lst.length - 1];\n                } else {\n                    newFilename = '' + req.user.id;\n                }\n\n                var oldPath = resume.path;\n                var newPath = '/tmp/calhacks/portal/resumes/' + newFilename;\n                return _fsExtra2.default.move(oldPath, newPath, { overwrite: true });\n            }\n            return Promise.resolve();\n        };\n\n        _models.User.findOne({\n            where: { id: req.user.id },\n            include: { model: _models.Application }\n        }).then(function (user) {\n            if (user.Application === null) {\n                _models.Application.create(_extends({}, req.body, {\n                    UserId: req.user.id\n                })).then(function (newApp) {\n                    // App has been created.\n                    saveFile().then(function () {\n                        console.log('File moved successfully!');\n                        res.redirect('/dashboard');\n                    }).catch(function (err) {\n                        console.log(err);\n                        res.redirect('/dashboard');\n                    });\n                });\n            } else {\n                user.Application.updateAttributes(req.body).then(function (newApp) {\n                    // App has been saved.\n                    saveFile().then(function () {\n                        console.log('File moved successfully!');\n                        res.redirect('/dashboard');\n                    }).catch(function (err) {\n                        console.log(err);\n                        res.redirect('/dashboard');\n                    });\n                });\n            }\n        });\n    },\n\n    appPage: function appPage(req, res) {\n        _models.User.findOne({\n            where: { id: req.user.id },\n            include: [{ model: _models.Application }]\n        }).then(function (user) {\n            res.render('application', { user: user.toJSON() });\n        });\n    }\n};\n\n//# sourceURL=webpack:///./src/controllers/application.js?");

/***/ }),

/***/ "./src/controllers/auth.js":
/*!*********************************!*\
  !*** ./src/controllers/auth.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _index = __webpack_require__(/*! ../models/index */ \"./src/models/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = {\n\n    signIn: function signIn(req, res, next) {\n        return res.render('login');\n    },\n\n    signUp: function signUp(req, res, next) {\n        return res.render('signup');\n    },\n\n    logout: function logout(req, res, next) {\n        return req.session.destroy(function (err) {\n            res.redirect('/');\n        });\n    },\n\n    submitLogin: function submitLogin(req, res, next) {\n        _passport2.default.authenticate('local-signin', function (err, user, info) {\n            if (err !== null) {\n                // Something went wrong.\n                return next(err);\n            } else if (!user) {\n                return res.redirect('/login');\n            } else {\n                req.logIn(user, function (err) {\n                    if (err) {\n                        return next(err);\n                    } else {\n                        return res.redirect('/dashboard');\n                    }\n                });\n            }\n        })(req, res, next);\n    },\n\n    submitSignup: function submitSignup(req, res, next) {\n        _passport2.default.authenticate('local-signup', function (err, user, info) {\n            if (err !== null) {\n                // Something went wrong.\n                return next(err);\n            } else if (!user) {\n                return res.redirect('/login');\n            } else {\n                req.logIn(user, function (err) {\n                    if (err) {\n                        return next(err);\n                    } else {\n                        return res.redirect('/dashboard');\n                    }\n                });\n            }\n        })(req, res, next);\n    },\n\n    validate: function validate(req, res, next) {\n        _index.User.update({\n            emailValidated: true\n        }, {\n            where: { emailCode: req.query.code }\n        }).then(function (result) {\n            console.log(result);\n            if (result[0] == 0) {\n                res.render('verify', { success: false });\n            } else {\n                res.render('verify', { success: true });\n            }\n        });\n    },\n\n    informVerify: function informVerify(req, res, next) {\n        return res.render('informVerify');\n    }\n};\n\n//# sourceURL=webpack:///./src/controllers/auth.js?");

/***/ }),

/***/ "./src/controllers/dashboard.js":
/*!**************************************!*\
  !*** ./src/controllers/dashboard.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _models = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n\nexports.default = {\n    dashboard: function dashboard(req, res, next) {\n        _models.User.findOne({\n            where: { id: req.user.id },\n            include: [{ model: _models.Application }, { model: _models.Team }]\n        }).then(function (user) {\n            res.render('dashboard', { user: user.toJSON() });\n        });\n    }\n};\n\n//# sourceURL=webpack:///./src/controllers/dashboard.js?");

/***/ }),

/***/ "./src/controllers/home.js":
/*!*********************************!*\
  !*** ./src/controllers/home.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = {\n    home: function home(req, res, next) {\n        res.render('home');\n    }\n};\n\n//# sourceURL=webpack:///./src/controllers/home.js?");

/***/ }),

/***/ "./src/controllers/team.js":
/*!*********************************!*\
  !*** ./src/controllers/team.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _models = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n\nexports.default = {\n    submitTeam: function submitTeam(req, res, next) {\n        // Either the user wants to create a new team,\n        // or they want to join an existing one. We have\n        // to check for both\n\n        _models.Team.findOne({\n            where: {\n                name: req.body.name\n            },\n            include: {\n                model: _models.User\n            }\n        }).then(function (team) {\n            if (team === null) {\n                // No team found\n                _models.Team.create({\n                    name: req.body.name\n                }).then(function (newTeam) {\n                    newTeam.addUser(req.user.id).then(function (result) {\n                        res.redirect('/dashboard');\n                    });\n                });\n            } else {\n                // We gotta add to the team\n\n            }\n        });\n    },\n\n    teamPage: function teamPage(req, res) {\n        _models.User.findOne({\n            where: { id: req.user.id },\n            include: [{ model: _models.Team }]\n        }).then(function (user) {\n            // res.render('team', { user: user.toJSON() })\n            if (user.Team) {\n                // user has a team\n                _models.Team.findOne({\n                    where: { id: user.Team.id },\n                    include: { model: _models.User }\n                }).then(function (team) {\n                    res.render('team', {\n                        user: _extends({}, user.toJSON(), {\n                            Team: team\n                        })\n                    });\n                });\n            }\n        });\n    }\n};\n\n//# sourceURL=webpack:///./src/controllers/team.js?");

/***/ }),

/***/ "./src/emails/verify.js":
/*!******************************!*\
  !*** ./src/emails/verify.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = function (name, code) {\n    return \"\\n<p>\\nDear \" + name + \",\\n<br/>\\n<br/>\\n<strong>Thanks so much for making an account with us!</strong><br/>\\nTo make sure it's you, please verify your email at this link:\\n<a href=\\\"https://portal.calhacks.io/verify?code=\" + code + \"\\\">\\n    https://portal.calhacks.io/verify?code=\" + code + \"\\n</a><br/>\\nIf you didn't make an account on the Cal Hacks portal, please ignore this email!\\n</p>\\n\";\n};\n\n//# sourceURL=webpack:///./src/emails/verify.js?");

/***/ }),

/***/ "./src/models/application.js":
/*!***********************************!*\
  !*** ./src/models/application.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = function (sequelize, DataTypes) {\n    var Application = sequelize.define('Application', {\n        school: {\n            type: DataTypes.STRING,\n            validate: {\n                notEmpty: true\n            }\n        },\n        year: {\n            type: DataTypes.STRING,\n            validate: {\n                notEmpty: true\n            }\n        },\n        dob: {\n            type: DataTypes.DATE,\n            defaultValue: sequelize.NOW,\n            validate: {\n                isDate: true,\n                notEmpty: true\n            }\n        },\n        reimbursement: {\n            type: DataTypes.BOOLEAN,\n            allowNull: false,\n            validate: {\n                notEmpty: true\n            }\n        },\n        diet: {\n            type: DataTypes.STRING,\n            allowNull: true\n        },\n        linkedin: {\n            type: DataTypes.STRING,\n            allowNull: true,\n            validate: {\n                isUrl: true\n            }\n        },\n        github: {\n            type: DataTypes.STRING,\n            allowNull: true,\n            validate: {\n                isUrl: true\n            }\n        },\n        devpost: { // ??\n            type: DataTypes.STRING,\n            notEmpty: true,\n            validate: {\n                isUrl: true\n            }\n        },\n        question1: {\n            type: DataTypes.STRING,\n            validate: {\n                notEmpty: true\n            }\n        },\n        question2: {\n            type: DataTypes.STRING,\n            validate: {\n                notEmpty: true\n            }\n        },\n        question3: {\n            type: DataTypes.STRING,\n            validate: {\n                notEmpty: true\n            }\n        }\n    }, {});\n\n    Application.associate = function (models) {\n        models.Application.belongsTo(models.User);\n    };\n    return Application;\n};\n\n//# sourceURL=webpack:///./src/models/application.js?");

/***/ }),

/***/ "./src/models/index.js":
/*!*****************************!*\
  !*** ./src/models/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\nvar config = __webpack_require__(/*! ../config/sequelize */ \"./src/config/sequelize.js\").default[\"development\" || 'development'];\n\nvar models = {};\n\n(function (config) {\n    if (Object.keys(models).length && !force) {\n        return models;\n    }\n\n    var sequelize = new Sequelize(config.database, config.username, config.password, config);\n\n    var modules = [__webpack_require__(/*! ./user */ \"./src/models/user.js\"), __webpack_require__(/*! ./application */ \"./src/models/application.js\"), __webpack_require__(/*! ./team */ \"./src/models/team.js\")];\n\n    modules.forEach(function (module) {\n        var model = module.default(sequelize, Sequelize, config);\n        models[model.name] = model;\n    });\n\n    Object.keys(models).forEach(function (key) {\n        if ('associate' in models[key]) {\n            models[key].associate(models);\n        }\n    });\n\n    models.sequelize = sequelize;\n    models.Sequelize = Sequelize;\n\n    sequelize.sync();\n\n    return models;\n})(config);\n\nmodule.exports = models;\n\n//# sourceURL=webpack:///./src/models/index.js?");

/***/ }),

/***/ "./src/models/team.js":
/*!****************************!*\
  !*** ./src/models/team.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = function (sequelize, DataTypes) {\n    var Team = sequelize.define('Team', {\n        name: {\n            type: DataTypes.STRING,\n            validate: {\n                notEmpty: true\n            },\n            allowNull: false\n        }\n    });\n\n    Team.associate = function (models) {\n        models.Team.hasMany(models.User);\n    };\n\n    return Team;\n};\n\n//# sourceURL=webpack:///./src/models/team.js?");

/***/ }),

/***/ "./src/models/user.js":
/*!****************************!*\
  !*** ./src/models/user.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = function (sequelize, DataTypes) {\n    var User = sequelize.define('User', {\n        firstname: {\n            type: DataTypes.STRING,\n            notEmpty: true\n        },\n        lastname: {\n            type: DataTypes.STRING,\n            notEmpty: true\n        },\n        email: {\n            type: DataTypes.STRING,\n            notEmpty: true,\n            validate: {\n                isEmail: true\n            }\n        },\n        password: {\n            type: DataTypes.STRING,\n            allowNull: false\n        },\n        emailCode: {\n            type: DataTypes.STRING,\n            notEmpty: true,\n            unique: true\n        },\n        emailValidated: {\n            type: DataTypes.BOOLEAN\n        },\n        role: {\n            type: DataTypes.ENUM('hacker', 'admin'),\n            notEmpty: true\n        }\n    }, {});\n\n    User.associate = function (models) {\n        models.User.hasOne(models.Application);\n        models.User.belongsTo(models.Team);\n    };\n    return User;\n};\n\n//# sourceURL=webpack:///./src/models/user.js?");

/***/ }),

/***/ "./src/policies/auth.js":
/*!******************************!*\
  !*** ./src/policies/auth.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.emailVerify = exports.authenticateUser = undefined;\n\nvar _index = __webpack_require__(/*! ../models/index */ \"./src/models/index.js\");\n\n// As a general rule, don't update req.page or req.pageData in the policies.\n// They may get overwritten in middleware further downstream.\n\n// Makes sure people are authenticated. We also want to\n// specify particular roles later on, so make this\n// extensible...\nvar authenticateUser = exports.authenticateUser = function authenticateUser(roles) {\n    return function (req, res, next) {\n        if (req.user === undefined || !roles.includes(req.user.role)) {\n            res.redirect('/login');\n        } else {\n            next();\n        }\n    };\n};\n\n// Send info about whether user's email is verified yet.\nvar emailVerify = exports.emailVerify = function emailVerify(req, res, next) {\n    if (req.user.emailValidated) {\n        next();\n    } else {\n        res.redirect('/inform_verify');\n    }\n};\n\n//# sourceURL=webpack:///./src/policies/auth.js?");

/***/ }),

/***/ "./src/policies/index.js":
/*!*******************************!*\
  !*** ./src/policies/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _auth = __webpack_require__(/*! ./auth */ \"./src/policies/auth.js\");\n\nexports.default = {\n    // Dashboard security\n    '/dashboard': {\n        get: [(0, _auth.authenticateUser)(['hacker', 'admin']), _auth.emailVerify],\n        post: [(0, _auth.authenticateUser)(['hacker', 'admin']), _auth.emailVerify]\n    },\n\n    // Can't submit app without credentials\n    '/application': {\n        get: [(0, _auth.authenticateUser)(['hacker', 'admin']), _auth.emailVerify],\n        post: [(0, _auth.authenticateUser)(['hacker', 'admin']), _auth.emailVerify]\n    },\n\n    // Can't create/join team without credentials\n    '/team': {\n        get: [(0, _auth.authenticateUser)(['hacker', 'admin']), _auth.emailVerify],\n        post: [(0, _auth.authenticateUser)(['hacker', 'admin']), _auth.emailVerify]\n    }\n};\n\n//# sourceURL=webpack:///./src/policies/index.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _chainMiddleware = __webpack_require__(/*! chain-middleware */ \"chain-middleware\");\n\nvar _chainMiddleware2 = _interopRequireDefault(_chainMiddleware);\n\nvar _routes = __webpack_require__(/*! ./routes */ \"./src/router/routes.js\");\n\nvar _routes2 = _interopRequireDefault(_routes);\n\nvar _policies = __webpack_require__(/*! ../policies */ \"./src/policies/index.js\");\n\nvar _policies2 = _interopRequireDefault(_policies);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n// import App from '../client/App';\n\nexports.default = [\n// Router\nfunction (req, res, next) {\n    // Get URL of request\n    var path = req.path;\n    var method = req.method.toLowerCase();\n\n    // Does a route match? If not 404\n    var target = _routes2.default[path];\n    if (!target) {\n        return res.status(404).send('page not found');\n    }\n\n    // Does method match? If not 404\n    var action = target[method];\n    if (!action) {\n        return res.status(404).send('cannot ' + method + ' ' + req.path);\n    }\n\n    // Go through policies if they are defined on this route + method\n    if (_policies2.default[path] && _policies2.default[path][method]) {\n        var funcs = void 0;\n        if (_typeof(_policies2.default[path][method]) === 'object') {\n            // Iterate through list of middleware\n            funcs = _policies2.default[path][method].concat([_routes2.default[path][method]]);\n        } else {\n            funcs = [_policies2.default[path][method], _routes2.default[path][method]];\n        }\n\n        _chainMiddleware2.default.apply(undefined, _toConsumableArray(funcs))(req, res, next);\n    } else {\n        _routes2.default[path][method](req, res, next);\n    }\n}];\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/router/routes.js":
/*!******************************!*\
  !*** ./src/router/routes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _home = __webpack_require__(/*! ../controllers/home */ \"./src/controllers/home.js\");\n\nvar _home2 = _interopRequireDefault(_home);\n\nvar _auth = __webpack_require__(/*! ../controllers/auth */ \"./src/controllers/auth.js\");\n\nvar _auth2 = _interopRequireDefault(_auth);\n\nvar _dashboard = __webpack_require__(/*! ../controllers/dashboard */ \"./src/controllers/dashboard.js\");\n\nvar _dashboard2 = _interopRequireDefault(_dashboard);\n\nvar _application = __webpack_require__(/*! ../controllers/application */ \"./src/controllers/application.js\");\n\nvar _application2 = _interopRequireDefault(_application);\n\nvar _team = __webpack_require__(/*! ../controllers/team */ \"./src/controllers/team.js\");\n\nvar _team2 = _interopRequireDefault(_team);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = {\n    // Home route\n    '/': {\n        get: _home2.default.home\n    },\n\n    // Auth routes\n    '/login': {\n        get: _auth2.default.signIn,\n        post: _auth2.default.submitLogin\n    },\n    '/signup': {\n        get: _auth2.default.signUp,\n        post: _auth2.default.submitSignup\n    },\n    '/logout': {\n        get: _auth2.default.logout\n    },\n    '/verify': {\n        get: _auth2.default.validate\n    },\n    '/inform_verify': {\n        get: _auth2.default.informVerify\n    },\n\n    // Dashboard\n    '/dashboard': {\n        get: _dashboard2.default.dashboard\n    },\n\n    // Submitting an app\n    '/application': {\n        get: _application2.default.appPage,\n        post: _application2.default.submitApp\n    },\n\n    // Submitting a team\n    '/team': {\n        get: _team2.default.teamPage,\n        post: _team2.default.submitTeam\n    }\n};\n\n//# sourceURL=webpack:///./src/router/routes.js?");

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./src/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/aniruddh/calhacks/portal/src/app.js */\"./src/app.js\");\n\n\n//# sourceURL=webpack:///multi_./src/app.js?");

/***/ }),

/***/ "@sendgrid/mail":
/*!*********************************!*\
  !*** external "@sendgrid/mail" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@sendgrid/mail\");\n\n//# sourceURL=webpack:///external_%22@sendgrid/mail%22?");

/***/ }),

/***/ "babel-register":
/*!*********************************!*\
  !*** external "babel-register" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-register\");\n\n//# sourceURL=webpack:///external_%22babel-register%22?");

/***/ }),

/***/ "bcrypt-nodejs":
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt-nodejs\");\n\n//# sourceURL=webpack:///external_%22bcrypt-nodejs%22?");

/***/ }),

/***/ "chain-middleware":
/*!***********************************!*\
  !*** external "chain-middleware" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chain-middleware\");\n\n//# sourceURL=webpack:///external_%22chain-middleware%22?");

/***/ }),

/***/ "ejs-mate":
/*!***************************!*\
  !*** external "ejs-mate" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ejs-mate\");\n\n//# sourceURL=webpack:///external_%22ejs-mate%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"formidable\");\n\n//# sourceURL=webpack:///external_%22formidable%22?");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs-extra\");\n\n//# sourceURL=webpack:///external_%22fs-extra%22?");

/***/ }),

/***/ "node-sass-middleware":
/*!***************************************!*\
  !*** external "node-sass-middleware" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-sass-middleware\");\n\n//# sourceURL=webpack:///external_%22node-sass-middleware%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sequelize\");\n\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ })

/******/ });