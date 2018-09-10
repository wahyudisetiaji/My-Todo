const axios = require('axios')

class QoutesController {

    static qoutesOfTheDay(req, res) {

        let url = 'https://talaikis.com/api/quotes/random/'

        axios.get(url)
        .then((quotes) => {
            res.status(200).json({
                message: 'qoutes of the day',
                quotes: quotes.data
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    }
}

module.exports = QoutesController