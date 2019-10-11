class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.history = [];
      this.point = null;

      if (config) {
        this.states = config.states;
        this.now = config.initial;
        this.history.push(this.now);
        this.point = 0;
      } else throw new SyntaxError('Error');

    }

    addHistory(story = this.now) {
      this.point++;
      this.history[this.point] = story;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.now;
    }

    /**
     * Goes to specified state.
     * @param state
     */

    changeState(state) {
      if (this.states[state])
        this.now = state;
        else throw new SyntaxError('Error');

      this.addHistory();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      let state = this.states[this.now].transitions[event];
      if (state)
        this.now = state;
        else throw new SyntaxError('Error');

      this.addHistory();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.now = 'normal';

      this.addHistory();
    }

    findState(transitions, event) {
      for (let key in transitions) {
        if (key == event)
          return true;
      }
      return false;
    }
    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if (event) {
        let answer = [];
        for (let key in this.states) {
          if (this.findState(this.states[key].transitions, event))
            answer.push(key);
          }
        return answer;
      } else {
        let answer = [];
        for (let key in this.states) {
          answer.push(key);
        }
        return answer;
      }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.point>0) {
        this.now = this.history[this.point-1];
        this.point--;
        return true;
      } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.history[this.point+1]) {
        this.now = this.history[this.point+1];
        this.point++;
        return true;
      } else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history = [];
      this.point = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
