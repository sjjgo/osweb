import FormHTML from './form_html.js'

/**
 * Class representing a form text display item.
 * @extends FormHTML
 */
export default class FormTextDisplay extends FormHTML {

  formElements () {
    const title = this.element('h1', this.vars.get('form_title'), 1 / 6)
    const text = this.element('p', this.vars.get('form_text'), 4 / 6)
    text.style.textAlign = 'left'
    const okButton = this.element('input', null, 1 / 6, 1 / 3)
    okButton.type = 'button'
    okButton.value = this.vars.get('ok_text')
    okButton.onclick = this.resumeOSWeb.bind(this)
    this.applyTheme(okButton, true)
    return [title, text, okButton]
  }
}
