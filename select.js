import crypto from "crypto";

// Generate a random JWT secret key
// export async function loginUser(req, res, next)
export async function generateJWTSecret(){
  return crypto.randomBytes(64).toString('hex');
};

// Print the generated secret key
console.log(generateJWTSecret());