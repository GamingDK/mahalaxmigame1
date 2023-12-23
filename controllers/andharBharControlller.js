const { Chance } = require("chance");
const chance = new Chance();

const {
  AndharBharMatch,
  AndharBharMatchCard,
  Cards,
  AndharBharBetting,
  WalletHistory,
  user,
  sequelize,
} = require("../models");

const { literal, Op } = require("sequelize");

const createMatch = async (req, res) => {
  try {
    const cardId = chance.integer({ min: 211, max: 262 });
    const cardCount = await Cards.count({ where: { id: cardId } });

    if (cardCount !== 1) throw new Error("card not found");

    await AndharBharMatch.create({ cardId });
    const mainCard = await Cards.findOne({
      attributes:['name','img','value'],
      where: { id:cardId }
    });
    return res
      .status(200)
      .send({ status: true, msg: "match creted successfully !!" , mainCard });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ status: false, msg: "match create  error!! " });
  }
};

const createBet = async (req, res) => {
  try {
    const { amount, type } = req.body;

    const currentMatch = await AndharBharMatch.findOne({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "cardId"],
    });

    const andharBharBetting = AndharBharBetting.create({
      andharBharMatchId: currentMatch.id,
      userId: req.user.id,
      type,
      amount,
    });

    const walletHistory = WalletHistory.create({
      amount,
      flow: "debit",
      type: "andarBahar",
      userId: req.user.id,
    });

    const updateUserAmount = await user.update(
      { amount: literal(`amount - ${amount}`) },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    await Promise.all([andharBharBetting, walletHistory]);

    return res
      .status(200)
      .send({ status: true, msg: "user bet successfully !!" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "user bet error!! " });
  }
};

const createMatchCards = async (req, res) => {
  try {

    const cardsCount = chance.integer({ min: 1, max: 32 });
    const cardSet = new Set();
    const winnerArray = "";

    const currentMatch = await AndharBharMatch.findOne({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "cardId"],
    });

    let query = "SELECT (SELECT SUM(andharbharbettings.amount) as andarAmount FROM andharbharbettings WHERE andharbharbettings.andharBharMatchId =:andharBharMatchId  AND andharbharbettings.type = 0) as andarAmount,(SELECT SUM(andharbharbettings.amount) FROM andharbharbettings WHERE andharbharbettings.andharBharMatchId = :andharBharMatchId  AND andharbharbettings.type = 1) as baharAnount";

    let [totalBet] = await sequelize.query(query, {
      replacements: {
        andharBharMatchId: currentMatch.id,
      }
    })

    let andhar = totalBet[0].andarAmount;
    let bahar = totalBet[0].baharAnount;

    const getMainCardValue = await Cards.findOne({
      where: { id: currentMatch.cardId },
      attributes: ["id", "name", "img", "value"],
    });

    for (let i = 0; i <= cardsCount; i++) {
      const generateCards = chance.integer({ min: 211, max: 262 });
      cardSet.add(generateCards);
    }

    const mainCardArray = [...cardSet];

    const getCards = await Cards.findAll({
      where: {
        id: {
          [Op.in]: mainCardArray,
        },
        value: {
          [Op.not]: getMainCardValue.value,
        },
      },
      attributes: ["id", "name", "img", "value"],
    });

    const andharArray = [];
    const bharArray = [];

    for (let i = 0; i < getCards.length; i++) {
      if (i % 2 == 0) {
        andharArray.push(getCards[i]);
      } else {
        bharArray.push(getCards[i]);
      }
    }

    const getWinCard = await Cards.findOne({
      where: {
        id: {
          [Op.not]: currentMatch.id
        },
        value: getMainCardValue.value
      }
    });

    let type
    if (andharArray.length == bharArray.length) {
      if (andhar < bahar) {
        type = 0
        andharArray.push(getWinCard);
        winnerArray = "Andar";
      } else {
        type = 1
        bharArray.pop()
        bharArray.push(getWinCard);
        winnerArray = "Bahar";
      }
    } else {
      if (andhar < bahar) {
        type = 0
        andharArray.pop()
        andharArray.push(getWinCard);
        winnerArray = "Andar";
      } else {
        type = 1
        bharArray.push(getWinCard);
        winnerArray = "Bahar"
      }
    };

    let andarData = andharArray.map((aCard) => {
      return {
        andharBharMatchId: currentMatch.id,
        cardId: aCard.id,
        type: 0
      }
    });
    let baharData = bharArray.map((bCard) => {
      return {
        andharBharMatchId: currentMatch.id,
        cardId: bCard.id,
        type: 1
      }
    });

    let anharBaharData = [...andarData, ...baharData];
    // await AndharBharMatchCard.bulkCreate(anharBaharData);

    query = "UPDATE users SET amount = amount + ( SELECT SUM(andharbharbettings.amount * 1.97) as winAmount FROM andharbharbettings WHERE andharbharbettings.andharBharMatchId = :andharBharMatchId AND andharbharbettings.type = :type AND users.id = andharbharbettings.userId GROUP BY andharbharbettings.userId) WHERE EXISTS(SELECT 1 FROM andharbharbettings WHERE andharbharbettings.andharBharMatchId = :andharBharMatchId AND andharbharbettings.type = :type AND users.id = andharbharbettings.userId);"

    await sequelize.query(query, {
      replacements: {
        andharBharMatchId: currentMatch.id,
        type
      }
    });
    await AndharBharMatch.update({
      win: type
    }, {
      where: {
        id: currentMatch.id
      }
    })
    return res.status(200).send({
      status: true,
      msg: "match creted successfully !!",
      getWinCard,
      andharArray,
      bharArray,
      winnerArray
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ status: false, msg: "match create  error!! ", error: error });
  }
};

const matchHistory = async (req, res) => {
  try {
    const getHistory = await AndharBharMatch.findAll({
      order: [['id', 'DESC']],
      limit:10,
      attributes: ['id','win']
    });
    return res.status(200).send({ status: true, msg: " match history successfully", getHistory })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "Error match history" })
  }
};

module.exports = { createMatch, createBet, createMatchCards, matchHistory };
