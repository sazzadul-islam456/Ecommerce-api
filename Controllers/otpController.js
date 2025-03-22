const userSchema = require("../model/userSchema");

async function otpController(req, res) {
   {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User is not found" });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.json({ message: "User is verified" });
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ error: "Invalid OTP or OTP expired" });
    }

    // Mark user as verified and clear OTP fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();  // Save user changes to the database

    res.status(200).json({
        message: "Email verifacitation succesfully done",
    });
  } 

}

module.exports = otpController;
