const mogoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounts = 10; //10자리
const jwt = require("jsonwebtoken");

const userSchema = mogoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 200,
  },
  role: {
    type: Number,
    defult: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//user 데이터를 저장하기전에 호출되는 함수
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounts, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  console.log("plainPassword", plainPassword);
  console.log("this.password", this.password);

  //palinPassword 1234567 암호화된비밀번호 와 같은지 체크
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  console.log("user._id", user._id);

  //jsonwebtoken을 이용해서 토큰을 생성한다.
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mogoose.model("User", userSchema);

module.exports = { User };
