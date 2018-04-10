// Trie Articles
// By: Jonathan Lafleur, Michael Macari and Anthony Rusignuolo

var prompt = require('prompt-sync')();
var fs = require('fs');

class TrieNode {
    constructor(parentIndex = -1 ) {
        this.children = {};
        this.parentIndex = parentIndex;
        this.isEnd = false;
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    add(word, parentIndex) {
        let ptr = this.root;
        for (let char of word) {
            if (!ptr.children.hasOwnProperty(char))
                ptr.children[char] = new TrieNode();
            ptr = ptr.children[char];
        }
        ptr.parentIndex = parentIndex;
        ptr.isEnd = true;
    }

    find(word, root = this.root) {
        let ptr = root;
        //console.log('ptr:',ptr);
        for (let char of word) {
            if (!ptr.children.hasOwnProperty(char))
                return [-1];
            ptr = ptr.children[char];
        }
        //console.log(ptr.children[' ']);
        
        if(ptr.children.hasOwnProperty(' '))
            return [ptr.parentIndex, ptr.children[' ']];

        return [ptr.parentIndex];
    }
}

function readInCompanies(filepath) {
    if (filepath === '')
        filepath = './companies.dat';
    try {
        return fs.readFileSync(filepath, 'utf8')
                .split(/\r?\n/)
                .map(company => company.split(/\t/))
                .map(c => c.map(w => w.replace(/[^A-Za-z0-9 ]/g, '')));
            
    }
    catch (error) {
        return "The companies.dat file doesn't exist";
    }
}

function readInArticles() {
    //TODO: 
    //Open file, scan words for company relevance and total word count
    let article = fs.readFileSync('article.dat', 'utf8')
        .split(' ');
}

function printResult(companies, totalWords, trieRoot) {
    //TODO:
    /*Make a function that prints/saves to file
      Company   Hit Count   Relevance
      all names hit counts  relevance
      Total     all hitcnt  allRelevance
      Total Words   totalWords
    */
}

function main() {
    //Read in companies and make list of them
    const folderPath = prompt('Enter the path to your "companies.dat" to be loaded or nothing if "companies.dat" is in your current directory: ');
    const companies = readInCompanies(folderPath);
    if (companies === "The companies.dat file doesn't exist") {
        console.log("The companies.dat file doesn't exist");
        return;
    }
    //console.log(companies);
    
    //Create root trie node
    let t = new Trie();
    // For each company in list add to trie root
    companies.forEach((company,i) =>
        company.forEach(word => t.add(word,i))
    );
    //console.log("Added all company names into Trie")

    //readInArticle
    //How do we do this
    //console.log(companies[t.find('Amazon Web Services')][0]);
    //let s = 'Johnson and Johnson'.split(' ');
    let s = 'Amazon Services WTF Johnson and Johnson Twitch Amazon Johnson'.split(' ');
    console.log(s);
    let ind = -1;
    let myObj = null;

    for (let index = 0; index < s.length; index++) {
        const elem = s[index];
        let temp = t.find(elem);
        console.log('1 word:', elem);
        if(temp.length == 2 && index < s.length-1 ){
            let q = s.slice(index, index + 2).join(' ');
            //console.log(q);
            let x = t.find(q);
            console.log('2 words:', q);
            if (x.length == 2 && index < s.length-2){
                let taco = s.slice(index, index + 3).join(' ');
                let y = t.find(taco);
                console.log('3 words:', taco);
            }
        }
        //console.log(temp);
    }

    //console.log(s);
    /*let article = prompt('Enter a sentence: ')
                    .split(' ')
                    .forEach(w => { 
                        let ind = t.find(w);
                        console.log(w,ind);
                        if (ind !== -1)
                            console.log(companies[ind][0]);
                    });*/
                    

    //find relevance and total word count for words in article

    //Print Results
}

main();

//TODO
//