import CanvasClass from '../backends/canvas'
import randomExt from 'random-ext'

/**
 * A proxy handler for the VarStore that maps properties onto calls to
 * VarStore.get(), so that variables are automatically evaluated, just like
 * in the OpenSesame `var` API.
 */
class VarStoreHandler {
  get (target, prop) {
    // The VarStore sets a property on itself to bypass this proxy. This
    // avoids feedback loops when the VarStore tries to get a variable without
    // evaluating it.
    if (target._bypass_proxy === true) {
      return target[prop]
    }
    return typeof target[prop] === 'string'
      ? target.get(prop, null, true, null, false)
      : target[prop]
  }
}

/**
 * A workspace for executing inline JavaScript code. For now, the workspace is
 * not persistent, and only exposes the vars object.
 */
export default class JavaScriptWorkspace {
  /**
   * Create a JavaScript workspace.
   * @param {Object} experiment - The experiment item to which the item belongs.
   */
  constructor (experiment) {
    this.experiment = experiment
    this.vars_proxy = new Proxy(this.experiment.vars, new VarStoreHandler())
  }

  /**
   * Executes JavaScript code in the workspace.
   * @param {String} js - JavaScript code to execute
   */
  _eval (js) {
    // eslint-disable-next-line no-unused-vars
    const vars = this.vars_proxy
    // eslint-disable-next-line no-unused-vars
    const Canvas = () => new CanvasClass(this.experiment)
    // eslint-disable-next-line no-unused-vars
    const random = randomExt
    // eslint-disable-next-line no-eval
    eval(js)
  }
}
