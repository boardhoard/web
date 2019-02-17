import convert from 'xml-js';

const top = async () => {
    const response = await fetch('https://www.boardgamegeek.com/xmlapi2/hot', {
        method: 'GET',
    })
    const json = convert.xml2js(await response.text(), {compact: true, spaces: 4});
    console.log(json.items.item)

    //Do a fetch to the top bgg API 
    // Use 'convert' methods here: https://www.npmjs.com/package/xml-js
    // return the json object.
}



export {top}