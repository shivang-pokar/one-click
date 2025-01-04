
export const genrateInviteEmail = (email, company_name, userName) => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #table-section td,
        #table-section th {
            font-size: 14px;
            border: 1px solid #bbbbbb;
            line-height: 1.5;
            border-collapse: collapse;
        }

        #table-section {
            border-collapse: collapse;
        }
    </style>
</head>

<body style="background-color: #f4f5f7; margin: 0; padding: 30px;">
    <div>
        <div class="im">
            <div bgcolor="#f4f5f7">
                <table cellpadding="0" width="100%" cellspacing="0" border="0"
                    style="font-family: Arial, sans-serif; color: #1e223c;">
                    <tbody>
                        <tr>
                            <td bgcolor="#f4f5f7">
                                <table cellpadding="0" width="600" cellspacing="0" border="0" align="center"
                                    style="padding: 30px; background-color: #fff;">
                                    <tbody>
                                        <tr>
                                            <td colspan="2" style="text-align: left;">
                                                <div class="header"
                                                    style="padding: 0;border-top-left-radius: 8px;border-top-right-radius: 8px;">
                                                    <img style="width: 200px;"
                                                        src="https://firebasestorage.googleapis.com/v0/b/one-click-desk-stage.appspot.com/o/public-data%2Fdesk-logo.png?alt=media&token=7d7c44b2-5fc8-4057-801b-60ad8f1bd922"
                                                        alt="">
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding-top: 40px;"></td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <p style="margin: 0 0 10px 0; color: #000; font-size: 14px;">Hi ${email}
                                                </p>
                                                <p style="margin: 0 0 30px 0; color: #000; font-size: 14px;">${userName} has
                                                    invited
                                                    you to join
                                                    the team on <strong>${company_name}</strong></p>

                                                <a style="color: #FFF; text-decoration: none; padding: 13px; border-radius: 4px; background-color: #000; display: inline-block;"
                                                    href="javascript:void(0)">Accept the invite</a>

                                                <p style="margin: 30px 0 30px 0; color: #000; font-size: 14px;">
                                                    Thanks,
                                                    The Team
                                                </p>

                                            </td>
                                        </tr>

                                        <tr>
                                            <td colspan="2"
                                                style="font-family: Arial,Helvetica,sans-serif;text-align: left;line-height: 162%;font-size: 16px;color: #1e223c; border-top: 1px solid #f4f5f7;">
                                                <div class="footer"
                                                    style="margin-top: 20px;color: #000;font-size: 12px; text-align: center; margin-bottom: 0;">
                                                    <p>This message was sent to you by One Click Desk Cloud</p>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
`
}