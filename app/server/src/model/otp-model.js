class Otp {
    constructor(code, userId) {
        this.userId = userId;
        this.code = code;
        this.createdAt = Date.now();
        this.expiredAt = Date.now() + (3 * 60 * 1000);
    }
}

export {
    Otp
}

