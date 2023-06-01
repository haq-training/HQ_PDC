import { Sequelize } from 'sequelize';
import fs from "fs";
import cron from 'cron';
import axios from 'axios';
import {database} from '../models/config.js';
import {initModels} from '../models/init-models.js';

const user = JSON.parse(fs.readFileSync('dev_data/user.json'));
const collections = JSON.parse(fs.readFileSync('dev_data/collections.json'));
const transaction = JSON.parse(fs.readFileSync('dev_data/transaction.json'));

export const sequelize = new Sequelize( database.db_name,database.db_user, database.db_password,{ ...database.option});

export const models = initModels(sequelize);

const insertData = async () => {
  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/top/totaltoptiervol?ascending=true&assetClass=ALL&[%E2%80%A6]tps:%2F%2Fwww.cryptocompare.com&limit=20&page=0&tsym=USD');
    const data = response.data.Data;

    if (data.length > 0) {
      const coins = [];
      const conversions = [];

      for (const item of data) {
        const coin = {
          id: item.CoinInfo.Id,
          name: item.CoinInfo.Name,
          full_name: item.CoinInfo.FullName,
          internal: item.CoinInfo.Internal,
          image_url: item.CoinInfo.ImageUrl,
          url: item.CoinInfo.Url,
          algorithm: item.CoinInfo.Algorithm,
          proof_type: item.CoinInfo.ProofType,
          net_hashes_per_second: typeof item.CoinInfo.NetHashesPerSecond === 'number' ? Math.min(item.CoinInfo.NetHashesPerSecond, Number.MAX_SAFE_INTEGER) : Number.MAX_SAFE_INTEGER,
          block_number: item.CoinInfo.BlockNumber,
          block_time: item.CoinInfo.BlockTime,
          block_reward: item.CoinInfo.BlockReward,
          asset_launch_date: item.CoinInfo.AssetLaunchDate,
          max_supply: typeof item.CoinInfo.MaxSupply === 'number' ? Math.min(item.CoinInfo.MaxSupply, Number.MAX_SAFE_INTEGER / 1e9) : null,
          type: item.CoinInfo.Type,
          document_type: item.CoinInfo.DocumentType,
          rating: typeof item.CoinInfo.Rating === 'string' ? item.CoinInfo.Rating : '',
          technology_adoption_rating: typeof item.CoinInfo.TechnologyAdoptionRating === 'string' ? item.CoinInfo.TechnologyAdoptionRating : '',
          market_performance_rating: typeof item.CoinInfo.MarketPerformanceRating === 'string' ? item.CoinInfo.MarketPerformanceRating : ''
        };

        const conversion = {
          coin_id: item.CoinInfo.Id,
          conversion: item.ConversionInfo.Conversion,
          conversion_symbol: item.ConversionInfo.ConversionSymbol,
          currency_from: item.ConversionInfo.CurrencyFrom,
          currency_to: item.ConversionInfo.CurrencyTo,
          market: item.ConversionInfo.Market,
          supply: item.ConversionInfo.Supply,
          mkt_cap_penalty: item.ConversionInfo.MktCapPenalty,
          total_volume_24h: item.ConversionInfo.TotalVolume24H,
          total_toptier_volume_24h: item.ConversionInfo.TotalTopTierVolume24H,
          sub_base: item.ConversionInfo.SubBase,
          subs_needed: item.ConversionInfo.SubsNeeded !== undefined ? item.ConversionInfo.SubsNeeded[0,1] : null,
          raw_data: item.ConversionInfo.RAW[0,1],
          direct_pair_available: item.ConversionInfo.DirectPairAvailable,
        };

        coins.push(coin);
        conversions.push(conversion);
      }

      if (coins.length > 0) {
        await models.coin.bulkCreate(coins, { ignoreDuplicates: true });
      }

      if (conversions.length > 0) {
        await models.conversion.bulkCreate(conversions, { ignoreDuplicates: true });
      }

      console.log('Inserted data into Coin and Conversion tables for coins.');
    } else {
      console.log('No data found.');
    }
  } catch (error) {
    console.log(error);
  }
};

const startDataInsertion = async () => {
  try {
    await insertData();
  } catch (error) {
    console.log('Error inserting data:', error);
  }
};

const job = new cron.CronJob('0 */2 * * * *', startDataInsertion);
job.start();


export const syncDatabase = async () => {
  if (process.env.NODE_ENV === 'development' && process.env.SYNC_DATA === 'true') {
    const isForceSync = process.env.SYNC_DATA === 'true';
    await sequelize
      .sync({ force: isForceSync, alter: true })
      .then(async () => {
        console.log('Database sync is done!');
        if (isForceSync) {
          await insertData();
          await models.users.bulkCreate(user);
          await models.collections.bulkCreate(collections);
          await models.transaction.bulkCreate(transaction);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

