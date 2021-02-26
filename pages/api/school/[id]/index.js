import School from '@models/School';
import User from '@models/User';
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
    case 'DELETE':
      await removeTercih(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getSchool = async (req, res) => {
  try {
    const school = await School.findById(req.query.id).populate('tercihEdenler');
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
    const { userId, okulAdi, tercihSirasi } = req.body;
    console.log(req.body);

    const sc = await School.findById(req.query.id);
    if (!sc.tercihEdenler.includes(userId)) {
      const usr = await User.findById(userId);
      const tercihSiralari = usr.tercihler.map((i) => i.tercihSirasi);
      if (tercihSiralari.includes(tercihSirasi)) {
        res.status(409).json({
          success: false,
          message: 'aynı sıraya başka bir okulu koymuşsunuz!',
        });
        return;
      }
      const user = await User.findByIdAndUpdate(userId, {
        $push: {
          tercihler: { school: req.query.id, okulAdi: okulAdi, tercihSirasi: tercihSirasi },
        },
        // $push: { tercihler: { school: req.query.id, tercihSirasi: 1 } },
      });

      const school = await School.findByIdAndUpdate(req.query.id, {
        $push: { tercihEdenler: userId },
      });
      res.status(200).json({
        success: true,
        data: school,
        user,
        message: 'okulu başarıyla tercih ettiniz!',
      });
    } else {
      res.status(409).json({
        success: false,
        message: 'bu tercihi daha önce yapmışsınız!',
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'bi problem var, sonra tekrar deneyin!' });
  }
};
const removeTercih = async (req, res) => {
  try {
    const { userId } = req.body;

    const sc = await School.findById(req.query.id);
    if (sc.tercihEdenler.includes(userId)) {
      const user = await User.findByIdAndUpdate(userId, {
        $pull: { tercihler: { school: { $in: req.query.id } } },
      });
      const school = await School.findByIdAndUpdate(req.query.id, {
        $pull: { tercihEdenler: { $in: userId } },
      });
      res.status(200).json({
        success: true,
        data: school,
        user,
      });
    } else {
      res.status(409).json({
        success: false,
        message: 'bu okulu daha once tercih etmemissiniz ki!!!',
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'bi problem var, sonra tekrar deneyin!' });
  }
};
