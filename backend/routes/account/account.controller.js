const {
  getAccountBalance,
  moneyTransfer,
} = require("../../model/account/account.model.js");
const { transferSchema } = require("../../services/zodSchemas.js");

async function httpGetBalance(req, res) {
  const id = req.id;

  try {
    const balance = await getAccountBalance(id);
    return res.status(200).json({
      balance,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
}

async function httpTransfer(req, res) {
  const checkData = await transferSchema.safeParseAsync(req.body);

  if (!checkData.success) {
    return res.status(400).json({
      msg: checkData.error,
    });
  }

  try {
    const { status, msg } = await moneyTransfer(checkData.data, req.id);

    if (!status) {
      return res.status(400).json({
        msg,
      });
    }

    return res.status(200).json({
      msg,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

module.exports = { httpGetBalance, httpTransfer };
