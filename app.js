// Trie Articles
// By: Jonathan Lafleur, Michael Macari and Anthony Rusignuolo

var prompt = require('prompt-sync')();
var fs = require('fs');

class TrieNode {
    constructor(char){
        this.char = char;
        this.children = {};
        this.wordEnd = false; // May take out if not needed
        this.relvance = null;
    }

    add(){
        //TODO
    }

    find(){
        //TODO
    }

}

function readInCompanies(filepath) {
    //TODO
    //Look at Huffman Codes readIn for reference
    if (filepath === '')
        filepath = './companies.dat';
    try {
        return fs.readFileSync(filepath, 'utf8')
                 .split('\r\n');
    }
    catch( error) {
        return "The file doesn't exist";
    }
}

function readInArticles() {
    //TODO: 
    //Open file, scan words for company relevance and total word count
    let article = fs.readFileSync('article.dat', 'utf8')
                    .split(' ');
}

function main() {
    //Read in companies and make list of them
    //Create root trie node
    // For each company in list add to trie root

    //readInArticle
    //find relevance and total word count for words in article

    //Print Results
}

main();