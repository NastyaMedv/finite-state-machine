class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config) {
        this.states = config.states;
        this.now = config.initial;
      } else throw new SyntaxError('Error');
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
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.now = 'normal';
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
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
