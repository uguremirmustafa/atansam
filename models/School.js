import mongoose from 'mongoose';

const SchoolSchema = new mongoose.Schema(
  {
    name: 'String',
    il: 'String',
    ilce: 'String',
    kont: 'Number',
    tercihEdenler: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.School || mongoose.model('School', SchoolSchema);
