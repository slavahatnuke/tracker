module.exports = {
    "app": {
        "port": 4000
    },
    "session": {
        "secret": "tracker$app$$secrettttt"
    },
    "host": {
        "url": "http://localhost:4000"
    },
    "tokenizer": {
        "secret": "tracker$ker$app$$secret"
    },
    "mailer": {
        "sender": "mailtotesthere@gmail.com",
        "password": "xxx666up"
    },
    "mongo": {
        "uri": "mongodb://localhost/tracker",
        "debug": false
    },
    "fixtures": {
        "load": false
    },
    "facebookAuth": {
        "clientID": "423090387878355",
        "clientSecret": "074b2947c5c47ca55abbd0a12cc8b6c6",
        "callbackURL": "/auth/facebook/callback"
    },

    "twitterAuth": {
        "consumerKey": "NyVl8IVcKPMEK3fGdyq3hHGu3",
        "consumerSecret": "ba5YfOLefi7xgaabQTyh6MEhvxtSMcXM1UXfMssP5pP8mgBYCv",
        "callbackURL": "/auth/twitter/callback"
    },

    "googleAuth": {
        "clientID": "796647392665-dk8m7crco569d9on57phtsp2ilfg7221.apps.googleusercontent.com",
        "clientSecret": "5ZYQjvsIfYXo97W_MXiFxZ46",
        "callbackURL": "/auth/google/callback"
    }
}