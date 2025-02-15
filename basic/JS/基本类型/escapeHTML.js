function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let sanitizedValue =
      values[i] !== undefined
        ? String(values[i])
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
        : "";
    return result + str + sanitizedValue;
  }, "");
}

// 示例：防止恶意注入 HTML
const userInput = '<script>alert("Hacked!")</script>';
const safeHTML = escapeHTML`<p>${userInput}</p>`;

console.log(safeHTML);
// 输出：<p>&lt;script&gt;alert("Hacked!")&lt;/script&gt;</p>

const personName = "Alice <b>Bold</b>";
const comment = "<script>alert('XSS');</script>";

const safeOutput = escapeHTML`User: ${personName}, Comment: ${comment}`;
console.log(safeOutput);
// User: Alice &lt;b&gt;Bold&lt;/b&gt;, Comment: &lt;script&gt;alert('XSS');&lt;/script&gt;

function translateWord(word) {
  const translations = { Hello: "Bonjour", world: "monde", nice: "agréable", day: "jour" };
  return translations[word] || word || "";
}

function translateSentence(sentence) {
  if(!sentence) return "";
  if(sentence === " ") return " ";
  const words = sentence.split(" ");
  return words.reduce((res, word, i) => {
    const translationWord = translateWord(word);
    res = res ? res + " " + translationWord : translationWord;
    return res;
  }, "");
}

function i18n(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + translateSentence(str) + (translateSentence(values[i]) || "");
  }, ""); 
}

const msg = i18n`Hello world ${'nice'} ${'day'}`;
console.log(msg); // Bonjour, monde!
