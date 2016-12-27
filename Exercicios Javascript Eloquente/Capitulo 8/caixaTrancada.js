"use strict";

var box = {
  locked: true,
  unlock: function() { this.locked = false; },

  lock: function() { this.locked = true; },

  _content: [],

  get content() {

    if (this.locked) {
      throw new Error("Locked!");
    }

    return this._content;
  }
};

function withBoxUnlocked(body) {
  var stat = box.locked;
  if (!stat) {
    return body();
  }
  
  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}

console.log(box.locked);