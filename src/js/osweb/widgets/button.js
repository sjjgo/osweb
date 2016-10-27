
module.exports = function(osweb){
    "use strict";
    // Definition of the class button.
    function button(pForm, pProperties) {
        // Inherited create.
        this.widget_constructor(pForm);

        // Set the class public properties.
        this.center = (typeof pProperties['center'] == 'boolean') ? pProperties['center'] : false;
        this.frame = (typeof pProperties['frame'] == 'boolean') ? pProperties['frame'] : false;
        this.text = pProperties['text'];
        this.type = 'button';

        // Set the class private properties.
        this._button = document.createElement("button");
        this._button.style.width = '100%';
        this._button.style.height = '100%';

        // Add the button to the element.
        this._element.appendChild(this._button);
        
        // Add event listener to the element.
        this._button.addEventListener("click", this.response.bind(this));
    };

    // Extend the class from its base class.
    var p = osweb.extendClass(button, osweb.widget);

    // Definition of public properties. 
    p.center = false;
    p.frame = null;
    p.text = '';

    /*
     * Definition of public class methods - build cycle.
     */

    p.response = function(event) {
        // Complete the parent form.
        this.form.item.complete();
    };

    p.draw_text = function(pText, pHtml) {
        this._element.style.textAlign = (this.center === true) ? 'center' : 'inherit';
        this._element.style.padding = Number(this.form.spacing) + 'px';
        this._element.style.fontStyle = this.form.experiment.vars.font_italic == 'yes' ? 'italic' : 'normal';
        this._element.style.fontWeight = this.form.experiment.vars.font_bold == 'yes' ? 'bold' : 'normal';
        this._element.style.fontFamily = this.form.experiment.vars.font_family;
        this._element.style.color = this.form.experiment.vars.foreground;
        this._element.style.fontSize = this.form.experiment.vars.font_size + 'px';
        this._element.style.lineHeight = this._element.style.height;
        
        this._button.style.backgroundColor = osweb.themes[this.form.theme].backgroundColor;
        this._button.textContent = pText;
    };

    p.render = function() {
        // Draw the frame (if enabled).
        if (this.frame === true) {
            this._element.style.backgroundColor = osweb.themes[this.form.theme].backgroundColor;
            this._element.style.borderColor = osweb.themes[this.form.theme].lineColorLeftTop + ' ' + osweb.themes[this.form.theme].lineColorRightBottom + ' ' + 
               osweb.themes[this.form.theme].lineColorRightBottom + ' ' +osweb.themes[this.form.theme].lineColorLeftTop; 
            this._element.style.borderWidth = "1px";
            this._element.style.borderStyle = "solid";
        }
    
        // Draw the text.
        this.draw_text(this.text);
    };

    // Bind the button class to the osweb namespace.
    return osweb.promoteClass(button, "widget");
};