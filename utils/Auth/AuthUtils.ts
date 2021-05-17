import { Request, Response } from 'express';
import { User } from '../../models/User';
import { Session } from '../../models/Session';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

export const registerUser = async (email: string, password: string) => {
  try {
    const newUser = new User();
    newUser.email = email;
    newUser.password = await newUser.hashPassword(password);
    newUser.role = 'admin';
    return newUser.save();
  } catch (error) {
    throw new Error('Could not register user');
  }
};

export const logUserIn = async (userId: string, req: Request, res: Response) => {
  try {
    const connectionInformation = {
      userAgent: req.get('user-agent'),
    };

    const sessionToken = await createSession(userId, connectionInformation);
    await refreshTokens(sessionToken, userId, res);
  } catch (error) {
    throw new Error('Log in failed');
  }
};

import { randomBytes } from 'crypto';

export async function createSession(userId: string, connection: { userAgent: string }) {
  try {
    const sessionToken = randomBytes(43).toString('hex');

    const { userAgent } = connection;

    const newSession = new Session({
      sessionToken,
      userId,
      valid: true,
      userAgent,
    });

    await newSession.save();

    // Return session token
    return sessionToken;
  } catch (error) {
    throw new Error('Could not create token');
  }
}

export async function refreshTokens(sessionToken: string, userId: string, res: Response) {
  try {
    const { accessToken, refreshToken } = await createTokens(sessionToken, userId);

    const now = new Date();
    const refreshExpires = now.setDate(now.getDate() + 30);

    res
      .cookie('refreshToken', refreshToken, {
        path: '/',
        domain: 'localhost',
        httpOnly: true,
        maxAge: refreshExpires,
        secure: process.env.NODE_ENV === 'production' ? true : false,
      })
      .cookie('accessToken', accessToken, {
        path: '/',
        domain: 'localhost',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
      });
  } catch (error) {
    throw new Error('Could not generate tokens');
  }
}

export async function createTokens(sessionToken: string, userId: string) {
  try {
    const refreshToken = jwt.sign({ sessionToken }, process.env.JWT_SIGNATURE);
    const accessToken = jwt.sign({ sessionToken, userId }, process.env.JWT_SIGNATURE);

    return { refreshToken, accessToken };
  } catch (e) {
    throw new Error('Could not create tokens');
  }
}

export async function authorizeUser(email: string, password: string) {
  try {
    // Look up user
    const userData = await User.findOne({ email });

    if (!userData) {
      return { isAuthorized: false };
    }
    // Get user password
    const savedPassword = userData.password;

    // compare password with one in database
    const isAuthorized = await compare(password, savedPassword);

    // Return the bool of if password is correct
    return { isAuthorized, userId: userData._id };
  } catch (error) {
    throw new Error('Could not authorie user');
  }
}

export async function logUserOut(req: Request, res: Response) {
  try {
    if (req?.cookies?.refreshToken) {
      const { refreshToken } = req.cookies;
      const { sessionToken } = jwt.verify(refreshToken, process.env.JWT_SIGNATURE);

      await Session.findOneAndRemove({ sessionToken });

      res.clearCookie('refreshToken').clearCookie('accessToken');
    }
  } catch (error) {
    throw new Error('Could not log user out');
  }
}

export async function getUserFromCookies(req: Request, res: Response) {
  try {
    // If access token
    if (req?.cookies?.accessToken) {
      const { accessToken } = req.cookies;
      const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SIGNATURE);

      const foundUser = await User.findOne({
        _id: decodedAccessToken?.userId,
      });

      return {
        id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
      };
    }
    // if no access token but refresh token
    if (req?.cookies?.refreshToken) {
      const { refreshToken } = req.cookies;
      const { sessionToken } = jwt.verify(refreshToken, process.env.JWT_SIGNATURE);
      const currentSession = await Session.findOne({ sessionToken });

      if (currentSession.valid) {
        const currentUser = await User.findOne({ _id: currentSession.userId });

        await refreshTokens(sessionToken, currentUser._id, res);

        return {
          id: currentUser._id,
          email: currentUser.email,
          role: currentUser.role,
        };
      }
    }
  } catch (e) {
    console.error(e);
  }
}
