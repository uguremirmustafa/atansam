import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
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
SchoolSchema.plugin(mongoosePaginate);
export default mongoose.models.School || mongoose.model('School', SchoolSchema);
