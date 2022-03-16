import {
  constants
} from '../system/constants.js'
import ResponseDevice from './response_device.js'

/** Class representing a mouse device. */
export default class Mouse extends ResponseDevice {
  /**
   * Create an object which represents a mouse device.
   * @param {Object} experiment - The experiment to which the logger belongs.
   * @param {Number} timeOut - Duration in ms for time out.
   * @param {Array} buttonList - List of acceptable response buttons.
   * @param {Boolean} visible - Toggle for showing the mouse cursor.
   * @extends ResponseDevice
   */
  constructor (experiment, timeOut, buttonList, visible) {
    // Create and set public properties.
    super()
    this._experiment = experiment
    this._timeOut = (typeof timeOut === 'undefined') ? null : timeOut
    this._buttonList = (typeof buttonList === 'undefined') ? null : buttonList
    this._visible = (typeof visible === 'undefined') ? false : visible

    // Set constant properties.
    this._SYNONYM_MAP = [
      ['None', 'none'],  // timeout
      ['1', 'left_button', 'left'],
      ['2', 'middle_button', 'middle'],
      ['3', 'right_button', 'right'],
      ['4', 'scroll_up'],
      ['5', 'scroll_down']
    ]
  }

  /**
   * Set the configuration for the mouse backend.
   * @param {Number} timeOut - Duration in ms for time out.
   * @param {Array} buttonList - List of acceptable response buttons.
   * @param {Boolean} visible - Toggle for showing the mouse cursor.
   */
  _set_config (timeOut, buttonList, visible) {
    // Set mouse properties.
    this._timeOut = timeOut
    this._buttonList = buttonList
    this._visible = visible
  }

  /**
   * Collects a single mouse click.
   * @param {Number} timeOut - Duration in ms for time out.
   * @param {Array} buttonList - List of acceptable response buttons.
   * @param {Boolean} visible - Toggle for showing the mouse cursor.
   */
  get_click (timeOut, buttonList, visible) {
    // Collects a single mouse click.
    this._timeOut = (typeof timeOut === 'undefined') ? this._timeOut : timeOut
    this._buttonList = (typeof buttonList === 'undefined') ? this._buttonList : buttonList
    this._visible = (typeof visible === 'undefined') ? this._visible : visible

    if (this._experiment !== null) {
      // Hide or show the mouse.
      this.show_cursor(this._visible)

      // Set the event processor.
      this._experiment._runner._events._run(this._timeOut, constants.RESPONSE_MOUSE, this._buttonList)
    }
  }

  /**
   *  Returns the current mouse position. !Warning: this methods uses the state in
   *  the last known mouse move, not the current state.
   *  @param {Object} - Object with time, x and y coordinate of the mouse cursor.
   */
  get_pos () {
    // Returns the current mouse position. !Warning: this methods uses the state in the last known mouse respone, not the current state.
    if (this._experiment._runner._events._mouseMoveEvent !== null) {
      return {
        rtTime: this._experiment._runner._events._mouseMoveEvent.rtTime,
        x: this._experiment._runner._events._mouseMoveEvent.event.clientX,
        y: this._experiment._runner._events._mouseMoveEvent.event.clientY
      }
    } else {
      return {
        rtTime: -1,
        x: -1,
        y: -1
      }
    }
  }

  /**
   *  Returns the current mouse position. !Warning: this methods uses the state in
   *  the last known mouse press, not the current state.
   *  @param {Object} - Object with the state of the mouse buttons.
   */
  get_pressed () {
    // Returns the current button state of the mouse buttons. !Warning: this methods uses the state in the last known mouse respone, not the current state.
    if (this._experiment._runner.events._mouse_press !== null) {
      return {
        buttons: [(this._experiment._runner._events._mouseDownEvent.event.button === 0),
          (this._experiment._runner._events._mouseDownEvent.event.button === 1),
          (this._experiment._runner._events._mouseDownEvent.event.button === 2)
        ]
      }
    } else {
      return {
        buttons: [null, null, null]
      }
    }
  }

  /** Sets the current position of the cursor. */
  set_pos (pos) {}

  /**
   * Shows or hides the mouse cursor.
   * @param {Boolean} show - If true the mouse cursor is shown.
   */
  show_cursor (show) {
    // Set the property
    this._visible = show

    // Immediately changes the visibility of the mouse cursor.
    if (show === true) {
      // Show the mouse cursor.
      this._experiment._runner._renderer.view.style.cursor = 'default'
    } else {
      // Set the cursor visibility to none.
      this._experiment._runner._renderer.view.style.cursor = 'none'
    }
  }
}
