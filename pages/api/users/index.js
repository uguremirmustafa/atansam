import User from '@models/User';
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      await getUsers(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getUsers = async (req, res) => {
  try {
    const userEmail = req.body;
    console.log(userEmail);
    if (userEmail == 'uguremirmustafa@gmail.com') {
      const users = await User.find({});
      res.status(200).json({
        success: true,
        data: users,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'unauthorized',
      });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
