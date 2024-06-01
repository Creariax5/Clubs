export default function textSized(desc) {
    desc = desc.substring(0, 70);
    let c = "c"
    let i = 0;
    while (c != " ") {
        c = desc.charAt(desc.length - 1);
        i++
        desc = desc.substring(0, 70 - i);
    }

    return desc + "...";
}