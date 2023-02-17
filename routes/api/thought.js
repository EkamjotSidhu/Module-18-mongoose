const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThoughtByUser,
    deleteOneThought,
    updateThought
} = require('../../controllers/thought');

router.route('/').get(getThought);
router.route('/').get(getThought).post(createThoughtByUser)

router.route('/:thoughtId').get(getSingleThought);
router.route('/:thoughtId').delete(deleteOneThought);
router.route('/:thoughtId').put(updateThought);

module.exports = router;