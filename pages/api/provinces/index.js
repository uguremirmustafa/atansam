import School from '@models/School';
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      await getProvinces(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getProvinces = async (req, res) => {
  try {
    const { il } = req.query;
    // const provinces = await School.find({ il: il }).select('ilce -_id');
    const provinces = await School.distinct('ilce', { il: il });

    res.status(200).json({
      success: true,
      data: provinces,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
