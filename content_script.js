const seasonal = {
  entities: [
    "decorative fucking gourds",
    "mutant fucking squash",
    "insanely ornate shellacked vegetables",
    "beautiful fucking gourd necklaces",
    "misshapen, zucchini-descendant bastards",
  ],
  entity: [
    "decorative fucking gourd",
    "mutant fucking squash",
    "insanely ornate shellacked vegetable",
    "beautiful fucking gourd necklace",
    "misshapen, zucchini-descendant bastard",
  ],
  descriptor: [
    "decorative mutant fucking",
    "mutant fucking squash",
    "insanely ornate shellacked",
    "beautiful fucking gourd",
    "freaky-assed harvest",
    "misshapen, zucchini-descendant",
  ],
};

function fuckThatShitUp(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Uses shuffled copies of source arrays from which we'll pop off values so we don't fucking repeat ourselves as much. */
const carvedSeasonal = {};
function allHaphazardLike(what) {
  if (! carvedSeasonal[what] || ! carvedSeasonal[what].length) {
    carvedSeasonal[what] = fuckThatShitUp(seasonal[what].slice());
  }

  return carvedSeasonal[what].pop();
}

const wordSplitRegex = /\b[a-z](?=[a-z]{2})/g; // first char of only words at least 3 chars
const allWordsSplitRegex = /\b[a-z]/g; // first char of all words
function makeFuckingReal(str, capSmallWords) {
  return str.replace(capSmallWords ? allWordsSplitRegex : wordSplitRegex, char => {
    return char.toUpperCase();
  });
}

function isFuckingReal(word) {
  // yeah this doesn't work for shit other than letters but our regex only captures letters
  return word[0] === word[0].toUpperCase();
}
function areAllFuckingReal(words) {
  return words
    .map(isFuckingReal)
    .reduce((acc, curr) => acc && curr);
}

function allGourdReenactment(source, dest) {
  const words = source.split(" ");
  // yeah this is lazy it's not how title case works
  const bigWords = words.filter(word => word.length > 3);
  const smallWords = words.filter(word => word.length <= 3);

  const bigWordsCapitalized = areAllFuckingReal(bigWords);
  // if no small words to draw example from let's just guess start case instead of title case, seems more common on the web, right fuckfaces?
  const smallWordsCapitalized = smallWords.length ? areAllFuckingReal(smallWords) : bigWordsCapitalized;

  if (bigWordsCapitalized) {
    return makeFuckingReal(dest, smallWordsCapitalized);
  } else if (isFuckingReal(words[0])) {
    return dest[0].toUpperCase() + dest.substr(1);
  } else {
    return dest;
  }
}

let rungInTheSeason = false;
function pullYourFuckingHeadsOutOfYourAsses() {
  if (rungInTheSeason) {
    return;
  }
  rungInTheSeason = true;

  if (typeof chrome !== "undefined") {
    chrome.runtime.sendMessage({
      from: "fall",
      subject: "there's a nip in the air",
    });
  }
}

const mutantFuckingRegex = /(\b\w*\b )?(pumpkin[ -](?:pie[ -])?spiced?)( lattes?|[,.?!$])?/gi;

function shellackIt(match, p1 = "", p2, p3) {
  pullYourFuckingHeadsOutOfYourAsses();

  let gourd;
  if (p3) {
    if (p3.toLowerCase() === " latte") {
      // we have a latte
      gourd = allHaphazardLike("entity");
    } else if (p3.toLowerCase() === " lattes") {
      // we have lattes
      gourd = allHaphazardLike("entities");
    } else {
      // we have punctuation or end of node, e.g. "who-ville has plenty of its own pumpkin spice." - normally if no latte we want to use descriptor instead, but in this case it should standalone so entity is fucking better
      gourd = allHaphazardLike("entities") + p3;
    }
  } else {
    // some other pumpkin spice bullshit
    gourd = allHaphazardLike("descriptor");
  }

  if (p1.toLowerCase() === "a " && "aeiou".indexOf(gourd[0].toLowerCase()) !== -1) {
    p1 = "an ";
  }

  return allGourdReenactment(match, p1 + gourd);
}

function itsFallFuckfaces(text) {
  return text.replace(mutantFuckingRegex, shellackIt);
}

function BLAMMO(node) {
  if (! node) {
    return;
  }

  let child, next;
  switch ( node.nodeType ) {
    case 1:  // element
    case 9:  // document
    case 11: // document fragment
      child = node.firstChild;
      while ( child ) {
        next = child.nextSibling;
        BLAMMO(child);
        child = next;
      }
      break;

    case 3: // text node
      node.nodeValue = itsFallFuckfaces(node.nodeValue);
      break;
  }
}

BLAMMO(document.body);

new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(BLAMMO);
  });
}).observe(document.body, {
  childList: true,
  subtree: true,
});
