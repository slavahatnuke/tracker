var id = require('pow-mongodb-fixtures').createObjectId;

function ObjectId(str) {
    return id(str);
}

exports.users = [
    {
        "_id" : ObjectId("5514462ae4eb270b4f115c2c"),
        first: 'Andy',
        last: 'Garcia',
        email: 'mailtotesthere@gmail.com',
        local: {
            username: 'test',
            "passwordHashed" : "fda8e930419f06a6581723af973783ab3b3290de6d80f32f85fa5ea719521c50",
            "passwordSalt" : "767d93afc0aac50f5983561e4bc145686dec7e86ef57fdf3bd8f46e7b24aeb9f"
        }
    },
    {
        "_id" : ObjectId("5514462ae4eb270b4f115c3c"),
        first: 'Danny',
        last: 'Trejo',
        email: 'test2@gmail.com',
        local: {
            username: 'test2',
            "passwordHashed" : "fda8e930419f06a6581723af973783ab3b3290de6d80f32f85fa5ea719521c50",
            "passwordSalt" : "767d93afc0aac50f5983561e4bc145686dec7e86ef57fdf3bd8f46e7b24aeb9f"
        }
    },
    {
        "_id" : ObjectId("5514462ae4eb270b4f115c4c"),
        first: 'Arnie',
        last: 'Shwarziniggah',
        email: 'test3@gmail.com',
        local: {
            username: 'test3',
            "passwordHashed" : "fda8e930419f06a6581723af973783ab3b3290de6d80f32f85fa5ea719521c50",
            "passwordSalt" : "767d93afc0aac50f5983561e4bc145686dec7e86ef57fdf3bd8f46e7b24aeb9f"
        }
    }
];