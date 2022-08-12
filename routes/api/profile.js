const express = require('express');
const config = require('config');
const request = require('request');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const connection = require('../../config/dbMySQL');
var dateFormat = require('dateformat');

var day = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss');
const fs = require('fs');

//  @route  Post api/profile//update/common
//  @desc   update common data in profile
//  @access Private

router.post(
  '/update/common',
  [
    [
      check('fname', 'First Name is requried')
        .not()
        .isEmpty()
        .isAlpha()
        .withMessage('First Name must be alphabetic.'),

      check('lname', 'Last Name is requried')
        .not()
        .isEmpty()
        .isAlpha()
        .withMessage('First Name must be alphabetic.'),
      check('story', 'Story is requried').not().isEmpty(),
      check('about', 'About is requried').not().isEmpty(),
    ],
    auth,
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.json({ error: error.array() });
    }
    console.log(res.body);
    try {
      const { fname, lname, story, about } = req.body;

      const sql =
        "update users set fname='" +
        fname +
        "',lname='" +
        lname +
        "',story='" +
        story +
        "',about='" +
        about +
        "' where id ='" +
        req.user.id +
        "'";

      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log(error.message);
        }

        if (results.affectedRows === 1) {
          const insertid = results.insertId;

          return res.json({
            done: true,
            msg: 'Profile updated Successfully',
          });
        } else {
          return res.json({
            done: false,
            msg: 'Server error! please contact to support for help',
          });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error', err.message);
    }
  }
);

//  @route  Get api/profile/skills
//  @desc   get seller skills in profile
//  @access Private

router.get('/skills', [auth], async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error.array());
    return res.json({ error: error.array() });
  }
  console.log(res.body);
  try {
    const sql =
      "select ss.expert_level,ss.skill_id as id,sgs.name from seller_skills ss inner join seller_general_skills sgs on sgs.id=ss.skill_id inner join users u on u.id= ss.user_id  where u.id ='" +
      req.user.id +
      "'";

    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error.message);
      }

      if (results.length > 0) {
        return res.json({
          done: true,
          data: results,
        });
      } else {
        return res.json({
          done: false,
          data: [],
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error', err.message);
  }
});

//  @route  Post api/profile/update/skills
//  @desc   skills data in profile
//  @access Private

router.post(
  '/update/skills',
  [[check('skills', 'Skills are requried').not().isEmpty()], auth],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.json({ error: error.array() });
    }
    console.log(res.body);
    try {
      const { skills } = req.body;

      let sql = 'delete from seller_skills where user_id=14';

      const values = skills
        .map((s) => {
          return '(' + req.user.id + ',' + s.id + ",'" + s.expert_level + "')";
        })
        .join(',');

      console.log(values);
      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log(error.message);
        }

        sql =
          'insert into seller_skills(user_id,skill_id,expert_level) values ' +
          values;

        console.log(sql);
        connection.query(sql, function (error, results, fields) {
          if (error) {
            console.log(error.message);
          }
          console.log(results);

          if (results.affectedRows > 0) {
            return res.json({
              done: true,
              msg: 'Skills updated Successfully',
            });
          } else {
            return res.json({
              done: false,
              msg: 'Server error! please contact to support for help',
            });
          }
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status.json({ msg: err.message, type: 'error' });
    }
  }
);

//  @route  Get api/profile/all-skills
//  @desc   get seller skills in profile
//  @access Private
router.get('/all-skills', [auth], async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error.array());
    return res.json({ error: error.array() });
  }
  console.log(res.body);
  try {
    const sql =
      "SELECT sgs.id,sgs.name FROM seller_general_skills sgs WHERE sgs.`id` NOT IN(SELECT skill_id FROM seller_skills WHERE user_id ='" +
      req.user.id +
      "' )";

    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error.message);
      }

      if (results.length > 0) {
        return res.json({
          done: true,
          data: results,
        });
      } else {
        return res.json({
          done: false,
          data: [],
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error', err.message);
  }
});

//  @route  Post api/profile//update/password
//  @desc   update password data in profile
//  @access Private

router.post(
  '/update/password',
  [
    [
      check(
        'currentPass',
        'Please enter a Current password  at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.'
      ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
      check(
        'newPass',
        'Please enter a New password  at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.'
      ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
      check(
        'confirmPass',
        'Please enter a Confirm password  at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.'
      ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
    ],
    auth,
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.json({ error: error.array() });
    }

    try {
      const { confirmPass, newPass, currentPass } = req.body;

      if (newPass != confirmPass) {
        return res.json({
          error: [{ msg: 'New password and comfirm password not match' }],
        });
      }

      connection.query(
        "select password from users where id='" + req.user.id + "'",
        function (error, results, fields) {
          if (error) {
            console.log(error.message);
          }

          if (results.length > 0) {
            if (currentPass == results[0].password) {
              const sql =
                "update users set password='" +
                newPass +
                "' where id ='" +
                req.user.id +
                "'";

              connection.query(sql, function (error, results, fields) {
                if (error) {
                  console.log(error.message);
                }

                if (results.affectedRows === 1) {
                  const insertid = results.insertId;

                  return res.json({
                    done: true,
                    msg: 'Password is updated Successfully',
                  });
                } else {
                  return res.json({
                    done: false,
                    msg: 'Server error! please contact to support for help',
                  });
                }
              });
            } else {
              return res.json({
                error: [{ msg: 'current password not match' }],
              });
            }
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error', err.message);
    }
  }
);

//  @route  Post api/profile/update/profileImage
//  @desc   update common data in profile
//  @access Private

router.post(
  '/update/profileImage',
  [[check('image', 'Profile image is requried').not().isEmpty()], auth],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.json({ error: error.array() });
    }
    // console.log(res.body);
    try {
      const { image } = req.body;

      // console.log(image);

      let base64Image = image.split(';base64,').pop();

      // Buffer.from(image).toString('base64')

      let imagesName =
        dateFormat(new Date(), 'yyyy-mm-dd h-MM-ss') +
        '-' +
        req.user.username +
        '.png';

      let path = './client/public/assets/uploads/users/' + req.user.username;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);

        path += '/profileImages/';
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
      }

      path =
        '../../../client/public/assets/uploads/users/' +
        req.user.username +
        '/profileImages/';
      fs.writeFile(
        __dirname + path + imagesName,
        base64Image,
        { encoding: 'base64' },
        function (err) {
          if (err) console.log(err);
          console.log('File created');
        }
      );

      const sql =
        "update users set profile_image='" +
        imagesName +
        "' where id ='" +
        req.user.id +
        "'";

      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log(error.message);
        }

        if (results.affectedRows === 1) {
          const insertid = results.insertId;

          return res.json({
            done: true,
            msg: 'Profile updated Successfully',
          });
        } else {
          return res.json({
            done: false,
            msg: 'Server error! please contact to support for help',
          });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error', err.message);
    }
  }
);

//  @route  Post api/profile/common
//  @desc   update common data in profile
//  @access Private

router.post('/common', [auth], async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error.array());
    return res.json({ error: error.array() });
  }

  try {
    const sql =
      "select fname,lname,story,about from users  where id ='" +
      req.user.id +
      "'";

    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error.message);
      }

      if (results.length === 1) {
        return res.json({
          done: true,
          data: results[0],
        });
      } else {
        return res.json({
          done: false,
          msg: 'Server error! please contact to support for help',
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error', err.message);
  }
});

// //  @route  GET api/profile
// //  @desc   get logged in user profile
// //  @access Private

// router.get("/me", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user }).populate("user", [
//       "name",
//       "avatar"
//     ]);
//     if (!profile) {
//       res.status(400).json({ msg: "There is no profile for this user" });
//     }
//     res.json(profile);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "server error", error: error });
//   }
// });

// //  @route  Post api/profile
// //  @desc   create or update profile
// //  @access Private

// router.post(
//   "/",
//   [
//     auth,
//     [
//       check("status", "status is requried")
//         .not()
//         .isEmpty(),
//       check("skills", "Skills is requried")
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     try {
//       const error = validationResult(req);
//       if (!error.isEmpty()) {
//         return res.status(400).json({ error: error.array() });
//       }

//       const {
//         title,
//         categoryID,
//         SubcategoryID,
//         searchTAGS,
//         serviceType
//       } = req.body;

//       const { price, shortDes, deliveryTime } = req.body;

//       const { description } = req.body;

//       const { seviceImages } = req.body;

//       const {
//         company,
//         website,
//         location,
//         bio,
//         status,
//         githubusername,
//         skills,
//         youtube,
//         facebook,
//         twitter,
//         instagram,
//         linkedin
//       } = req.body;
//       console.log(req.body);
//       const profileFields = {};
//       profileFields.user = req.user;
//       if (company) profileFields.company = company;
//       if (website) profileFields.website = website;
//       if (location) profileFields.location = location;
//       if (bio) profileFields.bio = bio;
//       if (status) profileFields.status = status;
//       if (githubusername) profileFields.githubusername = githubusername;
//       if (skills) {
//         profileFields.skills = skills.split(",").map(skill => skill.trim());
//       }
//       profileFields.social = {};
//       if (youtube) profileFields.social.youtube = youtube;
//       if (twitter) profileFields.social.twitter = twitter;
//       if (facebook) profileFields.social.facebook = facebook;
//       if (linkedin) profileFields.social.linkedin = linkedin;
//       if (instagram) profileFields.social.instagram = instagram;
//       console.log(profileFields);
//       //   res.send("hello");

//       let profile = await Profile.findOne({ user: req.user });
//       if (profile) {
//         profile = await Profile.findOneAndUpdate(
//           { user: req.user },
//           { $set: profileFields },
//           { new: true }
//         );

//         return res.json(profile);
//       }
//       profile = new Profile(profileFields);
//       await profile.save();
//       return res.json(profile);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ msg: "server error", error: error });
//     }
//   }
// );

// //  @route  GET api/profile/all
// //  @desc   get all user profiles
// //  @access Public

// router.get("/all", async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate("user", ["name", "avatar"]);
//     if (!profiles) {
//       res.status(400).json({ msg: "There is no profiles" });
//     }
//     res.json(profiles);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "server error", error: error });
//   }
// });

// //  @route  GET api/profile/user/:user_id
// //  @desc   get  user profiles by id
// //  @access Public

// router.get("/user/:user_id", async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.params.user_id
//     }).populate("user", ["name", "avatar"]);
//     if (!profile) {
//       res.status(400).json({ msg: "Profile not found" });
//     }
//     res.json(profile);
//   } catch (error) {
//     console.log(error);
//     if ((error.kind = "ObjectId")) {
//       res.status(400).json({ msg: "Profile not found" });
//     }
//     res.status(500).json({ msg: "server error" });
//   }
// });

// //  @route  Delete api/profile
// //  @desc   delele profile by id
// //  @access Private

// router.delete("/", auth, async (req, res) => {
//   try {
//     await Profile.findOneAndRemove({ user: req.user });
//     await User.findOneAndRemove({ _id: req.user });
//     await Post.deleteMany({ user: req.user });

//     res.json({ msg: "User Deleted" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "server error" });
//   }
// });

// //  @route  put api/profile/experience
// //  @desc   add experience
// //  @access Private

// router.put(
//   "/experience",
//   [
//     auth,
//     [
//       check("title", "title is requried")
//         .not()
//         .isEmpty(),
//       check("company", "company is requried")
//         .not()
//         .isEmpty(),
//       check("from", "from is requried")
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     try {
//       const error = validationResult(req);
//       if (!error.isEmpty()) {
//         return res.status(400).json({ error: error.array() });
//       }

//       const {
//         title,
//         company,
//         website,
//         location,
//         from,
//         to,
//         current,
//         description
//       } = req.body;

//       const newExp = {
//         title,
//         company,
//         website,
//         location,
//         from,
//         to,
//         current,
//         description
//       };

//       //   res.json(profile);
//       let profile = await Profile.findOne({ user: req.user });
//       if (!profile) {
//         res.status(400).json({ msg: "Profile not Found", error: error });
//       }
//       profile.experience.unshift(newExp);
//       await profile.save();
//       return res.json(profile);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ msg: "server error", error: error });
//     }
//   }
// );

// //  @route  DELETE api/profile/experience/exp_id
// //  @desc   delele experience by id
// //  @access Private

// router.delete("/experience/:exp_id", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user });
//     const index = profile.experience
//       .map(item => item.id)
//       .indexOf(req.params.exp_id);
//     console.log(index);
//     profile.experience.splice(index, 1);
//     await profile.save();
//     res.json(profile);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "server error" });
//   }
// });

// //  @route  put api/profile/education
// //  @desc   add education
// //  @access Private

// router.put(
//   "/education",
//   [
//     auth,
//     [
//       check("school", "School is requried")
//         .not()
//         .isEmpty(),
//       check("degree", "Degree is requried")
//         .not()
//         .isEmpty(),
//       check("fieldofstudy", "Field of study is requried")
//         .not()
//         .isEmpty(),
//       check("from", "From is requried")
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     try {
//       const error = validationResult(req);
//       if (!error.isEmpty()) {
//         return res.status(400).json({ error: error.array() });
//       }

//       const {
//         school,
//         degree,
//         fieldofstudy,
//         from,
//         to,
//         current,
//         description
//       } = req.body;

//       const newEdu = {
//         school,
//         degree,
//         fieldofstudy,
//         from,
//         to,
//         current,
//         description
//       };

//       console.log(newEdu);
//       //   res.json(profile);
//       let profile = await Profile.findOne({ user: req.user });
//       if (!profile) {
//         res.status(400).json({ msg: "Profile not Found", error: error });
//       }
//       profile.education.unshift(newEdu);
//       await profile.save();
//       return res.json(profile);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ msg: "server error", error: error });
//     }
//   }
// );

// //  @route  DELETE api/profile/education/exp_id
// //  @desc   delele education by id
// //  @access Private

// router.delete("/education/:edu_id", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user });
//     const index = profile.education
//       .map(item => item.id)
//       .indexOf(req.params.edu_id);
//     console.log(index);
//     profile.education.splice(index, 1);
//     await profile.save();
//     res.json(profile);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "server error" });
//   }
// });

// //  @route  GET api/profile/github/:username
// //  @desc   get repos from github
// //  @access Public

// router.get("/github/:username", (req, res) => {
//   try {
//     const options = {
//       uri: `https://api.github.com/users/${
//         req.params.username
//       }/repos?per_page=5&sort=created:asc&client_id=${config.get(
//         "githubClientId"
//       )}&client_secret=${config.get("githubSecret")}`,
//       method: "GET",
//       headers: { "user-agent": "node.js" }
//     };

//     request(options, (error, response, body) => {
//       console.log(response);
//       if (error) throw error;
//       if (response.statusCode !== 200) {
//         return res.status(404).json({ msg: "No Github profile found" });
//       }
//       res.json(JSON.parse(body));
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("server error");
//   }
// });

module.exports = router;
