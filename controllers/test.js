const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  // TODO: Render template with Sequelize data
  // try {
  //   const userData = await User.findAll({ 
  //     attributes: { exclude: ['password'] },
  //     order: [['name', 'ASC']],
  // });
  // const users = userData.map((project) => project.get({ plain: true }));
  // res.render('homepage', { users });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  res.render('homepage');
});



module.exports = router;
