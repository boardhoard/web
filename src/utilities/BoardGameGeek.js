import convert from 'xml-js';

const top = async () => {
    const response = await fetch('https://www.boardgamegeek.com/xmlapi2/hot', {
        method: 'GET',
    })
    const json = convert.xml2js(await response.text(), {compact: true, ignoreDeclaration: true});

    return json.items.item.map(el => {
        return {
            id: el._attributes.id,
            rank: el._attributes.rank,
            name: el.name._attributes.value,
            thumbnail: el.thumbnail._attributes.value,
            yearPublished: el.yearpublished._attributes.value
        }
    })
}



export {top}