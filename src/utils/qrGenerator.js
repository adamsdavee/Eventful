const QRCode = require("qrcode")

const generateQRCode = async (data) => {
   try {
      return await QRCode.toDataURL(JSON.stringify(data))
   } catch (error) {
      throw new Error("QR generation failed")
   }
}

module.exports = generateQRCode
