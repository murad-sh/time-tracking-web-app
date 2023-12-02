import mongoose from 'mongoose';

export interface IEmailReport {
  startDate: Date;
  endDate: Date;
}

const emailReportSchema = new mongoose.Schema<IEmailReport>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const EmailReport: mongoose.Model<IEmailReport> =
  mongoose.models.EmailReport ||
  mongoose.model<IEmailReport>('EmailReport', emailReportSchema);

export default EmailReport;
