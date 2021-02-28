import School from '@models/School';
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      await getCities(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getCities = async (req, res) => {
  try {
    const cities = await School.distinct('il');
    // const provinces = await School.distinct('ilce');

    res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
