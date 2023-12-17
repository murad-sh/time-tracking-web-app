export const emailContent = (
  username: string,
  weekStart: string,
  weekEnd: string,
  totalTimeSpent: string,
  reportLink: string
) => `<!DOCTYPE html>
<html>
    <head>
        <title>Weekly Time Track Report</title>
    </head>
    <body>
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; border: 1px solid #E0E0E0; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); margin: 20px auto; border-radius: 6px;">
            <h1 style="background-color: #752f9b; padding: 15px; text-align: center; font-size: 22px; color: #ffffff; border-radius:6px; margin: 0;">Weekly Time Track Report</h1>
            <div style="margin-top: 20px; line-height: 1.6; color: #333; padding: 0 10px;">
            <p style="font-size: 16px; color: #201a2d;">Hi <strong>${username}</strong>,</p>
            <p style="font-size: 16px; color: #201a2d;">Here's your time tracking report from <strong>${weekStart}</strong> to <strong>${weekEnd}</strong></p>
            <p style="font-size: 16px; color: #201a2d;">Overall Time Spent This Week: <strong>${totalTimeSpent}</strong></p>
                <a href="${reportLink}" style="text-align: center; display: inline-block; text-decoration: none; background-color: #752f9b; color: #ffffff; font-weight: bold; margin-top: 20px; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 18px;">View Full Report</a>
            </div>
        </div>
    </body>
</html>`;
