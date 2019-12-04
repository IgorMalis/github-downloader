

export default function delay(ms) {
    return new Promise(_ => setTimeout(_, ms));
}