import randomExt from 'random-ext'
import {range} from 'pythonic'

/**
 * Provides common functions based on the Python API.
 **/
export default class JavaScriptWorkspaceAPI {

  constructor(experiment) {
    this._experiment = experiment
  }

  reset_feedback() {
    this._experiment.reset_feedback()
  }

  set_subject_nr(nr) {
    this._experiment.set_subject(nr)
  }

  sometimes(p=.5) {
    if (typeof p !== "number" || p < 0 || p > 1)
      throw "p should be a numeric value between 0 and 1"
    return Math.random() < p
  }

  xy_from_polar(rho, phi, pole=[0, 0]) {
    if (typeof rho !== "number")
      throw "rho should be numeric in xy_from_polar()"
    if (typeof phi !== "number")
      throw "phi should be numeric in xy_from_polar()"
    phi = this._radians(phi)
    const [ox, oy] = this._parse_pole(pole)
    const x = rho * Math.cos(phi) + ox
    const y = rho * Math.sin(phi) + oy
    return [x, y]
  }

  xy_to_polar(x, y, pole=[0, 0]) {
    if (typeof x !== "number")
      throw "x should be numeric in xy_to_polar()"
    if (typeof y !== "number")
      throw "y should be numeric in xy_to_polar()"
    const [ox, oy] = this._parse_pole(pole)
    const dx = x - ox
    const dy = y - oy
    const rho = Math.sqrt(dx ** 2 + dy ** 2)
    const phi = this._degrees(Math.atan2(dy, dx))
    return [rho, phi]
  }
  
  xy_distance(x1, y1, x2, y2) {
    if (typeof x1 !== "number" || typeof y1 !== "number" || 
        typeof x2 !== "number" || typeof y2 !== "number")
      throw "Coordinates should be numeric in xy_distance()"
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
  }
  
  xy_circle(n, rho, phi0=0, pole=[0, 0]) {
    if (typeof n !== "number" || n < 0)
      throw "n should be a non-negative integer in xy_circle()"
    if (typeof rho !== "number" || typeof phi0 !== "number")
      throw "rho and phi0 should be numeric in xy_circle()"
    const a = []
    for (const i of range(n)) {
      a.push(this.xy_from_polar(rho, phi0, pole))
      phi0 += 360 / n
    }
    return a
  }
  
  xy_grid(n, spacing, pole=[0, 0]) {
    // Parse and validate the n
    const n_err_msg = "n should be a single non-negative number, or an array of two non-negative numbers in xy_grid()"
    let n_col
    let n_row
    if (typeof n === "object") {
      if (n.length !== 2)
        throw n_err_msg
      [n_col, n_row] = n
    } else {
      n_col = n
      n_row = n
    }
    if (typeof n_col !== "number" || typeof n_row !== "number")
      throw n_err_msg
    // Parse and validate the spacing
    const spacing_err_msg = "spacing should be a single non-negative number, or an array of two non-negative numbers xy_grid()"
    let s_col
    let s_row
    if (typeof spacing === "object") {
      if (spacing.length !== 2)
        throw spacing_err_msg
      [s_col, s_row] = spacing
    } else {
      s_col = spacing
      s_row = spacing
    }
    if (typeof s_col !== "number" || typeof s_row !== "number")
      throw spacing_err_msg
    // Generate the grid
    const [ox, oy] = this._parse_pole(pole)
    const a = []
    let x
    let y
    for (const row of range(n_row)) {
      y = (row - (n_row - 1) / 2) * s_row + oy
      for (const col of range(n_col)) {
        x = (col - (n_col - 1) / 2) * s_col + ox
        a.push([x, y])
      }
    }
    return a
  }
  
  xy_random(n, width, height, min_dist=0, pole=[0, 0]) {
    if (typeof n !== "number" || n < 0)
      throw "n should be a non-negative number in xy_circle()"
    if (typeof min_dist !== "number" || n < 0)
      throw "min_dist should be a non-negative number in xy_circle()"
    if (typeof width !== "number" || typeof height !== "number")
      throw "width and height should be numeric in xy_circle()"
    const [ox, oy] = this._parse_pole(pole)
    const max_try = 1000
    let a, i, t2, x1, y1, x2, y2, too_close
    for (const t1 of range(max_try)) {
      a = []
      for (i of range(n)) {
        // A loop for trying to find a single new point
        for (t2 of range(max_try)) {
          // Generate a point and check if it's not too close to the other
          // points so far
          x1 = (Math.random() - .5) * width + ox
          y1 = (Math.random() - .5) * height + oy
          too_close = false
          for ([x2, y2] of a) {
            if (this.xy_distance(x1, y1, x2, y2) < min_dist) {
              too_close = true
              break
            }
          }
          // Add the point and the break the loop for finding a single point
          if (!too_close) {
            a.push([x1, y1])
            break
          }
        }
      }
      // If the array is complete, return it. If not, the outer for loop will
      // try again until max_try is reached
      if (a.length === n)
        return a
    }
    throw "Failed to generate random coordinates in xy_random()"
  }
  
  _radians(a) {
    return (a / 360) * 2 * Math.PI
  }
  
  _degrees(a) {
    return (a / (2 * Math.PI)) * 360
  }
  
  _parse_pole(pole) {
    if (pole.length !== 2)
      throw "pole should be an array of two numeric values"
    const [x, y] = pole
    if (typeof x !== "number" || typeof y !== "number")
      throw "pole should be an array of two numeric values"
    return [x, y]
  }
}
