import School from '@models/School';
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      await getSchool(req, res);
      break;
    case 'PUT':
      await updateSchool(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getSchool = async (req, res) => {
  try {
    const school = await School.findById(req.query.id);
    res.status(200).json({
      success: true,
      data: school,
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
