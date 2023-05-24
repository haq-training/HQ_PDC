import express from 'express';
import { createServer } from "http";
import bodyParser from "body-parser";
const app = express();
import fs from "fs";
import cron from 'cron';
import axios from 'axios';
import { Sequelize ,DataTypes} from "sequelize";
import BigNumber from 'bignumber.js';
import routerCoin from './routers/coin.router.js';
import routerUsers from './routers/users.router.js';
import routerConversion from './routers/conversion.router.js';
import routerCollections from './routers/collections.router.js';
import routerTransaction from './routers/transaction.router.js';

const sequelize = new Sequelize('coin-mysql', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

const Coin = sequelize.define('coin', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  internal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  algorithm: {
    type: DataTypes.STRING,
    allowNull: false
  },
  proof_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: false
  },
  technology_adoption_rating: {
    type: DataTypes.STRING,
    allowNull: true
  },
  market_performance_rating: {
    type: DataTypes.STRING,
    allowNull: true
  },
  net_hashes_per_second: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  block_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  block_time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  block_reward: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  asset_launch_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  max_supply: {
    type: DataTypes.DECIMAL(18, 9),
    allowNull: true
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  document_type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'coin',
  timestamps: false
});

const Conversion = sequelize.define('conversion', {
  coin_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  conversion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  conversion_symbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currency_from: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currency_to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  market: {
    type: DataTypes.STRING,
    allowNull: false
  },
  supply: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mkt_cap_penalty: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_volume_24h: {
    type: DataTypes.DECIMAL(18, 9),
    allowNull: false
  },
  total_toptier_volume_24h: {
    type: DataTypes.DECIMAL(18, 9),
    allowNull: false
  },
  sub_base: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subs_needed: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  raw_data: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  direct_pair_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'conversion',
  timestamps: false
});


const job = new cron.CronJob('0 */2 * * * *', async () => {
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
          await Coin.bulkCreate(coins, { ignoreDuplicates: true });
        }
  
        // Thêm bản ghi chỉ khi không có dữ liệu trong bảng Conversion
        if (conversions.length > 0) {
          await Conversion.bulkCreate(conversions, { ignoreDuplicates: true });
        }
  
        console.log(`Inserted data into Coin and Conversion tables for coins.`);
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.log(error);
    }
  });
  
  job.start();



fs.readFileSync("./nodemon.json", "utf8", function (err, data) {
  if (error) {
    console.log(error);
  }
  return JSON.parse(data);
});

const httpServer = createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/coin", routerCoin);
app.use("/users", routerUsers);
app.use("/conversion", routerConversion);
app.use("/collections", routerCollections);
app.use("/transaction", routerTransaction);

httpServer.listen(3011);