// Trie Articles
// By: Jonathan Lafleur, Michael Macari and Anthony Rusignuolo

var prompt = require('prompt-sync')();
var fs = require('fs');

class TrieNode {
    constructor(parentIndex = -1) {
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

        if (ptr.children.hasOwnProperty(' '))
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

function readInArticles(filepath) {
    //Open file, scan words for company relevance and total word count
    if (filepath === '')
        filepath = './article.dat'
    try {
        return fs.readFileSync(filepath, 'utf8')
            .split(/[\r\n\t ]/g)
            .map(w => w.replace(/[^A-Za-z0-9 ]/g, ''));
    }
    catch (error) {
        return "The article doesn't exist";
    }
}

function printResult(companies, totalWords, hitCount) {
    let maxCompanyNameLength = 0;
    for (let i = 0; i < companies.length; i++) {
        maxCompanyNameLength = maxCompanyNameLength > companies[i][0].length ? maxCompanyNameLength : companies[i][0].length;
    }
    console.log(maxCompanyNameLength);

    //TODO:
    /*Make a function that prints/saves to file
      Company   Hit Count   Relevance
      all names hit counts  relevance
      Total     all hitcnt  allRelevance
      Total Words   totalWords
    */
}

function parseArticle(article, numOfCompanies, t) {
    const hitCount = Array.apply(null, Array(numOfCompanies)).map(Number.prototype.valueOf, 0);
    let totalWords = 0;

    for (let index = 0; index < article.length; index++) {
        const oneWord = t.find(article[index]);

        if (oneWord.length == 2 && index < article.length - 1) {
            const twoWords = t.find(article.slice(index, index + 2).join(' '));

            if (twoWords.length == 2 && index < article.length - 2) {

                const threeWords = t.find(article.slice(index, index + 3).join(' '));
                if (threeWords[0] !== -1) {
                    hitCount[threeWords[0]]++;
                    totalWords++; // What do we do with this
                    index += 2;
                    continue;
                }
            }
            if (twoWords[0] !== -1) {
                hitCount[twoWords[0]]++;
                totalWords++; // What do we do with this
                index++;
                continue;
            }
        }
        if (oneWord[0] !== -1) {
            hitCount[oneWord[0]]++;
        }
        totalWords++;
    }
    console.log('hitCount:', hitCount);
    console.log('TotalWords:', totalWords);

    return [hitCount, totalWords];
}

function main() {
    //Read in companies and make list of them
    const folderPath = prompt('Enter the path to your "companies.dat" to be loaded or nothing if "companies.dat" is in your current directory: ');
    const companies = readInCompanies(folderPath);
    if (companies === "The companies.dat file doesn't exist") {
        console.log("The companies.dat file doesn't exist");
        return;
    }

    //Create root trie node
    let t = new Trie();

    // For each company in list add to trie 
    companies.forEach((company, i) =>
        company.forEach(word => t.add(word, i))
    );

    //Read in the Article
    const articlePath = prompt('Enter the path to your article to be loaded or nothing if "article.dat" is in your current directory: ');
    const article = readInArticles(articlePath);
    if (article === "The article doesn't exist") {
        console.log("The article doesn't exist");
        return;
    }

    //Find relevance and total word count for words in article
    const [hitCount, totalWords] = parseArticle(article, companies.length, t);

    //Print Results
    printResult(companies, totalWords, hitCount);

}

main();