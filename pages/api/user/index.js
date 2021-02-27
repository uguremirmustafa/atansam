import User from '@models/User';
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      await getUser(req, res);
      break;
    case 'PUT':
      await updateUser(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getUser = async (req, res) => {
  try {
    const userEmail = req.body;
    const user = await User.findOne({ email: userEmail }).populate('tercihler');
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
const updateUser = async (req, res) => {
  try {
    const { email, values } = req.body;
    const user = await User.findOneAndUpdate({ email: email }, { sinavSiralamasi: values.derece });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
