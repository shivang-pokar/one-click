import { Connection } from "./integration"

export const messages = {
    REQUIRED: 'Please fill all required data properly',
    VARIFICATION: 'A verification link has been sent to your email account',
    NOT_VERIFIED: 'Your email address is not verified',
    INT_COMPLETED: 'Integration completed successfully',
    INT_DETAILS_UPDATED: 'Integration details updated successfully',
    ARE_YOU_SURE: 'Are you sure you want to disconnect?'
}

export const ConnectionList: Array<Connection> = [
    {
        id: 'FACEBOOK',
        image: 'facebook.png',
        socialName: 'Facebook',
        socialDescription: 'Page or Group',
        connected: false,
        color: '#4267b2',
        sendPost: false
    },
    {
        id: 'INSTAGRAM',
        image: 'instagram.png',
        socialName: 'Instagram',
        socialDescription: 'Business account',
        connected: false,
        color: '#bc2a8d',
        sendPost: false
    },
    {
        id: 'TWITTER',
        image: 'twitter.png',
        socialName: 'Twitter',
        socialDescription: 'Profile',
        connected: false,
        color: '#1d9bef',
        sendPost: false
    },
    {
        id: 'LINKEDIN',
        image: 'linkedin.png',
        socialName: 'Linkedin',
        socialDescription: 'Profile',
        connected: false,
        color: '#0a65c2',
        sendPost: false
    }
]