import User from '@models/User';
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      await getUser(req, res);
      break;
    case 'PUT':
      await updateSchool(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getUser = async (req, res) => {
  try {
    const userEmail = req.body;
    console.log(userEmail);
    const user = await User.findOne({ email: userEmail });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
const updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.query.id, {
      tercihEdenler: [],
    });
    res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
