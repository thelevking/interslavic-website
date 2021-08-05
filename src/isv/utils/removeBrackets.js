/**
 * Source:
 * https://github.com/sonic16x/interslavic/blob/master/src/utils/removeBrackets.ts
 */
export function removeBrackets(text, left, right) {
    const posOpen = text.indexOf(left);

    if (posOpen !== -1) {
        const posClose = text.indexOf(right);
        if (posClose > posOpen) {
            return this.removeBrackets((text.slice(0, posOpen) + text.slice(posClose + 1))
                .replace('  ', ' ').trim(), left, right);
        }
    }
    return text;
}