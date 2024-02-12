import jwt from 'jsonwebtoken';

export const getSignedToken = (payload: any, secret: string, options?: jwt.SignOptions) => {
  return jwt.sign(payload, secret, options);
};

export const verify = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const decode = (token: string) => {
  return jwt.decode(token);
};

export const refresh = (token: string, secret: string, options?: jwt.SignOptions) => {
  const decoded = decode(token);
  if (decoded) {
    return getSignedToken(decoded, secret, options);
  }
  return null;
};

export const verifyRefresh = (token: string, secret: string) => {
  const decoded = decode(token);
  if (decoded) {
    return verify(token, secret);
  }
  return null;
};


