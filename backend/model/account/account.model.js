const mongoose = require("mongoose");
const Account = require("./account.mongo.js");

async function giveRandomBalance(user) {
  await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  });
}

async function getAccountBalance(id) {
  const account = await Account.findOne({
    userId: id,
  });
  return account.balance;
}

async function moneyTransfer(transactionDetails, id) {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { to, amount } = transactionDetails;

  const account = await Account.findOne({ userId: id }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return { status: false, msg: "Insufficient balance" };
  }

  try {
    await Account.findOne({ userId: to }).session(session);
  } catch (err) {
    return { status: false, msg: "User does not exists" };
  }

  try {
    await Account.updateOne(
      { userId: id },
      { $inc: { balance: -amount } },
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } },
    ).session(session);

    await session.commitTransaction();

    return { status: true, msg: "Transaction successful" };
  } catch (err) {
    return { status: false, msg: err.message };
  }
}

module.exports = {
  giveRandomBalance,
  getAccountBalance,
  moneyTransfer,
};
