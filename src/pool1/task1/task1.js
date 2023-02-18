class Task1 {
    punctuationMarks = ['.', ',', ':', ';'];

    toLower(str) {
        return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
    }

    fixSpaces(str) {
        const words = this.#splitToWordsWithMarks();
        let newStr = '';
        words.forEach((word) => {
            if (this.punctuationMarks.includes(word)) {
                newStr += word;
            } else {
                newStr += ' ' + word;
            }
        })
        return newStr.trim();
    }

    getWordsCount(str) {
        return this.#getWords(str).length;
    }

    getUniqueWordsCounts(str) {
        const dict = new Map();
        const words = this.#getWords(str);
        words.forEach((word) => {
            const lowerWord = word.toLowerCase();
            if (dict.has(lowerWord)) {
                dict.set(lowerWord, { count: dict.get(lowerWord).count + 1});
            } else {
                dict.set(lowerWord, {count: 1});
            }
        });
        return dict;
    }

    #splitToWordsWithMarks(str) {
        const words = [];
        str
            .split(" ")
            .forEach((substr) => {
                if (substr) {
                    words.push(...this.#splitByPunctuationMarks(substr));
                }
            })
        return words;
    }

    #splitByPunctuationMarks(str) {
        const chars = str.split('');
        if (chars.filter(x => this.punctuationMarks.includes(x)).length) {
            return chars
                .map((char) => {
                    if (this.punctuationMarks.includes(char)) {
                        return " " + char + " ";
                    }
                    return char;
                }).join('').trim().split(' ');
        }
        return [str];
    }

    #getWords(str) {
        return this.#splitToWordsWithMarks(str).filter(word => !this.punctuationMarks.includes(word));
    }
}

const task1 = new Task1();

// Test 1.1
// const str = "влаД";
// console.log(task1.toLower(str));

// Test 1.2
// const str = "Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.";
// console.log(task1.fixSpaces(str));

// Test 1.3
// const str = "Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.";
// console.log(task1.getWordsCount(str));

// Test 1.4 №1
// const str = "Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.";
// console.log(task1.getUniqueWordsCounts(str));
// Test 1.4 №2
// const str = "Текст, в котором слово текст несколько раз встречается и слово тоже";
// console.log(task1.getUniqueWordsCounts(str));
