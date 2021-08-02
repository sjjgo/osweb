import Styles from '../backends/styles.js'
import Canvas from '../backends/canvas.js'

/**
 * A class that provides a more user-friendly API for Canvas objects, resemling
 * that of Python. Is used for the JavaScript workspace.
 **/ 
export default class CanvasHandler {

  constructor (experiment, styleArgs = {}) {
    this._canvas = new Canvas(experiment)
    this._style = new Styles(experiment)
    Object.assign(this._style, styleArgs)
    this._xc = this._canvas.width / 2
    this._yc = this._canvas.height / 2
  }
  
  get color() {return this._style.color}
  set color(val) {this._style.color = val}
  get background_color() {return this._style.background_color}
  set background_color(val) {this._style.background_color = val}
  get fill() {return this._style.fill}
  set fill(val) {this._style.fill = val}
  get html() {return this._style.html}
  set html(val) {this._style.html = val}
  get font_family() {return this._style.font_family}
  set font_family(val) {this._style.font_family = val}
  get font_size() {return this._style.font_size}
  set font_size(val) {this._style.font_size = val}
  get font_italic() {return this._style.font_italic}
  set font_italic(val) {this._style.font_italic = val}
  get font_bold() {return this._style.font_bold}
  set font_bold(val) {this._style.font_bold = val}
  get font_underline() {return this._style.font_underline}
  set font_underline(val) {this._style.font_underline = val}
  
  _element_style (styleArgs) {
    if (typeof styleArgs === "undefined") {
      return this._style
    }
    const style = new Styles()
    Object.assign(style, this._style)
    Object.assign(style, styleArgs)
    return style
  }
  
  arrow({
      sx = 0,
      sy = 0,
      ex = 50,
      ey = 0,
      body_length = 0.8,
      body_width = 0.5,
      head_width = 30,
      ...styleArgs} = {}) {
    this._canvas.arrow(
        sx + this._xc,
        sy + this._yc,
        ex + this._xc,
        ey + this._yc,
        body_width,
        body_length,
        head_width,
        this._element_style(styleArgs))
  }
  
  clear(styleArgs = {}) {
    this._canvas.clear(this._element_style(styleArgs).background_color)
  }
  
  circle({x = 0, y = 0, r = 50, ...styleArgs} = {}) {
    this._canvas.circle(
        x + this._xc,
        y + this._yc,
        r,
        this._element_style(styleArgs))
  }
  
  ellipse({x = -50, y = -25, w = 100, h = 50, ...styleArgs} = {}) {
    this._canvas.ellipse(
        x + this._xc,
        y + this._yc,
        w,
        h,
        this._element_style(styleArgs))
  }
  
  fixdot({x = 0, y = 0, style = 'default', ... styleArgs} = {}) {
    this._canvas.fixdot(
        x + this._xc,
        y + this._yc,
        style,
        this._element_style(styleArgs))
  }
  
  gabor({
      x = 0,
      y = 0,
      orient = 0,
      freq = .1,
      env = 'gaussian',
      size = 96,
      stdev = 12,
      phase = 0,
      col1 = 'white',
      col2 = 'black',
      bgmode = 'avg'} = {}) {
    this._canvas.gabor(
        x + this._xc,
        y + this._yc,
        orient,
        freq,
        env,
        size,
        stdev,
        phase,
        col1,
        col2,
        bgmode)
  }
  
  image({fname, center = true, x = 0, y = 0, scale = 1, rotation = 0} = {}) {
    if (typeof fname === "undefined") {
      throw "fname is a required parameter for Canvas.image()"
    }
    this._canvas.image(
        fname,
        center,
        x + this._xc,
        y + this._yc,
        scale,
        rotation)
  }
  
  line({sx = 0, sy = 0, ex = 50, ey = 0, ...styleArgs} = {}) {
    this._canvas.line(
        sx + this._xc,
        sy + this._yc,
        ex + this._xc,
        ey + this._yc,
        this._element_style(styleArgs))
  }
  
  noise_patch({
      x = 0,
      y = 0,
      env = 'gaussian',
      size = 96,
      stdev = 12,
      col1 = 'white',
      col2 = 'black',
      bgmode = 'avg'} = {}) {
    this._canvas.noise(
        x + this._xc,
        y + this._yc,
        env,
        size,
        stdev,
        col1,
        col2,
        bgmode)
  }
  
  polygon({vertices, ...styleArgs} = {}) {
    if (typeof vertices === "undefined") {
      throw "vertices is a required parameter for Canvas.polygon()"
    }
    // Adjust the coordinates of all vertices
    const v = []
    for (const [x, y] of vertices)
      v.push([x + this._xc, y + this._yc])
    this._canvas.polygon(v, this._element_style(styleArgs))
  }
  
  rect({x = -50, y = -25, w = 100, h = 50, ...styleArgs} = {}) {
    this._canvas.rect(
        x + this._xc,
        y + this._yc,
        w,
        h,
        this._element_style(styleArgs))
  }
  
  show() {
    return this._canvas.show()
  }
  
  text({text, center = true, x = 0, y = 0, ...styleArgs} = {}) {
    if (typeof text === "undefined") {
      throw "text is a required parameter for Canvas.text()"
    }    
    let style = this._element_style(styleArgs)
    this._canvas.text(
        text,
        center,
        x + this._xc,
        y + this._yc,
        style.html,
        style)
  }
}
