const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true })); //application/x-www/form-urlencode
app.use(bodyParser.json()); //application/json으로 된것을 가져올수 있게

const mogoose = require("mongoose");
mongoose
  .connect(config.mogoURI)
  .then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! to nojs");
});

app.post("/register", (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
