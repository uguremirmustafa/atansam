import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    image: String,
    sinavSiralamasi: {
      type: Number,
    },
    tercihler: [
      {
        school: {
          type: mongoose.Types.ObjectId,
          ref: 'school',
        },
        tercihSirasi: Number,
        okulAdi: String,
      },
    ],
    yorumlar: [
      {
        okul: 'String',
        okulId: 'String',
        yorum: 'String',
      },
    ],
  },
  {
    timestamps: true,
  }
);
// userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });
export default mongoose.models.user || mongoose.model('user', userSchema);
