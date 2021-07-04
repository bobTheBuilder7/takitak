from lxml import html
from lxml.html.clean import clean_html
import requests
import datetime

url = 'https://funkydunky.ru/catalog/obuv/muzhskoe/'
old = []
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) '
                  'Version/14.1.1 Safari/605.1.15',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ru', 'dnt': '1', "Connection": "keep-alive"}


def loop(old_urls):
    r = requests.get(url, headers=headers).text
    new_urls = []
    tree = html.document_fromstring(clean_html(r))
    for i in tree.find_class('product-new-link link_no-loader'):
        for j in i.iterlinks():
            if j[1] == 'href':
                new_urls.append(j[2])
    if old_urls == new_urls:
        print(datetime.datetime.now())
    else:
        print(set(new_urls) ^ set(old_urls))
        print(datetime.datetime.now())
    loop(new_urls)
loop(old_urls=old)
