import School from '@models/School';
import User from '@models/User';
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      await getComments(req, res);
      break;
    case 'POST':
      await addComment(req, res);
      break;
    case 'DELETE':
      await deleteComment(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

const getComments = async (req, res) => {
  try {
    const { id } = req.body;
    const yorumlar = await School.findById(id).select('yorumlar');
    res.status(200).json({
      success: true,
      data: yorumlar,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'bi problem var, sonra tekrar deneyin!' });
  }
};
const addComment = async (req, res) => {
  try {
    const { userEmail, comment, okulAdi, id } = req.body;
    console.log(userEmail, comment, okulAdi, id);
    const school = await School.findByIdAndUpdate(id, {
      $push: {
        yorumlar: { kullanici: userEmail, yorum: comment },
      },
    });

    // const user = await User.findOneAndUpdate(
    //   { email: userEmail },
    //   {
    //     $push: {
    //       yorumlar: { okul: okulAdi, yorum: comment, okulId: id },
    //     },
    //   }
    // );
    res.status(200).json({
      success: true,
      data: school,
      message: 'yorumladiniz!',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'bi problem var, sonra tekrar deneyin!' });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { commentId, id } = req.body;
    console.log(commentId, id);
    const school = await School.findByIdAndUpdate(id, {
      $pull: {
        yorumlar: { _id: commentId },
      },
    });
    // const user = await User.findOneAndUpdate(
    //   { email: email },
    //   {
    //     $pull: { yorumlar: { _id: commentId } },
    //   }
    // );

    res.status(200).json({
      success: true,
      data: school,
      // user,
      message: 'silindi!',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'bi problem var, sonra tekrar deneyin!' });
  }
};
