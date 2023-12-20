const { CronJob } = require('cron');
const {Op} = require('sequelize');
const ChatHistory = require('../models/chatHistory');
const ArchivedChat = require('../models/archeived_chat');
exports.job = new CronJob(
    '0 0 * * *', 
    function () {
        archiveOldRecords();
    },
    null,
    false,
    'Asia/Kolkata'
);

async function archiveOldRecords() {
    try {
        const aDaysAgo = new Date();
        aDaysAgo.setDate(aDaysAgo.getDate() - 1);

        // const fiveMinutesAgo = new Date();
        // fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
        // Find records to archive
        const recordsToArchive = await ChatHistory.findAll({
            where: {
            date_time: {
                [Op.lt]: aDaysAgo,
            },
            },
        });
  
        // Archive records
        await Promise.all(
            recordsToArchive.map(async (record) => {
            await ArchivedChat.create({
                id: record.id,
                message: record.message,
                date_time: record.date_time,
                isImage:record.isImage,
                UserId: record.UserId,
                GroupId: record.GroupId
            });
            await record.destroy();
            })
        );
        console.log('Old records archived successfully.');
    } catch (error) {
        console.log('Error archiving old records:', error);
    }
}

