export default class RNG {
    static oneIn(count) {
        return Math.floor(Math.random() * count) + 1 === 1;
    }

    static range(a, b) {
        if (a > b) {
            var c = a;
            a = b;
            b = c;
        }

        return Math.floor(Math.random() * (b - a + 1) + a)
    }

    static d(s) {
        return Math.floor(Math.random() * s) + 1;
    }
}
