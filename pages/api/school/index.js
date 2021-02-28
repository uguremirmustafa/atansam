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
    let { il, ilce, search } = req.query;
    let city = decodeURIComponent(il);
    let province = decodeURIComponent(ilce);
    let searchTerm = decodeURIComponent(search);
    console.log(searchTerm);
    if (city === 'hepsi' && province === 'hepsi' && searchTerm === ('' || undefined)) {
      const schools = await School.find({}, 'name il ilce');
      res.status(200).json({
        success: true,
        data: schools,
      });
      return;
    }
    if (city === 'hepsi' && province === 'hepsi' && searchTerm !== ('' || undefined)) {
      const schools = await School.find(
        { name: { $regex: searchTerm, $options: 'i' } },
        'name il ilce'
      );
      res.status(200).json({
        success: true,
        data: schools,
      });
      return;
    }
    if (city !== 'hepsi' && province === 'hepsi' && searchTerm === ('' || undefined)) {
      const schools = await School.find({
        il: city,
      });
      res.status(200).json({
        success: true,
        data: schools,
      });
      return;
    }
    if (city !== 'hepsi' && province !== 'hepsi' && searchTerm !== ('' || undefined)) {
      const schools = await School.find({
        $and: [{ il: city }, { ilce: province }, { name: { $regex: searchTerm, $options: 'i' } }],
      });
      res.status(200).json({
        success: true,
        data: schools,
      });
      return;
    }
    if (city !== 'hepsi' && province === 'hepsi' && searchTerm !== ('' || undefined)) {
      const schools = await School.find({
        $and: [{ il: city }, { name: { $regex: searchTerm, $options: 'i' } }],
      });
      res.status(200).json({
        success: true,
        data: schools,
      });
      return;
    }

    const schools = await School.find({
      $and: [{ il: city }, { ilce: province }],
    });
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
