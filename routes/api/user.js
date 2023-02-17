const router = require('express').Router();
const {
    getSingleUser,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../../controllers/user');

router.route('/').get(getUser).post(createUser);

router.route('/:userId').get(getSingleUser);
// router.route()
router.route('/:userId').delete(deleteUser);
router.route('/:userId').put(updateUser);

module.exports = router;
