import School from '@models/School';
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      await getSchools(req, res);
      break;
    case 'POST':
      await getSchoolsCommented(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getSchools = async (req, res) => {
  try {
    let { page, perPage, search } = req.query;
    console.log(search);
    const options = {
      page: parseInt(page),
      limit: parseInt(perPage),
    };
    const schools = await School.paginate({ name: { $regex: search, $options: 'i' } }, options);
    res.status(200).json({
      success: true,
      data: schools,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
const getSchoolsCommented = async (req, res) => {
  try {
    let { email } = req.body;
    console.log(email);

    const schools = await School.find({ 'yorumlar.kullanici': email }, 'yorumlar name');

    res.status(200).json({
      success: true,
      data: schools,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
