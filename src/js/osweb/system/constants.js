// Control elements
import Loop from '../items/loop.js'
import Sequence from '../items/sequence.js'
import Coroutines from '../items/coroutines.js'
// Slides
import Sketchpad from '../items/sketchpad.js'
import Feedback from '../items/feedback.js'
// Scripts
import InlineScript from '../items/inline_script.js'
import InlineJavaScript from '../items/inline_javascript.js'
// Responses
import KeyboardResponse from '../items/keyboard_response.js'
import MouseResponse from '../items/mouse_response'
import Logger from '../items/logger.js'
// Audio
import Sampler from '../items/sampler.js'
import Synth from '../items/synth.js'
// Plugins
import AdvancedDelay from '../items/advanced_delay.js'
import FormConsent from '../items/form_consent.js'
import InlineHTML from '../items/inline_html.js'
import FormMultipleChoice from '../items/form_multiple_choice.js'
import FormTextDisplay from '../items/form_text_display.js'
import FormTextInput from '../items/form_text_input.js'
import MediaPlayer from '../items/media_player.js'
import Notepad from '../items/notepad.js'
import RepeatCycle from '../items/repeat_cycle.js'
import ResetFeedback from '../items/reset_feedback.js'
import TouchResponse from '../items/touch_response.js'
// Elements
import Arrow from '../elements/arrow.js'
import Circle from '../elements/circle.js'
import Ellipse from '../elements/ellipse.js'
import Fixdot from '../elements/fixdot.js'
import Gabor from '../elements/gabor.js'
import ImageElement from '../elements/image.js' // Image is a reserved JS class
import Line from '../elements/line.js'
import Noise from '../elements/noise.js'
import Rect from '../elements/rect.js'
import TextLine from '../elements/textline.js'


/**
 * this variable maps the string representation of each element to the corresponding
 * class names.
 * @type {Object}
 */
export const itemClasses = {
  // Items
  loop: Loop,
  sequence: Sequence,
  sketchpad: Sketchpad,
  feedback: Feedback,
  inline_script: InlineScript,
  inline_javascript: InlineJavaScript,
  inline_html: InlineHTML,
  keyboard_response: KeyboardResponse,
  mouse_response: MouseResponse,
  logger: Logger,
  sampler: Sampler,
  synth: Synth,
  coroutines: Coroutines,
  advanced_delay: AdvancedDelay,
  form_consent: FormConsent,
  form_multiple_choice: FormMultipleChoice,
  form_text_display: FormTextDisplay,
  form_text_input: FormTextInput,
  media_player_mpy: MediaPlayer,
  notepad: Notepad,
  repeat_cycle: RepeatCycle,
  reset_feedback: ResetFeedback,
  touch_response: TouchResponse,
  // Elements
  arrow: Arrow,
  circle: Circle,
  ellipse: Ellipse,
  fixdot: Fixdot,
  gabor: Gabor,
  image: ImageElement,
  line: Line,
  noise: Noise,
  rect: Rect,
  textline: TextLine,
}

export const constants = {
  // Type of used collection mode.
  PRESSES_ONLY: 1,
  RELEASES_ONLY: 2,
  PRESSES_AND_RELEASES: 3,

  // Type of response used.
  RESPONSE_NONE: 0,
  RESPONSE_DURATION: 1,
  RESPONSE_KEYBOARD: 2,
  RESPONSE_MOUSE: 3,
  RESPONSE_SOUND: 4,
  RESPONSE_AUTOKEYBOARD: 5,
  RESPONSE_AUTOMOUSE: 6,

  // Running status of an item.
  STATUS_NONE: 0,
  STATUS_BUILD: 1,
  STATUS_INITIALIZE: 2,
  STATUS_EXECUTE: 3,
  STATUS_FINALIZE: 4,

  // Definition of the event loop status contstants.
  TIMER_NONE: 0,
  TIMER_WAIT: 1,
  TIMER_EXIT: 2,
  TIMER_PAUSE: 3,
  TIMER_RESUME: 4,
  TIMER_DONE: 5,
  TIMER_BREAK: 6,
  TIMER_ERROR: 7,
  TIMER_FORM: 8
}
