export default class ActionResult {
    constructor(success, done, alternate) {
        this.success = success;
        this.done = done;
        this.alternate = alternate;
    }

    static get success() {
        return {
            success: true,
            done: true
        }
    }

    static get failure() {
        return {
            success: false,
            done: true
        }
    }

    static get notDone() {
        return {
            success: false,
            done: false
        }
    }
}
