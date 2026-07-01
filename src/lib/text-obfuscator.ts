export class TextObfuscator {
  readonly RLO = "\u202E";
  readonly PDF = "\u202C";

  private minGroupSize = 3;
  private maxGroupSize = 5;

  setGroupParams(min: number, max: number) {
    this.minGroupSize = min;
    this.maxGroupSize = max;
  }

  isObfuscatable(char: string) {
    return /[\u4e00-\u9fa5a-zA-Z]/.test(char);
  }

  obfuscateGroup(text: string) {
    if (text.length < this.minGroupSize) return text;
    if (text.length === 3) return this.obfuscateTextSize(text, 3);
    if (text.length >= 4) return this.obfuscateTextSize(text, 4);
    return text;
  }

  private obfuscateTextSize(text: string, obfuscateSize = 3) {
    if (text.length < obfuscateSize) return text;

    const obfuscateChars: string[] = [];
    for (let i = 0; i < obfuscateSize; i++) {
      obfuscateChars.push(text[i]);
    }

    if (obfuscateChars.every((char) => this.isObfuscatable(char))) {
      const obfuscateText = obfuscateChars.slice(0, -1).reverse().join("");
      const lastChar = obfuscateChars[obfuscateChars.length - 1];
      return (
        this.RLO + obfuscateText + this.PDF + lastChar + text.slice(obfuscateSize)
      );
    }

    return text;
  }

  private randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  isObfuscated(input: string) {
    if (!input) return false;
    return input.includes(this.RLO) && input.includes(this.PDF);
  }

  obfuscate(input: string) {
    if (!input) return "";

    let i = 1;
    let result = input[0];

    while (i < input.length) {
      const groupSize = this.randomInt(this.minGroupSize, this.maxGroupSize);

      if (i + groupSize <= input.length) {
        const group = input.slice(i, i + groupSize);
        result += this.obfuscateGroup(group);
        i += groupSize;
      } else {
        result += input.slice(i);
        break;
      }
    }

    return result;
  }

  countRlo(input: string) {
    const matches = input.match(/\u202E/g);
    return matches ? matches.length : 0;
  }
}
