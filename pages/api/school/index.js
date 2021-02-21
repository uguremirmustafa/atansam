import School from '@models/School';
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      await getSchools(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getSchools = async (req, res) => {
  try {
    const schools = await School.find({});
    res.status(200).json({
      success: true,
      data: schools,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};