/**
 * Event manager namespace.
 * @class
 * @constructor
 */
class EventManager {
    constructor() {
        this.observers = {};
    }
    /**
     * Register a listener on a specific event.
     * @function
     * @name subscribe
     * @void
     * @instance
     * @memberof EventManager
     * @param {string} subject
     * @param {Function} cb
     */
    subscribe(subject, cb) {
        if (!this.observers[subject]) {
            this.observers[subject] = [];
        }
        this.observers[subject].push(cb);
    }
    /**
     * Remove a listener for a specific event.
     * @function
     * @name unsubscribe
     * @void
     * @instance
     * @memberof EventManager
     * @param {string} subject
     * @param {Function} cb
     */
    unsubscribe(subject, cb) {
        if (!this.observers[subject]) {
            return;
        }
        this.observers[subject] = this.observers[subject].filter(
            (item) => item !== cb
        );
    }
    /**
     * Call the listeners for a specific event.
     * @function
     * @name trigger
     * @void
     * @instance
     * @memberof EventManager
     * @param {string} subject
     * @param {*} payload
     */
    trigger(subject, payload) {
        if (!this.observers[subject]) {
            return;
        }
        this.observers[subject].forEach((cb) => cb(payload));
    }
}

export default EventManager;
