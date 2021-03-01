class EventManager {
    constructor() {
        this.observers = {};
    }
    subscribe(subject, cb) {
        if (!this.observers[subject]) {
            this.observers[subject] = [];
        }
        this.observers[subject].push(cb);
    }
    unsubscribe(subject, cb) {
        if (!this.observers[subject]) {
            return;
        }
        this.observers[subject] = this.observers[subject].filter(
            (item) => item !== cb
        );
    }
    trigger(subject, payload) {
        if (!this.observers[subject]) {
            return;
        }
        this.observers[subject].forEach((cb) => cb(payload));
    }
}

export default EventManager;
