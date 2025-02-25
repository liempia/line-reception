const LINE_CHANNEL_ACCESS_TOKEN = 'Unfc4s8DUQUOe3PzlWTUNpHqUkrotyjm.....faf=';
const EventName = '第1回ふるさと祭り';
const EventPrefix = 'event01'

function doPost(e) {
    try {
        // LINEからのリクエストを解析
        const json = JSON.parse(e.postData.contents);
        const events = json.events;

        events.forEach(event => {
            const timestamp = new Date();
            const userId = event.source.userId;

            if (event.type === 'message' && event.message.type === 'text') {
                const messageId = event.message.id;
                const messageText = event.message.text;

                // LINE受付
                if (messageText.slice(0, EventPrefix.len()) == EventPrefix) {
                    let receptionNumber = parseInt(messageText.slice(5), 10);
                    let verificationCode = (receptionNumber * 7 + 3) % 10;

                    sendTextMessage(event.replyToken, EventName + "の受付ありがとうございます。\n確認コードは「" + verificationCode + "」です。\n受付端末に入力してください。")

                    const EventSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('受付記録');

                    if (!EventSheet) {
                        throw new Error("シート '受付記録' が見つかりません。作成してください。");
                    }

                    EventSheet.appendRow([timestamp, userId, messageId, messageText]);
                }
            }
        }
        )
        return ContentService.createTextOutput(JSON.stringify({ 'status': 'success' })).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        Logger.log(error);
        return ContentService.createTextOutput(JSON.stringify({ 'status': 'error', 'message': error.message })).setMimeType(ContentService.MimeType.JSON);
    }
}


function sendTextMessage(replyToken, message) {
    var url = "https://api.line.me/v2/bot/message/reply";
    var headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + LINE_CHANNEL_ACCESS_TOKEN
    };

    var payload = JSON.stringify({
        replyToken: replyToken,
        messages: [{
            type: "text",
            text: message
        }]
    });

    var options = {
        method: "post",
        headers: headers,
        payload: payload
    };

    UrlFetchApp.fetch(url, options);
}
