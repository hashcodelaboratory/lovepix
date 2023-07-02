import { UserMail } from 'common/api/send-mail'

export const emailTemplateUser = (_body: UserMail) => {
  return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"> <!-- Tell iOS not to automatically link certain text strings. -->
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

        <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    <![endif]-->

        <!-- Web Font / @font-face : BEGIN -->
        <!-- NOTE: If web fonts are not required, lines 23 - 41 can be safely removed. -->

        <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
        <!--[if mso]>
            <style>
                * {
                    font-family: sans-serif !important;
                }
            </style>
        <![endif]-->

            <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
            <!--[if !mso]><!-->
                <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
                <!--<![endif]-->

                    <!-- Web Font / @font-face : END -->
                </head>
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">


    <!--
    The email background color (#222222) is defined in three places:
    1. body tag: for most email clients
    2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
    3. mso conditional: For Windows 10 Mail
    -->
      <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #fff;">
        <!--[if mso | IE]>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;">
        <tr>
        <td>
        <![endif]-->

            <!-- Visually Hidden Preheader Text : BEGIN -->
            <div style="max-height:0; overflow:hidden; mso-hide:all;" aria-hidden="true">
            </div>
            <!-- Visually Hidden Preheader Text : END -->

            <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
            <!-- Preview Text Spacing Hack : BEGIN -->
            <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: 'Montserrat', sans-serif;">
                &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            </div>
            <!-- Preview Text Spacing Hack : END -->
            <br>
            <!-- Email Body : BEGIN -->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto;" class="email-container">

                <!-- Hero Image, Flush : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;text-align: left; padding: 30px 10px;">
                        <img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Flovepix_logo.png?alt=media&token=939bc382-c47e-4cac-a677-a78a0bd00d06" width="110" height="" alt="fesi_comp" border="0" style="height: auto; font-family: 'Montserrat', sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
                    </td>
                </tr>
                <!-- Hero Image, Flush : END -->
                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="padding: 30px 10px;background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#FBEDEC;">
                            <tr>
                                <td style="text-align: center;">
                                <br><br>
                                <p style="margin: 0 0 10px 0; font-family: 'Montserrat', sans-serif; font-size: 20px; line-height: 25px; color: #333;font-weight: 400;">POTVRDENIE OBJEDNÁVKY</p>
                                <p style="font-size: 12px;font-family: 'Montserrat', sans-serif; font-weight: 200; color: #000000;">${
                                  _body.formData.firstName
                                } ďakujeme za vašu objednávku! <br>
                                Vašu objednávku spracujeme a budeme vás znova kontaktovať.</p>
                                <br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->
                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="padding: 10px 10px;background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#fff;">
                            <tr>
                                <td style="text-align: center;">
                                <p style="margin: 0 0 10px 0; font-family: 'Montserrat', sans-serif; font-size: 20px; line-height: 25px; color: #333;font-weight: 400;">DETAILY OBJEDNÁVKY</p>
                                <p style="font-size: 11px;font-family: 'Montserrat', sans-serif; font-weight: 200; color: #46D5EF; float: left; font-style: italic; text-decoration: underline;">Číslo objednávky: #${
                                  _body.id
                                }</p><p style="font-size: 12px;font-family: 'Montserrat', sans-serif; font-weight: 200; color: #A7A7A7; float: right;">Dátum objednávky: ${
    _body.date
  }</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->
                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="padding: 10px 0px;background-color: #ffffff;font-size: 11px;font-family: 'Montserrat', sans-serif; font-weight: 200; color: #ababab;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#fff;">
                            <tr style="border-top: 1px dotted #d3d3d3;">
                                <td style="text-align: left;padding: 10px;font-weight: 700;color: #000;">Názov produktu</td>
                                <td style="text-align: center;padding: 10px;font-weight: 700;color: #000;">Množstvo</td>
                                <td style="text-align: right;padding: 10px;font-weight: 700;color: #000;">Cena</td>
                            </tr>
                            ${_body?.products?.map(
                              (item: any) =>
                                `<tr style="border-top: 1px dotted #d3d3d3;">
                                  <td style="text-align: left;padding: 10px;color: #000;">${
                                    item.title
                                  }</td>
                                  <td style="text-align: center;padding: 10px;color: #000;">${
                                    item.qty
                                  }</td>
                                  <td style="text-align: right;padding: 10px;color: #000;">${
                                    item.price * item.qty
                                  } €</td>
                              </tr>`
                            )}
                            ${_body?.images?.map(
                              (item: any) =>
                                `<tr style="border-top: 1px dotted #d3d3d3;">
                                    <td style="text-align: left;padding: 10px;color: #000;">${`${item.material} - ${item.height} x ${item.width}`}</td>
                                    <td style="text-align: center;padding: 10px;color: #000;">${
                                      item.qty
                                    }</td>
                                    <td style="text-align: right;padding: 10px;color: #000;">${
                                      item.price * item.qty
                                    } €</td>
                                </tr>`
                            )}
                            <tr style="border-top: 1px dotted #d3d3d3;">
                                <td style="text-align: left;padding: 10px;color: #000;">Doručenie</td>
                                <td style="text-align: right;padding: 10px;color: #000;" colspan="2">${
                                  _body.shipment
                                }</td>
                            </tr>
                            <tr style="border-top: 1px dotted #d3d3d3;">
                                <td style="text-align: left;padding: 10px;color: #000;">Spôsob platby</td>
                                <td style="text-align: right;padding: 10px;color: #000;" colspan="2">${
                                  _body.payment
                                }</td>
                                </tr>
                                ${
                                  _body.payment === 'TRANSACTION'
                                    ? `<tr style="border-top: 1px dotted #d3d3d3;">
                                <td style="text-align: left;padding: 10px;color: #000; font-weight: 700">IBAN</td>
                                <td style="text-align: right;padding: 10px;color: #000;" colspan="2" font-weight: 700">SK11 7500 0000 0040 2375 2975</td>
                                </tr>
                                `
                                    : ''
                                }
                                ${
                                  _body.payment === 'TRANSACTION'
                                    ? `<tr style="border-top: 1px dotted #d3d3d3;">
                                <td style="text-align: left;padding: 10px;color: #000; font-weight: 700">Ako variabilny symbol uveďte číslo objednávky.</td>
                                </tr>
                                `
                                    : ''
                                }
                            <tr style="border-top: 1px dotted #d3d3d3;color: #000;">
                                <td style="text-align: left;padding: 10px;">Cena spolu</td>
                                <td style="text-align: right;font-size: 15px; fontWeight: 600;padding: 10px;" colspan="2">${Number(
                                  _body.totalPrice
                                ).toFixed(2)} € </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->
                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="padding: 10px 10px;background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#fff;">
                            <tr>
                                <td style="text-align: left;">
                                <p style="font-family: 'Montserrat', sans-serif; font-size: 12px; line-height: 14px; color: #333;font-weight: 700; text-decoration: underline;">Fakturačná adresa</p>
                                <p style="font-size: 11px;font-family: 'Montserrat', sans-serif; font-weight: 200; color: #333; float: left;">
                                ${_body.formData.firstName} ${
    _body.formData.lastName
  } <br>
                                ${_body.formData.city}, ${
    _body.formData.address
  } <br>
                        
                                ${_body.formData.postalCode} <br>
                                ${_body.formData.phone} <br><br>
                                </p>
                                </td>
                              
                            </tr>
                            <tr>
                            <td style="text-align: left;">
                            <p style="font-family: 'Montserrat', sans-serif; font-size: 12px; line-height: 14px; color: #333;font-weight: 700; text-decoration: underline;">Doručovacia adresa</p>
                            <p style="font-size: 11px;font-family: 'Montserrat', sans-serif; font-weight: 200; color: #333; float: left;">
                            ${_body.formData.firstName} ${
    _body.formData.lastName
  } <br>
                                ${_body.formData.city}, ${
    _body.formData.address
  } <br>
                             
                                ${_body.formData.postalCode} <br>
                                ${_body.formData.phone} <br><br>
                            </p>
                            </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->
                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="padding: 10px 10px;background-color: #ffffff;border-top: 1px dotted #d3d3d3;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#fff;">
                            <tr>
                                <td style="text-align: center;">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Flovepix_logo.png?alt=media&token=939bc382-c47e-4cac-a677-a78a0bd00d06" width="110" height="" alt="alt_text" border="0" style="height: auto; font-family: 'Montserrat', sans-serif; font-size: 15px; line-height: 15px; color: #555555;">  <br><br>
                                    <a href="https://www.lovepix.sk" style="font-family: 'Montserrat', sans-serif; font-size: 20px; line-height: 24px; color: #333;font-weight: 700;">www.fesicomp.eu</a>
                                    <br><br>
                                </td>
                            </tr>
                            <tr>
                            <td style="text-align: center;">
                            <a href="https://www.facebook.com/ahoj.shopping/" style="padding: 0 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Ffacebook.png?alt=media&token=de28b538-fa48-46d7-8df1-616025a53128" class="imag_foot"></a>
                            <a href="https://www.instagram.com/ahoj.shopping/" style="padding: 0 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Finstagram.png?alt=media&token=3b40bb32-71e5-49b2-884c-8384ebb252d1" class="imag_foot"></a>
                            <a href="https://www.linkedin.com/company/ahojshopping/" style="padding: 0 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Fyoutube.png?alt=media&token=22ab9d51-604a-4a72-8178-72f10857f46c" class="imag_foot"></a>
                            </td>
                        </tr>
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #ababab;font-size: 9px;font-family: 'Montserrat', sans-serif;">Upozorňujeme, že toto je automatický generovaný e-mail a nepredstavuje prijatie vašej ponuky na uzatvorenie kúpnej zmluvy, ale iba potvrdzuje, že sme obdržali vašu objednávku.</p>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->
       </table>
       <!-- Email Body : END -->
       <br>
        <!--[if mso | IE]>
        </td>
        </tr>
        </table>
    <![endif]-->
    </center>
    </body>
    </html>`
}

export const emailTemplateAdmin = (_body: any) => {
  return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"> <!-- Tell iOS not to automatically link certain text strings. -->
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    
        <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    <![endif]-->
    
        <!-- Web Font / @font-face : BEGIN -->
        <!-- NOTE: If web fonts are not required, lines 23 - 41 can be safely removed. -->
    
        <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
        <!--[if mso]>
            <style>
                * {
                    font-family: sans-serif !important;
                }
            </style>
        <![endif]-->
    
            <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
            <!--[if !mso]><!-->
                <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
                <!--<![endif]-->
    
                    <!-- Web Font / @font-face : END -->
                </head> 
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">
    
    
    <!--
    The email background color (#222222) is defined in three places:
    1. body tag: for most email clients
    2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
    3. mso conditional: For Windows 10 Mail
    -->
      <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #fff;">
        <!--[if mso | IE]>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;">
        <tr>
        <td>
        <![endif]-->
    
            <!-- Visually Hidden Preheader Text : BEGIN -->
            <div style="max-height:0; overflow:hidden; mso-hide:all;" aria-hidden="true">
            </div>
            <!-- Visually Hidden Preheader Text : END -->
    
            <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
            <!-- Preview Text Spacing Hack : BEGIN -->
            <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: 'Montserrat', sans-serif;">
                &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            </div>
            <!-- Preview Text Spacing Hack : END -->
            <br>
            <!-- Email Body : BEGIN -->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto;" class="email-container">
    
                <!-- Hero Image, Flush : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;text-align: left; padding: 30px 30px;">
                        <img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Flovepix_logo.png?alt=media&token=939bc382-c47e-4cac-a677-a78a0bd00d06" width="110" height="" alt="alt_text" border="0" style="height: auto; font-family: 'Montserrat', sans-serif; font-size: 15px; line-height: 15px; color: #555555;">                
                    </td>
                </tr>
                <!-- Hero Image, Flush : END -->
                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="padding: 30px 30px;background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#DBF9FF;">
                            <tr>
                                <td style="text-align: center;">
                                <br><br>
                                <p style="margin: 0 0 10px 0; font-family: 'Montserrat', sans-serif; font-size: 20px; line-height: 25px; color: #333;font-weight: 400;">NOVÁ OBJEDNÁVKA!</p>
                                <p style="font-size: 12px;font-family: 'Montserrat', sans-serif; font-weight: 500; color: #000000;">#${_body.id}<br></p>
                                <br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->
                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="padding: 30px 30px;background-color: #ffffff;border-top: 1px dotted #d3d3d3;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#fff;">
                            <tr>
                                <td style="text-align: center;">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Flovepix_logo.png?alt=media&token=939bc382-c47e-4cac-a677-a78a0bd00d06" width="110" height="" alt="alt_text" border="0" style="height: auto; font-family: 'Montserrat', sans-serif; font-size: 15px; line-height: 15px; color: #555555;">  <br><br>
                                    <a href="https://www.lovepix.sk" style="font-family: 'Montserrat', sans-serif; font-size: 20px; line-height: 24px; color: #333;font-weight: 700;">www.lovepix.sk</a>
                                    <br><br>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center;">
                                <a href="https://www.facebook.com/ahoj.shopping/" style="padding: 0 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Ffacebook.png?alt=media&token=de28b538-fa48-46d7-8df1-616025a53128" class="imag_foot"></a>
                                <a href="https://www.instagram.com/ahoj.shopping/" style="padding: 0 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Finstagram.png?alt=media&token=3b40bb32-71e5-49b2-884c-8384ebb252d1" class="imag_foot"></a>
                                <a href="https://www.linkedin.com/company/ahojshopping/" style="padding: 0 10px;"><img src="https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/png%2Fyoutube.png?alt=media&token=22ab9d51-604a-4a72-8178-72f10857f46c" class="imag_foot"></a>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #ababab;font-size: 9px;font-family: 'Montserrat', sans-serif;">Upozorňujeme, že toto je automatický generovaný e-mail a nepredstavuje prijatie vašej ponuky na uzatvorenie kúpnej zmluvy, ale iba potvrdzuje, že sme obdržali vašu objednávku.</p>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->
       </table>
       <!-- Email Body : END -->
       <br>
        <!--[if mso | IE]>
        </td>
        </tr>
        </table>
    <![endif]-->
    </center>
    </body>
    </html>`
}
