const salutations = [
  "It’s fall, fuckfaces!",
  "Welcome to autumn, fuckheads!",
  "Guess what season it is — fucking fall.",
  "Grab a calendar and pull your fucking heads out of your asses; it’s fall, fuckers.",
  "That shit is going to look so seasonal.",
  "Aren’t those gourds straining your neck?",
  "A crisp October breeze just blew through and fucked that shit up.",
  "You’re either ready to reap this freaky-assed harvest or you’re not.",
];

chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.from === "fall" && msg.subject === "there's a nip in the air") {
    chrome.pageAction.show(sender.tab.id);
    chrome.pageAction.setTitle({
      tabId: sender.tab.id,
      title: salutations[Math.floor(Math.random() * salutations.length)],
    })
  }
});
