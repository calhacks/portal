!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){"use strict";n(20).config();var r=n(3),a={};!function(e){if(Object.keys(a).length&&!force)return a;var t=new r(e.database,e.username,e.password,e);[n(22),n(23),n(24)].forEach(function(n){var o=n.default(t,r,e);a[o.name]=o}),Object.keys(a).forEach(function(e){"associate"in a[e]&&a[e].associate(a)}),a.sequelize=t,a.Sequelize=r,t.sync()}(n(21).default.production),e.exports=a},function(e,t){e.exports=require("passport")},function(e,t){e.exports=require("@sendgrid/mail")},function(e,t){e.exports=require("sequelize")},function(e,t){e.exports=require("bcrypt-nodejs")},function(e,t,n){e.exports=n(6)},function(e,t,n){"use strict";var r=p(n(7)),a=(p(n(8)),p(n(9))),o=p(n(1)),s=p(n(10)),i=p(n(11)),u=(p(n(12)),p(n(13))),l=p(n(14)),c=p(n(15)),d=p(n(0)),f=p(n(33));function p(e){return e&&e.__esModule?e:{default:e}}var m=(0,r.default)();n(36)({presets:["env"]}),m.use((0,a.default)({secret:"keyboard cat",resave:!0,saveUninitialized:!0})),m.use((0,u.default)({locals:"flash"})),m.use(o.default.initialize()),m.use(o.default.session()),m.use(r.default.static("./dist")),m.use(function(e,t,n){var r=new s.default.IncomingForm({maxFileSize:10485760});r.once("error",console.log),r.parse(e,function(t,r,a){Object.assign(e,{fields:r,files:a}),e.body=e.fields,n()})}),m.engine("ejs",i.default),m.set("view engine","ejs"),m.set("views","src/client/views"),(0,f.default)(o.default,d.default.User),n(37),m.use(r.default.static("dist/assets")),m.use("/",c.default),l.default.unlink("/srv/apps/hackthebay/hackthebay.sock",function(){console.log("cleared old socket"),m.listen("/srv/apps/hackthebay/hackthebay.sock",function(){console.log("listening on unix socket"),l.default.chmodSync("/srv/apps/hackthebay/hackthebay.sock","777"),console.log("set permissions of socket to 777")})})},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("formidable")},function(e,t){e.exports=require("ejs-mate")},function(e,t){e.exports=require("node-sass-middleware")},function(e,t){e.exports=require("req-flash")},function(e,t){e.exports=require("fs")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=i(n(16)),o=i(n(17)),s=i(n(31));function i(e){return e&&e.__esModule?e:{default:e}}t.default=[function(e,t,n){var i=e.path,u=e.method.toLowerCase(),l=o.default[i];if(!l)return t.status(404).send("page not found");if(!l[u])return t.status(404).send("cannot "+u+" "+e.path);if(s.default[i]&&s.default[i][u]){var c=void 0;c="object"===r(s.default[i][u])?s.default[i][u].concat([o.default[i][u]]):[s.default[i][u],o.default[i][u]],a.default.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(c))(e,t,n)}else o.default[i][u](e,t,n)}]},function(e,t){e.exports=require("chain-middleware")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(18)),a=l(n(19)),o=l(n(26)),s=l(n(27)),i=l(n(29)),u=l(n(30));function l(e){return e&&e.__esModule?e:{default:e}}t.default={"/":{get:r.default.home},"/login":{get:a.default.signIn,post:a.default.submitLogin},"/signup":{get:a.default.signUp,post:a.default.submitSignup},"/logout":{get:a.default.logout},"/verify":{get:a.default.validate},"/inform_verify":{get:a.default.informVerify},"/reset_password":{get:a.default.resetPassword,post:a.default.submitReset},"/reset":{get:a.default.changePassword,post:a.default.submitPassword},"/newPassword":{get:a.default.newPassword},"/dashboard":{get:o.default.dashboard},"/application":{get:s.default.appPage,post:s.default.submitApp},"/cubstart":{get:u.default.cubstart,post:u.default.submitApp},"/team":{post:i.default.submitTeam},"/leaveTeam":{post:i.default.leaveTeam}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={home:function(e,t,n){t.render("index")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(1)),a=u(n(2)),o=n(0),s=u(n(25)),i=u(n(4));function u(e){return e&&e.__esModule?e:{default:e}}var l=n(3);t.default={signIn:function(e,t,n){return t.render("login")},signUp:function(e,t,n){return t.render("signup")},logout:function(e,t,n){return e.session.destroy(function(e){t.redirect("/")})},submitLogin:function(e,t,n){r.default.authenticate("local-signin",function(r,a,o){return null!==r?(e.flash("error","There was an unexpected error signing in."),n(r)):a?void e.logIn(a,function(r){return r?(e.flash("error","There was an unexpected error signing in."),n(r)):t.redirect("/dashboard")}):(e.flash("error","Invalid email/password combination."),t.redirect("/login"))})(e,t,n)},submitSignup:function(e,t,n){r.default.authenticate("local-signup",function(r,a,o){return null!==r?(e.flash("error",JSON.stringify(r)),n(r)):a?void e.logIn(a,function(r){return r?(e.flash("error","There was an unexpected error creating an account."),n(r)):t.redirect("/dashboard")}):(e.flash("error",o.message),t.redirect("/signup"))})(e,t,n)},validate:function(e,t,n){o.User.update({emailValidated:!0},{where:{emailCode:e.query.code}}).then(function(e){console.log(e),0==e[0]?t.render("verify",{success:!1}):t.render("verify",{success:!0})})},informVerify:function(e,t,n){return t.render("informVerify",{user:e.user})},informReset:function(e,t,n){return t.render("informReset",{user:e.user})},resetPassword:function(e,t,n){return t.render("resetPassword")},submitReset:function(e,t,n){o.User.findOne({where:{email:e.body.email}}).then(function(n){if(!n)return e.flash("error","There is no user associated with that email."),t.redirect("/reset_password");var r=function(){for(var e="",t=0;t<10;t++)e+="QWERTYUIOPASDFGHJKLZXCVBNM1234567890"[Math.floor(26*Math.random())];return e}(),i=e.body.email;a.default.send({to:i,from:"team@calhacks.io",subject:"Reset your password for Cal Hacks",html:(0,s.default)(n.firstname+" "+n.lastname,r)}),o.User.update({resetPasswordCode:r,resetPasswordExpiration:new Date},{where:{email:i}}).then(function(e){t.render("informReset",{user:n})})})},changePassword:function(e,t,n){return t.render("changePassword",{code:e.query.code})},submitPassword:function(e,t,n){console.log(e.query);var r=new Date;r.setHours(r.getHours()-1),console.log("hello"),o.User.update({password:function(e){return i.default.hashSync(e,i.default.genSaltSync(8),null)}(e.body.password)},{where:{resetPasswordCode:e.query.code,resetPasswordExpiration:function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},l.Op.gt,r)}}).then(function(e){0==e[0]?t.render("newPassword",{success:!1}):t.render("newPassword",{success:!0})})},newPassword:function(e,t,n){return t.render("newPassword")}}},function(e,t){e.exports=require("dotenv")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={development:{username:process.env.DB_USER,password:process.env.DB_PASSWD,database:process.env.DB_NAME,host:process.env.DB_HOST,dialect:"mysql"},production:{username:process.env.DB_USER,password:process.env.DB_PASSWD,database:process.env.DB_NAME,host:process.env.DB_HOST,dialect:"mysql"}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=e.define("User",{firstname:{type:t.STRING,notEmpty:!0},lastname:{type:t.STRING,notEmpty:!0},email:{type:t.STRING,notEmpty:!0,validate:{isEmail:!0}},password:{type:t.STRING,allowNull:!1},emailCode:{type:t.STRING,notEmpty:!0,unique:!0},emailValidated:{type:t.BOOLEAN},role:{type:t.ENUM("hacker","admin"),notEmpty:!0},resetPasswordCode:{type:t.STRING},resetPasswordExpiration:{type:t.DATE}},{});return n.associate=function(e){e.User.hasOne(e.Application),e.User.belongsTo(e.Team)},n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=e.define("Application",{phone:{type:t.TEXT,validate:{notEmpty:!0}},gender:{type:t.TEXT,validate:{notEmpty:!0}},school:{type:t.TEXT,validate:{notEmpty:!0}},year:{type:t.TEXT,validate:{notEmpty:!0}},major:{type:t.TEXT,validate:{notEmpty:!0}},transportation:{type:t.TEXT,validate:{notEmpty:!0}},allergies:{type:t.TEXT},shirt:{type:t.TEXT,validate:{notEmpty:!0}},links:{type:t.TEXT},hackathons:{type:t.TEXT,validate:{notEmpty:!0}},hearAbout:{type:t.TEXT,validate:{notEmpty:!0}},resume:{type:t.TEXT},cubstart:{type:t.TEXT,validate:{notEmpty:!0}},cubstart1:{type:t.TEXT},cubstart2:{type:t.TEXT},cubstart3:{type:t.TEXT},cubstart4:{type:t.TEXT},question1:{type:t.TEXT},question2:{type:t.TEXT},question3:{type:t.TEXT},beginner:{type:t.TEXT},status:{type:t.ENUM("inreview","accepted","rejected","waitlisted"),defaultValue:"inreview"}},{});return n.associate=function(e){e.Application.belongsTo(e.User)},n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=e.define("Team",{name:{type:t.STRING,validate:{notEmpty:!0},allowNull:!1}});return n.associate=function(e){e.Team.hasMany(e.User)},n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return"\n<p>\nDear "+e+',\n<br/>\n<br/>\nYou can reset your password by clicking on the link below:\n<a href="https://2018.calhacks.io/reset?code='+t+'">\n    https://2018.calhacks.io/reset?code='+t+"\n</a><br/>\nIf you didn't request a new password, please ignore this email!\n</p>\n"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.default={dashboard:function(e,t,n){r.User.findOne({where:{id:e.user.id},include:[{model:r.Application},{model:r.Team,include:[r.User]}]}).then(function(e){t.render("dashboard",{user:e.toJSON()})})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(e){return e&&e.__esModule?e:{default:e}}(n(28)),o=n(0);t.default={submitApp:function(e,t,n){var s=function(){var t=e.files.resume;if(0!==t.size){var n=t.name.split("."),r=void 0;r=n.length>1?e.user.id+"."+n[n.length-1]:""+e.user.id;var o=t.path,s="/tmp/calhacks/portal/resumes/"+r;return a.default.move(o,s,{overwrite:!0})}return Promise.resolve()};o.User.findOne({where:{id:e.user.id},include:{model:o.Application}}).then(function(n){var a;null===n.Application?((a=e.body).resume=e.files.resume.name,o.Application.create(r({},a,{UserId:e.user.id})).then(function(e){s().then(function(){console.log("File moved successfully!"),t.redirect("/dashboard")}).catch(function(e){console.log(e),t.redirect("/dashboard")})})):(console.log(e.files.resume.name),(a=e.body).resume=e.files.resume.name,n.Application.updateAttributes(a).then(function(n){console.log(e.body),s().then(function(){console.log("File moved successfully!"),t.redirect("/dashboard")}).catch(function(e){console.log(e),t.redirect("/dashboard")})}))})},appPage:function(e,t){o.User.findOne({where:{id:e.user.id},include:[{model:o.Application}]}).then(function(e){t.render("application",{user:e.toJSON()})})}}},function(e,t){e.exports=require("fs-extra")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.default={submitTeam:function(e,t,n){r.Team.findOne({where:{name:e.body.name},include:{model:r.User}}).then(function(n){null===n?r.Team.create({name:e.body.name}).then(function(n){n.addUser(e.user.id).then(function(e){t.redirect("/dashboard#team")})}):n.Users.length<4?n.addUser(e.user.id).then(function(e){t.redirect("/dashboard#team")}):e.flash("error","That team is already at the maximum of 4 members.")})},leaveTeam:function(e,t,n){r.User.findOne({where:{id:e.user.id},include:{model:r.Team}}).then(function(e){e.setTeam(null).then(function(e){t.redirect("/dashboard#team")})})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(0);t.default={cubstart:function(e,t,n){a.User.findOne({where:{id:e.user.id},include:[{model:a.Application},{model:a.Team,include:[a.User]}]}).then(function(e){t.render("cubstart",{user:e.toJSON()})})},submitApp:function(e,t,n){var o=e.body;o.cubstart="yes",a.User.findOne({where:{id:e.user.id},include:{model:a.Application}}).then(function(n){null===n.Application?a.Application.create(r({},o,{UserId:e.user.id})).then(function(e){t.redirect("/dashboard")}):n.Application.updateAttributes(o).then(function(n){console.log(e.body),t.redirect("/dashboard")})})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(32);t.default={"/inform_verify":{get:[(0,r.authenticateUser)(["hacker","admin"])],post:[(0,r.authenticateUser)(["hacker","admin"])]},"/dashboard":{get:[(0,r.authenticateUser)(["hacker","admin"]),r.emailVerify],post:[(0,r.authenticateUser)(["hacker","admin"]),r.emailVerify]},"/application":{get:[(0,r.authenticateUser)(["hacker","admin"]),r.emailVerify],post:[(0,r.authenticateUser)(["hacker","admin"]),r.emailVerify]},"/team":{post:[(0,r.authenticateUser)(["hacker","admin"]),r.emailVerify]},"/leaveTeam":{post:[(0,r.authenticateUser)(["hacker","admin"]),r.emailVerify]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.emailVerify=t.authenticateUser=void 0;n(0),t.authenticateUser=function(e){return function(t,n,r){void 0!==t.user&&e.includes(t.user.role)?r():n.redirect("/login")}},t.emailVerify=function(e,t,n){e.user.emailValidated?n():t.redirect("/inform_verify")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(4)),a=n(34),o=i(n(2)),s=i(n(35));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){if(process.env.SENDGRID_APIKEY){o.default.setApiKey(process.env.SENDGRID_APIKEY),e.serializeUser(function(e,t){t(null,e.id)}),e.deserializeUser(function(e,n){t.findOne({where:{id:e}}).then(function(e){e?n(null,e.get()):n(e.errors,null)})});e.use("local-signup",new a.Strategy({usernameField:"email",passwordField:"password",passReqToCallback:!0},function(e,n,a,i){t.findOne({where:{email:n}}).then(function(u){if(u)return i(null,!1,{message:"That email is already taken."});var l=function(e){return r.default.hashSync(e,r.default.genSaltSync(8),null)}(a),c=function(){for(var e="",t=0;t<10;t++)e+="QWERTYUIOPASDFGHJKLZXCVBNM1234567890"[Math.floor(26*Math.random())];return e}(),d={email:n,password:l,firstname:e.body.firstname,lastname:e.body.lastname,emailCode:c,emailValidated:!1,role:"hacker"};o.default.send({to:n,from:"team@calhacks.io",subject:"Verify your email with Cal Hacks",html:(0,s.default)(e.body.firstname+" "+e.body.lastname,c)}),t.create(d).then(function(e,t){return e?i(null,e,{}):i(null,!1,{message:"There was an unexpected error creating an account."})}).catch(function(e){return console.log(e)})})})),e.use("local-signin",new a.Strategy({usernameField:"email",passwordField:"password",passReqToCallback:!0},function(e,n,a,o){t.findOne({where:{email:n}}).then(function(e){if(!e||!function(e,t){return r.default.compareSync(t,e)}(e.password,a))return o(null,!1,{message:"Incorrect username/password"});var t=e.get();return o(null,t)}).catch(function(e){console.log("Something went wrong:"),console.log(e),o(null,!1,{message:"Something went wrong"})})}))}else console.error("ERROR: Must define SENDGRID_APIKEY")}},function(e,t){e.exports=require("passport-local")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return"\n<p>\nDear "+e+",\n<br/>\n<br/>\n<strong>Thanks so much for making an account with us!</strong><br/>\nTo make sure it's you, please verify your email at this link:\n<a href=\"https://2018.calhacks.io/verify?code="+t+'">\n    https://2018.calhacks.io/verify?code='+t+"\n</a><br/>\nIf you didn't make an account on the Cal Hacks portal, please ignore this email!\n</p>\n"}},function(e,t){e.exports=require("babel-register")},function(e,t,n){}]);