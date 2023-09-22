const Model = require("../models/index");
const bcrypt = require("bcryptjs");

const getAllUsers = (req, res) => {
  Model.User.findAll({})
    .then((users) => res.send({ result: 200, data: users }))
    .catch((error) => res.send({ result: 500, error: error }));
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

const loginUser = (data, res) => {
  const email = data.email;
  const pword = data.password;
  Model.User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        const hashedPassword = user.password;
        const passworMatch = bcrypt.compareSync(pword, hashedPassword);
        if (passworMatch) {
          return res.status(200).send({ result: 200, data: user });
        } else {
          return res.status(400).send("Incorrect password");
        }
      }
      else{
        return res.status(404).send(`Cannot find the email ${email}`)
      }
    })
    .catch((error) => res.status(500).send("Some unknown error happened, please try agina later."));
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
    .catch((error) => res.status(500).send("Some unknown error happened, please try agina later."));
};

const encode = (input) => {
  const saltRounds = 10;
  const output = bcrypt.hashSync(input, saltRounds);
  return output;
};

module.exports = { getAllUsers, createUser, loginUser, changeUserSetting };
