module.exports = class {
    constructor() {
        this.subscribers = [];
    }

    subscribe(obj) {
        this.subscribers.push(obj);
    }

    unsubscribe(obj) {
        this.subscribers = this.subscribers.filter(sub => sub !== obj);
    }

    notify() {
        this.subscribers.forEach((subscriber) => subscriber());
    }
}