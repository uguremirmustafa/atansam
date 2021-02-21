import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    image: String,
    sinavSiralamasi: { type: Number, unique: true },
    tercihler: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'school',
      },
    ],
  },
  {
    timestamps: true,
  }
);
let Dataset = mongoose.models.user || mongoose.model('user', userSchema);
export default Dataset;
