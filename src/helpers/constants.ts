export const ERROR_MESSAGE = {
    USER_ALREADY_EXIST : 'User already exists',
    INVALID_CREDENTIALS : 'Incorrect email or password',
    SEND_EMAIL_FAILURE : 'Error sending email',
    INVALID_RESET_TOKEN: 'Invalid token!',
    INVALID_OPERATION : 'Invalid operation',
    ACCOUNT_DEACTIVATED : 'Your account has been deactivated. Please contact your administrator',
    PROMPT_IMAGE_NOT_FOUND : 'Clinical note and images are required',
    ACCESS_DENIED : 'Access denied'
}

export const ERROR_CODE = {
    CONFLICT : 209,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

export const ROLES = {
    PATIENT : 'Patient',
    DOCTOR: 'Doctor'
}

export const EMAIL_SUBJECTS = {
    PASSWORD_RESET : 'Password Reset Request',
    ACCOUNT_VERIFY: 'Verify Your Account'
}

export const API_RESPONSE_MESSAGE = {
    SENT_EMAIL : 'Password reset email sent',
    PASSWORD_RESET : 'Password has been reset'
}

export const AISTRATEGY = {
    DEFAULT_STRATEGY : 'gemini',
    GEMINI_MODEL: "gemini-1.5-flash"
}

export const REPORT_TYPES = {
    XRAY : 'XRAY',
    BLOOD_REPORT : 'BLOOD_REPORT',   
}

export type ReportType = keyof typeof REPORT_TYPES;