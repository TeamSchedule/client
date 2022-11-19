export default function hexAToRGBA(h: string, a?: number) {
    if (h.startsWith("#")) h = h.slice(1);

    let aS = "0x";
    let rS = "0x";
    let gS = "0x";
    let bS = "0x";

    if (h.length === 3) {
        rS += h[0] + h[0];
        gS += h[1] + h[1];
        bS += h[2] + h[2];
        aS += "ff";
    } else if (h.length === 4) {
        rS += h[0] + h[0];
        gS += h[1] + h[1];
        bS += h[2] + h[2];
        aS += h[3] + h[3];
    } else if (h.length === 6) {
        rS += h[0] + h[1];
        gS += h[2] + h[3];
        bS += h[4] + h[5];
        aS += "ff";
    } else if (h.length === 8) {
        rS += h[0] + h[1];
        gS += h[2] + h[3];
        bS += h[4] + h[5];
        aS += h[6] + h[7];
    }

    if (a === undefined) {
        a = +(Number(aS) / 255).toFixed(3);
    }

    return `rgba(${Number(rS)}, ${Number(gS)}, ${Number(bS)}, ${a})`;
}
