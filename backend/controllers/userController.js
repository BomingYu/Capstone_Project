const Model = require("../models/index");
const bcrypt = require("bcryptjs");
const { createToken } = require("../middleware/userAuth");

const getUsers = (req, res) => {
  Model.User.findAll({})
    .then(function (data) {
      res
        .status(200)
        .json({ result: "User data fetched successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
  // Model.User.findAll({})
  //   .then((users) => res.send({ result: 200, data: users }))
  //   .catch((error) => res.send({ result: 500, error: error }));
};

const createUser = (data, res) => {
  //const saltRounds = 10;
  const password = data.password;
  //const hashedPassword = bcrypt.hashSync(password , saltRounds)
  const hashedPassword = encode(password);
  console.log(password);
  data.password = hashedPassword;
  Model.User.create(data)
    .then((user) => res.send({ result: 200, data: user }))
    .catch((error) => res.send({ result: 500, data: error }));
};

const loginUser = (req, res) => {
  const email = req.body.email;
  const pword = req.body.password;
  Model.User.findOne( { raw: true, where: { email: email }} )
    .then((user) => {
      if (user) {
        //console.log("CutomOutputUser",user.id)
        const hashedPassword = user.password;
        const passworMatch = bcrypt.compareSync(pword, hashedPassword);
        if (passworMatch) {
          const token = createToken(user.id, email);
          user.token = token;
          console.log("CustomOutput", user);
          return res.status(200).send({ result: 200, data: user });
        } else {
          return res.status(400).send("Incorrect password");
        }
      } else {
        return res.status(404).send(`Cannot find the email ${email}`);
      }
    })
    .catch(() =>
      res
        .status(500)
        .send("Some unknown error happened, please try agina later.")
    );
};

const changeUserSetting = (req, res) => {
  const id = req.params.id;
  const oldPassword = req.body.oldPasswor;
  const newPassword = req.body.newPassword;

  Model.User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send(`Cannot find the user with id ${id}`);
      } else {
        const passwordMatch = bcrypt.compareSync(oldPassword, user.password);
        if (!passwordMatch) {
          return res.status(400).send(`Inccorrect old password`);
        } else {
          const hashedPassword = encode(newPassword);
          Model.User.update({ password: hashedPassword }, { where: { id: id } })
            .then((response) =>
              res.status(200).send({ result: 200, data: response })
            )
            .catch((error) =>
              res.status(500).send({ result: 500, data: error })
            );
        }
      }
    })
    .catch((error) =>
      res
        .status(500)
        .send("Some unknown error happened, please try agina later.")
    );
};

const encode = (input) => {
  const saltRounds = 10;
  const output = bcrypt.hashSync(input, saltRounds);
  return output;
};

module.exports = { getUsers, createUser, loginUser, changeUserSetting };
