// Controllers for user
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const https = require('https');
const admin = require('../firebase/firebase.js')
const User = require("../models/user");
const axios = require('axios');
const Word = require("../models/word");

const getWordUrlSearch = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

dotenv.config();

exports.UpdateStreak = async (req, res) => {
  try {
    const id = req.user.id;
    await User.updateOne({ _id: id }, { $inc: { counter: 1 } })
    const user = await User.findOne({ _id: id })
    return res.status(200).json({
      error: false,
      message: "Updated Streak",
      details: user
    })
  } catch (err) {
    return res.json({
      error: true,
      code: 500,
      message: err.toString()
    })
  }
}

exports.WordSearch = async (req, res) => {
  try {
    const word = req.body.word;
    const wordData = await Word.findOne({ word: word })
    if (!wordData) {
      return res.status(404).json({
        error: true,
        code: 404,
        message: "Word Does Not Exist",
      })
    }
    return res.status(200).json({
      error: false,
      code: 200,
      message: "Word Details Sent",
      details: wordData
    })
  } catch (err) {
    return res.status(400).json({
      error: true,
      code: 400,
      message: err.toString()
    })
  }
}

exports.GetUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    return res.status(200).json({
      error: false,
      code: 200,
      message: "User Details Sent",
      details: user
    })
  } catch (err) {
    return res.status(400).json({
      error: true,
      code: 400,
      message: err.toString()
    })
  }
}

exports.AddWord = async (req, res) => {
  try {
    const word = req.body.word;
    const id = req.user.id;
    const wordFound = await Word.findOne({ word: word });
    const user = await User.findOne({ _id: id });

    for (let i of user.book) {
      if (i == word) {
        return res.status(409).json({
          message: "Word already exits in Book",
          details: user
        });
      }
    }

    if (wordFound) {
      user.book.push(word);
      await user.save();
      return res.status(200).json({
        message: "Word Added To Book",
        details: user
      });
    }
    const url = getWordUrlSearch + word;
    const resp = await axios.get(url);
    const word1 = new Word({ word: word, wordData: resp.data });
    await word1.save();
    user.book.push(word);
    await user.save();
    return res.status(200).json({
      message: "Word Added To Book and Dict",
      details: user
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      code: 400,
      message: err.toString()
    })
  }
}

exports.login = async (req, res) => {
  try {
    const idToken = req.body.idToken;
    const decoded = await admin.auth().verifyIdToken(idToken)
    const exists = await User.findOne({ email: decoded.email })
    if (exists) {
      const token = jwt.sign({
        id: exists.id
      }, process.env.SECRET_KEY)
      return res.status(200).json({
        error: false,
        code: 200,
        message: 'User Logged In',
        data: exists,
        jwt: token
      })
    }
    const user = {
      userName: decoded.name,
      email: decoded.email,
      userProfileUrl: decoded.picture
    }
    const createdUser = new User(user)
    await createdUser.save();
    const token = jwt.sign({
      id: createdUser.id
    }, process.env.SECRET_KEY)
    return res.status(201).json({
      error: false,
      code: 201,
      message: 'User Created',
      data: createdUser,
      jwt: token
    })
  } catch (err) {
    return res.status(400).json({
      error: true,
      code: 400,
      message: err.toString()
    })
  }
}

