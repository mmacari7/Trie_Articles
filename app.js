// Trie Articles
// By: Jonathan Lafleur, Michael Macari and Anthony Rusignuolo

var prompt = require('prompt-sync')();
var fs = require('fs');

class TrieNode {
    constructor(){
        this.children = {};
        this.isWordEnd = false; 
    }
}
class Trie {
    constructor(){
        this.root = new TrieNode();
    }

    add(word){
        let ptr = this.root;
        for (let char of word) {
            if (!ptr.children.hasOwnProperty(char))
                ptr.children[char] = new TrieNode();
            ptr = ptr.children[char];
        }
        ptr.isWordEnd = true;
    }

    find(word){
        let ptr = this.root;
        for (let char of word) {
            if(!ptr.children.hasOwnProperty(char))
                return false;
            ptr = ptr.children[char];
        }
        return ptr.isWordEnd;
    }

}

function readInCompanies(filepath) {
    if (filepath === '')
        filepath = './companies.dat';
    try {
        return fs.readFileSync(filepath, 'utf8')
                 .split(/\r?\n/);
    }
    catch(error) {
        return "The companies.dat file doesn't exist";
    }
}

function readInArticles() {
    //TODO:
    //Open file, scan words for company relevance and total word count
    let article = fs.readFileSync('article.dat', 'utf8').split(' ');


}

function main() {
    //Read in companies and make list of them
    const folderPath = prompt('Enter the path to your "companies.dat" to be loaded or nothing if "companies.dat" is in your current directory: ');
    let companies = readInCompanies(folderPath);
    if(companies === "The companies.dat file doesn't exist") {
        console.log("The companies.dat file doesn't exist");
        return;
    }
    companies = companies.map(company => company.split(/\t/));
    //console.log(companies);

    //Create root trie node
    let t = new Trie();

    // For each company in list add to trie root
    companies.forEach(companie => 
        companie.forEach(word => t.add(word))
    );

    //console.log(t);
    console.log("Added all companie names into Trie");

    //readInArticle
    //find relevance and total word count for words in article

    //Print Results
}

main();