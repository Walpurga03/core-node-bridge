const fs = require("fs");
const path = require("path");

const categories = require("./categories.json");
const rpcCommandsByCategory = require("./rpcCommandsByCategory.json");

// Lies die Übersetzungsdatei (hier: Englisch)
const translations = require("../frontend/src/locales/en/translation");

let missing = [];

// Kategorien prüfen
for (const cat of categories) {
  if (!translations.categories || !translations.categories[cat.key]) {
    missing.push(`categories.${cat.key}`);
  }
}

// Kommandos prüfen
for (const cat of Object.keys(rpcCommandsByCategory)) {
  for (const cmd of rpcCommandsByCategory[cat]) {
    if (!translations[cmd.key]) {
      missing.push(cmd.key);
    }
  }
}

if (missing.length === 0) {
  console.log("✅ All categories and commands are present in the translation file.");
} else {
  console.log("❌ Missing translation keys:");
  for (const key of missing) {
    console.log("  -", key);
  }
}