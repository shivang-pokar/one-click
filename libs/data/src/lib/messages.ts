import { Connection } from "./integration"

export const messages = {
    REQUIRED: 'Please fill all required data properly',
    VARIFICATION: 'A verification link has been sent to your email account',
    NOT_VERIFIED: 'Your email address is not verified',
    INT_COMPLETED: 'Integration completed successfully',
    INT_DETAILS_UPDATED: 'Integration details updated successfully',
    ARE_YOU_SURE: 'Are you sure you want to disconnect?',
    INT_REMOVED: 'Account removed successfully',
    INI_ALREADY: 'Account already added',
    POST_REQUIRED: `Hold on there! You can't post nothing. Please add a message or media.`,
    POST_REQUIRED_MAX_LENGTH: 'Hold on! Max limit is @number chars in @social. Please shorten your input.',
    LIMITE_EXCE_TITLE: 'Oops! Character Limit Exceeded',
    IMG_RATION: 'Oops! Image ration is not correct',

}

export const ConnectionList: Array<Connection> = [
    {
        id: 'FACEBOOK',
        image: 'facebook.png',
        socialName: 'Facebook',
        socialDescription: 'Page or Group',
        connected: false,
        color: '#4267b2',
        sendPost: false,
        badge: 0,
        charecterLimite: 0,
        imageRationMin: 0,
        imageRationMax: 0,
    },
    {
        id: 'INSTAGRAM',
        image: 'instagram.png',
        socialName: 'Instagram',
        socialDescription: 'Business account',
        connected: false,
        color: '#bc2a8d',
        sendPost: false,
        badge: 0,
        charecterLimite: 2200,
        imageRationMin: 0.8,
        imageRationMax: 1.91,
    },
    {
        id: 'TWITTER',
        image: 'twitter.png',
        socialName: 'Twitter',
        socialDescription: 'Profile',
        connected: false,
        color: '#1d9bef',
        sendPost: false,
        badge: 0,
        charecterLimite: 280,
        imageRationMin: 0,
        imageRationMax: 0,
    },
    {
        id: 'LINKEDIN',
        image: 'linkedin.png',
        socialName: 'Linkedin',
        socialDescription: 'Profile',
        connected: false,
        color: '#0a65c2',
        sendPost: false,
        badge: 0,
        charecterLimite: 0,
        imageRationMin: 0,
        imageRationMax: 0,
    }
]