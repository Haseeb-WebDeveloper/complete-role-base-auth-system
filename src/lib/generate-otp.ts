export const generateOTP = () => {
    // generate a random 6 digit number
    return Math.floor(100000 + Math.random() * 900000).toString();
}