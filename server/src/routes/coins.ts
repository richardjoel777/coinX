import express from 'express';

import getCoins from '../controllers/getCoins';
import getMarketdata from '../controllers/getMarketData';

const router = express.Router();

router.get('/', getCoins);
router.get('/:code', getMarketdata);

export default router;