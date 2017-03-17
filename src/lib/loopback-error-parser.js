export default function parseLoopbackError(response) {
    return response.json()
        .then(loopbackError => {
            var message = loopbackError.error.details.messages;
            var errorObject = {};
            for (var prop of Object.getOwnPropertyNames(message))
                errorObject[prop] = message[prop].join(", ");

            return errorObject;
        })
}