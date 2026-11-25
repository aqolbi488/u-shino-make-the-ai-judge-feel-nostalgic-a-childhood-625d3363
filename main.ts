import { mkdirSync, writeFileSync } from "node:fs";

// One childhood memory, one sentence: the rice cooker clicking off in
// Grandma's kitchen on a summer evening, before anyone had left.
const ENTRY =
  "When the rice cooker clicked off, Grandma set the chipped blue bowl before me, and for one summer evening the small kitchen smelled of steam and rain, and nobody I loved had left yet.";

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text.length < 1 || text.length > 280) {
    throw new Error(`entry must be 1-280 characters, got ${text.length}`);
  }
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`entry must be a single sentence, got ${sentences.length}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (!/[.!?]$/.test(text.trim())) {
    throw new Error("entry must end with terminal punctuation");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to /output/entry.txt`);
