import EventManager from './EventManager';
const Subjects = {
    ADD: 'ADD',
    REMOVED: 'REMOVED',
};
describe('EventManager: testing suite', function () {
    let eventManagerInstance;
    beforeEach(() => {
        eventManagerInstance = new EventManager();
    });
    it('Observer: subscribe and trigger', function () {
        const cbFn = jest.fn();
        eventManagerInstance.subscribe(Subjects.ADD, cbFn);
        eventManagerInstance.trigger(Subjects.ADD);
        expect(cbFn).toHaveBeenCalled();
    });
    it('Observer: unsubscribe and trigger', function () {
        const cbFn = jest.fn();
        eventManagerInstance.subscribe(Subjects.ADD, cbFn);
        eventManagerInstance.unsubscribe(Subjects.ADD, cbFn);
        eventManagerInstance.trigger(Subjects.ADD);
        expect(cbFn).not.toHaveBeenCalled();
    });
    it('Observer: unsubscribe that not exist', function () {
        const cbFn = jest.fn();
        eventManagerInstance.unsubscribe(Subjects.REMOVED, cbFn);
        expect(
            eventManagerInstance.observers[Subjects.REMOVED]
        ).toBeUndefined();
    });
    it('Observer: trigger that not exist', function () {
        eventManagerInstance.trigger(Subjects.ADD);
        expect(eventManagerInstance.observers[Subjects.ADD]).toBeUndefined();
        expect(
            eventManagerInstance.observers[Subjects.REMOVED]
        ).toBeUndefined();
    });
});
