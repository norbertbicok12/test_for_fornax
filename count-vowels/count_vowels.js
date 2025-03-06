function countVowels(str) {
    let vowels = ["a", "e", "i", "o", "u"];
    let vowelsMap = new Map();

    vowels.forEach((vowel) => 
        vowelsMap.set(vowel, str.toLowerCase().split(vowel).length - 1)
    );

    return vowelsMap;
}


console.log(countVowels("AEIOU"));
console.log(countVowels("JavaScript is awesome"));
console.log(countVowels("ThIs string is creAtEd for the pUrpOse of counting vowEls case insensitively."));