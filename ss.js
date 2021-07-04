const htmlparser2 = require("htmlparser2");
const got = require('got');
let old_urls = []
let url = 'https://funkydunky.ru/catalog/obuv/muzhskoe/'
const http_headers = {
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ru', 'dnt': '1', "Connection": "keep-alive"
}
for (let i = 0; i < 100; i++) {
    (async () => {
        try {
            const response = await got(url, {headers:http_headers});
            let new_urls = []
            const parser = new htmlparser2.Parser({
                onopentag(name, attributes) {
                    if (name === "a" && attributes.class === "product-new-link link_no-loader") {
                        new_urls.push(attributes.href)
                    }
                }

            });
            parser.write(response.body)
            parser.end()
            let difference = new_urls.filter(x => !old_urls.includes(x));
            if (difference.length !== 0) {
                console.log(difference)
                old_urls = new_urls
                let datetime = new Date();
                console.log(datetime.toISOString());
            } else {
                let datetime = new Date();
                console.log(datetime.toISOString());

            }
        } catch (error) {
            console.log(error.response.body);
        }
    })();
}
