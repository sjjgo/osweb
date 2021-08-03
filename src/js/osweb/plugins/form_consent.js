import FormHTML from './form_html.js'

/**
 * Class representing a form consent item.
 * @extends FormHTML
 */
export default class FormConsent extends FormHTML {

  onDecline () {
    alertify.error(this.vars.get('decline_message'))
  }
  
  onAccept () {
    if (this._checkbox.checked) {
      this.resumeOSWeb()
      return
    }
    this.onDecline()
  }

  formElements () {
    const title = this.element('h1', this.vars.get('form_title'), 1 / 7)
    const text = this.element('p', this.vars.get('form_text'), 4 / 7)
    text.style.textAlign = 'left'
    const [checkboxContainer, checkbox] = this.checkbox(
      'checkbox', this.vars.get('checkbox_text'), 1 / 7)
    this._checkbox = checkbox
    const buttonContainer = this.element('div', null, 1 / 7)
    const acceptButton = this.element('input', null, null, 1 / 3)
    acceptButton.value = this.vars.get('accept_text')
    acceptButton.type = 'button'
    acceptButton.onclick = this.onAccept.bind(this)
    const declineButton = this.element('input', null, null, 1 / 3)
    declineButton.value = this.vars.get('decline_text')
    declineButton.type = 'button'
    declineButton.onclick = this.onDecline.bind(this)
    buttonContainer.append(acceptButton)
    buttonContainer.append(declineButton)
    this.applyTheme(acceptButton, true)
    this.applyTheme(declineButton, true)
    return [title, text, checkboxContainer, buttonContainer]
  }
}
